"use strict";

import firebase from "firebase/app";
import "firebase/firestore";

var db = firebase.firestore();

// Enable firebase emulator
db.settings({ host: "localhost:8080", ssl: false });

//Add a New user to DB
exports.setUser = (req, res) => {
  let user = req.body;
  db.collection("users")
    .add({
      userID: user.userID,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      whatsappNumber: user.whatsappNumber,
      gender: user.gender,
      pastTrips: [],
    })
    .then((ref) => {
      return res.status(200).json({ message: "Created" });
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ error: "Error in uploading data to firebase!" });
    });
};

//Returns all users
exports.getAllUsers = (req, res) => {
  db.collection("users")
    .get()
    .then((doc) => {
      return res.status(200).json(doc.docs.map((doc) => doc.data()));
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ error: "Error in retrieving data from firebase!" });
    });
};

//Fetch a user by its UID from database and returns it
exports.getUserById = (req, res) => {
  const UID = req.body.id;
  db.collection("users")
    .where("userID", "==", UID)
    .get()
    .then((doc) => {
      const len = doc.docs.length;
      if (len == 0) {
        return res.status(400).json({
          error: "User not Found!",
        });
      }
      return res.status(200).json(doc.docs.map((doc) => doc.data()));
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ error: "Error in retrieving data from firebase!" });
    });
};
