"use strict";

import express from "express";
import {
  googleSignIn,
  googleSignOut,
  authStatus,
  isNewUser,
} from "../controllers/auth";

// Define Router
const router = express.Router();

router.post("/signIn", googleSignIn);
router.post("/signOut", googleSignOut);

router.get("/authStatus", authStatus);
router.get("/isNewUser", isNewUser);

// Export module to enable imports
module.exports = router;
