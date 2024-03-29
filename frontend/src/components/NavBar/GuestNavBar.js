import React from "react";
import { Navbar } from "react-bootstrap";
import "./NavBar.css";

const GuestNavBar = () => {
  // DISPLAY LOGO
  const Logo = () => {
    return <h3 className="logo pt-2">POOLIFY</h3>;
  };

  return (
    <div>
      <Navbar>
        <Navbar.Brand href="/">
          <Logo />
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};

export default GuestNavBar;
