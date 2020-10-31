import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {  isSignedIn } from "./helper";



const PrivateRoute = ({component:Component, ...rest})=>{

  return(
    <Route
    {...rest}
    render={(props)=>
        isSignedIn()?
        (<Component {...props}/>)
        :(
            <Redirect to={{ pathname: "/", state: {from: props.location}}}/>
        )
    }
    />
);
};

export default PrivateRoute;