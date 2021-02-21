import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { signUpUser } from "../Auth/helper";

const SignUp = ({ setIsNewUser }) => {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "1",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    hasError: false,
    error: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasAcceptedtc, setHasAcceptedtc] = useState(false);

  /**
   * Display a 3s Toast on the top right corner of the screen
   * @param {string} status - SUCCESS/ ERROR
   * @param {string} message - Text for the Toast Body
   */
  const showToast = (status, message) => {
    if (status == "SUCCESS") toast.success(message);
    else toast.error(message);
  };

  const handleChange = (name) => (event) => {
    setError({ ...error, hasError: false });
    setSignUpData({ ...signUpData, [name]: event.target.value });
  };

  const handleGenderChange = (event) => {
    setError({ ...error, hasError: false });
    var value = "1";
    if (event.target.value === "Male") {
      value = "1";
    } else if (event.target.value === "Female") {
      value = "2";
    } else value = "0";

    setSignUpData({ ...signUpData, gender: value });
  };

  /**
   * Surface level validation for fields.
   */
  const fieldValidation = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signUpData;
    if (firstName === "") {
      setError({
        ...error,
        hasError: true,
        error: "First Name cannot be empty.",
      });
      return false;
    } else if (lastName === "") {
      setError({
        ...error,
        hasError: true,
        error: "Last Name cannot be empty.",
      });
      return false;
    } else if (email === "") {
      setError({
        ...error,
        hasError: true,
        error: "Email cannot be empty.",
      });
      return false;
    } else if (password === "") {
      setError({
        ...error,
        hasError: true,
        error: "Password cannot be empty.",
      });
      return false;
    } else if (password.length < 8) {
      setError({
        ...error,
        hasError: true,
        error: "Password must contain at least 8 characters.",
      });
      return false;
    } else if (confirmPassword !== password) {
      setError({
        ...error,
        hasError: true,
        error: "Passwords do not match.",
      });
      return false;
    } else if (!hasAcceptedtc) {
      setError({
        ...error,
        hasError: true,
        error: "Terms and conditions not accepted.",
      });
      return false;
    } else return true;
  };

  /**
   * Validate fields and sign up user.
   */
  const onSignUp = () => {
    setIsLoading(true);
    if (fieldValidation()) {
      const data = signUpData;
      delete data.confirmPassword;
      signUpUser(data)
        .then((data) => {
          if (data.error) {
            setIsLoading(false);
            setError({ ...error, hasError: true, error: data.error });
          } else {
            setIsLoading(false);
            showToast(
              "SUCCESS",
              "Verification Link sent to your email successfully."
            );
            setError({ ...error, hasError: false });
            setSignUpData({
              ...signUpData,
              firstName: "",
              lastName: "",
              email: "",
              gender: "1",
              password: "",
              confirmPassword: "",
            });
            setIsNewUser(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          showToast("ERROR", "Cannot process request at this time.");
        });
    } else {
      setIsLoading(false);
    }
  };

  /**
   * Display error banner.
   */
  const ErrorMessage = () => {
    return (
      error.hasError && (
        <div className="row">
          <div className="col-md-12 offset">
            <div className="alert alert-danger">{error.error}</div>
          </div>
        </div>
      )
    );
  };

  /**
   * Display Top Row containing title and switch for Sign In.
   */
  const TopRow = () => {
    return (
      <Col style={{ marginBottom: "5%" }}>
        <div style={{ marginTop: "8%" }} />
        <Row>
          <h1 style={{ fontWeight: "bold" }}>Sign up to Poolify.</h1>
        </Row>
        <Row>
          <h5 style={{ color: "grey" }}>Already a member?</h5>
          <h5
            type="button"
            style={{ color: "#0084ff", marginLeft: "10px" }}
            onClick={() => {
              if (!isLoading) setIsNewUser(false);
            }}
          >
            Sign In
          </h5>
        </Row>
      </Col>
    );
  };

  return (
    <Col lg={8}>
      <Container>
        <TopRow />
        <ErrorMessage />
        <Form>
          <Row>
            <Col sm={12} md={6} lg={6}>
              <Form.Group controlId="name">
                <Form.Label>
                  <h5 style={{ color: "grey", fontWeight: "600" }}>
                    First Name
                  </h5>
                </Form.Label>
                <Form.Control
                  style={{ height: "60px" }}
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={signUpData.firstName}
                  placeholder="John"
                  onChange={handleChange("firstName")}
                  required
                  disabled={isLoading}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="name">
                <Form.Label>
                  <h5 style={{ color: "grey", fontWeight: "600" }}>
                    Last Name
                  </h5>
                </Form.Label>
                <Form.Control
                  style={{ height: "60px" }}
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={signUpData.lastName}
                  placeholder="Doe"
                  onChange={handleChange("lastName")}
                  required
                  disabled={isLoading}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Form.Group controlId="gender">
                <Form.Label>
                  <h5 style={{ color: "grey", fontWeight: "600" }}>Gender</h5>
                </Form.Label>
                <Form.Control
                  style={{ height: "60px" }}
                  as="select"
                  onChange={handleGenderChange}
                  custom
                  required
                  disabled={isLoading}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="email">
            <Form.Label>
              <h5 style={{ color: "grey", fontWeight: "600" }}>E-mail</h5>
            </Form.Label>
            <Form.Control
              style={{ height: "60px" }}
              type="email"
              name="email"
              id="email"
              value={signUpData.email}
              placeholder="john@doe.com"
              onChange={handleChange("email")}
              required
              disabled={isLoading}
            />
          </Form.Group>
          <Row>
            <Col sm={12} md={6} lg={6}>
              <Form.Group controlId="password">
                <Form.Label>
                  <h5 style={{ color: "grey", fontWeight: "600" }}>Password</h5>
                </Form.Label>
                <Form.Control
                  style={{ height: "60px" }}
                  type="password"
                  name="password"
                  id="password"
                  value={signUpData.password}
                  placeholder="P@ssw)rd123"
                  onChange={handleChange("password")}
                  required
                  disabled={isLoading}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>
                  <h5 style={{ color: "grey", fontWeight: "600" }}>
                    Confirm Password
                  </h5>
                </Form.Label>
                <Form.Control
                  style={{ height: "60px" }}
                  type="password"
                  name="password"
                  id="password"
                  value={signUpData.confirmPassword}
                  placeholder="P@ssw)rd123"
                  onChange={handleChange("confirmPassword")}
                  required
                  disabled={isLoading}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Check
              custom
              type="checkbox"
              id="checkbox"
              value={hasAcceptedtc}
              onChange={() => {
                setError({ ...error, hasError: false });
                setHasAcceptedtc(!hasAcceptedtc);
              }}
              label={
                <span>
                  I agree to the{" "}
                  <a
                    href="/termsandconditions"
                    style={{ color: "#0084ff" }}
                    target="_blank"
                  >
                    Terms and Conditions.
                  </a>
                </span>
              }
            />
          </Form.Group>
          {isLoading ? (
            <Button size="lg" block>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </Button>
          ) : (
            <Button size="lg" onClick={onSignUp} block>
              Sign Up
            </Button>
          )}
        </Form>
      </Container>
    </Col>
  );
};

export default SignUp;
