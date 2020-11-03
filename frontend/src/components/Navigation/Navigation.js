import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import LoginWithGoogle from '../Navigation/Navigation';
import {signOut, isSignedIn} from '../Auth/helper';
const Navigation = () => {
    const[redirect,setRedirect] = useState(false);
    const signout = () =>{
        signOut();
        setRedirect(true);
    }

    const redirectToLandingPage = () =>{
        if(redirect){
            return <Redirect to ="/" />
        }
    }

    return (
        <div>
            {redirectToLandingPage()}
            <nav className="navbar navbar-light bg-dark">
            <a className="navbar-brand text-white" href="/">ProjectCab</a>
            <div className="sign-in">
                            
                <form className="form-inline">
                    {
                          <div className="sign-in my-auto">
                                {!isSignedIn()?(""): (<p className="text-white" onClick={()=>signout()}>Logout</p>)}
                            </div>
                    }
                
                </form>
            </div>
            </nav>
        </div>
    )
}

export default Navigation;
