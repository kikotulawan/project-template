import axios from "axios";
const bearer_token = localStorage.getItem("auth") || "";
const API = axios.create({
 baseURL: "http://127.0.0.1:8000/api",
});
API.defaults.headers.common["Authorization"] = `Bearer ${bearer_token}`;
API.defaults.headers.common["Content-Type"] = `application/json`;
export default API;
