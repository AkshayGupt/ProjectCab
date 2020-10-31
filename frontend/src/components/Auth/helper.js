export const isAuthenticated = () =>{
return fetch(`http://localhost:5000/authStatus`,{
    method:"GET"
    })
    .then(response=>{
        return response.json();
    })
    .catch();
}


export const isSignedIn = () =>{
    if(localStorage.getItem("UID")) {
      return true;
    }else{
      return false;
    }
}

export const signOut = () =>{
    fetch(`http://localhost:5000/signOut`,{
        method:"POST"
    });
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("UID");
}