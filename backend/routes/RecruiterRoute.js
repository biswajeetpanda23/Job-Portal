const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { RecruterModel } = require('../model/RecruiterModel')

const RecruiterRoute = express.Router()

RecruiterRoute.get('/', async (req, res) => {
    try {
        const AllUsers = await RecruterModel.find();

        res.status(201).json({ success: true, data: AllUsers });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})
RecruiterRoute.get('/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        const user = await RecruterModel.find({ _id });

        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

RecruiterRoute.post("/register", async (req, res) => {
    const { name, email, mobile, password, company, about_company, compnay_start_date, avatar } = req.body;

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    try {
        const existingUser = await RecruterModel.find({ email });

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
                const newUser = await RecruterModel.create({
                    name,
                    email,
                    mobile,
                    password: hash,
                    company, about_company, compnay_start_date, avatar
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

RecruiterRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const finduser = await RecruterModel.find({ email });
        if (finduser.length > 0) {
            bcrypt.compare(password, finduser[0].password, async (err, result) => {
                if (result) {
                    const token = jwt.sign(
                        { UserID: finduser[0]._id },
                        "saikhmirsat",
                        { expiresIn: "1d" }
                    );

                    const setUserToken = await RecruterModel.updateMany(
                        { _id: finduser[0]._id },
                        [{ $set: { loginToken: token } }, { $set: { isAuth: true } }]
                    );
                    console.log(setUserToken);
                    const user = await RecruterModel.find({ email });
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

RecruiterRoute.post('/logout/:_id', async (req, res) => {
    const id = req.params._id;

    try {
        const user = await RecruterModel.find({ _id: id });

        if (user.length > 0) {
            await RecruterModel.updateMany({ _id: user[0]._id }, [
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
    RecruiterRoute
}