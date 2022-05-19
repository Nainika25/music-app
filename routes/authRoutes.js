const mongoose = require("mongoose");
const keys = require("../config/keys");
const e = require("express");

const User = mongoose.model("users");

module.exports = (app) => {
    app.post("/api/register", async(req, res, done) => {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.json({
                msg: "You are already registered with us",
            });
        }
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        }).save();
        return res.json({ msg: "Registration successfull!!" });
    });

    app.post("/api/login", async(req, res, done) => {
        const existingUser = await User.findOne({
            email: req.body.email,
        });
        if (existingUser) {
            if (existingUser.password === req.body.password) {
                return res.json({
                    msg: "Done",
                    user: existingUser,
                });
            } else {
                return res.json({
                    msg: "Invalid Credentials",
                });
            }
        } else {
            return res.json({
                msg: "You are not registered with us!"
            })
        }
    });
};