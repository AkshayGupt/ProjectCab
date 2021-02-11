"use strict";

const User = require("../models/User");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const _ = require("lodash");
const sgMail = require("@sendgrid/mail");
const { Passport } = require("passport");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      parameter: errors.array()[0].param,
    });
  }

  const user = new User(req.body);

  const { email, password, firstName, lastName } = user;

  User.findOne({ email }, (err, user) => {
    if (user) {
      return res.status(400).json({
        error: "User already exists!",
      });
    }
    const token = jwt.sign(
      { email, password, firstName, lastName },
      process.env.ACTIVATION_KEY,
      { expiresIn: "15m" }
    );
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email, // Change to your recipient
      from: "theberrytree.org@gmail.com", // Change to your verified sender
      subject: "Account Activation Link:PoolIt",
      html: `
          <h2>Activate your account</h2>
          <p>Click this link to confirm your email address and complete setup for your account</p>
          <p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>
          <p>This link will expire in 15 minutes</p>
          <h6>PoolIt Team</h6>
        `,
    };
    sgMail
      .send(msg)
      .then(() => {
        return res.status(200).json({
          message: "Verification Link Sent Successfully",
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error: error,
        });
      });
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
      return res.status(400).json({ error: "User not found!" });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "User email and password do not match!",
      });
    }

    // Create Token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //Put token in cookie
    res.cookie("token", token, { expire: new Date() + 30 });

    //Send response to Front End
    return res.status(200).json({
      message: "User signed up successfully!",
      token: token,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User signed out successfully!" });
};

//protected routes
// const secret = process.env.SECRET.toString();
exports.isSignedIn = expressJwt({
  secret: "MYSECRET" /* Same as that in Config File*/,
  algorithms: ["HS256"],
  userProperty: "auth",
});

//Authenticated routes
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id === req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.verifyEmail = (req, res) => {
  const token = req.query.token;
  if (token) {
    jwt.verify(token, process.env.ACTIVATION_KEY, (err, decodedToken) => {
      if (err) {
        return res.status(400).json({
          error: "Token invalid !",
        });
      }
      const { email, password, firstName, lastName } = decodedToken;

      console.log(
        "Inside Verify " +
          email +
          " " +
          password +
          " " +
          firstName +
          " " +
          lastName
      );

      User.findOne({ email }, (err, user) => {
        if (user) {
          return res.status(400).json({
            error: "User already exists!",
          });
        }

        let newUser = new User({ email, password, firstName, lastName });

        newUser.save((err, user) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ name: user.firstName, email: user.email, bio: user.bio });
        });
      });
    });
  } else {
    return res.status(400).json({
      error: "Token invalid !",
    });
  }
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  console.log(email);
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User does not exists!",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: "15m",
    });
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email, // Change to your recipient
      from: "theberrytree.org@gmail.com", // Change to your verified sender
      subject: "Password Reset Link:PoolIt",
      html: `
            <h2>Reset your password</h2>
            <p>Click this link to change your password</p>
            <p>${process.env.CLIENT_URL}/reset/password/${token}</p>
            <p>This link will expire in 15 minutes</p>
            <h6>PoolIt Team</h6>
          `,
    };

    return user.updateOne({ resetLink: token }, (err, success) => {
      if (err) {
        return res.status(400).json({
          error: "reset password link error",
        });
      } else {
        sgMail
          .send(msg)
          .then(() => {
            return res.status(200).json({
              message: "Reset Link Sent Successfully",
            });
          })
          .catch((error) => {
            return res.status(400).json({
              error: error,
            });
          });
      }
    });
  });
};

exports.resetPassword = (req, res) => {
  const { resetLink, newPass } = req.body;
  if (resetLink) {
    jwt.verify(
      resetLink,
      process.env.RESET_PASSWORD_KEY,
      (err, decodedData) => {
        if (err) {
          return res.status(400).json({
            error: "Incorrect token or it is expired",
          });
        }

        User.findOne({ resetLink }, (err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: "User with this token does not exist.",
            });
          }

          const obj = {
            password: newPass,
            resetLink: "",
          };

          user = _.extend(user, obj);

          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: "reset password error",
              });
            } else {
              return res.status(200).json({
                message: "Your password has been changed",
              });
            }
          });
        });
      }
    );
  } else {
    return res.status(401).json({
      error: "Authentication error!!",
    });
  }
};
