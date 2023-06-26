import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/",
  withCredentials: true,

})

// export const makeRequest = axios.create({
//   baseURL: "https://ulmie-api-production.up.railway.app/api/",
//   withCredentials: true,

// })