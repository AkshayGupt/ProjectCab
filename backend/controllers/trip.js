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
 *  Cancel Trip. Remove user from a trip.
 *
 * @param {{String, String}} req: TripId, UserId
 * @param {JSON} res:  400 -> error, 200 -> success
 */
exports.cancelTrip = (req, res) => {
  const userID = req.query.userId;
  const tripID = req.body.tripId;
  let newTrip;

  // Fetch the referenced trip
  Trip.findById(tripID).exec((err, trip) => {
    if (err) {
      return res.status(400).json({ error: "Some error occured! " });
    } else {
      newTrip = trip;
      console.log(newTrip);

      console.log(newTrip["memberCount"]);

      // Remove the user
      const membersList = newTrip["members"];
      membersList.splice(membersList.indexOf(userID), 1);
      newTrip["members"] = membersList;
      newTrip["isFilled"] = 0;
      newTrip["memberCount"] -= 1;

      if (newTrip["memberCount"] == 0) {
        //Delete the trip
        Trip.findByIdAndDelete(tripID).exec((err, trip) => {
          if (err) {
            return res
              .status(400)
              .json({ error: "Some error occured. Cannot delete file!" });
          } else {
            return res
              .status(200)
              .json({ message: "Trip Cancelled successfully!" });
          }
        });
      } else {
        // Update the trip
        Trip.findOneAndUpdate(tripID, {
          members: membersList,
          isFilled: 0,
          memberCount: newTrip.memberCount,
        }).exec((err, trip) => {
          if (err) {
            return res
              .status(400)
              .json({ error: "Some error occured. Cannot remove user" });
          } else {
            return res
              .status(200)
              .json({ message: "Removed user successfully!" });
          }
        });
      }
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
    .sort("startTime")
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
    .sort("startTime")
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
    .sort("startTime")
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
    .sort("startTime")
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
    .sort("startTime")
    .exec((err, trips) => {
      if (err) {
        return res.status(400).json({ error: "Cannot fetch future trips!" });
      } else {
        return res.status(200).json(trips);
      }
    });
};
