"use strict";

import express from "express";
import { setUser } from "../controllers/firebase";

//Define router
const router = express.Router();

router.post("/setUser", setUser);

// Export module to enable imports
module.exports = router;
