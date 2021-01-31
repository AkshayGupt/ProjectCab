import React from 'react';
import './Footer.css';

function Footer() {
    return (

<footer className="mainfooter" role="contentinfo">
  <div className="footer-middle">
  <div className="container">
    <div className="row mb-1 mx-auto d-flex justify-content-around">  
        <div className="footer-pad">
          <ul className="list-unstyled">
            <li><a href="#"></a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
    	<div >
    		<h4>Follow Us</h4>
            <ul className="social-network social-circle">
             <li><a href="#" className="icoFacebook" title="Facebook"><i className="fa fa-facebook"></i></a></li>
             <li><a href="#" className="icoLinkedin" title="Linkedin"><i className="fa fa-linkedin"></i></a></li>
            </ul>				
		</div>
    </div>
	<div className="row">
		<div className="col-md-12 copy">
			<p className="text-center">&copy; Copyright 2021 - Pool It.  All rights reserved.</p>
		</div>
	</div>


  </div>
  </div>
</footer>

    )
}

export default Footer;
