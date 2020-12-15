import {API} from '../../backend';


export const signin = (googleResponse) =>{
    console.log("HELPER: ",googleResponse);
    return fetch('http://localhost:5000/signIn',{
        method:'POST',
        headers:{
            Accept: "application/json",
            'Content-Type':'application/json'
        },
        body:JSON.stringify(googleResponse)
    })
    .then(res=>{
        
        return res.json();
    })
    .catch(err=>console.log(err));
};