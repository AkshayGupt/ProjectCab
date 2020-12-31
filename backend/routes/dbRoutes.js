const express = require("express");
const { ensureAuth } = require("../middleware/auth");
const { checkExistingTrips } = require("../middleware/db");
const {
  createNewTrip,
  getTripById,
  getTripsByUserId,
  getPastTrips,
  getOngoingTrips,
  getFutureTrips,
} = require("../controllers/trip");
const { getUserById } = require("../controllers/user");

//Define router
const router = express.Router();

/* USER ROUTES */
router.get("/getUserById", getUserById);

/* TRIP ROUTES */
router.get("/getTripById", getTripById);
router.get("/getPastTrips", getPastTrips);
router.get("/getOngoingTrips", getOngoingTrips);
router.get("/getFutureTrips", getFutureTrips);

router.get("getTripsByUserId", getTripsByUserId);

router.post("/createNewTrip", checkExistingTrips, createNewTrip);

// Export module to enable imports
module.exports = router;
