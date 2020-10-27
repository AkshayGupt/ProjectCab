import React,{useState} from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import {signin} from './helper';
const LoginWithGoogle = () =>{

    const [redirect,setRedirect] = useState(false);

    const redirectToHomePage = () =>{
        if(redirect){
            return <Redirect to="/status"/>
        }
    }

    const signup =(res) =>{
        const googleresponse = {
            name:res.profileObj.name,
            email:res.profileObj.email,
            id_token:res.wc.id_token,
            Image:res.profileObj.imageUrl,
            ProviderId:'Google'
        };
        // debugger;    

        localStorage.setItem("name",googleresponse.name);

        signin(googleresponse)
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                console.log("Data Returned From Firebase:",data);
                setRedirect(true);
            }
        })
        .catch();
        
    }

    const responseGoogle = (response) => {
            var res = response.profileObj;
            signup(response);
    }

    return(
        <div>
            {redirectToHomePage()}
            <GoogleLogin
                clientId="75919986643-5sm5ivl89jlterfa2f4qi3g183btlj52.apps.googleusercontent.com"
                buttonText="Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
        </div>
      
    );
};

export default LoginWithGoogle;