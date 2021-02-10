import React,{useState} from 'react'
import { useParams } from 'react-router-dom'
import {resetUserPassword} from './helper';
const ResetPassword = () => {

    const {resetLink} = useParams();

    const[values,setValues] =useState({
        newPass:"",
        confirmNewPass:"",
        error:"",
        success:false
    });
    
    const {newPass,confirmNewPass,error,success} =values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = () =>{
        if(newPass !== confirmNewPass){
           setValues({...values,error:"Password does not match !!"});
        }
        else{
            setValues({...values,error:""})
        }

        resetUserPassword({newPass,resetLink})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error});
            }
            else{
                setValues({...values,success:true});
            }
        })

    }


    const errorMessage = () =>{
        return (
            <div className="row">
              <div className="col-md-12 ">
                <div
                  className="alert alert-danger"
                  style={{ display: error ? "" : "none" }}
                >
                  <p>{error}</p>
                </div>
              </div>
            </div>
          );
    }
    const successMessage = () =>{
        return (
            <div className="row">
              <div className="col-md-12 ">
                <div
                  className="alert alert-success"
                  style={{ display: success ? "" : "none" }}
                >
                  <p>Password Changed Successfully</p>
                </div>
              </div>
            </div>
          );
    }


    return (
        <div>
            <h1 className="text-center jumbotron">Change Password</h1>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 mx-auto">
                        <form className=" my-4 mx-auto" >
                        {errorMessage()}
                        {successMessage()}
                        <div className="form-group">
                            <label for="exampleInputPassword1">New password</label>
                            <input type="password" className="form-control" name="newPass" onChange={handleChange("newPass")} id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Confirm new password</label>
                            <input type="password" className="form-control"name="confirmNewPass"  onChange={handleChange("confirmNewPass")} id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <div className={success?"d-none":""}><p className="btn btn-primary" onClick={()=>handleSubmit()}>Submit</p></div>
                    </form>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    )
}

export default ResetPassword;
