import { API } from "../../backend";

export const getUser = (userId, token) => {
  return fetch(`${API}/db/getUserById?userId=${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const updateUserBio = (userId, token, data) => {
  console.log("data", data);
  return fetch(`${API}/db/updateUserBio?userId=${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bio: data }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

/**
 * Convert the image file into FormData and send it to server.
 * @param {string} userId - User ID
 * @param {string } token - Auth token
 * @param {File} image - Image
 */
export const updateUserDP = (userId, token, image) => {
  console.log(image.toString());

  const formData = new FormData();
  formData.append("image", image);

  console.log(formData);

  return fetch(`${API}/db/updateUserDP?userId=${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

