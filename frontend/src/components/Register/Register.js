import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Badge,
  Spinner,
  Nav,
} from "react-bootstrap";
import "./Register.css";
import TimeSlot from "./TimeSlot";
import Confirm from "./Confirm";
import { createNewTrip } from "./helper";
import NavBar from "../NavBar/NavBar";
const Register = () => {
  const [confirm, setConfirm] = useState(false);
  const [values, setValues] = useState({
    source: "Manipal Jaipur",
    destination: "Select",
    cabSize: 2,
    genderAllowed: 0,
    error: "",
    startTime: "",
    endTime: "",
    success: false,
  });
  const {
    source,
    destination,
    cabSize,
    genderAllowed,
    startTime,
    endTime,
    success,
    error,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const [start, setStart] = useState({
    date: 0,
    month: 0,
    year: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [end, setEnd] = useState({
    date: 0,
    month: 0,
    year: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function timeSlotValidator(slotTime) {
    const eveningTime = new Date(
      start.year,
      start.month - 1,
      start.date,
      start.hours,
      start.minutes,
      start.seconds
    );
    const isValid = slotTime.getTime() > eveningTime.getTime();
    return isValid;
  }

  const handleStart = (str) => {
    // console.log(str);
    var date = new Date(str);
    setValues({ ...values, error: false, startTime: date });
    const splitted = date.toString().split(" ");
    const time = splitted[4];
    const res = time.split(":");
    const hrs = parseInt(res[0]);
    const mins = parseInt(res[1]);
    const secs = parseInt(res[2]);
    var dt = new Date(str),
      mnth = ("0" + (dt.getMonth() + 1)).slice(-2),
      day = ("0" + dt.getDate()).slice(-2);
    setStart({
      month: parseInt(mnth),
      date: parseInt(day),
      year: date.getFullYear(),
      hours: hrs,
      minutes: mins,
      seconds: secs,
    });
  };

  const handleEnd = (str) => {
    var date = new Date(str);
    setValues({ ...values, error: false, endTime: date });
    const splitted = date.toString().split(" ");
    const time = splitted[4];
    const res = time.split(":");
    const hrs = parseInt(res[0]);
    const mins = parseInt(res[1]);
    const secs = parseInt(res[2]);
    var dt = new Date(str),
      mnth = ("0" + (dt.getMonth() + 1)).slice(-2),
      day = ("0" + dt.getDate()).slice(-2);
    setEnd({
      ...end,
      month: parseInt(mnth),
      date: parseInt(day),
      year: date.getFullYear(),
      hours: hrs,
      minutes: mins,
      seconds: secs,
    });
  };

  const onSubmit = () => {
    if (destination === "Select" || start.date === 0 || end.date === 0) {
      alert("Please fill all the entries!");
      return;
    }
    const minCapacity = cabSize;
    const members = [];
    const jwtTemp = JSON.parse(localStorage.getItem("jwt"));
    const UID = jwtTemp.user._id;
    members.push(UID);
    const obj = {
      source,
      destination,
      minCapacity,
      members,
      genderAllowed,
      startTime,
      endTime,
    };

    console.log(obj);
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    createNewTrip(obj, jwt.token).then((data) => {
      if (data.error) {
        console.log("Error" + data.error);
      } else {
        setValues({ ...values, success: true });
      }
    });
  };

  const onError = () => {
    if (error) {
      alert(error);
      return;
    }
  };
  const showSuccessMessage = () => {
    if (success) {
      return (
        <div>
          <div className="alert alert-success mt-3">
            <h4>Registered successfully!</h4>
            <h6>
              Redirecting{" "}
              <Spinner animation="border" role="status" size="sm">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </h6>
          </div>
        </div>
      );
    }
  };
  const onSuccessfulRegister = () => {
    if (success) {
      window.setTimeout(function () {
        // Move to a new location or you can do something else
        window.location.href = "http://localhost:3000/dashboard";
      }, 3000);
      // return <Redirect to="/status"/>
    }
  };
  const register = () => {
    return (
      <div>
        <NavBar />
        <div className="body">
          <div className="mb-3">
            <h1 className="text-center register-heading">
              {" "}
              <h1 className="text-center display-3">
                Create new Trip <i class="fa fa-pencil" aria-hidden="true"></i>
              </h1>
            </h1>
          </div>
          <Container>
            <Row>
              <Col sm="3">
                <div style={{ float: "right", margin: 10 }}>
                  <a href="/dashboard" className="btn btn-info btn-lg">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
                  </a>
                </div>
              </Col>
              <Col>
                <Form>
                  <Form.Group>
                    <Form.Label>Source</Form.Label>
                    <Form.Control
                      as="select"
                      value={source}
                      onChange={handleChange("source")}
                    >
                      <option value="Select">Manipal Jaipur</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Destination</Form.Label>
                    <Form.Control
                      as="select"
                      value={destination}
                      onChange={handleChange("destination")}
                    >
                      <option value="Select">Select</option>
                      <option value="Airport">Airport</option>
                      <option value="Railway station">Railway Station </option>
                      <option value="Sindhi camp">Sindhi Camp</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Minimum Cab size{" "}
                      <i class="fa fa-users" aria-hidden="true"></i>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      value={cabSize}
                      onChange={handleChange("cabSize")}
                    >
                      <option value="2">2</option>
                      <option value="4">4</option>
                      <option value="6">6</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Gender Allowed <i class="fa " aria-hidden="true"></i>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      value={genderAllowed}
                      onChange={handleChange("genderAllowed")}
                    >
                      <option value="0">Any</option>
                      <option value="1">Only male</option>
                      <option value="2">Only female</option>
                    </Form.Control>
                    <Form.Text>
                      **Selecting particular gender might lower the chances of
                      matching.
                    </Form.Text>
                  </Form.Group>
                  {/* <Form.Group>
                                <Form.Label>Other Gender allowed</Form.Label>
                                <Form.Control as="select" value={sameGender} onChange={handleChange("sameGender")}>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                   
                                </Form.Control>
                                <Form.Text>Please select No if you want to share your cab with same Gender</Form.Text>
                            </Form.Group> */}
                  <br></br>
                </Form>
                <h1 className="text-center">
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                </h1>{" "}
                <br />
                <div
                  className="d-flex justify-content-between p-3"
                  style={{ borderStyle: start.date != 0 ? "groove" : "" }}
                >
                  <div>
                    {start.date != 0 && (
                      <>
                        <h6>Start:</h6>
                        <p>
                          Date: {start.date}
                          {"-"}
                          {start.month}
                          {"-"}
                          {start.year}
                        </p>
                        <p>
                          Time: {start.hours}
                          {"hrs "}
                          {start.minutes}
                          {"mins "}
                          {start.seconds}secs
                        </p>
                      </>
                    )}
                  </div>
                  <div>
                    {end.date != 0 && (
                      <>
                        <h6>End:</h6>
                        <p>
                          Date: {end.date}
                          {"-"}
                          {end.month}
                          {"-"}
                          {end.year}
                        </p>
                        <p>
                          Time: {end.hours}
                          {"hrs "}
                          {end.minutes}
                          {"mins "}
                          {end.seconds}secs
                        </p>
                      </>
                    )}
                  </div>
                </div>
                {start.date == 0 ? (
                  <TimeSlot
                    text="Start Time"
                    handleEvent={handleStart}
                    time={start.date}
                  />
                ) : (
                  ""
                )}
                {start.date == 0 || end.date != 0 ? (
                  ""
                ) : (
                  <TimeSlot
                    text="End Time"
                    handleEvent={handleEnd}
                    timeSlotValidator={timeSlotValidator}
                    time={end.date}
                  />
                )}
                <div className="text-center">
                  {success ? (
                    <>{showSuccessMessage()} </>
                  ) : (
                    <Button
                      className="my-5"
                      variant="info"
                      size="lg"
                      onClick={() => onSubmit()}
                    >
                      Create Trip
                    </Button>
                  )}
                </div>
              </Col>
              <Col sm="3"></Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  };

  return (
    <div>
      {onSuccessfulRegister()}
      {confirm ? (
        <Confirm
          trip={{ source, destination, cabSize, genderAllowed, start, end }}
        />
      ) : (
        register()
      )}
    </div>
  );
};

export default Register;
