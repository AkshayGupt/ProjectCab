import { set } from 'js-cookie';
import React,{useEffect,useState} from 'react';
import {useParams}  from 'react-router-dom';
import Loading from "../../Loading/Loading";
import {activateUserEmail} from './helper';

const EmailActivation = () => {

    const {token} =useParams();

    const [values,setValues] = useState({
        success:false,
        error:"",
        loading:true
    })
    
    const {success,error,loading} = values;
    
    const activate = () =>{
        activateUserEmail(token)
        .then(data=>{
            if(data.error){
                setValues({...values,loading:false,error:data.error});
            }
            else{
                setValues({...values,loading:false,success:true});
            }
        })
    }
    
    const activationErrorMessage = ()=>{ 
        return(
            <div className="row">
                <div className="col-md-12 ">
                    <div className="alert alert-danger" style={{display: error ? "":"none"}}>
                        <h2 className="text-center">Verification failed!!</h2>
                        <p className="text-center">{error}</p>
                    </div>
                 </div>
            </div>
        );
    }
    const activationSuccessMessage = ()=>{ 
        return(
            <div className="row">
                <div className="col-md-12 ">
                    <div className="alert alert-success" style={{display: success ? "":"none"}}>
                        <h2 className="text-center">Account Successfully Validated</h2>
                        <h4 className="text-center">Your email is verified !</h4>
                        <p className="text-center mx-auto"><a href="/" className="btn btn-primary btn-small mx-auto text-center" >LogIn here</a> </p>
                    </div>
                    </div>
            </div>
        );
    }
    
    useEffect(()=>{
        activate();
    },[])
    return (
        <div>
            <h1 className="text-center my-auto bg-info py-5 text-light" >Activation Page</h1>
            {loading && <Loading/>}
            {activationErrorMessage()}
            {activationSuccessMessage()}
        </div>
    )
}

export default EmailActivation
