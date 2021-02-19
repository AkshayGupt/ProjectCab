import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateUserPassword } from "./helper";

const Security = () => {
  const [oldPass, setOldPass] = useState({ oldPassword: "" });
  const [newPass, setNewPass] = useState({ newPassword: "" });
  const [reNewPass, setReNewPass] = useState({ reNewPassword: "" });
  const [showErrorStatus, setShowErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { oldPassword } = oldPass;
  const { newPassword } = newPass;
  const { reNewPassword } = reNewPass;

  /**
   * Display a 3s Toast on the top right corner of the screen
   * @param {string} status - SUCCESS/ERROR
   * @param {string} message - Text for the Toast Body
   */
  const showToast = (status, message) => {
    if (status == "SUCCESS") toast.success(message);
    else toast.error(message);
  };

  /**
   * Handle Form change in Old password.
   * @param {any} event - iputted value for old password
   */
  const handleOldPassChange = (event) => {
    setShowErrorStatus(false);
    setOldPass({ oldPassword: event.target.value });
  };

  /**
   * Handle form change in new password.
   * @param {any} event - Input value for New password
   */
  const handleNewPassChange = (event) => {
    setShowErrorStatus(false);
    setNewPass({ newPassword: event.target.value });
  };

  /**
   * Handle form change in confirm new password field.
   * @param {any} event - Input value in Re new Password
   */
  const handleReNewPassChange = (event) => {
    setShowErrorStatus(false);
    setReNewPass({ reNewPassword: event.target.value });
  };

  const fieldsValidation = () => {
    if (oldPassword === "") {
      setErrorMessage("Password cannot be empty.");
      return false;
    } else if (oldPassword === newPassword) {
      setErrorMessage("New password cannot be equal to the old password.");
      return false;
    } else if (newPassword.length < 8) {
      setErrorMessage(
        "Invalid Length! Password should be consist of atleast 8 characters."
      );
      return false;
    } else if (reNewPassword !== newPassword) {
      setErrorMessage("PASSWORDS DO NOT MATCH!");
      return false;
    } else {
      return true;
    }
  };

  /**
   * Check if newPass and confirmnewPass follow basic rules.
   * Then, call API to update the user password.
   */
  const onSubmitUserPassword = () => {
    // ! TODO: NEEDS STATUS BAR SUPPORT

    console.log(oldPass);
    console.log(newPass);

    console.log(oldPassword);
    console.log(newPassword);

    if (fieldsValidation() === false) {
      setShowErrorStatus(true);
    } else {
      const jwt = JSON.parse(localStorage.getItem("jwt"));
      const { user, token } = jwt;

      updateUserPassword(user._id, token, oldPassword, newPassword)
        .then((data) => {
          if (data.error) {
            showToast("ERROR", "Could not change password!");
            console.log(data.error);
          } else {
            setNewPass("");
            setOldPass("");
            setReNewPass("");
            showToast("SUCCESS", "Password changed successfully!");
          }
        })
        .catch((err) => {
          showToast("ERROR", "Could not change passsword!");
          console.log(err);
        });
    }
  };

  return (
    <Container fluid>
      <h3 className="my-3">Change Password</h3>
      {showErrorStatus ? (
        <div className="row">
          <div className="col-md-12 offset">
            <div className="alert alert-danger">{errorMessage}</div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Form style={{ width: "auto", height: "auto" }}>
        <Form.Group>
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={oldPassword}
            id="oldPass"
            onChange={handleOldPassChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={newPassword}
            id="newPass"
            onChange={handleNewPassChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={reNewPassword}
            id="confirmnewPass"
            onChange={handleReNewPassChange}
          />
        </Form.Group>
        <div className="text-center ">
          <p
            className="btn btn-info btn-md"
            onClick={() => onSubmitUserPassword()}
          >
            Submit
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default Security;
