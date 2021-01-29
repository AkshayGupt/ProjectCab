import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "./Trip.css";
import { Row, Col, Container } from "react-bootstrap";
import TripCard from "./TripCard";
import { getTripsOfUser } from "./helper";
import Timeline from "./Timeline";

const Trips = () => {
  const [value, onChange] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState([]);
  const [dates, setDates] = useState([]);



  const getTrips = () => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    console.log("Data from Trips",jwt.token);
    const UID=jwt.user._id;
    getTripsOfUser(UID,jwt.token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("Data", data);
          setTrips(data);
          const date =new Date();
          let dates = [];
          {
            data.map((trip) => 
            {
              dates.push(moment(trip.startTime).format("DD-MM-YYYY"));
            });
          }
         
          setDates(dates);
         
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      getTrips();
    }, 1000);
  }, []);

  return (
    <div className="mx-auto mt-5">
      <Row>
        <Col md="12" lg="8" className="border-right">
          <h1 className="text-center mb-5 ">
            Trips{" "}
            <a href="/register">
              <i
                style={{ fontSize: "50px", marginLeft: "5px" }}
                className="fa fa-plus-square-o"
                aria-hidden="true"
              ></i>
            </a>
          </h1>
          <div>
            <Container >
              <Row>
                <Col>
                  <Container>
                    {loading ? (
                      <div>
                        <div md="mx-auto text-center mb-2">
                          <div className="wrapper text-center mx-auto">
                            <h4> </h4>
                            <div className="card-loader card-loader--tabs"></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                      <Row>
                        {trips.length > 0 &&
                          trips.map((tripp) => {
                            return (
                              <Col md="12 text-center mb-2" lg="6">
                                <TripCard
                                  trip={{
                                    source: tripp.source,
                                    destination: tripp.destination,
                                    members: tripp.members,
                                    start: tripp.startTime,
                                    end: tripp.endTime,
                                    gender: tripp.genderAllowed,
                                  }}
                                />
                              </Col>
                            );
                          })}
                        {trips.length == 0 && (
                          <h5  className="text-center mx-auto">It seems you have not created a trip yet !</h5>
                        )}
                      </Row>
                      </>
                    )}
                  </Container>
                </Col>
                {/* <Col sm="1"></Col> */}
              </Row>
            </Container>
          </div>
          {trips.length>0 && (
          <>
           <h1 className="text-center my-5">My Timeline</h1>
           <Timeline trips={trips}></Timeline>
           </>
      )}
        </Col>
        <Col md="12" lg="4">
         
          {trips.length>0 && (
          <>
           <h1 className="text-center mb-5 mx-auto">
            <i class="fa fa-calendar" aria-hidden="true"></i>
          </h1> 
           <Calendar
            className=" mx-auto"
            style={{ height: "400" }}
            onChange={onChange}
            value={value}
            tileClassName={({ date, view }) => {
              if (dates.find((x) => x === moment(date).format("DD-MM-YYYY"))) {
                return "highlight";
              }
            }}
            tileDisabled={({ date }) => date.getDay() === 0}
            minDate={new Date()}
          ></Calendar>
           </>
      )}
          
          
        </Col>
        <Col md lg="1"></Col>
      </Row>
     
     
    </div>
  );
};

export default Trips;
