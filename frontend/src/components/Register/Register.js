import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Row,Col,Container,Form,Button,Badge} from 'react-bootstrap';
import './Register.css';
const Register=() =>{

    const [values,setValues] = useState({
        name:"",
        gender:"Select",
        phone:0,
        destination:"Select",
        cabSize:2,
        timeSlot:"",
        sameGender:"yes",
        error:"",
        success:false
    });
    
    const{name,gender,phone,destination,cabSize,timeSlot,sameGender,success,error} = values;

    const handleChange = name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    }

    const onSubmit=()=>{

        if(name === "" || phone === 0 || destination === "Select" || gender === "Select"){
            alert("Please fill all the entries!");
            return;
        }

        const obj={name,gender,phone,destination,cabSize,sameGender};
        console.log(obj);

        //@todo
        //API CALL - NOT YET IMPLEMENTED IN HELPER.JS

        // register(obj)
        // .then(data=>{
        //     if(data.error){
        //         setValues({...values,error:data.error,success:false}); 
        //     }
        //     else{
        //         setValues({
        //             ...values,
        //             name:"",
        //             gender:"Select",
        //             phone:0,
        //             destination:"Select",
        //             cabSize:2,
        //             timeSlot:"",
        //             sameGender:"yes",
        //             success:true
        //         })
        //     }
        // })
        // .catch()

        //temporary to redirect to status page
        setValues({...values,success:true})        
    }

    const onError=()=>{
        if(error){
            alert(error);
            return;
        }
    }

    const onSuccessfulRegister=()=>{
        if(success){
            return <Redirect to="/status"/>
        }
    }

    return (
        <div className="body">
            {onSuccessfulRegister()}
            <div className="mb-3">
                <h1 className="text-center register-heading text-light"> Register</h1>
            </div>
           
            <Container>
            <Row>
                <Col sm='3'></Col>
                <Col>                     
                    <Form>
                        <Form.Group>
                            <Form.Label>Name </Form.Label>
                            <Form.Control type="name" placeholder="Enter name"  onChange={handleChange("name")} value={name}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" value={gender} onChange={handleChange("gender")}>
                                    <option value="Select">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Phone No.</Form.Label>
                            <Form.Control type="tel" placeholder="phone" pattern="[0-9]{10}" onChange={handleChange("phone")} value={phone}/>
                        </Form.Group>


                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Source:</Form.Label>
                            <Col sm="10" className="mt-1"> <h4><Badge variant="info">MUJ</Badge></h4>
                            {/* <Form.Control plaintext readOnly defaultValue="MUJ" /> */}
                            </Col>
                           
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Destination</Form.Label>
                            <Form.Control as="select" value={destination} onChange={handleChange("destination")}>
                                <option value="Select">Select</option>
                                <option value="airport">Airport</option>
                                <option value="railway station">Railway Station</option>
                                <option value="sindhi camp">Sindhi Camp</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Max Cab size</Form.Label>
                            <Form.Control as="select" value={cabSize} onChange={handleChange("cabSize")}>
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="6">6</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Other Gender allowed</Form.Label>
                            <Form.Control as="select" value={sameGender} onChange={handleChange("sameGender")}>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                               
                            </Form.Control>
                            <Form.Text>Please select No if you want to share your cab with same Gender</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Time Slot</Form.Label>
                            <Form.Control as="select">
                                <option>00:00</option>
                                <option>00:30</option>
                                <option>1:00</option>
                                <option>1:30</option>
                                <option>2:00</option>
                                <option>2:30</option>
                                <option>3:00</option>
                                <option>3:30</option>
                                <option>4:00</option>
                                <option>4:30</option>
                                <option>5:00</option>
                                <option>5:30</option>
                                <option>6:00</option>
                                <option>6:30</option>
                                <option>7:00</option>
                                <option>7:30</option>
                                <option>8:00</option>
                                <option>8:30</option>
                                <option>9:00</option>
                                <option>9:30</option>
                                <option>10:00</option>
                                <option>10:30</option>
                                <option>11:00</option>
                                <option>11:30</option>
                                <option>12:00</option>
                                <option>12:30</option>
                                <option>13:00</option>
                                <option>13:30</option>
                                <option>14:00</option>
                                <option>14:30</option>
                                <option>15:00</option>
                                <option>15:30</option>
                                <option>16:00</option>
                                <option>16:30</option>
                                <option>17:00</option>
                                <option>17:30</option>
                                <option>18:00</option>
                                <option>18:30</option>
                                <option>19:00</option>
                                <option>19:30</option>
                                <option>20:00</option>
                                <option>20:30</option>
                                <option>21:00</option>
                                <option>21:30</option>
                                <option>22:00</option>
                                <option>22:30</option>
                                <option>23:00</option>
                                <option>23:30</option>
                            </Form.Control>
                        </Form.Group>
                        <Button  variant="info" size="md" onClick={()=>onSubmit()}>Register</Button>
                        
                    </Form>
                
                
                </Col>
                <Col sm="3"></Col>
            </Row>
            </Container>
           
        </div>
    )
}

export default Register;
