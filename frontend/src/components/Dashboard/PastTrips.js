import React, { useState, useEffect, useContext } from "react";
import TripCard from "./TripCard";
import "./Trip.css";
import { getPastTrips } from "./helper";
import moment from "moment";
import { Row, Col, Container } from "react-bootstrap";
import { PastTripContext } from "../Context/PastTripProvider";

const PastTrips = () => {

  const {userPastTrips,isLoading} = useContext(PastTripContext);

  const [pastTrips, setPastTrips] = userPastTrips;
  const [loading, setLoading]=isLoading;

  const pastTripCardElements =
    pastTrips.length > 0 &&
    pastTrips.map((trip) => {
      let {
        _id,
        source,
        destination,
        members,
        startTime,
        endTime,
        genderAllowed,
      } = trip;
      return (
        <Col md="12 text-center mb-2" lg="6">
          <TripCard
            trip={{
              source: source,
              destination: destination,
              members: members,
              start: startTime,
              end: endTime,
              gender: genderAllowed,
              tripId: _id,
              status: "Completed",
            }}
            key={_id}
          />
        </Col>
      );
    });

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h1 className="my-5 text-center">Past Trips</h1>
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
                    {pastTrips.length > 0 && pastTripCardElements}
                    {pastTrips.length == 0 && (
                      <h5 className="text-center mx-auto">
                        It seems you have no past trips !
                      </h5>
                    )}
                  </Row>
                </>
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PastTrips;
