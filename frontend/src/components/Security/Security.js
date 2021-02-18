import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateUserPassword } from "./helper";

const Security = () => {
  const [oldPass, setOldPass] = useState({ oldPassword: "" });
  const [newPass, setNewPass] = useState({ newPassword: "" });
  const [reNewPass, setReNewPass] = useState({ reNewPassword: "" });

  const { oldPassword } = oldPass;
  const { newPassword } = newPass;
  const { reNewPassword } = reNewPass;

  /**
   * Display a 3s Toast on the top right corner of the screen
   * @param {string} status - SUCCESS/ ERROR
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
    setOldPass({ oldPassword: event.target.value });
  };

  /**
   * Handle form change in new password.
   * @param {any} event - Input value for New password
   */
  const handleNewPassChange = (event) => {
    setNewPass({ newPassword: event.target.value });
  };

  /**
   * Handle form change in confirm new password field.
   * @param {any} event - Input value in Re new Password
   */
  const handleReNewPassChange = (event) => {
    setReNewPass({ reNewPassword: event.target.value });
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

    if (oldPassword === "") {
      console.log("Old password cannot be empty");
    } else if (oldPassword === newPassword) {
      console.log("New password cannot be equal to Old password");
    } else if (newPassword.length < 8) {
      console.log("INVALID LENGTH!");
    } else if (reNewPassword !== newPassword) {
      console.log("PASSWORDS DO NOT MATCH");
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
      <Form style={{ width: "auto", height: "auto" }}>
        <h3 className="my-3">Change Password</h3>
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
