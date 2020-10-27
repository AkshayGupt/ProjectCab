import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Row,Col,Container,Form,Button} from 'react-bootstrap';
import './Landing.css';
import GoogleButton from 'react-google-button'
import LoginWithGoogle from './LoginWithGoogle';

const onSignIn = () =>{
    console.log("Success");
}


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
                            <div className="sign-in mt-3 ml-4">
                                <LoginWithGoogle/>
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