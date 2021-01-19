"use strict";

const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      parameter: errors.array()[0].param,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) return res.status(400).json({ error: err.message });
    return res.status(200).json({ name: user.firstName, email: user.email });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      parameter: errors.array()[0].param,
    });
  }

  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "User email and password do not match!" });
    }

    // Create Token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("token", { expire: new Date() + 9999 });
    return res.status(200).json({
      message: "User signed up successfully!",
      token: token,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
      },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User signed out successfully!" });
};
