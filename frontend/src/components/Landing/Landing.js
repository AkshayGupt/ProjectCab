import React,{useState} from 'react';
import {Row,Col,Form} from 'react-bootstrap';
import './Landing.css';
import Loading from '../../Loading';
import Navigation from '../Navigation/Navigation'
import {Redirect} from 'react-router-dom';
import { signInUser,signUpUser } from './helper';


const Landing = ()  =>{

    const [load,setLoad] = useState(false);
    const [newUser,setNewUser] = useState(false);
    const [signUpData,setSignUpData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        retypedPassword:""
    });
    const [signInData,setSignInData] = useState({
        email:"test@hotmail.com",
        password:"12345678"
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
        signInUser(signInData)
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                localStorage.setItem("id",data.user._id);
                localStorage.setItem("email",data.user.email);
                localStorage.setItem("name",data.user.firstName);
                setRedirect(true);
                console.log(data);
            }
        })
        .catch(err=>console.log(err));
    }
    const signup = () =>{
        const signUpCred =signUpData;
        delete signUpCred.retypedPassword;
        signUpUser(signUpCred)
        .then(data=>{
            if(data.error){

                console.log(data.error);
            }
            else{
                console.log(data);
            }
        })
        .catch(err=>console.log(err));
    }

    const signIn = () =>{
        return (
            <div> 
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
                        <p className="btn btn-info" onClick={()=>signin()}>Submit</p>
                    </div>    
                </Form>
            </div>
        )
    }

    const signUp = () =>{
        return (
            <div> 
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
                        <Form.Control type="password" name="retyped-password" id="retyped-password" placeholder="Re-enter password" onChange={handleSignUpChange("retypedPassword")}/>
                    </Form.Group>
                    <div className="text-center">
                        {signUpData.password === signUpData.retypedPassword
                            ?
                            (<p className="btn btn-info" onClick={()=>signup()}>Submit </p>)
                            :
                            ( <p className="text-danger">Password does not match ! </p>)
                        }
                    </div>    
                </Form>  
            </div> 
        )
    }

    return(
        <>
        {redirectToHomePage()}
        <Navigation/>
        <div className="container">
            <Row style={{marginTop:"2rem"}} className="justify-content-md-center mx-auto">
                <Col md lg="6" >
                    <div className="mx-auto">
                        <img className="image" src="https://cdn4.vectorstock.com/i/1000x1000/17/68/dark-cab-silhouette-with-taxi-sign-vector-1111768.jpg" style={{width:"100%",height:"500px"}}></img>
                    </div>
                </Col>
                <Col md lg="6">
                    <Row className="mx-auto text-center bg-light p-2" style={{borderStyle:"solid",width:"100%"}}>
                        <Col><h5 className={newUser?"btn btn-light":"btn btn-primary"} onClick={()=>{setNewUser(false)}}>SignIn</h5></Col>
                        <Col><h5 className={!newUser?"btn btn-light":"btn btn-primary"} onClick={()=>{setNewUser(true)}}>SignUp</h5></Col>
                    </Row>
        
                    <div style={{borderStyle:"solid",height:"auto",width:"100%"}} className="p-3 mx-auto">
                            {newUser?signUp():signIn()}
                    </div>
                     
                </Col>
            </Row>
        </div>
        </>
    )
};

export default Landing;