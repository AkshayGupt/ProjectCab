import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { signInUser, signUpUser, authenticate } from "../Auth/helper";
import { forgotUserPassword } from "./helper";
import Loading from "../../Loading/Loading";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import SlideShow from "./SlideShow";
import "./Landing.css";
import NavBar from "../NavBar/NavBar";
import { ProfileProvider } from "../Context/ProfileProvider";
import GuestNavBar from "../NavBar/GuestNavBar";
import {isAuthenticated} from '../Auth/helper';
const Landing = () => {
  const [newUser, setNewUser] = useState(false);
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    retypedPassword: "",
    success: false,
    error: "",
  });
  const [signInData, setSignInData] = useState({
    email: "test@hotmail.com",
    password: "12345678",
    error: "",
  });
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [forgotPasswordModalShow, setForgotPasswordModalShow] = useState(false);

  const handleSignInChange = (name) => (event) => {
    setSignInData({ ...signInData, [name]: event.target.value });
  };
  const handleSignUpChange = (name) => (event) => {
    setSignUpData({ ...signUpData, [name]: event.target.value });
  };

  const handleForgotPasswordEmailChange = (name) => (event) => {
    setForgotPasswordEmail({
      ...forgotPasswordEmail,
      [name]: event.target.value,
    });
  };

  const handleForgotPasswordEmailSubmit = () => {
    forgotUserPassword({ email: forgotPasswordEmail }).then((data) => {
      if (data.error) {
        setForgotPasswordEmail("");
        setForgotPasswordModalShow(false);
        setForgotPasswordError(data.error);
        setTimeout(() => setForgotPasswordError(""), 5000);
      } else {
        setForgotPasswordEmail("");
        setForgotPasswordModalShow(false);
        setForgotPasswordSuccess(true);
        setTimeout(() => setForgotPasswordSuccess(false), 5000);
      }
    });
  };

  const redirectToHomePage = () => {
    if (redirect) {
      return <Redirect to="/dashboard" />;
    }
  };

  const loadingMessage = () => {
    return loading && <Loading />;
  };

  const signin = () => {
    setLoading(true);
    const { email, password } = signInData;
    signInUser({ email, password })
      .then((data) => {
        if (data.error) {
          setLoading(false);
          setSignInData({
            ...signInData,
            error: data.error,
          });
          setTimeout(() => setSignInData({ ...signInData, error: "" }), 3000);
        } else {
          console.log(data);

          authenticate(data, () => {
            setLoading(false);
            setRedirect(true);
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const signup = () => {
    const signUpCred = signUpData;
    delete signUpCred.retypedPassword;
    signUpUser(signUpCred)
      .then((data) => {
        if (data.error) {
          setSignUpData({
            ...signUpData,
            error: data.error,
          });
          setTimeout(() => setSignUpData({ ...signUpData, error: "" }), 5000);
        } else {
          setSignUpData({
            ...signUpData,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            retypedPassword: "",
            success: true,
          });
          setTimeout(
            () => setSignUpData({ ...signUpData, success: false }),
            9000
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {redirectToHomePage()}
      {loadingMessage()}
      {/* <ProfileProvider> */}
      <GuestNavBar/> 
        {/* <NavBar /> */}
        <div className="container">
          <Row style={{ marginTop: "2rem" }} className="mx-auto ">
            <Col md lg="6" className="image mb-5 ">
              <div className="mx-auto">
                <SlideShow />
              </div>
            </Col>
            <Col
              md="12"
              lg="6"
              className="border-left border-right border-top border-bottom mb-3 shadow rounded "
            >
              <div className="d-flex justify-content-around py-3">
                <h5
                  className={newUser ? "btn btn-light" : "btn btn-info px-4"}
                  onClick={() => {
                    setNewUser(false);
                  }}
                >
                  SignIn
                </h5>
                <h5
                  className={!newUser ? "btn btn-light" : "btn btn-info px-4"}
                  onClick={() => {
                    setNewUser(true);
                  }}
                >
                  SignUp
                </h5>
              </div>
              <div
                style={{ height: "auto", width: "100%" }}
                className="p-3 mx-auto "
              >
                {newUser ? (
                  <SignUp
                    signUpData={signUpData}
                    handleSignUpChange={handleSignUpChange}
                    signup={signup}
                    setNewUser={setNewUser}
                  />
                ) : (
                  <SignIn
                    signInData={signInData}
                    forgotPasswordError={forgotPasswordError}
                    forgotPasswordSuccess={forgotPasswordSuccess}
                    forgotPasswordModalShow={forgotPasswordModalShow}
                    handleSignInChange={handleSignInChange}
                    setForgotPasswordEmail={setForgotPasswordEmail}
                    handleForgotPasswordEmailChange={
                      handleForgotPasswordEmailChange
                    }
                    handleForgotPasswordEmailSubmit={
                      handleForgotPasswordEmailSubmit
                    }
                    signin={signin}
                    setForgotPasswordModalShow={setForgotPasswordModalShow}
                  />
                )}
              </div>
            </Col>
          </Row>
        </div>
      {/* </ProfileProvider> */}
    </>
  );
};
export default Landing;
