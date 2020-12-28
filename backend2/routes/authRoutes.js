const express = require ('express');
const router = express.Router();
const passport = require('passport');
const {
     ensureAuth,
     ensureGuest
} = require('../middleware/auth');


//Auth Routes
router.get('/signIn', passport.authenticate('google',{ scope:['profile'] }));

router.get('/signOut',(req,res)=>{
     req.logOut()
     res.redirect('/')
})

router.get('/google/callback',passport.authenticate('google',{ failureRedirect:'/failure' }),(req,res) =>{
     return res.status(200).json({
          message:"Logged In"
     })
})


router.get('/authStatus',ensureAuth,(req,res)=>{
     return res.status(200).json({
          message:"Logged In"
     })
})


router.get('/',ensureGuest, (req,res)=>{
     return res.status(200).json({
          message:"Logged In"
     })
})

router.get('/failure',(req,res)=>{
     return res.status(400).json({
          error:"Not Authenticated"
     })
})

router.get('/success',(req,res)=>{
     return res.status(400).json({
          message:"Authenticated"
     })
})

module.exports = router;


