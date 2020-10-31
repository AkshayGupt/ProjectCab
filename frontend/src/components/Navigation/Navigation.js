import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import LoginWithGoogle from '../Navigation/Navigation';
import {signOut, isSignedIn} from '../Auth/helper';
const Navigation = () => {
    const[redirect,setRedirect] = useState(false);
    const signout = () =>{
        signOut()
        setRedirect(true);
    }

    const redirectToLandingPage = () =>{
        if(redirect){
            return <Redirect to ="/" />
        }
    }
    return (
        <div>
            <nav className="navbar navbar-light bg-dark">
            <a className="navbar-brand text-white" href="/">ProjectCab</a>
            <div className="sign-in mt-3 ml-4">
                         
                <form className="form-inline">
                    {
            
                        
                          <div className="sign-in mt-3 ml-4">
                                {!isSignedIn()?(<LoginWithGoogle/>): (<button className="btn btn-info" onClick={()=>signout()}>Logout</button>)}
                            </div>
                    }
                
                </form>
            </div>
            </nav>
        </div>
    )
}

export default Navigation;
