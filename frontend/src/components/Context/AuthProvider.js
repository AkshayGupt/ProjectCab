import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

/**
 * CURRENT PAGE: TRIPS, PAST_TRIPS, PROFILE, ABOUT , CONTACT
 */

export const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={[loggedIn, setLoggedIn]}>
      {props.children}
    </AuthContext.Provider>
  );
};
