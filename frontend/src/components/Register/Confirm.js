import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Confirm = ({ trip }) => {
  const [redirect, setRedirect] = useState(false);

  const convert = (st) => {
    // console.log(st);
    const start = JSON.parse(st);
    const time = new Date(
      start.year,
      start.month - 1,
      start.date,
      start.hours,
      start.minutes,
      start.seconds
    );

    return time.toString();
  };

  const redirectToStatus = () => {
    if (redirect) {
      return <Redirect to="/status" />;
    }
  };
  const handleConfirm = () => {
    setRedirect(true);
  };

  return (
    <div
      style={{ width: "50%", marginTop: 100 }}
      className="mx-auto shadow p-3 mb-5 bg-white rounded"
    >
      {redirectToStatus()}

      <div className=" mx-auto">
        <h1 className="text-center display-3">Confirm</h1>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="font-weight-bold">Source: </span> {trip.source}
          </li>
          <li className="list-group-item">
            <span className="font-weight-bold">Destination: </span>{" "}
            {trip.destination}
          </li>
          <li className="list-group-item">
            <span className="font-weight-bold">Cab: </span> {trip.cabSize}
          </li>
          <li className="list-group-item">
            <span className="font-weight-bold">Start Time: </span>{" "}
            <p>{convert(JSON.stringify(trip.start))}</p>
          </li>
          <li className="list-group-item">
            <span className="font-weight-bold">End Time: </span>{" "}
            <p>{convert(JSON.stringify(trip.end))}</p>
          </li>
          <br />
          <p
            className="btn btn-md btn-info mx-auto"
            style={{ width: "50%" }}
            onClick={() => handleConfirm()}
          >
            Confirm
          </p>
          <p
            className="btn btn-md btn-danger mx-auto"
            style={{ width: "50%" }}
            onClick={() => handleConfirm()}
          >
            Cancel
          </p>
        </ul>
      </div>
    </div>
  );
};

export default Confirm;
