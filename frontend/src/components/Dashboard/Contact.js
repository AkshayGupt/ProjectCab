import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./Contact.css";

const Contact = () => {
  return (
    <Container className="container-custom">
      <Form>
        <h1 className="mt-5">Get in touch</h1>
        <div className="subtitle">
          <h6>Have an inquiry or some feedback for us?</h6>
          <h6>Fill out the form below to contact out team.</h6>
        </div>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control placeholder="John" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control placeholder="Doe" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email Id</Form.Label>
          <Form.Control placeholder="john@doe.com" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control placeholder="Hello, I just wanted to report an error..." />
        </Form.Group>
      </Form>
      <Button variant="primary" type="submit">
        Get in touch
      </Button>
    </Container>
  );
};

export default Contact;
