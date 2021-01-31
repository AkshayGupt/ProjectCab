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
  console.log(trip);
  trip.save((err, trip) => {
    if (err) {
      console.log("ERROR", err);
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
  const userID = req.query.id;
  Trip.find({ members: { $all: [userID] } })
    .lean()
    .populate("members", "firstName lastName")
    .exec((err, trips) => {
      if (err) {
        return res.status(400).json({ error: "Cannot fetch trips!" });
      } else {
        return res.status(200).json(trips);
      }
    });
};

/**
 * Return all past trips of a user
 * @param {String} req: UserID
 */
exports.getPastTrips = (req, res) => {
  const userID = req.query.userId;
  const currentDateTime = new Date().toISOString();
  Trip.find({ members: { $all: [userID] }, endTime: { $lte: currentDateTime } })
    .populate("members", "firstName lastName image")
    .exec((err, trips) => {
      if (err) {
        return res.status(400).json({ error: "Cannot fetch past trips!" });
      } else {
        return res.status(200).json(trips);
      }
    });
};

/**
 * Return all the ongoing trips of a user
 * @param {String} req: UserID
 */
exports.getOngoingTrips = (req, res) => {
  const userID = req.query.userId;
  const currentDateTime = new Date().toISOString();
  Trip.find({
    members: { $all: [userID] },
    startTime: { $lte: currentDateTime },
    endTime: { $gte: currentDateTime },
  })
    .populate("members", "firstName lastName image")
    .exec((err, trips) => {
      if (err) {
        return res.status(400).json({ error: "Cannot fetch ongoing trips!" });
      } else {
        return res.status(200).json(trips);
      }
    });
};

/**
 * Return all the Future trips of a user
 * @param {String} req: UserID
 */
exports.getFutureTrips = (req, res) => {
  const userID = req.query.userId;
  const currentDateTime = new Date().toISOString();
  Trip.find({
    members: { $all: [userID] },
    startTime: { $gt: currentDateTime },
  })
    .populate("members", "firstName lastName image")
    .exec((err, trips) => {
      if (err) {
        return res.status(400).json({ error: "Cannot fetch future trips!" });
      } else {
        return res.status(200).json(trips);
      }
    });
};
