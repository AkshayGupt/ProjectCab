export const getTripsOfUser = (id) =>{
    console.log("Called API : "+id);
    return fetch(`http://localhost:5000/db/getTripsByUserId?id=${id}`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            'Content-Type':'application-json'
        },
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err);
    })
}