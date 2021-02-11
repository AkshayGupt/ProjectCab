import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Nav, Navbar, Button, FormControl, Form } from "react-bootstrap";
import LoginWithGoogle from "../Navigation/Navigation";
import "./Navigation.css";
import { signOut, isSignedIn, isAuthenticated } from "../Auth/helper";
const Navigation = () => {
  const [redirect, setRedirect] = useState(false);
  const signout = () => {
    signOut();
    setRedirect(true);
  };

  const redirectToLandingPage = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  return (
    <div>
      {redirectToLandingPage()}
      <nav className="navbar bg-light">
        <a className="navbar-brand text-dark text-bold" href="/">
          <h3 style={{ fontStyle: "italic", fontFamily: "cursive" }}>
            Pool It
          </h3>
        </a>
        <div className="sign-in">
          <form className="form-inline">
            <div className="sign-in">
              {!isAuthenticated() ? (
                ""
              ) : (
                <div className="d-flex justify-content-center">
                  <p className="text-white mx-1 my-2 btn btn-dark ">
                    <a
                      href="/dashboard"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      {" "}
                      Dashboard{" "}
                      <i class="fa fa-television" aria-hidden="true"></i>
                    </a>
                  </p>
                  <p className="text-white mx-1 my-2 btn btn-dark ">
                    <a
                      href="/register"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      {" "}
                      New Trip <i class="fa fa-plus" aria-hidden="true"></i>
                    </a>
                  </p>
                  <p
                    className="text-light mx-1 my-2 btn btn-dark"
                    onClick={() => signout()}
                  >
                    Logout <i class="fa fa-sign-out" aria-hidden="true"></i>
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
