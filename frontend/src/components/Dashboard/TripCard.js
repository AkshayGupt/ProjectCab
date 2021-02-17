import React, { useState } from "react";
import { Modal, Button, Badge, Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import Profile from "../Profile/Profile";

const TripCard = ({ trip }) => {
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState("");
  const { source, destination, members, start, tripId, status } = trip;

  let timeLeft = 0,
    daysLeft = 0,
    hoursLeft = 0,
    minutesLeft = 0;
  let tripStatus = status;

  if (status === "Future") {
    timeLeft = moment(start).diff(moment(), "minutes");
    minutesLeft = (timeLeft + 1) % 60;
    timeLeft = timeLeft / 60;
    daysLeft = (timeLeft / 24) >> 0;
    hoursLeft = timeLeft % 24 >> 0;
    tripStatus = "";
    if (daysLeft !== 0) {
      tripStatus += "" + daysLeft + " days ";
    }
    if (hoursLeft !== 0) {
      tripStatus += "" + hoursLeft + " hours ";
    }
    if (minutesLeft !== 0) {
      tripStatus += "" + minutesLeft + " minutes ";
    }
    tripStatus += "left";
  }

  return (
    <div>
      <div
        className="card text-white bg-dark mb-3 ml-5 mx-auto shadow"
        style={{ width: "290px", height: "300px" }}
      >
        <div className="card-header text-light">
          <p>
            <i className="fa fa-home mt-2" aria-hidden="true"></i> {source}
          </p>
          <p>
            <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
            {destination}
          </p>
          <p className="text-info ">
            <i class="fa fa-clock-o" aria-hidden="true"></i> {tripStatus}
          </p>
        </div>
        <div className="card-body bg-light">
          <p className="text-dark">
            <i class="fa fa-users" aria-hidden="true"></i> {members.length}
          </p>

          <p
            className="btn btn-sm btn-info p-2"
            onClick={() => setModalShow(true)}
          >
            View More
          </p>
          <p
            className={
              status === "Completed"
                ? "d-none"
                : "btn btn-sm btn-danger mx-1 p-2"
            }
            onClick={() => trip.cancelTrip(tripId)}
          >
            Cancel Trip
          </p>
          <Details
            trip={trip}
            show={modalShow}
            setUser={setUser}
            onHide={() => setModalShow(false)}
          />
          <div>
            <User userId={user} show={user !== ""} onHide={() => setUser("")} />
          </div>
        </div>
      </div>
    </div>
  );
};
const Details = (props) => {
  const [showProfileModal, setshowProfileModal] = useState(false);

  const trip = props.trip;
  const { source, destination, members, start, end, gender } = trip;
  const startDate = moment(start).format("MMMM Do YYYY").toString();
  const endDate = moment(end).format("MMMM Do YYYY").toString();
  const startTime = moment(start).format("h:mm a").toString();
  const endTime = moment(end).format("h:mm a").toString();
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {source} - {destination}
          </Modal.Title>{" "}
          <Badge variant="info ml-3">
            {gender === "0"
              ? "Any"
              : gender === "1"
              ? "Male only"
              : gender === "2"
              ? "Female only"
              : ""}
          </Badge>{" "}
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md="12" lg="6">
                <h6 className="text-center mb-3">Members : {members.length}</h6>
                {members.map((member) => {
                  return (
                    <div className="mb-1">
                      <a
                        href="#"
                        key={member._id}
                        className="text-dark"
                        onClick={() => props.setUser(member._id)}
                      >
                        <i class="fa fa-user" aria-hidden="true"></i>{" "}
                        {member.firstName} {member.lastName}
                      </a>
                    </div>
                  );
                })}
              </Col>
              <Col md="12" lg="6">
                <h6 className="card-title text-dark text-center mb-3">
                  Duration
                  <i
                    style={{ fontSize: "20px",marginLeft:"10px" }}
                    className="fa fa-clock-o"
                    aria-hidden="true"
                  />
                </h6>
                <p className="text-dark">{startDate + ", " + startTime}</p>
                <p className="text-dark" style={{ marginBottom: "0px" }}>
                  {endDate + ", " + endTime}
                </p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const User = (props) => {
  console.log(props.userId);
  return (
    <Modal {...props} size="xl" centered>
      <Profile userId={props.userId} />
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TripCard;
