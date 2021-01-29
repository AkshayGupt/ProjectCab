import React,{useState} from 'react';
import {Row,Col,Form,Carousel} from 'react-bootstrap';
import './Landing.css';
import Loading from '../../Loading';
import Navigation from '../Navigation/Navigation'
import {Redirect,Link} from 'react-router-dom';
import { signInUser,signUpUser,authenticate } from '../Auth/helper';
import { auto } from '@popperjs/core';


const Landing = ()  =>{

    const [load,setLoad] = useState(false);
    const [newUser,setNewUser] = useState(false);
    const [signUpData,setSignUpData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        retypedPassword:"",
        success:false,
        error:""
    });
    const [signInData,setSignInData] = useState({
        email:"test@hotmail.com",
        password:"12345678",
        loading:false,
        error:""
    });
    const [redirect,setRedirect] = useState(false);


    const handleSignInChange = name=>event=>{
        setSignInData({...signInData,[name]:event.target.value})
    }
    const handleSignUpChange = name=>event=>{
        setSignUpData({...signUpData,[name]:event.target.value})
    }


    const toggleLoading = () =>{
        setLoad(!load);
    }

    const loading = () =>{
         return <Loading/>
    }

    const loginPage = () =>{
        return(
            <>
          
            </>
        );
    }
    const redirectToHomePage = () =>{
        if(redirect){
            return <Redirect to="/dashboard"/>
        }
    }

    const signin = () =>{
        const {email,password} =signInData;
        signInUser({email,password})
        .then(data=>{
            if(data.error){
               setSignInData({
                   ...signInData,
                   error:data.error
               })
            }
            else{
                console.log(data)
                authenticate(data,()=> {
                    setRedirect(true);
                });
            }
        })
        .catch(err=>console.log(err));
    }

    const loadingMessage = ()=>{   
        return(
                signInData.loading && (
                    <div className="alert alert-info">
                        <h2>Loading...</h2>
                    </div>
                )
           );   
    }

    const signInErrorMessage = ()=>{
        return(
            <div className="row">
                <div className="col-md-12 offset">
                    <div className="alert alert-danger"
                     style={{display:  signInData.error ? "":"none"}}>
                        { signInData.error}
                    </div>
                 </div>
            </div>
        ); 
    }

    const signup = () =>{
        const signUpCred =signUpData;
        delete signUpCred.retypedPassword;
        signUpUser(signUpCred)
        .then(data=>{
            if(data.error){
                setSignUpData({
                    ...signUpData,
                    firstName:"",
                    lastName:"",
                    email:"",
                    password:"",
                    retypedPassword:"",
                    error:data.error
                })
            }
            else{
                setSignUpData({
                    ...signUpData,
                    firstName:"",
                    lastName:"",
                    email:"",
                    password:"",
                    retypedPassword:"",
                    success:true
                })
                console.log(data);
            }
        })
        .catch(err=>console.log(err));
    }
    const signUpSuccessMessage = ()=>{
        
        return(
            <div className="row">
                <div className="col-md-12 ">
                <div className="alert alert-success" style={{display: signUpData.success ? "":"none"}}>
                    <p>Successfully created your account. <a className="text-primary" onClick={()=>setNewUser(false)}>Login Here</a></p>
                </div>       
                </div>
            </div>
           );
    }
    const signUpErrorMessage = ()=>{ 
        return(
            <div className="row">
                <div className="col-md-12 ">
                    <div className="alert alert-danger" style={{display: signUpData.error ? "":"none"}}>
                        <p>{signUpData.error}</p>
                    </div>
                 </div>
            </div>
        );
    }

    const signIn = () =>{
        return (
            <div> 
               {loadingMessage()}
               {signInErrorMessage()}
                {/* {JSON.stringify({signInData})} */}
                <Form style={{width:"auto",height:"auto"}}>
                    <h1 className="text-center pb-5">Sign In</h1>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={signInData.email} id="email" placeholder="abc@xyz.com" onChange={handleSignInChange("email")}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" id="password" value={signInData.password} placeholder="Enter password" onChange={handleSignInChange("password")}/>
                    </Form.Group>
                    <div className="text-center ">
                        <p className="btn btn-info btn-md btn-lg" onClick={()=>signin()}>Submit</p>
                    </div>    
                </Form>
            </div>
        )
    }

    const signUp = () =>{
        return (
            <div> 
              {signUpSuccessMessage()}
              {signUpErrorMessage()}
                <Form style={{width:"auto",height:"auto"}}>
                    <h1 className="text-center pb-5">Sign Up</h1>
                    <Form.Group>
                        <Form.Label>FirstName</Form.Label>
                        <Form.Control type="firstname" name="firstname" id="firstname" value={signUpData.firstName} placeholder="Your first name" onChange={handleSignUpChange("firstName")}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>LastName</Form.Label>
                        <Form.Control type="lastname" name="lastname" id="lastname" value={signUpData.lastName} placeholder="Your last name" onChange={handleSignUpChange("lastName")}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" id="email" value={signUpData.email} placeholder="abc@xyz.com" onChange={handleSignUpChange("email")}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" id="password" value={signUpData.password} placeholder="Enter password" onChange={handleSignUpChange("password")}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="retyped-password" id="retyped-password" value={signUpData.retypedPassword} placeholder="Re-enter password" onChange={handleSignUpChange("retypedPassword")}/>
                    </Form.Group>
                    <div className="text-center">
                        {signUpData.password === signUpData.retypedPassword
                            ?
                            (<p className="btn btn-info btn-lg" onClick={()=>signup()}>Submit </p>)
                            :
                            ( <p className="text-danger">Password does not match ! </p>)
                        }
                    </div>    
                </Form>  
            </div> 
        )
    }

    const slideShow = () =>{
        return(
            <Carousel>
                <Carousel.Item interval={200}>
                    <img
                    className="d-block w-100"
                    src="https://thumbs.dreamstime.com/b/carpool-banner-set-modern-taxi-flat-illustration-commercial-service-vehicle-transportation-cooperation-transitional-geo-point-143648884.jpg"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                    className="d-block w-100"
                    src="https://cdn4.vectorstock.com/i/1000x1000/07/78/friends-in-a-car-vector-21380778.jpg"
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://static.vecteezy.com/system/resources/previews/000/143/153/non_2x/carpool-vector.jpg"
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
        )
    }

    return(
        <>
        {redirectToHomePage()}
        <Navigation/>
        <div className="container">
            <Row style={{marginTop:"2rem"}} className="mx-auto ">
                <Col md lg="6" className="image mb-5 " >
                    <div className="mx-auto">
                        {slideShow()}
                       </div>
                </Col>
                <Col md="12" lg="6" className="border-left border-right border-top border-bottom mb-3 " >
                    <Row className="text-center bg-light p-2 mx-auto" style={{  width:"100%"}}>
                        <Col className="border-right"><h5 className={newUser?"btn btn-light":"btn btn-info px-1"} onClick={()=>{setNewUser(false)}}>SignIn</h5></Col>
                        <Col><h5 className={!newUser?"btn btn-light":"btn btn-info px-1"} onClick={()=>{setNewUser(true)}}>SignUp</h5></Col>
                    </Row>
                    
                    <div style={{height:"auto",width:"100%"}} className="p-3 mx-auto">
                            {newUser?signUp():signIn()}
                    </div>
                     
                </Col>
            </Row>
        </div>
        </>
    )
};

export default Landing;