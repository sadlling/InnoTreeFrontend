import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7285/api",
  withCredentials: true,
});
// baseURL: "https://localhost:9003/api",
export default api;
