import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { isAuthenticated } from "../Auth/helper";
import { getUser } from "./helper";
import Loading from "../../Loading/Loading";

const DEFAULT_IMAGE = "https://img.icons8.com/bubbles/100/000000/user.png";

const GuestProfile = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    image: DEFAULT_IMAGE,
    email: "",
    trips: [],
    bio: "",
  });

  const { firstName, lastName, image, email, trips, bio } = profile;

  const getDetails = () => {
    const jwt = isAuthenticated();
    const { user, token } = jwt;

    getUser(userId, token)
      .then((data) => {
        setIsLoading(false);
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
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            trips: data.trips,
            bio: data.bio,
            image: photo,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (isLoading) return <Loading />;
  else
    return (
      <div
        style={{
          marginTop: "5%",
          marginBottom: "5%",
        }}
      >
        <Image
          src={image}
          style={{ width: "45%", marginBottom: "2%" }}
          roundedCircle
        />
        <h4 style={{ fontStyle: "bolder", color: "grey", marginBottom: "2%" }}>
          {firstName} {lastName}
        </h4>
        <h5 style={{ marginBottom: "2.5%", fontSize: "88%" }}>{email}</h5>

        <h6
          className="mx-auto"
          style={{
            fontStyle: "italic",
            marginBottom: "7%",
            textAlign: "text-center",
            width: "50%",
          }}
        >{`${'"' + bio + '"'}`}</h6>
        <h4 style={{ color: "purple", marginBottom: "0" }}>{trips.length}</h4>
        <h6 style={{ fontSize: "80%", color: "grey" }}>TRIPS</h6>
      </div>
    );
};

export default GuestProfile;
