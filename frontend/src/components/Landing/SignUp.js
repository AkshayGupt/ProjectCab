import React from 'react';
import {Form } from "react-bootstrap";

const SignUp = ({handleSignUpChange,signUpData,setNewUser,signup}) => {

    const signUpSuccessMessage = () => {
        return (
          <div className="row">
            <div className="col-md-12 ">
              <div
                className="alert alert-success"
                style={{ display: signUpData.success ? "" : "none" }}
              >
                <p>Activation Link Sent to your account!</p>
                <p className="font-weight-bold">Please Verify.</p>
              </div>
            </div>
          </div>
        );
      };
      const signUpErrorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-12 ">
              <div
                className="alert alert-danger"
                style={{ display: signUpData.error ? "" : "none" }}
              >
                <p>{signUpData.error}</p>
              </div>
            </div>
          </div>
        );
      };

    return (
        <div>
        {signUpSuccessMessage()}
        {signUpErrorMessage()}
        <Form style={{ width: "auto", height: "auto" }}>
          <h1 className="text-center pb-5">Sign Up</h1>
          <Form.Group>
            <Form.Label>FirstName</Form.Label>
            <Form.Control
              type="firstname"
              name="firstname"
              id="firstname"
              value={signUpData.firstName}
              placeholder="Your first name"
              onChange={handleSignUpChange("firstName")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>LastName</Form.Label>
            <Form.Control
              type="lastname"
              name="lastname"
              id="lastname"
              value={signUpData.lastName}
              placeholder="Your last name"
              onChange={handleSignUpChange("lastName")}
            />
          </Form.Group>
          <Form.Group>
                    <Form.Label>
                      Gender 
                    </Form.Label>
                    <Form.Control
                      as="select"
                      value={signUpData.gender}
                      onChange={handleSignUpChange("gender")}
                    >
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                      <option value="0">Others</option>
                    </Form.Control>
                  </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              value={signUpData.email}
              placeholder="abc@xyz.com"
              onChange={handleSignUpChange("email")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              value={signUpData.password}
              placeholder="Enter password"
              onChange={handleSignUpChange("password")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="retyped-password"
              id="retyped-password"
              value={signUpData.retypedPassword}
              placeholder="Re-enter password"
              onChange={handleSignUpChange("retypedPassword")}
            />
          </Form.Group>
          <div className="text-center">
            {signUpData.password === signUpData.retypedPassword ? (
              <p className="btn btn-info btn-md" onClick={() => signup()}>
                Submit{" "}
              </p>
            ) : (
              <p className="text-danger">Password does not match ! </p>
            )}
          </div>
        </Form>
        <h6>
          Already have an account ?
          <a
            href="#"
            className="text-primary"
            onClick={() => setNewUser(false)}
          >
            {" "}
            signin here
          </a>
        </h6>   
        </div>
    )
}

export default SignUp
