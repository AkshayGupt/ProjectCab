"use strict";

import express from "express";
import { setUser,getAllUsers,getUserById } from "../controllers/user";

//Define router
const router = express.Router();

/*@Todo: Make these routes private*/
router.post("/setUser", setUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById", getUserById);

// Export module to enable imports
module.exports = router;
