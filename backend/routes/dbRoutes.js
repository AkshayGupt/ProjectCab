"use strict";

import express from "express";
import { setUser,
         getAllUsers,
         getUserById 
        } from "../controllers/user";

import { createNewTrip,
         markTripComplete,
         getTripById,
         getPastTripById 
        } from "../controllers/trip";

//Define router
const router = express.Router();

/*@Todo: Make these routes private*/

/* USER ROUTES */
router.post("/setUser", setUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById", getUserById);


/* TRIP ROUTES */
router.get("/getTripById", getTripById);
router.get("/getPastTripById", getPastTripById);
router.post("/createNewTrip", createNewTrip);
router.post("/markTripComplete", markTripComplete);

// Export module to enable imports
module.exports = router;
