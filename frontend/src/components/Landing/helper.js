import {API} from '../../backend';


export const signInUser = (data) =>{
    console.log("HELPER: ",data);
    return fetch('http://localhost:5000/auth/signIn',{
        method:'POST',
        headers:{
            Accept: "application/json",
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>console.log(err));
};

export const signUpUser = (data) =>{
    return fetch('http://localhost:5000/auth/signup',{
        method:'POST',
        headers:{
            Accept: "application/json",
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>console.log(err));
};