"use strict";

import { user } from "firebase-functions/lib/providers/auth";
import firebase from "firebase/app";
import "firebase/firestore";

var db = firebase.firestore();

// Enable firebase emulator
// db.settings({ host: "localhost:8080", ssl: false });

/**
 * Create a new trip
 *
 * Gets a [Trip] object.
 * Saves that object in the database.
 */
exports.createNewTrip = (req, res) => {
  let trip = req.body;
  const tripId = trip.members[0].toString() + Date.now().toString();

  let membersList = [];
  for (let i in trip.members) membersList.push(trip.members[i]);

  db.collection("trips")
    .doc(tripId)
    .set({
      tripID: tripId,
      source: trip.source,
      destination: trip.destination,
      startTime: trip.startTime,
      endTime: trip.endTime,
      members: membersList,
      membersNeeded: trip.membersNeeded,
      genderAllowed: trip.genderAllowed,
    })
    .then((ref) => {
      return res
        .status(200)
        .json({ message: "New Trip successfully created!" });
    })
    .catch((err) => {
      return res.status(400).json({ error: "Error in creating a new trip!" });
    });
};

/**
 * Mark trips as complete by [tripID]
 *
 * Steps:
 * 1. Fetch the document by [tripId] from collection ('trips/').
 * 2. Copy the document over to collection ('past_trips/').
 * 3. Delete the document from collection ('trips/').
 *
 */
exports.markTripComplete = (req, res) => {
  const tripId = req.body.tripID;

  // Fetch document
  db.collection("trips")
    .where("tripID", "==", tripId)
    .limit(1)
    .get()
    .then((doc) => {
      const len = doc.docs.length;
      if (len == 1) {
        let {
          tripID,
          source,
          destination,
          startTime,
          endTime,
          members,
          membersNeeded,
          genderAllowed,
        } = doc.docs[0].data();

        // Copy the data over to collection ('past_trips/')
        db.collection("past_trips")
          .doc(tripId)
          .set({
            tripID: tripID,
            source: source,
            destination: destination,
            startTime: startTime,
            endTime: endTime,
            members: members,
            membersNeeded: membersNeeded,
            genderAllowed: genderAllowed,
          })
          .then((ref) => {
            // Delete the document from collection ('trips/')
            db.collection("trips")
              .doc(tripId)
              .delete()
              .then((_) => {
                return res
                  .status(200)
                  .json({ message: "Successfully marked trip as completed!" });
              })
              .catch((err) => {
                return res
                  .status(400)
                  .json({ error: "Cannot delete document!" });
              });
          })
          .catch((err) => {
            return res.status(400).json({ error: "Error in copying data!" });
          });
      } else {
        return res.status(400).json({ error: "Document not found!" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ message: "Cannot fetch documnt" });
    });
};
