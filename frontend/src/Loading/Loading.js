import React, { useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import "./Loading.css";
const Loading = () => {
  return (
    <div className="loading text-center my-auto" style={{}}>
      <PropagateLoader color={"#f59b42"} loading size={"30"} />
    </div>
  );
};

export default Loading;
