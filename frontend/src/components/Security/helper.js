import { API } from "../../backend";

/**
 * Update user password.
 * @param {string} userId - User ID
 * @param {string} token - Auth Token
 * @param {string} oldPassword - Old password in plain text
 * @param {string} newPassword - New password in plain text
 */
export const updateUserPassword = (userId, token, oldPassword, newPassword) => {
  return fetch(`${API}/db/updatePassword?userId=${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      oldPassword,
      newPassword,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      // console.log(err);
      return err;
    });
};
