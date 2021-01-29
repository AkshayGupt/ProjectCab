import React,{useState,useEffect} from 'react';
import Navigation from '../Navigation/Navigation';  
import {getUser } from './helper';  
import {isAuthenticated} from '../Auth/helper';
import './Profile.css';
import Loading from '../../Loading';
const Profile =({editAllowed=false,userId})=> {

    const [profile,setProfile] =useState({
        firstName:"",
        lastName:"",
        email:"",
        trips:[],
        loading:true,
        error:"",
        bio:"Ad sdsdsddd"
    });
    const[ editBio, setEditBio ] =useState(false);

    const {firstName,lastName,email,trips,loading,error,bio} = profile;

    const setDetails =(userId) =>{
        const jwt =isAuthenticated();
        const {token} =jwt;
        console.log("USER Id",userId);
     getUser(userId,token)
        .then(data=>{
            console.log("Data -> ")
            if(data.error){
                console.log(data.error);
            }
            else{
                setProfile({
                    ...profile,
                    email:data.email,
                    firstName:data.firstName,
                    lastName:data.lastName,
                    trips:data.trips,
                    loading:false
                })
                console.log(data);
            }
        })
        .catch(err=>console.log(err));
    }

    useEffect(()=>{
        setDetails(userId);
    },[])

    const loadingF = () =>{
        if(loading){
            return(
                <h1>Loading....</h1>
            )
        }
    }

    const handleChange = name=>event=>{
        setProfile({...profile,[name]:event.target.value})
    }

    const updateProfile = () =>{
        setEditBio(false);

        /**
         * API CALL: To update User profile
         */
    }

    const profileF = () =>{
        return(
                 <div className="card user-card-full">
                    <div className="row m-l-0 m-r-0">
                        <div className="col-sm-4 bg-c-lite-green user-profile">
                            <div className="card-block text-center text-white ">
                                <div className="m-b-25"> <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image" style={{height:"150px"}}/> </div>
                                <h6 className="f-w-600">{firstName} {lastName}</h6>
                                <p>{trips.length} trips</p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="card-block">
                                <h6 className="m-b-20 p-b-5 b-b-default f-w-600"> User Information</h6>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p className="m-b-10 f-w-600">Email</p>
                                        <h6 className="text-muted f-w-400">{email}</h6>
                                    </div>
                                    {/* <div className="col-sm-6">
                                        <p className="m-b-10 f-w-600">Phone</p>
                                        <h6 className="text-muted f-w-400"></h6>
                                    </div> */}
                                </div>
                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Bio <a href="#" className={editAllowed?"":"d-none"} style={{fontSize:"12x"}} onClick={()=>setEditBio(true)}>Edit</a></h6>
                                <div className="form-group">
                                    {/* <label for="exampleFormControlTextarea1">Bio</label> */}
                                    <textarea className="form-control" id="exampleFormControlTextarea1"  name="bio"  onChange={handleChange("bio")}  value={bio} rows="3" disabled={!editBio} ></textarea>
                                </div>
                                <br></br>
                                <p className={editBio?"btn btn-sm btn-info":"d-none"} onClick={()=>updateProfile()} >Update</p>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

    return (
        

<div className="page-content page-container" id="page-content">
    <div className="padding"> 
        <div className="row container d-flex justify-content-center">
            <div className="col-xl-6 col-md-12">
               {loading?loadingF():profileF()}
            </div>
        </div>
    </div>
</div>
    )
}

export default Profile;
