import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Row,Col,Container,Form,Button,Badge} from 'react-bootstrap';
import './Register.css';
import TimeSlot from './TimeSlot';
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

    let st;
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

    function returnTrue(){
        return true;
    }

    const handleStart =(str)=> {
        st=new Date(str);
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
        setStart({...start,month:parseInt(mnth),date:parseInt(day),year:date.getFullYear(),hours:hrs,minutes:mins,seconds:secs});
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
        setEnd({...start,month:parseInt(mnth),date:parseInt(day),year:date.getFullYear(),hours:hrs,minutes:mins,seconds:secs});
    }

    const onSubmit=()=>{

        if(name === "" || phone === 0 || destination === "Select" || gender === "Select" || start.date === 0 || end.date === 0){
            alert("Please fill all the entries!");
            return;
        }

        const obj={name,gender,phone,destination,cabSize,sameGender,start,end};

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
                            <a href="/status" className="btn btn-dark"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
                        </Form.Group>
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
                        <p>{JSON.stringify(start)}</p>
                        <br></br>
                        <TimeSlot text="Start Time" handleEvent={handleStart} time={start.date} />
                        <br></br>
                        <TimeSlot text="End Time" handleEvent={handleEnd} timeSlotValidator={timeSlotValidator} time={end.date}/>
                        
                        <div className="text-center">
                            <Button  variant="info" size="lg" onClick={()=>onSubmit()}>Register</Button>
                        </div>
                      
                    </Form>

                </Col>
                <Col sm="3"></Col>
            </Row>
            </Container>
           
        </div>

    )

    
   
};

export default Register;
