export const isAuthenticated = () =>{
return fetch(`http://localhost:5000/authStatus`,{
    method:"GET"
    })
    .then(response=>{
        return response.json();
    })
    .catch();
}