import { API } from "../../backend";

export const signInUser = (data) => {
  return fetch(`${API}/auth/signIn`, {
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

export const signUpUser = (data) => {
  return fetch(`${API}/auth/signup`, {
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
export const resetUserPassword = (data) => {
  return fetch(`${API}/auth/resetPassword`, {
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
      // console.log(err);
    });
};

export const isSignedIn = () => {
  if (localStorage.getItem("id")) {
    return true;
  } else {
    return false;
  }
};
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const signOut = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    // next();

    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((res) => {
        // console.log("Signout Success");
      })
      .catch((err) => {
        // console.log(err);
      });
  }
};

export const activateUserEmail = (token) => {
  return fetch(`${API}/auth/email-verify?token=${token}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      // console.log(err);
    });
};
