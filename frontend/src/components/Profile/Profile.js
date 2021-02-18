import React, { useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  FormGroup,
  Button,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { isAuthenticated } from "../Auth/helper";
import { ProfileContext } from "../Context/ProfileProvider";
import { getUser, updateUserBio, updateUserDP } from "./helper";

const DEFAULT_IMAGE = "https://img.icons8.com/bubbles/100/000000/user.png";

const Profile = () => {
  const { userProfile, editUserBio } = useContext(ProfileContext);
  const [profile, setProfile] = userProfile;
  const [editBio, setEditBio] = editUserBio; //true, false

  const [changeImage, setChangeImage] = useState(false);

  const { firstName, lastName, image, email, trips, bio } = profile;

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
   * Update the bio when the user starts editing.
   * @param {*} event - Changed Bio value
   */
  const handleBioChange = (event) => {
    setProfile({ ...profile, bio: event.target.value });
  };

  const onSubmitBio = () => {
    setEditBio(false);

    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const { user, token } = jwt;

    updateUserBio(user._id, token, bio)
      .then((data) => {
        if (data.error) {
          showToast("ERROR", "Could not change the Bio!");
        } else {
          showToast("SUCCESS", "Bio updated Successfully!");
        }
      })
      .catch((err) => {
        showToast("ERROR", "Could not change the Bio!");
        console.err(err);
      });
  };

  /**
   * Handle Image uploaded by the user.
   * @param {File} event - Image uploaded by the user.
   */
  const handleImageChange = (event) => {
    setChangeImage(false);
    const image = event.target.files[0];

    if (image.size > 2500000) {
      setChangeImage(true);
      showToast("ERROR", "IMAGE SIZE TOO BIG!!");
    } else {
      updateUserProfileDP(image);
    }
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
          showToast("ERROR", "Could not change the profile picture!");
          console.log(data.error);
        } else {
          setDetails();
          showToast("SUCCESS", "Profile picture changed successfully!");
        }
      })
      .catch((err) => {
        showToast("ERROR", "Could not change the profile picture!");
        console.log(err);
      });
  };

  // ! TODO: Return JSON DATA when uploading image, so one less read call
  /**
   * Fetch current user data.
   */
  const setDetails = () => {
    const jwt = isAuthenticated();
    const { user, token } = jwt;

    getUser(user._id, token)
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
          });
          console.log(data);
        }
      })
      .catch((err) => console.log(err));
  };

  /**
   * Displays first and last name as disabled input fields.
   */
  const NameRow = () => {
    return (
      <Row>
        <Col>
          <FormGroup controlId="userInfo">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="name" placeholder={firstName} disabled />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup controlId="userInfo">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="name" placeholder={lastName} disabled />
          </FormGroup>
        </Col>
      </Row>
    );
  };

  /**
   * Displays user's email address as a disabled input field.
   */
  const EmailRow = () => {
    return (
      <FormGroup controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" placeholder={email} disabled />
      </FormGroup>
    );
  };

  return (
    <Container style={{ marginTop: "5%" }}>
      <Row>
        <Col className="text-center" xs={12} lg={6}>
          <Image
            src={image}
            style={{ width: "65%", marginBottom: "3%" }}
            roundedCircle
          />
          <h3>{trips.length} Trips</h3>
          <Button
            style={{ marginTop: "5%", marginBottom: "5%" }}
            onClick={() => setChangeImage(true)}
          >
            Change Image
          </Button>
          <div
            className={changeImage ? "form-group text-center" : "d-none"}
            style={{ marginBottom: "5%", marginLeft: "10%" }}
          >
            <input
              onChange={handleImageChange}
              type="file"
              name="image"
              accept=".jpg,.jpeg,.png"
              placeholder="Choose an image"
            />
          </div>
          <div style={{ height: "60px" }}></div>
        </Col>
        <Col>
          <NameRow />
          <EmailRow />
          <FormGroup controlId="bio">
            <Form.Label>
              <div>
                Bio{" "}
                <a href="#" onClick={() => setEditBio(true)}>
                  <i className="fa fa-pencil" aria-hidden="true" />{" "}
                </a>
              </div>
            </Form.Label>
            <Form.Control
              className="editField"
              as="textarea"
              rows={4}
              value={bio}
              onChange={handleBioChange}
              disabled={!editBio}
            />
            <Button
              className={editBio ? "" : "d-none"}
              style={{ marginTop: "5px" }}
              onClick={onSubmitBio}
            >
              Submit
            </Button>
          </FormGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
