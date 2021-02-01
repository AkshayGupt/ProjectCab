import React from "react";
import { Container, Form, Row, Col, Button, Image } from "react-bootstrap";
import "./ContactUs.css";
import Navigation from '../../Navigation/Navigation'

const Contact = ({fromDashboard=false}) => {
  return (
    <>
      {!fromDashboard && <Navigation/>}
    <Row className="custom-padding">
      <Col className=" d-lg-block my-2">
        <Image
          src="https://images.unsplash.com/photo-1489824904134-891ab64532f1"
          fluid
          style={{height:"80vh",width:"100%"}}
        />
      </Col>
      <Col>
        <Container>
          <Form>
            <h1 className="mt-5">Get in touch</h1>
            <div className="subtitle">
              <h6>Have an inquiry or some feedback for us?</h6>
              <h6>Fill out the form below to contact out team.</h6>
            </div>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="John" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Doe" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Email Id</Form.Label>
              <Form.Control type="text" placeholder="john@doe.com" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Hello, I just wanted to report an error..."
              />
            </Form.Group>
          </Form>
          <Button variant="primary" type="submit">
            Get in touch
          </Button>
        </Container>
      </Col>
    </Row> 
    </>
  );
};

export default Contact;
