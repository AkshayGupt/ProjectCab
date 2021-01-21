import React,{useState} from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
// import {signin,signIn} from './helper';
import Cookies from 'js-cookie';
import Loading from '../../Loading';
const LoginWithGoogle = ({ toggleLoading}) =>{

    const [redirect,setRedirect] = useState(false);
    
    const redirectToHomePage = () =>{
        if(redirect){
            return <Redirect to="/status"/>
        }
    }

    const signup =(res) =>{
        console.log("Response");
        console.log(res.error);
        if(res.error){
            console.log("Reeturning")
            return;
        }
        const googleresponse = {
            name:res.profileObj.name,
            email:res.profileObj.email,
            id_token:res.tokenId,
            Image:res.profileObj.imageUrl,
            ProviderId:'Google'
        };
        // debugger;    

        // signin(googleresponse)
        // .then(data=>{
        //     console.log(data);
        //     if( !data || data.error){
        //         console.log(data.error);
               
        //     }
        //     else{
        //         toggleLoading();
        //         console.log("Data Returned From Firebase:",data.user);
        //         localStorage.setItem("UID",data.user.uid);
        //         localStorage.setItem("email",data.user.email);
        //         localStorage.setItem("name",data.user.displayName);
        //         localStorage.setItem("image",data.user.photoURL);
        //         setRedirect(true);
        //     }
        // })
        // .catch();
        
    }

    const responseGoogle = (response) => {
        // toggleLoading();
       signup(response);
    }

    const signInWithGoogle = () =>{
        console.log("Inside1");
        const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
        Cookies.set('lastLocation_before_logging',`http://localhost:3000/`, { expires: inOneHour });
        window.location.href = `http://localhost:5000/auth/signIn`;
        // signIn()
        // .then(data=>{
        //     if(data.error){
        //         console.log(data.error);
        //     }
        //     else{
        //         toggleLoading();
        //         console.log("Data Returned From Firebase:",data.user);
        //         localStorage.setItem("UID",data.user._id);
        //         // localStorage.setItem("email",data.user.email);
        //         localStorage.setItem("name",data.user.firstName);
        //         localStorage.setItem("image",data.user.image);
        //         setRedirect(true);
        //     }
        // })
        // .catch(err=>{
        //     console.log(err);
        // })
    }
   

    return(
        <div>      
            {redirectToHomePage()}
            <p className="btn btn-primary" onClick={()=>{signInWithGoogle()}}>SignIn with Google</p>
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