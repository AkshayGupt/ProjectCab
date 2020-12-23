"use strict";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoutes";
import dbRoute from "./routes/dbRoutes";
import bodyParser from "body-parser";
import mongoose from "mongoose";

// Fetch Environment variables
dotenv.config();

// Init express
const app = express();

// Connect to mongoDB
//database connection
const url = "mongodb://localhost/my_database"; // !! TODO: Change the URL

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED SUCCESSFULLY!!");
  })
  .catch(() => {
    console.log("DB CONNECTION FAILED!");
  });

// Enable All cors
app.use(cors());

app.use(bodyParser.json());

app.use("/", authRoute);
app.use("/auth", authRoute);
app.use("/db", dbRoute);

// Define Port (Default 5000)
// const port = process.env.PORT || 5000;
const port = 5000;

// Launch Server
app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
