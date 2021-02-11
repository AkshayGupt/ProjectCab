import React, { useState } from "react";
import { signOut } from "../../Auth/helper";
import { Redirect } from "react-router-dom";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import LogoComponent from "./LogoComponent";
import "./MainNavbar.css";
import Trips from "../../Dashboard/Trips";

const MainNavbar = () => {
  const [redirect, setRedirect] = useState(false);

  const signout = () => {
    signOut();
    setRedirect(true);
  };

  const redirectToLandingPage = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  return (
    <div>
      {redirectToLandingPage()}
      <Container fluid>
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand href="/">
            <LogoComponent />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" style={{ fontSize: "18px" }}>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/dashboard">About us</Nav.Link>
              <Nav.Link href="/dashboard">Contact us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav>
            <Nav.Link>
              <i class="fa fa-bell-o" aria-hidden="true" />{" "}
            </Nav.Link>
            <DropdownButton
              menuAlign="right"
              title={<i class="fa fa-user" />}
              id="dropdown-menu-align-right"
            >
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Past Trips</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as="button" onClick={() => signout()}>
                Sign Out
              </Dropdown.Item>
            </DropdownButton>
          </Nav>
        </Navbar>
      </Container>
      <Trips />
    </div>
  );
};

export default MainNavbar;
