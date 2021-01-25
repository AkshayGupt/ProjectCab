export const getTripsOfUser = (id, token) =>{
    console.log("Called API : "+id);
    return fetch(`http://localhost:5000/db/getTripsByUserId?id=${id}`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            'Content-Type':'application-json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err);
    })
}