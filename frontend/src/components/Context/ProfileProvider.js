import React,{useState,useEffect,createContext} from 'react'
import {
    getUser,
} from "../Profile/helper";
import { isAuthenticated } from "../Auth/helper";
export const ProfileContext =createContext();

export const ProfileProvider = (props) => {

    const { editAllowed = false, userId } = props;
    const DEFAULT_IMAGE = "https://img.icons8.com/bubbles/100/000000/user.png";
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        image: "",
        email: "",
        trips: [],
        loading: true,
        error: "",
        bio: "",
        success: false,
      });
    
    const [editBio, setEditBio] = useState(false);

    const setDetails = (userId) => {
        const jwt = isAuthenticated();
        const { token } = jwt;
        console.log("USER Id", userId);
        getUser(userId, token)
        .then((data) => {
            console.log("Data -> ");
            if (data.error) {
            console.log(data.error);
            } else {
            var photo = DEFAULT_IMAGE;
            if (data.image) {
                // Convert from base64 to image
                photo = `data:${data.image.contentType};base64,` + data.image.data;
            }
            setProfile({
                ...profile,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                trips: data.trips,
                bio: data.bio,
                image: photo,
                loading: false,
            });
            console.log(data);
            }
        })
        .catch((err) => console.log(err));
  };

  useEffect(() => {
    setDetails(userId);
  }, []);

    return (
        <ProfileContext.Provider
         value={{userProfile:[profile, setProfile],editUserBio:[editBio, setEditBio]}}
        >
             {props.children}
        </ProfileContext.Provider>
    )
}

