import React, { useState, useEffect, useContext } from "react";
import Navigation from "../Navigation/Navigation";
import {
  getUser,
  updateUserBio,
  updateUserDP,
  updateUserPassword,
} from "./helper";
import { isAuthenticated } from "../Auth/helper";
import "./Profile.css";
import Loading from "../../Loading/Loading";
import { Form } from "react-bootstrap";
import {ProfileContext} from '../Context/ProfileProvider';
const DEFAULT_IMAGE = "https://img.icons8.com/bubbles/100/000000/user.png";

const Profile = ({ editAllowed = false, userId }) => {

  const {userProfile, editUserBio} =  useContext(ProfileContext);

  const [profile,setProfile] = userProfile;
  const [editBio, setEditBio] = editUserBio;

  const [newPassword, setNewPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const {
    firstName,
    lastName,
    image,
    email,
    trips,
    loading,
    error,
    bio,
    success,
  } = profile;

  const [changePassword,setChangePassword] = useState(false);
  const [changeImage,setChangeImage] = useState(false);

  const setDetails = (userId) => {
    const jwt = isAuthenticated();
    const { token } = jwt;
    console.log("USER Id", userId);
    getUser(userId, token)
      .then((data) => {
        console.log("Data -> ");
        if (data.error) {
          console.log(data.error);
        } else {
          var photo = DEFAULT_IMAGE;
          if (data.image) {
            // Convert from base64 to image
            photo = `data:${data.image.contentType};base64,` + data.image.data;
          }
          setProfile({
            ...profile,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            trips: data.trips,
            bio: data.bio,
            image: photo,
            loading: false,
          });
          console.log(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setDetails(userId);
  }, []);

  const loadingF = () => {
    if (loading) {
      return <Loading />;
    }
  };

  /**
   * Handle changes to newPassword Container
   * @param {string} name - Field name
   */
  const handleUpdatePasswordChange = (name) => (event) => {
    setNewPassword({ ...newPassword, [name]: event.target.value });
  };

  /**
   * Check if newPassword and confirmNewPassword follow basic rules.
   * Then, call API to update the user password.
   */
  const onSubmitNewPassword = () => {
    // ! TODO: NEEDS STATUS BAR SUPPORT

    if (newPassword.oldPassword === "") {
      console.log("Password cannot be empty");
    } else if (newPassword.oldPassword === newPassword.newPassword) {
      console.log("New password cannot be equal to Old password");
    } else if (newPassword.newPassword.length < 8) {
      console.log("INVALID LENGTH!");
    } else if (newPassword.confirmNewPassword !== newPassword.newPassword) {
      console.log("PASSWORDS DO NOT MATCH");
    } else {
      const jwt = JSON.parse(localStorage.getItem("jwt"));
      const { user, token } = jwt;

      updateUserPassword(
        user._id,
        token,
        newPassword.oldPassword,
        newPassword.newPassword
      )
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            setProfile({
              ...profile,
              success: "password",
            });
            
            setNewPassword({
              oldPassword: "",
              newPassword: "",
              confirmNewPassword: ""
            })
            setChangePassword(false);
            setTimeout(() => setProfile({ ...profile, success: "" }), 3000);
            console.log("SUCCESS! Password Changed");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  /**
   * Handle Image uploaded by the user.
   * @param {File} event - Image uploaded by the user.
   */
  const handleImageChange = (event) => {
    const image = event.target.files[0];

    if (image.size > 2500000) {
      setProfile({
        ...profile,
        error: "Image size too big! Upload another image.",
      });
    } else {
      updateUserProfileDP(image);

      // ! TODO: NEEDS STATUS UPDATE!!

      setTimeout(() => {
        setDetails(userId);
      }, 1000);
    }
  };

  const handleChange = (name) => (event) => {
    setProfile({ ...profile, [name]: event.target.value });
  };

  /**
   * API CALL: To update User profile
   */
  const updateProfile = () => {
    setEditBio(false);

    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const { user, token } = jwt;
    console.log(bio);

    updateUserBio(user._id, token, bio)
      .then((data) => {
        if (data.error) {
          setProfile({
            ...profile,
            error: data.error,
          });
          setTimeout(() => setProfile({ ...profile, error: "" }), 3000);
        } else {
          setProfile({
            ...profile,
            success: 'bio',
          });
          setTimeout(() => setProfile({ ...profile, success: '' }), 3000);
          console.log(data);
        }
      })
      .catch((err) => {
        console.err(err);
      });
  };

  /**
   * Display Success Message
   */
  const updateSuccessMessage = () => {
    return (
      <div className="row">
        <div className="col-md-12 ">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            <p>Successfully updated your {success}.</p>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Display Error message
   */
  const updateErrorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-12 ">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Change user DP
   * @param {string} image - User Image
   */
  const updateUserProfileDP = (image) => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const { user, token } = jwt;

    updateUserDP(user._id, token, image)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("IMAGE SUCCESS!!");
          setProfile({
            ...profile,
            success: "profile picture",
          });
          setTimeout(() => setProfile({ ...profile, success: '' }), 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const profileF = () => {
    return (
      <>
        {updateSuccessMessage()}
        {updateErrorMessage()}
        <div className="card user-card-full">
          <div className="row m-l-0 m-r-0">
            <div className="col-sm-4 bg-c-lite-green user-profile">
              <div className="card-block text-center text-white ">
                <div className="m-b-25">
                  {" "}
                  <img
                    src={image}
                    className="img-radius"
                    alt="User-Profile-Image"
                    style={{ height: "150px" }}
                  />{" "}
                </div>
                <div className={changeImage?"form-group":"d-none"}>
                  <input
                    className={editAllowed ? "" : "d-none"}
                    onChange={handleImageChange}
                    type="file"
                    name="image"
                    accept=".jpg,.jpeg,.png"
                    placeholder="choose a file"
                  />
                </div>
                <h6 className="f-w-600">
                  {firstName} {lastName}
                </h6>
                <p>{trips.length} trips</p>
               
                <a href="#"className="mx-1" onClick={()=>setChangeImage(!changeImage)}><small>Update Image</small></a><br/>
                <a href="#" className="" onClick={()=>setChangePassword(!changePassword)}><small>Update Password</small></a>
                <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="card-block">
                <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                  {" "}
                  User Information
                </h6>
                <div className="row">
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600">Email</p>
                    <h6 className="text-muted f-w-400">{email}</h6>
                  </div>
                </div>
                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                  Bio{" "}
                  <a
                    href="#"
                    className={editAllowed ? "" : "d-none"}
                    onClick={() => setEditBio(true)}
                  >
                   <small>Edit</small> 
                  </a>
                </h6>
                <div className="form-group">
                  {/* <label for="exampleFormControlTextarea1">Bio</label> */}
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    name="bio"
                    onChange={handleChange("bio")}
                    value={bio}
                    rows="3"
                    disabled={!editBio}
                  />
                </div>
                <br />
                <p
                  className={editBio ? "btn btn-sm btn-info mx-2" : "d-none"}
                  onClick={() => updateProfile()}
                >
                  Update
                </p>
                <p
                  className={editBio ? "btn btn-sm btn-danger mx-2" : "d-none"}
                  onClick={() => setEditBio(false)}
                >
                  Cancel
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={editAllowed ? "" : "d-none"}>
          {!changePassword?"":
            (
          <Form style={{ width: "auto", height: "auto" }}>
            <h3 className="my-3">Change Password</h3>
            <Form.Group>
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newPassword.oldPassword}
                id="oldPassword"
                onChange={handleUpdatePasswordChange("oldPassword")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newPassword.newPassword}
                id="newPassword"
                onChange={handleUpdatePasswordChange("newPassword")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newPassword.confirmNewPassword}
                id="confirmNewPassword"
                onChange={handleUpdatePasswordChange("confirmNewPassword")}
              />
            </Form.Group>
            <div className="text-center ">
              <p
                className="btn btn-info btn-md"
                onClick={() => onSubmitNewPassword()}
              >
                Submit
              </p>
            </div>
          </Form>
           )
          }
        </div>
      </>
    );
  };

  return (
    <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-xl-6 col-md-12">
            {loading ? loadingF() : profileF()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
