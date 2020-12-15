import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Row,Col,Container,Form,Button,Badge} from 'react-bootstrap';
import './Register.css';
import TimeSlot from './TimeSlot';
import Confirm from './Confirm';

import Navigation from '../Navigation/Navigation';    
const Register=() =>{

    const [confirm,setConfirm] = useState(false);
    const [values,setValues] = useState({
        source:"Manipal Jaipur",
        destination:"Select",
        cabSize:2,
        sameGender:"yes",
        error:"",
        success:false
    });
    const{source,destination,cabSize,sameGender,success,error} = values;

    const handleChange = name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    }
    const[start,setStart] =useState({
        date:0,
        month:0,
        year:0,
        hours:0,
        minutes:0,
        seconds:0
    });

    const[end,setEnd] =useState({
        date:0,
        month:0,
        year:0,
        hours:0,
        minutes:0,
        seconds:0
    });

    function timeSlotValidator(slotTime) {
        const eveningTime = new Date(
          start.year,
          start.month-1,
          start.date,
          start.hours,
          start.minutes,
          start.seconds
        );
        const isValid = slotTime.getTime() > eveningTime.getTime();
        return isValid;
    }

    const handleStart =(str)=> {
        // console.log(str);
        var date = new Date(str);
        const splitted =date.toString().split(" ");
        const time = (splitted[4]);
        const res =time.split(":");
        const hrs= parseInt(res[0]);
        const mins= parseInt(res[1]);
        const secs= parseInt(res[2]);
        var dt = new Date(str),
        mnth = ("0" + (dt.getMonth() + 1)).slice(-2),
        day = ("0" + dt.getDate()).slice(-2);  
        setStart({month:parseInt(mnth),date:parseInt(day),year:date.getFullYear(),hours:hrs,minutes:mins,seconds:secs});
    }

     const handleEnd = (str) => {
        var date = new Date(str);
        const splitted =date.toString().split(" ");
        const time = (splitted[4]);
        const res =time.split(":");
        const hrs= parseInt(res[0]);
        const mins= parseInt(res[1]);
        const secs= parseInt(res[2]);
        var dt = new Date(str),
        mnth = ("0" + (dt.getMonth() + 1)).slice(-2),
        day = ("0" + dt.getDate()).slice(-2);
        setEnd({...end,month:parseInt(mnth),date:parseInt(day),year:date.getFullYear(),hours:hrs,minutes:mins,seconds:secs});
    }

    const onSubmit=()=>{

        if(destination === "Select" || start.date === 0 || end.date === 0){
            alert("Please fill all the entries!");
            return;
        }
        const obj={source,destination,cabSize,sameGender,start,end};

        console.log(obj);
        setConfirm(true);
        //temporary to redirect to status page
        // setValues({...values,success:true})        
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
    const register = () =>{
        return (<div>
        <div className="body">
                <div className="mb-3">
                    <h1 className="text-center register-heading text-light">  <h1 className="text-center text-light display-3">Create new Trip <i class="fa fa-pencil" aria-hidden="true"></i></h1></h1>
                </div>
               
                <Container>
                <Row>
                    <Col sm='3'>
                        <div style={{float:"right",margin:10}}>
                                    <a href="/status" className="btn btn-info btn-lg"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</a>
                        </div>
                           
                    </Col>
                    <Col>                     
                        <Form>
                            <Form.Group >
                                <Form.Label >Source</Form.Label>
                                <Form.Control as="select" value={source} onChange={handleChange("source")}>
                                    <option value="Select">Manipal Jaipur</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Destination</Form.Label>
                                <Form.Control as="select" value={destination} onChange={handleChange("destination")}>
                                    <option value="Select">Select</option>
                                    <option value="airport">Airport</option>
                                    <option value="railway station">Railway Station </option>
                                    <option value="sindhi camp">Sindhi Camp</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Max Cab size <i class="fa fa-users" aria-hidden="true"></i></Form.Label>
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
                            <br></br>
                        </Form>
                        <h1 className="text-center"><i className="fa fa-calendar" aria-hidden="true"></i></h1>  <br/>
                        <TimeSlot text="Start Time" handleEvent={handleStart} time={start.date}/>
                        <TimeSlot text="End Time" handleEvent={handleEnd} timeSlotValidator={timeSlotValidator} time={end.date}/>
                            <div className="text-center my-5">
                                <Button  variant="info" size="lg" onClick={()=>onSubmit()}>Create Trip</Button>
                            </div>
                          
                    </Col>
                    <Col sm="3"></Col>
                </Row>
                </Container>
            </div></div>)
        
    }
   

    return (
        <div>
            {onSuccessfulRegister()}
            {confirm?<Confirm trip={{source,destination,cabSize,sameGender,start,end}}/>:register()}
        </div>

    )

    
        };

export default Register;
