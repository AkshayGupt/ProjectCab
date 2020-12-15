import React,{useState,useEffect} from 'react';
import Navigation from '../Navigation/Navigation';    
import './Profile.css';
const Profile =()=> {

    const [profile,setProfile] =useState({
        name:"",
        email:"",
        photo:"",
    });

    const setDetails =() =>{
        const name =localStorage.getItem("name");
        const email =localStorage.getItem("email");
        const image =localStorage.getItem("image");
        setProfile({...profile,name,email,photo:image});
    }
    
    useEffect(() => {
        setDetails();
    }, [])

    return (
        <>
        <div className="body bg-info">
            <div className="container">
            <div className="row mx-auto">
                <div className="col-3"></div>
                <div className="col-lg-6 col-sm-12 ml-3 mt-5 mb-5 ">
                    <div className="card hovercard">
                        <div className="cardheader">
                        </div>
                        <div className="avatar">
                            <img alt="Profile" src={profile.photo} />
                        </div>
                        <div className="info">
                            <div className="title">
                                {profile.name}
                            </div>
                            <p className="muted">{profile.email}</p>
                        </div>
                        <div className="card-body">
                            <p>
                                3rd Year Btech -CSE
                            </p>
                            <p>
                            Gray, short hair slightly reveals a bony, radiant face. Glittering green eyes, set appealingly within their sockets.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-3"></div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile;
