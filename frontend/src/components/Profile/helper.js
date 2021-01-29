
export const getUser =(userId,token)=>{
   return fetch(`http://localhost:5000/db/getUserById?userId=${userId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            'Content-Type':'application-json',
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