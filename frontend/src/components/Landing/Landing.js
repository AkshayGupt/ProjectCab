import React,{useState} from 'react';
import {Row,Col,Container} from 'react-bootstrap';
import './Landing.css';
import LoginWithGoogle from './LoginWithGoogle';
import { isSignedIn } from '../Auth/helper';
import Loading from '../../Loading';


const Landing = ()  =>{

    const [load,setLoad] = useState(false);

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


    return(
        <div>
              <div className="Landing-Page">
            <div className="text-center">
            <div>
                <p className="Landing-heading text-light">Want to Save Money, Pool it!</p>
            </div>
       
            <Container>
            <Row className="justify-content-md-center">
                <Col></Col>
                <Col sm="auto" > 
                    <div className="box">
                        <div className="sign-in mt-3 ml-4">
                            {load?<Loading/>:""}
                            {!isSignedIn()?(<LoginWithGoogle toggleLoading={toggleLoading}/>): (<a href="/status" className="btn btn-lg btn-light">Check Status <i class="fa fa-search" aria-hidden="true"></i></a>)}
                        </div>
                    </div>
                </Col>
                <Col></Col>
            </Row>
            </Container>
            /div>
            </div>
            </div>
              
        </div>
          
            

    );
};

export default Landing;