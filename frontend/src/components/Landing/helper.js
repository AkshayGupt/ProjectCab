export const forgotUserPassword = (data) =>{
    return fetch('http://localhost:5000/auth/forgotPassword',{
        method:'PUT',
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