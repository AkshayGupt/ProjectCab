"use strict";

import express from "express";
import { googleSignIn, googleSignOut, authStatus } from "../controllers/auth";

// Define Router
const router = express.Router();

// @Todo: Define middlewares to check isSigned

router.post("/signIn", googleSignIn);
router.post("/signOut", googleSignOut);

router.get("/authStatus", authStatus);

// Export module to enable imports
module.exports = router;
