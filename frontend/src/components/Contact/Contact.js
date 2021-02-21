import React, { useState } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Image,
  Navbar,
} from "react-bootstrap";
import "./Contact.css";
import GuestNavBar from "../NavBar/GuestNavBar";
import ic from "./iconContact2.svg";
import { sendUserMessage } from "./helper";
const Contact = ({ showNavbar = true }) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    success: false,
    error: "",
  });

  const { firstName, lastName, email, message, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    sendUserMessage({ firstName, lastName, email, message }).then((data) => {
      if (data.error) {
        let error = "";
        if (Array.isArray(data.error)) {
          error = data.error[0];
        } else {
          error = data.error;
        }
        // console.log(data.error);
        setValues({ ...values, error: error });
        setTimeout(() => {
          setValues({ ...values, error: "" });
        }, 5000);
      } else {
        setValues({
          ...values,
          firstName: "",
          lastName: "",
          email: "",
          message: "",
          success: true,
        });

        setTimeout(() => {
          setValues({ ...values, success: false });
        }, 5000);
      }
    });
  };

  /**
   * Display Success Message
   */
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-12 ">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            <p>
              <i
                style={{ fontSize: "30px" }}
                class="fa fa-check"
                aria-hidden="true"
              ></i>
              <span style={{ fontSize: "20px", marginLeft: "2px" }}>
                {" "}
                Message sent successfully.
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  };
  /**
   * Display Error Message
   */
  const errorMessage = () => {
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
              ></i>
              <span style={{ fontSize: "20px", marginLeft: "12px" }}>
                {error}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {showNavbar && <GuestNavBar />}
      <Row className="custom-padding">
        <Col className="d-none d-lg-block m-auto">
          <img
            src={ic}
            className="contact-img"
            style={{ height: "50vh", width: "60%", marginLeft: "20%" }}
          />
        </Col>
        <Col className="my-auto">
          <Container>
            <Form>
              {successMessage()}
              {errorMessage()}
              <h1 className="">Get in touch</h1>
              <div className="subtitle">
                <h6>Have an inquiry or some feedback for us?</h6>
                <h6>Fill out the form below to contact our team.</h6>
              </div>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={handleChange("firstName")}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={handleChange("lastName")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Email Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="john@doe.com"
                  value={email}
                  onChange={handleChange("email")}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Hello, I just wanted to report an error..."
                  value={message}
                  onChange={handleChange("message")}
                />
              </Form.Group>
            </Form>
            <p
              className="btn btn-info btn-md "
              type="submit"
              onClick={() => handleSubmit()}
            >
              Get in touch
            </p>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default Contact;
