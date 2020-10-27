import React,{useState} from 'react'
import { Container,Row,Col,Badge,Button } from 'react-bootstrap';
import './Status.scss';
import {isAuthenticated} from '../Auth/helper';
const Status =()=> {

    const[authenticated,setAuthenticated] = useState(false);

    const getName= () =>{
        if(localStorage.getItem("name"))
        return localStorage.getItem("name");
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
            <div className="mb-3">
            <h1 className="text-center register-heading text-light"> Status</h1>
            </div>
            <div className="mx-5 d-flex justify-content-between">
                <p className="ml-2">Welcome {getName()} !</p>
                <div>
                <a href="/register" className="btn btn-info">Create New Trip</a>
                {' '}
                <a href="/" className="btn btn-info">Logout</a>
                </div>
               
            </div>

            <div className="d-flex justify-content-start align-items-center ">
                <h1 className="ml-5 mt-4">Current Status </h1>
                <p></p>
                <Badge variant="danger mt-4">pending</Badge>
            </div>

            {/* Temp */}
            <div className="text-center mb-3">
                <Button onClick={()=>checkAuthentication()}>Check Login Status</Button>
                {authenticated && <p>Secret Content</p>}
            </div>
            
            <div className="current-status text-center">
                <h3>Currently Processing!</h3>
                <h4>Sorry, We have not found any match for your trip till now!</h4>
            </div>

            <div className="mb-5 mt-5">
               <h2 className="ml-5">Future Trips</h2>
            </div>
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Container>
                                <Row>
                                    <Col md="4 text-center mb-2">
                                        <div className="wrapper text-center mx-auto">
                                            <h4> </h4>
                                            <div className="card-loader card-loader--tabs"></div>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="wrapper text-center mx-auto mb-2">
                                            <h4> </h4>
                                            <div className="card-loader card-loader--tabs"></div>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="wrapper text-center mx-auto mb-2">
                                            <h4>    </h4>
                                            <div className="card-loader card-loader--tabs"></div>
                                        </div>
                                    </Col>
                                   
                                </Row>
                            </Container>
                        </Col>
                        {/* <Col sm="1"></Col> */}
                    </Row>
                </Container>
            </div>
            <div className="mb-2 mt-4">
               <h2 className="ml-5">Past Trips</h2>
            </div>
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Container>
                                <Row>
                                    <Col md="4">
                                        <div className="wrapper text-center mx-auto mb-2">
                                            <h4> </h4>
                                            <div className="card-loader card-loader--tabs"></div>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="wrapper text-center mx-auto mb-2">
                                            <h4> </h4>
                                            <div className="card-loader card-loader--tabs"></div>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="wrapper text-center mx-auto mb-2">
                                            <h4>     </h4>
                                            <div className="card-loader card-loader--tabs"></div>
                                        </div>
                                    </Col>
                                   
                                </Row>
                            </Container>
                        </Col>
                        {/* <Col sm="1"></Col> */}
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Status;
