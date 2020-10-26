import React from 'react'
import { Container,Row,Col,Badge } from 'react-bootstrap';
import './Status.scss';
const Status =()=> {
    return (
        <div>
            <div className="mb-3">
                <h1 className="text-center register-heading text-light"> Status</h1>
            </div>

            <div>
                <h1 className="ml-5 mt-4">Current Status <Badge variant="danger">Pending</Badge></h1>
            
            </div>
            <div className="current-status text-center">
                <h3>Currently Processing!</h3>
                <h4>Sorry, We have not found any match for your trip!</h4>
            </div>

            <div className="mb-5 mt-5">
               <h1 className="ml-5">Previous Trips</h1>
            </div>
            <div>
                <Container>
                    <Row>
                        {/* <Col sm="1"></Col> */}
                        <Col>
                            <Container>
                                <Row>
                                    <Col>
                                        <div class="wrapper text-center">
                                            <h4> 1</h4>
                                            <div class="card-loader card-loader--tabs"></div>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div class="wrapper text-center">
                                            <h4> 2</h4>
                                            <div class="card-loader card-loader--tabs"></div>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div class="wrapper text-center">
                                            <h4>     3</h4>
                                            <div class="card-loader card-loader--tabs"></div>
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
