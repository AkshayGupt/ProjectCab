import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

// import { Modal, Button, Badge, Container, Row, Col } from "react-bootstrap";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Badge,
  Spinner,
  Modal,
  Nav,
} from "react-bootstrap";
import "./Register.css";
import TimeSlot from "./TimeSlot";
import Confirm from "./Confirm";
import { createNewTrip } from "./helper";
import NavBar from "../NavBar/NavBar";
import TermsAndConditions from "../Others/TermsAndConditions";
import { CurrentPageContext } from "../Context/CurrentPageProvider";
const Register = () => {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useContext(CurrentPageContext);

  const [values, setValues] = useState({
    source: "Manipal University Jaipur",
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
      setValues({ error: "Please fill all the entries first!" });
      setTimeout(() => {
        setValues({
          ...values,
          error: "",
        });
      }, 3000);
      return;
    }

    if (source === destination) {
      setValues({ error: "Source and Destination cannot be same." });
      setTimeout(() => {
        setValues({
          ...values,
          error: "",
        });
      }, 3000);
      return;
    }

    if (!agreeToTerms) {
      setModalShow(true);
    }

    if (agreeToTerms) {
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

      // console.log(obj);
      const jwt = JSON.parse(localStorage.getItem("jwt"));
      createNewTrip(obj, jwt.token).then((data) => {
        if (data.error) {
          setValues({ error: data.error });
          setTimeout(() => {
            setValues({
              source: "Manipal Jaipur",
              destination: "Select",
              cabSize: 2,
              genderAllowed: 0,
              error: "",
              startTime: "",
              endTime: "",
              success: false,
            });
            setStart({
              date: 0,
              month: 0,
              year: 0,
              hours: 0,
              minutes: 0,
              seconds: 0,
            });
            setEnd({
              date: 0,
              month: 0,
              year: 0,
              hours: 0,
              minutes: 0,
              seconds: 0,
            });
            setAgreeToTerms(false);
          }, 3000);
        } else {
          setValues({ ...values, success: true });
        }
      });
    }
  };
  const showErrorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-12 ">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            <p>
              <i
                style={{ fontSize: "30px" }}
                className="fa fa-times"
                aria-hidden="true"
              />
              {"   "}
              {error}
            </p>
          </div>
        </div>
      </div>
    );
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
        setCurrentPage("TRIPS");
      }, 2000);
      // return <Redirect to="/status"/>
    }
  };
  const register = () => {
    return (
      <div>
        <div className="body">
          <div className="mb-3">
            <h1 className="text-center register-heading">
              {" "}
              <h1
                className="text-center display-3 my-5 jumbotron mx-auto"
                style={{ maxWidth: "73vw" }}
              >
                Create new Trip
              </h1>
            </h1>
          </div>
          <TC
            show={modalShow}
            agreeToTerms={agreeToTerms}
            setModalShow={setModalShow}
            setAgreeToTerms={setAgreeToTerms}
            onHide={() => setModalShow(false)}
          />
          <Container>
            <Row>
              <Col sm="3"></Col>
              <Col>
                {showErrorMessage()}
                <Form>
                  <Form.Group>
                    <Form.Label>Source</Form.Label>
                    <Form.Control
                      as="select"
                      value={source}
                      onChange={handleChange("source")}
                    >
                      <option value="Manipal University Jaipur">
                        Manipal University Jaipur
                      </option>
                      <option value="Airport">Airport</option>
                      <option value="Railway Station">Railway Station</option>
                      <option value="Sindhi Camp">Sindhi Camp</option>
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
                      <option value="Manipal University Jaipur">
                        Manipal University Jaipur
                      </option>
                    </Form.Control>
                  </Form.Group>
                  {/* <Form.Group>
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
                  </Form.Group> */}
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

                      {JSON.parse(localStorage.getItem("jwt")).user.gender ===
                      1 ? (
                        <option value="1">Only male</option>
                      ) : (
                        <option value="2">Only female</option>
                      )}
                    </Form.Control>
                    <Form.Text>
                      **Selecting particular gender might lower the chances of
                      matching.
                    </Form.Text>
                  </Form.Group>
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
                      {agreeToTerms ? "Create Trip" : "Proceed"}
                    </Button>
                  )}
                </div>
                <small>** Maximum 8 people will be grouped together</small>
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
      {register()}
      {/* {confirm ? (
        <Confirm
          trip={{ source, destination, cabSize, genderAllowed, start, end }}
        />
      ) : (
       
      )} */}
    </div>
  );
};

export const TC = (props) => {
  const { agreeToTerms, setAgreeToTerms, modalShow, setModalShow } = props;

  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="text-center">
        <TermsAndConditions
          agreeToTerms={agreeToTerms}
          setAgreeToTerms={setAgreeToTerms}
          modalShow={modalShow}
          setModalShow={setModalShow}
          guest={false}
        />
      </Modal.Body>
    </Modal>
  );
};

export default Register;
