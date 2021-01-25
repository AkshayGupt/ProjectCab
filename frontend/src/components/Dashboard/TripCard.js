import React,{useState} from 'react';
import {Modal,Button,Badge, Container,Row,Col} from 'react-bootstrap';
import moment from 'moment';

const TripCard =({trip})=> {

    const [modalShow,setModalShow] = useState(false);

    const {source,destination,members,start,end} =trip;
    console.log(moment(start).format('MMMM Do YYYY, h:mm:ss a').toString());
    return (
        <div>
            <div className="card text-white bg-dark mb-3 ml-5 mx-auto" style={{width:"290px",height:"300px"}}>
            <div className="card-header text-light">
            <p><i className="fa fa-home mt-2" aria-hidden="true"></i>{' '}{source} </p>
            <p><i className="fa fa-map-marker" aria-hidden="true"></i>{' '}{destination}</p>
            <p className="text-info "><i class="fa fa-clock-o" aria-hidden="true"></i>{' '}{moment({start}).startOf('hour').fromNow().toString()}</p></div>
            <div className="card-body bg-light">
                <p className="text-dark"><i class="fa fa-users" aria-hidden="true"></i> {members.length}</p>

                <p className="btn btn-sm btn-info" onClick={()=>setModalShow(true)}>View More</p>
                <Details
                    trip={trip}
                    show={modalShow}
                    onHide={()=>setModalShow(false)}
                />

               </div>
            </div>
           
        </div>
    )
}
const Details = (props) => {
    const trip =props.trip;
    const {source,destination,members,start,end,gender} =trip;
    console.log(gender == "0");
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {source} - {destination}
          </Modal.Title>
        {' '}<Badge variant="info ml-3">{
            gender == "0" ? "Any":(
            gender == "1" ? "Male only":
            gender == "2" ? "Female only":"")
        }</Badge>{' '}

        </Modal.Header>
        <Modal.Body>
            <Container>
                <Row>
                    <Col md="12" lg="6">
                    <h6 className="text-center mb-3">Members : {members.length}</h6>
                    {members.map((member) =>{
                            return (
                                <div className="mb-1">
                                    <a href="#" key={member._id} className="text-dark">
                                        <i class="fa fa-user" aria-hidden="true"></i> {
                                             ' '
                                        }
                                        {member.firstName}{' '}{member.lastName} 
                                    </a>
                                </div>
                            )
                            })}
                    </Col>
                    <Col md="12" lg="6">
                    <h6 className="card-title text-dark text-center mb-3" > Duration {' '}<i style={{fontSize:"20px"}} className="fa fa-clock-o" aria-hidden="true"></i></h6>
                 <p className="text-dark">{moment({start}).format('MMMM Do YYYY, h:mm:ss a').toString()}</p>
                 <p className="text-dark" style={{marginBottom:"0px"}}>{moment({end}).format('MMMM Do YYYY, h:mm:ss a').toString()}</p>
               
                    </Col>
                    
                </Row>
            </Container>
         
         
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


export default TripCard;