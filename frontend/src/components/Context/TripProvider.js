import { set } from "js-cookie";
import React, { useState, createContext } from "react";

export const TripContext = createContext();

export const TripProvider = () => {
  const [futureTrips, setFutureTrips] = useState([]);
  const [ongoingTrips, setOngoingTrips] = useState([]);
  const [cached, setCached] = useState(false);

  const getTrips = () => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    console.log("Data from Trips", jwt.token);
    const UID = jwt.user._id;
    getFutureTrips(UID, jwt.token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("Data", data);
          setFutureTrips(data);
          const date = new Date();
          let dates = [];
          {
            data.map((trip) => {
              dates.push(moment(trip.startTime).format("DD-MM-YYYY"));
            });
          }
          setDates(dates);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    getOngoingTrips(UID, jwt.token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("Data", data);
          setOngoingTrips(data);
          setCached(true);
          const date = new Date();
          let newDates = dates;
          {
            data.map((trip) => {
              newDates.push(moment(trip.startTime).format("DD-MM-YYYY"));
            });
          }
          setDates(newDates);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!cached) {
    console.log("Caching.......");
    getTrips();
  }

  return (
    <TripContext.Provider>
      <Trips />
    </TripContext.Provider>
  );
};
