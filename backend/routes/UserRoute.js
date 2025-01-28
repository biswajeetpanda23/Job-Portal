const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { UserModel } = require('../model/UserModel')

const UserRoute = express.Router()

UserRoute.get('/', async (req, res) => {
    try {
        const AllUsers = await UserModel.find();

        res.status(201).json({ success: true, data: AllUsers });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

UserRoute.post("/register", async (req, res) => {
    const { name, email, mobile, password } = req.body;

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    try {
        const existingUser = await UserModel.find({ email });

        if (!isValidEmail(email)) {
            return res.status(500).json({
                success: false,
                message: "its not a valid mail please check!",
            });
        }

        if (existingUser.length > 0) {
            return res
                .status(400)
                .json({ success: false, message: "User already exists" });
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

                return res
                    .status(201)
                    .json({ success: true, message: "User Register Successfully" });
            } catch (err) {
                return res.status(500).json({ success: false, error: err.message });
            }
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
})

UserRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const finduser = await UserModel.find({ email });
        if (finduser.length > 0) {
            bcrypt.compare(password, finduser[0].password, async (err, result) => {
                if (result) {
                    const token = jwt.sign(
                        { UserID: finduser[0]._id },
                        "saikhmirsat",
                        { expiresIn: "1d" }
                    );

                    const setUserToken = await UserModel.updateMany(
                        { _id: finduser[0]._id },
                        [{ $set: { loginToken: token } }, { $set: { isAuth: true } }]
                    );


                    const user = await UserModel.find({ email });

                    return res.send({
                        success: true,
                        message: "Login Successful",
                        user
                    });
                } else {
                    return res.send({ success: false, message: "Wrong creadencial" });
                }
            });
        } else {
            return res.send({
                success: false,
                message: "This email is not register please Register first ",
            });
        }
    } catch (err) {
        console.log(err);
    }
})

UserRoute.post('/logout/:_id', async (req, res) => {
    const id = req.params._id;

    try {
        const user = await UserModel.find({ _id: id });

        if (user.length > 0) {
            await UserModel.updateMany({ _id: user[0]._id }, [
                { $set: { loginToken: "" } },
                { $set: { isAuth: false } },
            ]);
            return res
                .status(201)
                .json({ success: true, message: "Logout successful" });
        } else {
            return res
                .status(500)
                .json({ success: false, message: "something wrong" });
        }
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
})

module.exports = {
    UserRoute
}

