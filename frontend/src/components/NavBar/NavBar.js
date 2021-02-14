import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Navbar, NavDropdown, Image, Nav } from "react-bootstrap";
import { signOut, isAuthenticated } from "../Auth/helper";
import "./NavBar.css";
import { CurrentPageContext } from "../Context/CurrentPageContext";

// DISPLAY LOGO
const Logo = () => {
  return <h3 className="logo">POOL IT</h3>;
};

const NavBar = () => {
  const [redirect, setRedirect] = useState(false);
  const [currentPage, setCurrentPage] = useContext(CurrentPageContext);

  // Redirect to Sign in page when logged out !
  const redirectToLandingPage = () => {
    if (redirect) return <Redirect to="/" />;
  };

  const signout = () => {
    signOut();
    setRedirect(!redirect);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {redirectToLandingPage()}
      {!isAuthenticated() ? (
        <Navbar>
          <Navbar.Brand href="/">
            <Logo />
          </Navbar.Brand>
        </Navbar>
      ) : (
        <>
          <Navbar collapseOnSelect expand="md">
            <Navbar.Brand className="order-sm-0 mx-auto order-1" href="/">
              <Logo />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="order-sm-1 order-0"
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="d-md-none d-sm-block">
                <Nav.Link>Profile</Nav.Link>
              </Nav>
              <Nav className="mr-auto">
                <Nav.Link onClick={() => setCurrentPage("TRIPS")}>
                  Dashboard
                </Nav.Link>
                <Nav.Link onClick={() => setCurrentPage("PAST_TRIPS")}>
                  History
                </Nav.Link>
                <Nav.Link onClick={() => setCurrentPage("ABOUT")}>
                  About
                </Nav.Link>
              </Nav>
              <Nav className="d-md-none d-sm-block">
                <Nav.Link onClick={() => signout()}>Log Out</Nav.Link>
              </Nav>
              <div>
                <NavDropdown
                  className="d-none d-lg-block d-md-block"
                  title={
                    <Image
                      className="user-avatar"
                      src="https://img.icons8.com/bubbles/100/000000/user.png"
                      roundedCircle
                    />
                  }
                  id="dropdown-menu-align-right"
                  alignRight
                >
                  <NavDropdown.Item
                    eventKey="1"
                    onClick={() => setCurrentPage("PROFILE")}
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => signout()}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </Navbar.Collapse>
          </Navbar>
        </>
      )}
    </div>
  );
};

export default NavBar;
