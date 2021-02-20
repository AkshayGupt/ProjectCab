const mongoose = require("mongoose");
const Trip = require("../models/Trip");
const User = require("../models/User");
/**
 * Check if an existing trip already exists with the given parameters.
 * If exists, add the user in that trip.
 */
module.exports = {
  checkOverlappingTrips: function (req, res, next) {
    const userID = req.body.members[0];
    const trip = new Trip(req.body);

    // Find trips of user with overlapping times
    Trip.findOne({
      members: { $in: [userID] },
      startTime: { $lt: trip.endTime },
      endTime: { $gt: trip.startTime },
    }).exec((err, existingTrip) => {
      if (err) {
        return res.status(400).json({ error: err });
      } else {
        if (existingTrip == null) {
          return next();
        } else {
          return res.status(400).json({
            error: "Possible one or more trips with overlapping time",
          });
        }
      }
    });
  },

  checkExistingTrips: function (req, res, next) {
    const userID = req.body.members[0];
    const trip = new Trip(req.body);

    // Find any existing trips with the same time
    Trip.findOne({
      $and:[
        {
          $or: [{"startTime": { $lte: trip.startTime }}, {"endTime": { $gte: trip.endTime }}]
        },
        {
          $or: [{"genderAllowed":trip.genderAllowed},{"genderAllowed":0}]
        },
        {
          isFilled: 0,
          members: { $nin: [userID] },
          source: trip.source,
          destination: trip.destination,
          minCapacity: trip.minCapacity,
        }
      ]
      }).exec((err, newTrip) => {
      if (err) {
     
        return next();
      } else {
        if (newTrip == null) {
        
          return next();
        } else {
        
          let newMemberCount = newTrip.memberCount + 1;

          let newIsFilled = 0;
          if (newMemberCount == newTrip.maxCapacity) newIsFilled = 1;

          newTrip.members.push(userID);
          newTrip.memberCount = newMemberCount;
          newTrip.isFilled = newIsFilled;
          newTrip.genderAllowed = trip.genderAllowed;
          const obj={
             startTime: req.body.startTime,
             endTime: req.body.endTime
          }
          newTrip.timePreferences.push(obj);
          
          var userStartTime = new Date(req.body.startTime);
          var userEndTime = new Date(req.body.endTime);

          if(newTrip.startTime <userStartTime){
            newTrip.startTime=userStartTime;
          }
          if(newTrip.endTime > userEndTime){
            newTrip.endTime=userEndTime;
          }
          // Update the new trip
          newTrip.save((err, updatedTrip) => {
            if (err) {
              return next();
            } else {
             
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
              return res.status(200).json({ message: "Existing trip found!" });
            }
          });
        }
      }
    });
  },
};
