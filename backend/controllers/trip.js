const Trip = require("../models/Trip");
const User = require("../models/User");

/**
 * Create a new trip
 *
 * Gets a [Trip] object.
 * Saves that object in the database.
 */
exports.createNewTrip = (req, res) => {
  const userID = req.body.members[0];
  const trip = new Trip(req.body);
  trip.save((err, trip) => {
    if (err) {
      return res.status(400).json({ error: "Cannot create a new trip!" });
    } else {
      console.log(trip);
      User.findOneAndUpdate(
        { _id: userID },
        { $push: { trips: trip.id } }
      ).exec((err, docs) => {
        if (err) {
          return res.status(400).json({ error: "Cannot upload data" });
        }
      });
      return res.status(200).json({ message: "Trip Created successfully!" });
    }
  });
};

/**
 * Return a Trip using its tripID
 * Searches in collection 'trips'
 */
exports.getTripById = (req, res) => {
  const tripId = req.body.tripID;
  Trip.findById(tripId)
    .populate("members")
    .exec((err, trip) => {
      if (err) {
        return res.status(400).json({ error: "Cannot fetch trip" });
      } else {
        console.log(trip);
        return res.status(200).json(trip);
      }
    });
};

/**
 * Return All Trips where [userID] is a member
 */
exports.getTripsByUserId = (req, res) => {
  const userID = req.body.userID;
  Trip.find({ members: { $all: [userID] } })
    .populate("members")
    .exec((err, trips) => {
      if (err) {
        return res.status(400).json({ error: "Cannot fetch trips!" });
      } else {
        return res.status(200).json(trips);
      }
    });
};
