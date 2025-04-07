const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { UserModel } = require('../model/UserModel');
const { RecruiterJobModel } = require('../model/RecruiterJobModel'); // Import the RecruiterJobModel
const mongoose = require('mongoose');

const UserRoute = express.Router();

// Get all users
UserRoute.get('/', async (req, res) => {
    try {
        const AllUsers = await UserModel.find();
        res.status(201).json({ success: true, data: AllUsers });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Register user
UserRoute.post("/register", async (req, res) => {
    const { name, email, mobile, password } = req.body;

    // Email validation using validator
    if (!validator.isEmail(email)) {
        return res.status(500).json({
            success: false,
            message: "Invalid email format. Please check!",
        });
    }

    try {
        const existingUser = await UserModel.find({ email });

        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({ success: false, error: err.message });
            }

            try {
                const newUser = await UserModel.create({
                    name,
                    email,
                    mobile,
                    password: hash,
                });

                return res.status(201).json({ success: true, message: "User registered successfully" });
            } catch (err) {
                return res.status(500).json({ success: false, error: err.message });
            }
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

// Login user
UserRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const finduser = await UserModel.find({ email });
        if (finduser.length > 0) {
            bcrypt.compare(password, finduser[0].password, async (err, result) => {
                if (result) {
                    const token = jwt.sign(
                        { UserID: finduser[0]._id },
                        process.env.JWT_SECRET || "saikhmirsat", // Use environment variable for JWT secret
                        { expiresIn: "1d" }
                    );

                    const setUserToken = await UserModel.updateMany(
                        { _id: finduser[0]._id },
                        [{ $set: { loginToken: token } }, { $set: { isAuth: true } }]
                    );

                    const user = await UserModel.find({ email }).select('-password'); // Exclude password from response

                    return res.send({
                        success: true,
                        message: "Login successful",
                        user
                    });
                } else {
                    return res.send({ success: false, message: "Incorrect credentials" });
                }
            });
        } else {
            return res.send({
                success: false,
                message: "This email is not registered. Please register first.",
            });
        }
    } catch (err) {
        console.log(err);
    }
});

// Logout user
UserRoute.post('/logout/:_id', async (req, res) => {
    const id = req.params._id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    try {
        const user = await UserModel.find({ _id: id });

        if (user.length > 0) {
            await UserModel.updateMany({ _id: user[0]._id }, [
                { $set: { loginToken: "" } },
                { $set: { isAuth: false } },
            ]);
            return res.status(201).json({ success: true, message: "Logout successful" });
        } else {
            return res.status(500).json({ success: false, message: "Something went wrong" });
        }
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
});

module.exports = {
    UserRoute
};
