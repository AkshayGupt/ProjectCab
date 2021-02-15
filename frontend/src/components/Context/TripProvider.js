import { set } from "js-cookie";
import React, { useState, useEffect, createContext } from "react";
import { getFutureTrips, getOngoingTrips, cancelTheTrip } from "../Dashboard/helper";
import moment from "moment";
export const TripContext = createContext();

export const TripProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [futureTrips, setFutureTrips] = useState([]);
  const [ongoingTrips, setOngoingTrips] = useState([]);
  const [dates, setDates] = useState([]);

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

 useEffect(() => {
  getTrips();
 }, []);

  return (
    <TripContext.Provider 
        value={{
          userFutureTrips:[futureTrips, setFutureTrips],
          userOngoingTrips:[ongoingTrips, setOngoingTrips],
          userDates:[dates, setDates],
          isLoading:[loading, setLoading]  
        }}>
      {props.children}
    </TripContext.Provider>
  );
};
