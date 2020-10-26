"use strict";

import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./config/config";

const config = firebaseConfig();

// Initialize Firebase
firebase.initializeApp(config);

// Google provider instance
const provider = new firebase.auth.GoogleAuthProvider();

// Enable Google Sign in through credentials
exports.googleSignIn = (req, res) => {
    let id_token = req.body();
    let credential = provider.credential(id_token);

  firebase
    .auth()
    .signInWithCredential(credential)
    .then((result) => {
      let token = result.credential.accessToken;
      let user = result.user;
    })
    .catch((error) => {
      console.log("Messed Up!");
    });
};

// Returns [user object] if user exists,
// otherwise, return [null].
exports.authStatus = (req, res) => {
  let currentUser = firebase.auth().currentUser;
  res.json({ currentUser: `${currentUser}` });
};

// Checks if user is new user or not
exports.isNewUser = (req, res) => {
  let currentUser = firebase.auth().currentUser;
  if (currentUser) {
    let isNewUser = firebase.auth().currentUser.isNewUser;
    res.json({ isNewUser: `${isNewUser}` });
  } else {
    res.status(403).json({ message: "User Not Signed in." });
  }
};
