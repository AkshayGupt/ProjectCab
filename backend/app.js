"use strict";

const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoutes");
const dbRoute = require("./routes/dbRoutes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");

// Init express
const app = express();

// Fetch Environment variables
dotenv.config({ path: "./config/config.env" });

//passort config
require("./config/passport")(passport);

//Sessions
app.use(
  session({
    secret: "poolit",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json());

// Connect to mongoDB
connectDB();

app.use("/", authRoute);
app.use("/auth", authRoute);
// app.use('/db', dbRoute);

const port = process.env.PORT || 5000;

// Launch Server
app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
