import React, { useState } from 'react';
import {Route,Redirect} from 'react-router-dom';
import {  isAuthenticated } from "./helper";



const PrivateRoute = ({component:Component, ...rest})=>{
const checkAuthentication = async() =>{
    await isAuthenticated()
    .then(data=>{
        console.log(data);
        if(data.status === true){
            console.log("!!!!!!!!!")
           return true;
        }
        else{
            return false;
        }
    })
    .catch(err=> console.log("ERROR"));
}

    
    
    return(
        <Route
        {...rest}
        render={ (props)=>
            (checkAuthentication()?
            ( <Component {...props}/>)
            :(
                <Redirect to={{ pathname: "/", state: {from: props.location}}}/>
            )
            )
        }
        />
    );
};

export default PrivateRoute;