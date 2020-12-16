"use strict";

import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./config/config";

const config = firebaseConfig();

// Initialize Firebase app
firebase.initializeApp(config);

// Google provider instance
const provider = new firebase.auth.GoogleAuthProvider();

// Enable Google Sign in through credentials
exports.googleSignIn = (req, res) => {

  let id_token = req.body.id_token;
  // console.log(id_token);
  let credential = provider.credential(id_token);

  firebase
    .auth()
    .signInWithCredential(credential)
    .then((result) => {
      console.log("Result from Backend: "+result);
      let token = result.credential.accessToken;
      let user = result.user;
      return res.json({
        token,
        user,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error: "Error in FIrebase!",
      });
    });
};

// Sign out from firebase.
exports.googleSignOut = (req, res) => {
  firebase.auth().signOut();
};

// Return [null] if the user is not authenticated
exports.authStatus = (req, res) => {
  let currentUser = firebase.auth().currentUser;

  if (currentUser && currentUser.email) {
    return res.json({
      email: currentUser.email,
      status: true,
    });
  } else {
    return res.status(400).json({
      email: "",
      status: false,
    });
  }
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
