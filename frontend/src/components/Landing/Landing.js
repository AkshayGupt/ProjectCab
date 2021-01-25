import React,{useState} from 'react';
import {Row,Col,Form} from 'react-bootstrap';
import './Landing.css';
import Loading from '../../Loading';
import Navigation from '../Navigation/Navigation'
import {Redirect,Link} from 'react-router-dom';
import { signInUser,signUpUser,authenticate } from '../Auth/helper';


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
                <div className="col-md-6 offset-3">
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
                <div className="col-md-6 offset-3">
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
                <div className="col-md-6 offset-3">
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
                        <p className="btn btn-info btn-md" onClick={()=>signin()}>Submit</p>
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
                            (<p className="btn btn-info btn-md" onClick={()=>signup()}>Submit </p>)
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
                <Col md lg="6 border-left" >
                    <Row className="text-center bg-light p-2" style={{  width:"100%"}}>
                        <Col><h5 className={newUser?"btn btn-light":"btn btn-primary"} onClick={()=>{setNewUser(false)}}>SignIn</h5></Col>
                        <Col><h5 className={!newUser?"btn btn-light":"btn btn-primary"} onClick={()=>{setNewUser(true)}}>SignUp</h5></Col>
                    </Row>
                    
                    <div style={{borderStyle:"",height:"auto",width:"100%"}} className="p-3 mx-auto">
                            {newUser?signUp():signIn()}
                    </div>
                     
                </Col>
            </Row>
        </div>
        </>
    )
};

export default Landing;