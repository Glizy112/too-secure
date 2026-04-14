import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,                //IMPORTANT for session cookies
});

//let csrfToken = null;                 //improvement: not initializing the token as null at any instance

//fetch token once
export async function initializeCsrf() {
  const response = await api.get("/auth/csrf-token");
  api.defaults.headers.common["x-csrf-token"] = response.data.csrfToken;
  //csrfToken = response.data.csrfToken;
}

//attach the token automatically
// api.interceptors.request.use((config) => {
//   const method = config.method?.toLowerCase();

//   if (
//     csrfToken &&
//     ["post", "put", "patch", "delete"].includes(method)
//   ) {
//     config.headers["x-csrf-token"] = csrfToken;
//   }

//   return config;
// });

export default api;