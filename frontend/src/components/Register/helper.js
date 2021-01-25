import {API} from '../../backend';

export const createNewTrip =(trip,token)=>{
    
    //@debug
    return fetch(`http://localhost:5000/db/createNewTrip`,{
        method:'POST',
        headers:{
            Accept: "application/json",
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(trip)
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>console.log(err));
};

