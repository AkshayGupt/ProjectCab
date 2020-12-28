// "use strict";

const express = require ('express');
const router = express.Router();
const passport = require('passport');
const {
     ensureAuth,
     ensureGuest
} = require('../middleware/auth');

router.get('/',ensureGuest, (req,res)=>{
     res.send('Login');
})
router.get('/dashboard',ensureAuth, (req,res)=>{
     res.send('DashBoard');
})

router.get('/signIn', passport.authenticate('google',{ scope:['profile'] }));

router.get('/google/callback',passport.authenticate('google',{ failureRedirect:'/' }),(req,res) =>{
     res.redirect('/dashboard')
})

router.get('/signOut',(req,res)=>{
     req.logOut()
     res.redirect('/')
})

// import express from "express";
// import { googleSignIn, googleSignOut, authStatus } from "../controllers/auth";

// // Define Router
// const router = express.Router();

// // @Todo: Define middlewares to check isSigned

// router.post("/signIn", googleSignIn);
// router.post("/signOut", googleSignOut);

// router.get("/authStatus", authStatus);

// // Export module to enable imports
module.exports = router;


