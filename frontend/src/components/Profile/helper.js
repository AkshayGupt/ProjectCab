
export const getUser =(userId,token)=>{
   return fetch(`http://localhost:5000/db/getUserById?userId=${userId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        return err;
        console.log(err);
    })
}

export const updateUserBio =(userId,token,data)=>{
    console.log("data",data);
    return fetch(`http://localhost:5000/db/updateUserBio?userId=${userId}`,{
         method:"PUT",
         headers:{
             Accept:'application/json',
             'Content-Type':'application/json',
             Authorization:`Bearer ${token}`
         },
         body:JSON.stringify({bio:data})
     })
     .then(res=>{
         return res.json();
     })
     .catch(err=>{
         return err;
         console.log(err);
     })
 }