import React, { useState } from 'react';
import {Route,Redirect} from 'react-router-dom';
import {  isSignedIn, isAuthenticated } from "./helper";



const PrivateRoute = ({component:Component, ...rest})=>{
    
        return(
        isAuthenticated()
        .then(response=>{
            console.log(response);
            if(response.status){
              return  <Route
              {...rest}
              render={ (props)=>
                ( <Component {...props}/>)
              }
              />
            }
            else{
                return  <Route
                {...rest}
                render={ (props)=>
                  ( <Redirect to={{ pathname: "/", state: {from: props.location}}}/>)
                }
                />
            }
        })
    );
};

export default PrivateRoute;