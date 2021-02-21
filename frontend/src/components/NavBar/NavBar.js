import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Navbar, NavDropdown, Image, Nav, Col, Row } from "react-bootstrap";
import { signOut, isAuthenticated } from "../Auth/helper";
import "./NavBar.css";
import { CurrentPageContext } from "../Context/CurrentPageProvider";
import { ProfileContext } from "../Context/ProfileProvider";

// DISPLAY LOGO
const Logo = () => {
  return <h3 className="logo pt-2">POOL IT</h3>;
};

const NavBar = () => {
  const [redirect, setRedirect] = useState(false);

  const [currentPage, setCurrentPage] = useContext(CurrentPageContext);
  const { userProfile, editUserBio } = useContext(ProfileContext);

  const [profile, setProfile] = userProfile;

  // Redirect to Sign in page when logged out !
  const redirectToLandingPage = () => {
    if (redirect) return <Redirect to="/" />;
  };

  const signout = () => {
    signOut();
    setRedirect(!redirect);
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
          <Navbar collapseOnSelect={true} expand="md">
            <Navbar.Brand className=" order-0" href="/">
              <Logo />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="order-sm-0 order-0"
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="d-md-none d-sm-block">
                <Nav.Link onClick={() => setCurrentPage("PROFILE")}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={() => setCurrentPage("SECURITY")}>
                  Security
                </Nav.Link>
              </Nav>
              <Nav className="mr-auto">
                <Nav.Link
                  onClick={() => setCurrentPage("REGISTER")}
                  className="text-info"
                >
                  Create Trip
                </Nav.Link>
                <Nav.Link onClick={() => setCurrentPage("TRIPS")}>
                  Dashboard
                </Nav.Link>
                <Nav.Link onClick={() => setCurrentPage("PAST_TRIPS")}>
                  History
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
                      src={profile.image}
                      roundedCircle
                    />
                  }
                  id="dropdown-menu-align-right"
                  alignRight
                >
                  <NavDropdown.Item>
                    <Col>
                      <Row>Signed in as</Row>
                      <Row style={{ color: "grey", fontWeight: "600" }}>
                        {profile.firstName} {profile.lastName}
                      </Row>
                    </Col>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    eventKey="1"
                    onClick={() => setCurrentPage("PROFILE")}
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="2"
                    onClick={() => setCurrentPage("SECURITY")}
                  >
                    Security
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
