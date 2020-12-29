const express = require("express");
const { ensureAuth } = require("../middleware/auth");
const {
  createNewTrip,
  getTripById,
  getTripsByUserId,
} = require("../controllers/trip");
const { getUserById } = require("../controllers/user");

//Define router
const router = express.Router();

/* USER ROUTES */
// router.get("/getAllUsers", getAllUsers);
router.get("/getUserById", getUserById);

/* TRIP ROUTES */
router.get("/getTripById", getTripById);
router.get("/getTripsByUserId", getTripsByUserId);
// router.get("/getPastTripById", getPastTripById);
router.post("/createNewTrip", createNewTrip);
// router.post("/markTripComplete", markTripComplete);

// Export module to enable imports
module.exports = router;
