import axios from "axios";

export const makeRequest = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/`,
  withCredentials: true,

})

// export const makeRequest = axios.create({
//   baseURL: "https://ulmie-api-production.up.railway.app/api/",
//   withCredentials: true,

// })