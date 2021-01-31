export const getFutureTrips = (id, token) =>{
    console.log("Called API : "+id);
    return fetch(`http://localhost:5000/db/getFutureTrips?userId=${id}`,{
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
export const getOngoingTrips = (id, token) =>{
    console.log("Called API : "+id);
    return fetch(`http://localhost:5000/db/getOngoingTrips?userId=${id}`,{
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
export const getPastTrips = (id, token) =>{
    console.log("Called API : "+id);
    return fetch(`http://localhost:5000/db/getPastTrips?userId=${id}`,{
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