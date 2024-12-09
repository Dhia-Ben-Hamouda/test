import axios from "axios";
import baseURL from "./baseURL";

const api = axios.create({
    baseURL,
    withCredentials: true
})

export default api;