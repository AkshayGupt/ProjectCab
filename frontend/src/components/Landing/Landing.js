import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Row,Col,Container,Form,Button} from 'react-bootstrap';
import './Landing.css';
import GoogleButton from 'react-google-button'
const Landing = ()  =>{
    return(
        <div className="Landing-Page">
            <div className="text-center">
                <div>
                    <h1 className="Landing-heading text-light">Want to Save Money, Pool it!</h1>
                </div>
                <Container>
                <Row className="justify-content-md-center">
                    <Col></Col>
                    <Col sm="auto" > 
                        <div className="box">
                            <div className="button">
                                    <a href="/register" className="btn btn-lg btn-light">Register</a>
                            </div> 
                            <div className="sign-in mt-3 ml-4">
                                <div className="g-signin2" data-width="50" data-height="50" data-longtitle="true"></div>
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