import React from "react";
import GuestNavBar from "../NavBar/GuestNavBar";
import "./About.css";
import Contact from "../Contact/Contact";
import Developers from "./Developers";
const About = () => {
  return (
    <div>
      <GuestNavBar />
      <header>
        <a name="home"></a>
        <div className="container-fluid">
          <div className="more-space row">
            <div className="col-md-12">
              <div className="text-center intro">
                <h1>Hello there,</h1>
                <h4 className="text-secondary">We are Poolify.</h4>
                <h4 className="red">
                  A creative bunch who love code and design.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="about-us" id="startchange">
        <a name="about"></a>
        <div className="container-fluid">
          <div className="row text-center">
            <div className="descript col-xs-12 col-sm-12 col-md-12">
              <h1>ABOUT US</h1>
              <p className="about-us-p">
                With the help of this application, you can cut down the overload
                of finding people to share cab with, as we will group users with
                similar time, destination and gender preferences for you. We are
                a highly motivated and enthusiastic team. Our main aim is to
                make rides pocket friendly for college going students. This
                application will not only make rides cheaper but will also help
                in reducing pollution and energy consumption.
              </p>
              <a href="#team" className="team-btn">
                Our Team
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="break2 container-fluid text-center"></div>
      <div className="row">
        <div className=" team text-center col-xs-12 col-sm-12 col-md-12">
          <h1 id="team">Our Team</h1>
        </div>
      </div>

      <Developers />

      <div className="break1 container-fluid text-center">
        <h3 className="p-4">Come connect with us!</h3>
      </div>
      <Contact showNavbar={false} />
    </div>
  );
};

export default About;
