import { set } from 'js-cookie';
import React,{useState,createContext,useEffect} from 'react';
import {getPastTrips} from '../Dashboard/helper';
import PastTrips from '../Dashboard/PastTrips';

export const PastTripContext = createContext();

export const PastTripProvider = (props) => {
    const[pastTrips,setPastTrips] = useState([]);
    const[loading,setLoading] = useState(true);
    const getPastTripsOfUser = () => {
        const jwt = JSON.parse(localStorage.getItem("jwt"));
        console.log("Data from Trips", jwt.token);
        const UID = jwt.user._id;
        getPastTrips(UID, jwt.token)
          .then((data) => {
            if (data.error) {
              console.log(data.error);
            } else {
              console.log("Data", data);
              setLoading(false);
              setPastTrips(data);
              
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
    useEffect(() => {
        console.log("caching past trips....")
        getPastTripsOfUser(); 
    }, [])
    return (
        <PastTripContext.Provider value={[pastTrips,setPastTrips]}>
            {props.children}
        </PastTripContext.Provider>
    )
}

