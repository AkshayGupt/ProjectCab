import React, { useContext, useEffect } from "react";
import "./Status.scss";
import NavBar from "../NavBar/NavBar";
import Trips from "./Trips";
import "./Dashboard.css";
import { CurrentPageContext } from "../Context/CurrentPageProvider";
import PastTrips from "./PastTrips";
import Profile from "../Profile/Profile";
import About from "../About/About";
import Register from "../Register/Register";
import Security from "../Security/Security";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useContext(CurrentPageContext);

  useEffect(() => {
    setCurrentPage("TRIPS");
  }, []);

  return (
    <div className="dashboard">
      <NavBar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {!currentPage ? (
        ""
      ) : currentPage === "TRIPS" ? (
        <Trips />
      ) : currentPage === "PAST_TRIPS" ? (
        <PastTrips />
      ) : currentPage === "REGISTER" ? (
        <Register />
      ) : currentPage === "PROFILE" ? (
        <Profile />
      ) : currentPage === "ABOUT" ? (
        <About />
      ) : currentPage === "SECURITY" ? (
        <Security />
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
