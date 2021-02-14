import React from 'react'
import { Form } from "react-bootstrap";
import ForgotPassword from './ForgotPassword';
const SignIn = ({
    signInData,
    signin,
    setNewUser,
    handleSignInChange,
    handleForgotPasswordEmailChange,
    handleForgotPasswordEmailSubmit,
    forgotPasswordModalShow,
    forgotPasswordError,
    forgotPasswordSuccess,
    setForgotPasswordEmail,
    forgotPasswordEmail,
    setForgotPasswordModalShow
}) => {
    const signInErrorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-12 offset">
              <div
                className="alert alert-danger"
                style={{ display: signInData.error ? "" : "none" }}
              >
                {signInData.error}
              </div>
            </div>
          </div>
        );
      };
      const forgotPasswordErrorMessge = () => {
        return (
          <div className="row">
            <div className="col-md-12 offset">
              <div
                className="alert alert-danger"
                style={{ display: forgotPasswordError ? "" : "none" }}
              >
                {forgotPasswordError}
              </div>
            </div>
          </div>
        );
      };
      const forgotPasswordSucessMessge = () => {
        return (
          <div className="row">
            <div className="col-md-12 offset">
              <div
                className="alert alert-success"
                style={{ display: forgotPasswordSuccess ? "" : "none" }}
              >
                <p>Password reset Link sent to your account!</p>
                <p className="font-weight-bold">Please follow the instructions.</p>
              </div>
            </div>
          </div>
        );
      };

    return (
        <div>
          {signInErrorMessage()}
          {forgotPasswordErrorMessge()}
          {forgotPasswordSucessMessge()}
         
          <Form style={{ width: "auto", height: "auto" }}>
            <h1 className="text-center pb-5">Sign In</h1>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={signInData.email}
                id="email"
                placeholder="abc@xyz.com"
                onChange={handleSignInChange("email")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password </Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                value={signInData.password}
                placeholder="Enter password"
                onChange={handleSignInChange("password")}
              />
            </Form.Group>
            <a href="#" className="" onClick={()=>setForgotPasswordModalShow(true)}>
              Forgot Password?
            </a>
            <div className="text-center ">
              <p className="btn btn-info btn-md" onClick={() => signin()}>
                Submit
              </p>
            </div>
          </Form>
  
          <h6>
            Don't have an account ?
            <a href="#" className="text-primary" onClick={() => setNewUser(true)}>
              {" "}
              signup here
            </a>
          </h6>
          <ForgotPassword
              show={forgotPasswordModalShow}
              forgotPasswordEmail={forgotPasswordEmail}
              onHide={() => setForgotPasswordModalShow(false)}
              handleForgotPasswordEmailChange={handleForgotPasswordEmailChange}
              handleForgotPasswordEmailSubmit={handleForgotPasswordEmailSubmit}
              setForgotPasswordEmail={setForgotPasswordEmail}
          />
        </div>
      );
}

export default SignIn
