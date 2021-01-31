import React from 'react';
import './Footer.css';

function Footer() {
    return (

<footer className="mainfooter" role="contentinfo">
  <div className="footer-middle">
  <div className="container">
    <div className="row mb-3 mx-auto d-flex justify-content-center">  
      <div className="row footer-pad mr-1">
        <div className ="col-md-4 col-12"><a href="#">About</a></div>
        <div className ="col-md-4 col-12"><a href="#">FAQs</a></div>
        <div className ="col-md-4 col-12"><a href="/contact">Contact</a></div>
      </div>

        <div className="row">
            <div className="col-md-6 col-12">
              <ul className="social-network social-circle">
                  <li><a href="#" className="icoFacebook" title="Facebook"><i className="fa fa-facebook"></i></a></li>
              </ul>		
            </div>
            <div className="col-md-6 col-12">
                <ul className="social-network social-circle">
                  {/* <li><a href="#" className="icoFacebook" title="Facebook"><i className="fa fa-facebook"></i></a></li> */}
                  <li><a href="#" className="icoLinkedin" title="Linkedin"><i className="fa fa-linkedin"></i></a></li>
              </ul>	
            </div>
        </div>		 
    		
		</div>
    </div>
    {/* </div> */}
	<div className="row">
		<div className="col-md-12 copy">
			<p className="text-center">&copy; Copyright 2021 - Pool It.  All rights reserved.</p>
		</div>
	</div>


  </div>
  {/* // </div> */}
</footer>

    )
}

export default Footer;
