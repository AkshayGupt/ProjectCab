import React, { useContext } from "react";
import "./Status.scss";
import NavBar from "../NavBar/NavBar";
import Trips from "./Trips";
import "./Dashboard.css";
import { CurrentPageContext } from "../Context/CurrentPageProvider";
import PastTrips from "./PastTrips";
import Profile from "../Profile/Profile";
import About from "../About/About";
import { isAuthenticated } from "../Auth/helper";
import Register from "../Register/Register";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useContext(CurrentPageContext);

  return (
    <div className="dashboard">
      <NavBar />
      {!currentPage ? (
        ""
      ) : currentPage === "TRIPS" ? (
        <Trips />
      ) : currentPage === "PAST_TRIPS" ? (
        <PastTrips />
      ) : currentPage === "REGISTER" ? (
        <Register />
      ) : currentPage === "PROFILE" ? (
        <Profile
          editAllowed={isAuthenticated()}
          userId={JSON.parse(localStorage.getItem("jwt")).user._id}
        />
      ) : currentPage === "ABOUT" ? (
        <About />
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
