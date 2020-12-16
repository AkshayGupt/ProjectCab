import React,{useState} from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import {signin} from './helper';
import Loading from '../../Loading';
const LoginWithGoogle = ({ toggleLoading}) =>{

    const [redirect,setRedirect] = useState(false);
    
    const redirectToHomePage = () =>{
        if(redirect){
            return <Redirect to="/status"/>
        }
    }

    const signup =(res) =>{
        console.log(res);
        const googleresponse = {
            name:res.profileObj.name,
            email:res.profileObj.email,
            id_token:res.tokenId,
            Image:res.profileObj.imageUrl,
            ProviderId:'Google'
        };
        // debugger;    

        signin(googleresponse)
        .then(data=>{
            console.log(data);
            if( !data || data.error){
                console.log(data.error);
                toggleLoading();
            }
            else{
                console.log("Data Returned From Firebase:",data.user);
                localStorage.setItem("UID",data.user.uid);
                localStorage.setItem("email",data.user.email);
                localStorage.setItem("name",data.user.displayName);
                localStorage.setItem("image",data.user.photoURL);
                setRedirect(true);
            }
        })
        .catch();
        
    }

    const responseGoogle = (response) => {
        toggleLoading();
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