import React from 'react';
import {Row,Col,Container} from 'react-bootstrap';
import './Landing.css';
import LoginWithGoogle from './LoginWithGoogle';
import { isSignedIn } from '../Auth/helper';



const Landing = ()  =>{

    return(
        <div className="Landing-Page">
            <div className="text-center">
                <div>
                    <p className="Landing-heading text-light">Want to Save Money, Pool it!</p>
                </div>
                <Container>
                <Row className="justify-content-md-center">
                    <Col></Col>
                    <Col sm="auto" > 
                        <div className="box">
                           
                            <div className="sign-in mt-3 ml-4">
                                {!isSignedIn()?(<LoginWithGoogle/>): (<a href="/status" className="btn btn-lg btn-light">Check Status</a>)}
                            </div>

                        </div>
                    </Col>
                    <Col></Col>
                </Row>
                </Container>
               
            </div>
        </div>

    );
};

export default Landing;