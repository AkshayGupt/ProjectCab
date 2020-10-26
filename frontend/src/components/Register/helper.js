import {API} from '../../backend';

export const register =(trip)=>{
    
    //@debug
    // console.log(trip);

    return fetch(`${API}/register`,{
        method:'POST',
        headers:{
            Accept: "application/json",
            'Content-Type':'application/json'
        },
        body:JSON.stringify(trip)
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>console.log(err));
};