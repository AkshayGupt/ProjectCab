"use strict";

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signup, signin, signout } = require("../controllers/auth");


router.post(
  "/signUp",
  [
    check(
      "firstName",
      "Name must consists of only Alphabets and mst be atleast 3 characters long"
    )
      .notEmpty()
      .isString()
      .isLength({
        min: 3,
      }),
    check("email", "Enter a valid email").normalizeEmail().isEmail(),
    check("password", "Password must be atleat 8 characters long").isLength({
      min: 8,
    }),
  ],
  signup
);

router.post(
  "/signIn",
  [
    check("email", "Enter a valid email").normalizeEmail().isEmail(),
    check("password", "Password must be atleat 8 characters long").isLength({
      min: 8,
    }),
  ],
  signin
);

router.get("/signOut", signout);

router.get("/authStatus", isSignedIn, (req, res) => {
  return res.status(200).json({
    message: "Logged In",
  });
});


module.exports = router;
