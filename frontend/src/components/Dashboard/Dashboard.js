import React,{useState} from 'react'
import { Container,Row,Col,Badge,Button,Nav } from 'react-bootstrap';
import './Status.scss';
import {Redirect} from 'react-router-dom';
import Trips from './Trips';
import Contact from './Contact';
import Profile from './Profile';

import Navigation from '../Navigation/Navigation';    
import {isAuthenticated, signOut} from '../Auth/helper';
const Dashboard =()=> {

    const [authenticated,setAuthenticated] = useState(false);
    const [redirect,setRedirect] = useState(false);
    const [component,setComponent] = useState("trips");


    const getName= () =>{
        if(localStorage.getItem("name"))
        return localStorage.getItem("name");
    }

    const signout = () =>{
        signOut()
        setRedirect(true);
    }

    const redirectToLandingPage = () =>{
        if(redirect){
            return <Redirect to ="/" />
        }
    }

    //Temp
    const checkAuthentication = () =>{

        isAuthenticated()
        .then(data=>{
            if(data.status === true){
                console.log(data);
                setAuthenticated(true);
            }
            else{
                console.log(data);
            }
        })
        .catch();
    }

    return (
        <div>
            {redirectToLandingPage()}
            <Navigation/>
            <Row>
                <Col md lg="1" className="mt-5">
                        <div>
                            <Nav defaultActiveKey="/home" className="flex-column">
                                <Nav.Link onClick={()=>{setComponent("trips")}}>Trips</Nav.Link>
                                <Nav.Link onClick={()=>{setComponent("profile")}}>Profile</Nav.Link>
                                <Nav.Link onClick={()=>{setComponent("contact")}}>Contact</Nav.Link>
                                <Nav.Link eventKey="disabled" disabled>
                                    Disabled
                                </Nav.Link>
                            </Nav>
                        </div>
                </Col>
                <Col md lg="11">
                   {component === "trips"  && <Trips/>}
                   {component === "profile" && <Profile/>}
                   {component === "contact" && <Contact/>}
                </Col>
            </Row>
            
        </div>
    )
}

export default Dashboard;
