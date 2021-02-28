import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import cover from "./cover.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import GuestNavBar from "../NavBar/GuestNavBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Landing = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [redirect, setRedirect] = useState(false);

  /**
   * Route for dashboard on successful Login.
   */
  const redirectToHomePage = () => {
    if (redirect) {
      return <Redirect to="/dashboard" />;
    }
  };

  return (
    <>
      {redirectToHomePage()}
      <GuestNavBar />
      <Container fluid>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Row>
          <Col lg={6} className="d-none d-lg-block">
            <Image src={cover} style={{ height: "100vh" }} fluid />
          </Col>
          <Col>
            <div style={{ height: "20px" }}></div>
            {isNewUser ? (
              <SignUp setIsNewUser={setIsNewUser} />
            ) : (
              <SignIn setIsNewUser={setIsNewUser} setRedirect={setRedirect} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Landing;
