import React from 'react'
import {Modal,Container,Button,Row ,Col} from 'react-bootstrap';

const ForgotPassword = (props) => {

    const {handleForgotPasswordEmailSubmit,forgotPasswordEmail,setForgotPasswordEmail} =props; 
    
    return (
      <>
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
             Forgot password
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col md="12" lg="10">
                  <div className="form-group">
                      <label for="exampleInputPassword1">Enter email address</label>
                      <input type="email"
                         className="form-control" 
                         name="forgotPasswordEmail" 
                         value={forgotPasswordEmail} 
                         onChange={e => setForgotPasswordEmail(e.target.value)}
                         id="email" 
                         placeholder="Email"
                      />
                  </div>
                  <div><p  className="btn btn-primary" onClick={()=>handleForgotPasswordEmailSubmit()}>Submit</p></div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ForgotPassword;
