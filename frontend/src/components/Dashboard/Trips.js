import React, { useState, useContext } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "./Trip.css";
import { Row, Col, Container } from "react-bootstrap";
import TripCard from "./TripCard";
import { getFutureTrips, getOngoingTrips, cancelTheTrip } from "./helper";
import Timeline from "./Timeline";
import { TripContext } from "../Context/TripProvider";

const Trips = () => {
  const {
    userFutureTrips,
    userOngoingTrips,
    userDates,
    isLoading,
    refresh,
  } = useContext(TripContext);

  const [value, onChange] = useState(new Date());
  const [loading, setLoading] = isLoading;
  const [futureTrips, setFutureTrips] = userFutureTrips;
  const [ongoingTrips, setOngoingTrips] = userOngoingTrips;
  const [dates, setDates] = userDates;
  const [refreshTrips, setRefreshTrips] = refresh;

  const getTrips = () => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    // console.log("Data from Trips", jwt.token);
    const UID = jwt.user._id;
    getFutureTrips(UID, jwt.token)
      .then((data) => {
        if (data.error) {
          // console.log(data.error);
        } else {
          // console.log("Data", data);
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
        // console.log(err);
      });

    getOngoingTrips(UID, jwt.token)
      .then((data) => {
        if (data.error) {
          // console.log(data.error);
        } else {
          // console.log("Data", data);
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
        // console.log(err);
      });
  };

  const cancelTrip = (tripId) => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const { user, token } = jwt;

    cancelTheTrip(user._id, token, tripId).then((data) => {
      if (data.error) {
        // console.log(data.error);
      } else {
        setRefreshTrips(true);
      }
    });
  };

  const futureTripCardElements =
    futureTrips.length > 0 &&
    futureTrips.map((trip) => {
      let {
        source,
        destination,
        members,
        startTime,
        endTime,
        genderAllowed,
        _id,
      } = trip;

      return (
        <Col md="12 text-center mb-2" lg="6" key={_id}>
          <TripCard
            trip={{
              source: source,
              destination: destination,
              members: members,
              start: startTime,
              end: endTime,
              gender: genderAllowed,
              tripId: _id,
              cancelTrip: cancelTrip,
              status: "Future",
            }}
          />
        </Col>
      );
    });
  const ongoingTripCardElements =
    ongoingTrips.length > 0 &&
    ongoingTrips.map((trip) => {
      let {
        source,
        destination,
        members,
        startTime,
        endTime,
        genderAllowed,
        _id,
      } = trip;

      return (
        <Col md="12 text-center mb-2" lg="6">
          <TripCard
            key={_id}
            trip={{
              source: source,
              destination: destination,
              members: members,
              start: startTime,
              end: endTime,
              gender: genderAllowed,
              tripId: _id,
              status: "ONGOING",
            }}
          />
        </Col>
      );
    });

  const forceReload = () => {
    setLoading(true);
    getTrips();
  };

  return (
    <div className="mx-auto mt-5" style={{ marginBottom: "100px" }}>
      <Row>
        <Col md="12" lg="8" className="border-right">
          <h1 className="text-center mb-5 ">Trips</h1>
          <div>
            <Container>
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
                        <h2 className="my-5">
                          <i
                            className="fa fa-caret-right"
                            aria-hidden="true"
                          ></i>{" "}
                          {"  "}Ongoing Trips{" "}
                          <a
                            href="#"
                            style={{ float: "right", marginRight: "" }}
                            onClick={() => forceReload()}
                          >
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                          </a>
                        </h2>

                        <Row>
                          {ongoingTrips.length > 0 && ongoingTripCardElements}
                          {ongoingTrips.length == 0 && (
                            <h5 className="text-center mx-auto">
                              It seems you have no ongoing trips !
                            </h5>
                          )}
                        </Row>

                        {futureTrips.length > 0 && (
                          <h2 className="my-5">
                            {" "}
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            ></i>{" "}
                            {"  "}Upcoming Trips
                          </h2>
                        )}
                        <Row>
                          {futureTrips.length > 0 && futureTripCardElements}
                          {/* {futureTrips.length == 0 && (
                            <h5 className="text-center mx-auto">
                              It seems you have not created a trip yet !
                            </h5>
                          )} */}
                        </Row>
                      </>
                    )}
                  </Container>
                </Col>
              </Row>
            </Container>
          </div>
          {!loading && futureTrips.length > 0 && (
            <>
              <h2 className="text-center my-5">Timeline</h2>
              <Timeline trips={futureTrips}></Timeline>
            </>
          )}
        </Col>
        <Col md="12" lg="4">
          {!loading && futureTrips.length > 0 && (
            <>
              <h1 className="text-center mb-5 mx-auto">
                <i className="fa fa-calendar" aria-hidden="true"></i>
              </h1>
              <Calendar
                className=" mx-auto"
                style={{ height: "400" }}
                onChange={onChange}
                value={value}
                tileClassName={({ date, view }) => {
                  if (
                    dates.find((x) => x === moment(date).format("DD-MM-YYYY"))
                  ) {
                    return "highlight";
                  }
                }}
                tileDisabled={({ date }) => date.getDay() === 0}
                minDate={new Date()}
              />
            </>
          )}
        </Col>
        <Col md lg="1"></Col>
      </Row>
    </div>
  );
};

export default Trips;
