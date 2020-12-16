"use strict";

import express from "express";
import { setUser,getAllUsers,getUserById } from "../controllers/user";
import { createNewTrip, markTripComplete } from "../controllers/trip";

//Define router
const router = express.Router();

/*@Todo: Make these routes private*/
router.post("/setUser", setUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById", getUserById);

router.post("/createNewTrip", createNewTrip);
router.post("/markTripComplete", markTripComplete);

// Export module to enable imports
module.exports = router;
