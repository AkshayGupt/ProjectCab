import React,{useState,useEffect} from 'react';
import Calendar from "react-calendar";
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './Trip.css'
import { Row,Col,Container } from 'react-bootstrap';
import TripCard from './TripCard';
import { getTripsOfUser } from './helper';
const Trips = () => {

    const [value, onChange] = useState(new Date());
    const[loading,setLoading] =useState(true);
    const[trips,setTrips] =useState([]);    
    const[mark,setMark] = useState([]);

    const getTrips = () =>{
        const UID =localStorage.getItem("id");
        getTripsOfUser(UID)
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                console.log("Data",data);
                setTrips(data);
                console.log("TRIPS",trips);
                setLoading(false);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    useEffect(() => {
        setTimeout(()=>{
            getTrips();
        },1000)
     
    }, [])

    return (
        <div className="mx-auto mt-5">
           
           <Row>
                <Col md lg="8">
                <h1 className="text-center mb-5 ">Trips <a href="/register"><i style={{fontSize:"50px",marginLeft:"5px"}} className="fa fa-plus-square-o" aria-hidden="true" ></i></a></h1>
                {/* <p className="ml-3 text-center">Create a new Trip <a href="/register"><i style={{fontSize:"50px",marginLeft:"20px"}} className="fa fa-plus-square-o" aria-hidden="true" ></i></a></p> */}
                <div>
                <Container>
                    <Row>
                        <Col>
                            <Container>
                                {loading?<div>
                                    <div md="mx-auto text-center mb-2">
                                        <div className="wrapper text-center mx-auto">
                                            <h4> </h4>
                                            <div className="card-loader card-loader--tabs"></div>
                                        </div>
                                    </div>                                   
                                </div>
                                :
                                <Row>
                                    {/* {JSON.stringify(trips[0])} */}
                                        {trips.length>0 &&(trips).map((tripp)=>{
                                            return   <Col md="4 text-center mb-2" lg="6">
                                            <TripCard
                                                trip={{
                                                    source:tripp.source,
                                                    destination:tripp.destination,
                                                    members:tripp.members,  
                                                    start:tripp.startTime,
                                                    end:tripp.endTime
                                                }}
                                            />
                                            </Col>
                                        })} 
                                        {trips.length == 0 && (
                                            <h5>It seems you have not created a trip yet !</h5>
                                        )}
                                    
                                    
                                    
                                </Row>}
                            </Container>
                        </Col>
                        {/* <Col sm="1"></Col> */}
                    </Row>
                </Container>
            </div>
                </Col>
                <Col md lg="3">
                <h1 className="text-center mb-5 mx-auto">Your Dates</h1>
                    <Calendar
                        className="mr-1 mx-auto"
                        style={{ height: 500 }}
                        onChange={onChange}
                        value={value}
                        tileClassName={({ date, view }) => {
                        if(mark.find(x=> x === moment(date).format("DD-MM-YYYY"))){
                        return  'highlight'
                        }
                        }}
                        tileDisabled={({ date }) => date.getDay() === 0}
                        minDate={
                        new Date()
                        }
                    >
                    </Calendar>
                </Col>
                <Col md lg="1"></Col>
            </Row> 
        </div>
    )
}

export default Trips;