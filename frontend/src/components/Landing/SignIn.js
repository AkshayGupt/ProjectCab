import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { authenticate, signInUser } from "../Auth/helper";
import { toast } from "react-toastify";
import { forgotUserPassword } from "./helper";

const SignIn = ({ setIsNewUser, setRedirect }) => {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [hasForgottenPassword, setHasForgottenPassword] = useState(false);
  const [error, setError] = useState({
    hasError: false,
    error: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
    setSignInData({ ...signInData, [name]: event.target.value });
  };

  /**
   * Sign in user and display appropriate error.
   */
  const onSignIn = () => {
    setIsLoading(true);
    const { email, password } = signInData;
    signInUser({ email, password })
      .then((data) => {
        setIsLoading(false);
        if (data.error) {
          setError({ ...error, hasError: true, error: data.error });
        } else {
          authenticate(data, () => {
            setRedirect(true);
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        showToast("ERROR", "Some error occured. Try again later.");
      });
  };

  /**
   * Call 'forgotUserPassword' to send email for resetting password.
   */
  const onResetPassword = () => {
    setIsLoading(true);
    forgotUserPassword({ email: signInData.email })
      .then((data) => {
        if (data.error) {
          setIsLoading(false);
          setError({ ...error, hasError: true, error: data.error });
        } else {
          setIsLoading(false);
          showToast("SUCCESS", "Email sent successfully!");
          setIsNewUser(false);
          setHasForgottenPassword(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        showToast("ERROR", err);
      });
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
   * Display Top Row containing title and switch for Sign up/Reset password.
   */
  const TopRow = () => {
    if (hasForgottenPassword) {
      return (
        <Col>
          <div style={{ marginTop: "15%" }} />
          <Row>
            <h1
              type="button"
              className="fa fa-arrow-left"
              style={{ fontSize: "20px", color: "#0084ff" }}
              onClick={() => {
                if (!isLoading) {
                  setError({ ...error, hasError: false });
                  setHasForgottenPassword(false);
                }
              }}
            ></h1>
          </Row>
          <Row>
            <h1 style={{ fontWeight: "bold" }}>Forgot your password?</h1>
          </Row>
          <Row>
            <h6 style={{ color: "grey", marginBottom: "30px" }}>
              Don't Worry! Enter your e-mail address below. We will send you an
              email with instructions to reset your password.
            </h6>
          </Row>
        </Col>
      );
    } else {
      return (
        <Col style={{ marginBottom: "5%" }}>
          <div style={{ marginTop: "15%" }} />
          <Row>
            <h1 style={{ fontWeight: "bold" }}>Sign in to Poolify.</h1>
          </Row>
          <Row>
            <h5 style={{ color: "grey" }}>New User?</h5>
            <h5
              type="button"
              style={{ color: "#0084ff", marginLeft: "10px" }}
              onClick={() => {
                if (!isLoading) setIsNewUser(true);
              }}
            >
              Sign up
            </h5>
          </Row>
        </Col>
      );
    }
  };

  return (
    <Col lg={7}>
      <Container>
        <TopRow />
        <ErrorMessage />
        {hasForgottenPassword ? (
          <Form>
            <Form.Group>
              <Form.Label>
                <h5 style={{ color: "grey", fontWeight: "600" }}>E-mail</h5>
              </Form.Label>
              <Form.Control
                style={{ height: "60px" }}
                type="email"
                name="email"
                id="email"
                value={signInData.email}
                placeholder="test@hotmail.com"
                onChange={handleChange("email")}
                disabled={isLoading}
                required
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
              <Button size="lg" onClick={onResetPassword} block>
                Submit
              </Button>
            )}
          </Form>
        ) : (
          <Form>
            <Form.Group>
              <Form.Label>
                <h5 style={{ color: "grey", fontWeight: "600" }}>E-mail</h5>
              </Form.Label>
              <Form.Control
                style={{ height: "60px" }}
                type="email"
                name="email"
                id="email"
                value={signInData.email}
                placeholder="test@hotmail.com"
                onChange={handleChange("email")}
                required
                disabled={isLoading}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <h5 style={{ color: "grey", fontWeight: "600" }}>Password</h5>
              </Form.Label>
              <Form.Control
                style={{ height: "60px" }}
                type="password"
                name="password"
                id="password"
                value={signInData.password}
                placeholder="P@ssw)rd123"
                onChange={handleChange("password")}
                required
                disabled={isLoading}
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
              <Button size="lg" onClick={onSignIn} block>
                Sign In
              </Button>
            )}
            <h6
              type="button"
              style={{ marginTop: "25px", color: "#0084ff" }}
              onClick={() => {
                if (!isLoading) {
                  setError({ ...error, hasError: false });
                  setHasForgottenPassword(true);
                }
              }}
            >
              Forgot Password?
            </h6>
          </Form>
        )}
      </Container>
    </Col>
  );
};

export default SignIn;
