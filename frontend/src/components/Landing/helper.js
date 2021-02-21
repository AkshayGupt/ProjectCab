import { API } from "../../backend";

export const forgotUserPassword = (data) => {
  return fetch(`${API}/auth/forgotPassword`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      //   console.log(err);
    });
};
