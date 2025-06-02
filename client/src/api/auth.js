import axios from "axios";

export const signupUser = async (userData) => {
  console.log(userData)
  const { data } = await axios.post("http://localhost:3000/api/auth/signup", userData, {
    withCredentials: true, // for cookies
  });
  return data;
};

export const loginUser = async (loginData) => {
  const { data } = await axios.post("http://localhost:3000/api/auth/login", loginData, {
    withCredentials: true, // Include cookies for session auth
  });
  return data;
};