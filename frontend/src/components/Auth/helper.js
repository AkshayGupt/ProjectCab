export const isAuthenticated = () =>{
return fetch(`http://localhost:5000/authStatus`,{
    method:"GET"
    })
    .then(response=>{
        return response.json();
    })
    .catch();
}

// export const isSignedIn = () =>{
//     isAuthenticated()
//     .then(data=>{
//         if(data.status === true){
//             return true;
//         }
//         else{
//            return false;
//         }
//     })
//     .catch();
// }

export const signOut = () =>{
    return fetch(`http://localhost:5000/signOut`,{
        method:"POST"
    });
}