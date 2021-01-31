const express = require("express");
const { isSignedIn } = require("../controllers/auth");
const {
  checkExistingTrips,
  checkOverlappingTrips,
} = require("../middleware/db");
const {
  createNewTrip,
  getTripById,
  getTripsByUserId,
  getPastTrips,
  getOngoingTrips,
  getFutureTrips,
  cancelTrip,
} = require("../controllers/trip");
const { getUserById, updateUserBio } = require("../controllers/user");

//Define router
const router = express.Router();

/* USER ROUTES */
router.get("/getUserById", isSignedIn, getUserById);

/* TRIP ROUTES */
router.get("/getTripById", isSignedIn, getTripById);
router.get("/getPastTrips", isSignedIn, getPastTrips);
router.get("/getOngoingTrips", isSignedIn, getOngoingTrips);
router.get("/getFutureTrips", isSignedIn, getFutureTrips);

router.get("/getTripsByUserId", isSignedIn, getTripsByUserId);

router.post(
  "/createNewTrip",
  isSignedIn,
  checkOverlappingTrips,
  checkExistingTrips,
  createNewTrip
);
router.post("/cancelTrip", isSignedIn, cancelTrip);
router.put("/updateUserBio", isSignedIn, updateUserBio);

// Export module to enable imports
module.exports = router;
