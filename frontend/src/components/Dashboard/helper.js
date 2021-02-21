import { API } from "../../backend";

export const getFutureTrips = (id, token) => {
  // console.log("Called API : "+id);
  return fetch(`${API}/db/getFutureTrips?userId=${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application-json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      // console.log(err);
    });
};
export const getOngoingTrips = (id, token) => {
  // console.log("Called API : "+id);
  return fetch(`${API}/db/getOngoingTrips?userId=${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application-json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      // console.log(err);
    });
};
export const getPastTrips = (id, token) => {
  //   console.log("Called API : " + id);
  return fetch(`${API}/db/getPastTrips?userId=${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application-json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      // console.log(err);
    });
};
export const cancelTheTrip = (id, token, tripId) => {
  //   console.log("Called API : " + id);
  return fetch(`${API}/db/cancelTrip?userId=${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ tripId: tripId }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      // console.log(err);
    });
};
