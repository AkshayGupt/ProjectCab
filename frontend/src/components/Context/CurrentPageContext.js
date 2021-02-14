import React, { useState, createContext } from "react";

export const CurrentPageContext = createContext();

/**
 * CURRENT PAGE: TRIPS, PAST_TRIPS, PROFILE, ABOUT , CONTACT
 */

export const CurrentPageProvider = (props) => {
  const [currentPage, setCurrentPage] = useState("TRIPS");

  return (
    <CurrentPageContext.Provider value={[currentPage, setCurrentPage]}>
      {props.children}
    </CurrentPageContext.Provider>
  );
};
