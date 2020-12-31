const Trip = require("../models/Trip");
const User = require("../models/User");
/**
 * Check if an existing trip already exists with the given parameters.
 * If exists, add the user in that trip.
 */

exports.checkExistingTrips = (req, res, next) => {
  const userID = req.body.members[0];
  const trip = new Trip(req.body);

  Trip.findOne({
    isFilled: 0,
    members: { $nin: [userID] },
    genderAllowed: trip.genderAllowed,
    source: trip.source,
    destination: trip.destination,
    startTime: { $gte: trip.startTime },
    endTime: { $lte: trip.endTime },
    minCapacity: trip.minCapacity,
  }).exec((err, newTrip) => {
    if (err) {
      console.log("No existing trips found!");
      return next();
    } else {
      if (newTrip == null) {
        console.log("No existing trip found!");
        return next();
      } else {
        console.log("Trip Found!");
        console.log(newTrip);

        let newMemberCount = newTrip.memberCount + 1;

        let newIsFilled = 0;
        if (newMemberCount == newTrip.maxCapacity) newIsFilled = 1;

        newTrip.members.push(userID);
        newTrip.memberCount = newMemberCount;
        newTrip.isFilled = newIsFilled;

        // Update the new trip
        newTrip.save((err, updatedTrip) => {
          if (err) {
            return next();
          } else {
            console.log(updatedTrip);
            User.findOneAndUpdate(
              { _id: userID },
              { $push: { trips: newTrip.id } }
            ).exec((err, doc) => {
              if (err) {
                return res
                  .status(400)
                  .json({ error: "Cannot add trip to user array" });
              }
            });
            res.status(200).json({ message: "Existing trip found!" });
          }
        });
      }
    }
  });
};
