import React,{useState} from 'react'
import { Container,Row,Col,Badge,Button,Nav } from 'react-bootstrap';
import './Status.scss';
import {Redirect} from 'react-router-dom';
import Trips from './Trips';
import Contact from './Contact';
import Profile from './Profile';
import './Dashboard.css';
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
                <Col md="12" lg="2" className="sidebar mb-5">
                    <h2 className="text-center mt-5">Dashboard</h2>
                        <div className="mt-5">
                            <Nav defaultActiveKey="/home" className="flex-column text-center">
                                <Nav.Link 
                                    className={component === "trips"?"bg-dark text-white mx-3":"text-dark"}
                                    onClick={()=>{setComponent("trips")}}
                                >
                                    Trips
                                </Nav.Link>
                                <Nav.Link 
                                    className={component === "profile"?"bg-dark text-white mx-3":"text-dark"}
                                    onClick={()=>{setComponent("profile")}}
                                >
                                    Profile
                                </Nav.Link>
                                <Nav.Link 
                                    className={component === "contact"?"bg-dark text-white mx-3":"text-dark"}
                                    onClick={()=>{setComponent("contact")}}
                                >
                                    Contact
                                </Nav.Link>
                            </Nav>
                        </div>
                </Col>
                <Col md="12" lg="10">
                   {component === "trips"  && <Trips/>}
                   {component === "profile" && <Profile/>}
                   {component === "contact" && <Contact/>}
                </Col>
            </Row>
            
        </div>
    )
}

export default Dashboard;
