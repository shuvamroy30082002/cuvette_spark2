const URL = "http://localhost:3000"

// register user
export const userRegister = async (data) => {
    return fetch(`${URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
};

//login user
export const userLogin = async (data) => {
    return fetch(`${URL}/user/login`, {
      method: "POST",
      headers: {
    });
  };

export const getUserdata = async () => {
  return fetch(`${URL}/user/getuser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};

// update category and username
export const updateuser = async (data) => {
  return fetch(`${URL}/user/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};
