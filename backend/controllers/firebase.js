"use strict";

import firebase from "firebase/app";
import "firebase/firestore";

var db = firebase.firestore();

// Enable firebase emulator
db.settings({ host: "localhost:8080", ssl: false });

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
    })
    .then((ref) => {
      return res.status(200).json({ message: "Created" });
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ message: "Error in uploading data to firebase!" });
    });
};
