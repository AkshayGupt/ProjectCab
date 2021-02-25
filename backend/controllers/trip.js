const Trip = require("../models/Trip");
const User = require("../models/user");

/**
 * Create a new trip
 *
 * Gets a [Trip] object.
 * Saves that object in the database.
 */
exports.createNewTrip = (req, res) => {
  const userID = req.body.members[0];
  const trip = new Trip(req.body);

  const obj={
     startTime: new Date(req.body.startTime),
     endTime: new Date(req.body.endTime)
  }
  trip.timePreferences.push(obj);
  trip.save((err, trip) => {
    if (err) {
      return res.status(400).json({ error: "Cannot create a new trip!" });
    } else {
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

  User.findById(userID).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "Some error occured! " });
    } else {
      const trips = user.trips;
      trips.splice(trips.indexOf(tripID), 1);
      user.trips = trips;
      user.save();
    }
  });

  // Fetch the referenced trip
  Trip.findById(tripID).exec((err, trip) => {
    if (err || !trip) {
      return res.status(400).json({ error: "Some error occured! " });
    } else {
      const timePreferences = trip.timePreferences;
     
      // Remove the user
      const membersList = trip["members"];
      const memberIndex = membersList.indexOf(userID);
      membersList.splice(memberIndex, 1);
      trip["members"] = membersList;
      trip["isFilled"] = 0;
      trip["memberCount"] -= 1;
      if (trip["memberCount"] == 0) {
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
        timePreferences.splice(memberIndex, 1);

        var newStartTime = timePreferences[0].startTime;
        var newEndTime = timePreferences[0].endTime;
        for(var i=1;i<timePreferences.length;i++){
          if(newStartTime<timePreferences[i].startTime){
            newStartTime =timePreferences[i].startTime;
          }
          if(newEndTime>timePreferences[i].endTime){
            newEndTime = timePreferences[i].endTime;
          }
        }
        trip.timePreferences=timePreferences;
        trip.startTime = newStartTime;
        trip.endTime = newEndTime;

        trip.save();
      }
    }
  });
};

/**
 * Return a Trip using its tripID
 * Searches in collection 'trips'
 */
exports.getTripById = (req, res) => {
  const tripId = req.query.tripID;
  Trip.findById(tripId)
    .populate("members")
    .sort("startTime")
    .exec((err, trip) => {
      if (err) {
        return res.status(400).json({ error: "Cannot fetch trip" });
      } else {
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
