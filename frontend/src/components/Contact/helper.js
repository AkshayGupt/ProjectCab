import { API } from "../../backend";

export const sendUserMessage = (data) => {
  // console.log("HELPER: ", data);
  return fetch(`${API}/other/sendMessage`, {
    method: "POST",
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
      // console.log(err);
    });
};
