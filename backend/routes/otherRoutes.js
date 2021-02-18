const express = require("express");
const { check } = require("express-validator");
const {
    sendMessage
} = require("../controllers/other");

//Define router
const router = express.Router();


router.post("/sendMessage",
[check("email", "Enter a valid email").normalizeEmail().isEmail()],
sendMessage);


// Export module to enable imports
module.exports = router;
