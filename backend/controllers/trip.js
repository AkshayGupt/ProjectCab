"use strict";

import firebase from "firebase/app";
import "firebase/firestore";
import "regenerator-runtime/runtime.js";

var db = firebase.firestore();

// Enable firebase emulator
// db.settings({ host: "localhost:8080", ssl: false });

/**
 * Private helper function to create a new trip if no existing trips are found.
 */
const _createNewTrip = (trip, res) => {
  // Assign a tripId
  const tripId = trip.members[0].toString() + Date.now().toString();

  // Create members list
  let membersList = [];
  membersList.push(trip.members[0]);

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
 * Create a new trip
 *
 * Gets a [Trip] object.
 * Saves that object in the database.
 */
exports.createNewTrip = async (req, res) => {
  let trip = req.body;

  // TODO: Find duplicate existing trips

  let {
    userID,
    source,
    destination,
    startTime,
    endTime,
    membersNeeded,
    genderAllowed,
  } = trip;

  // TODO: Improve the member capacity

  const tripQuery = db
    .collection("trips")
    .where("source", "==", source)
    .where("destination", "==", destination)
    .where("genderAllowed", "==", genderAllowed)
    .where("membersNeeded", ">=", membersNeeded);

  try {
    await db.runTransaction(async (t) => {
      const snapshot = await t.get(tripQuery);
      if (snapshot.exists && snapshot.docs.length > 0) {

        let doc = null;
        for(document in snapshot.docs) {
          if(document.endTime <= endTime && document.membersNeeded > membersNeeded) {
            doc = document;
            break;
          }
        }

        // Add the new user to the existing trip
        const tripRef = db.collection("trips").doc(doc.tripID);
        t.update(tripRef, { members: doc.data().members.push(userID) });
        console.log("New member added!");
      } else {
        console.log("No Existing Trips found! Creating new trip.");
        _createNewTrip(trip, res);
      }
    });
    return res.status(200).json({ message: "Transaction ran successfully" });
  } catch (e) {
    console.log("Transaction Failure: ", e);
    _createNewTrip(trip, res);
    return res.status(200).json({ message: "Done" });
  }
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

/**
 * Return a Trip using its tripID
 * Searches in collection 'trips'
 */
exports.getTripById = (req, res) => {
  const tripId = req.body.tripID;

  db.collection("trips")
    .where("tripID", "==", tripId)
    .get()
    .then((doc) => {
      console.log(doc);
      return res.status(200).json(doc.docs.map((doc) => doc.data()));
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Trip not found!",
      });
    });
};

/**
 * Return a Trip using its tripID
 * Searches in collection 'trips'
 */
exports.getPastTripById = (req, res) => {
  const tripId = req.body.tripID;

  db.collection("past_trips")
    .where("tripID", "==", tripId)
    .get()
    .then((doc) => {
      console.log(doc);
      return res.status(200).json(doc.docs.map((doc) => doc.data()));
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Trip not found!",
      });
    });
};

exports.getTripsByUserId = (req, res) => {
  console.log("Getting Trips of User", uid);
  const uid = req.body.UID;

  db.collection("trips")
    .where("members", "array-contains", uid)
    .get()
    .then((doc) => {
      res.status(200).json(doc.docs.map((doc) => doc.data()));
    })
    .catch((err) => {
      console.log(err);
    });
};
