import axios from "axios"
// const BASE_URL = "http://10.240.166.191:5000/api/";
const BASE_URL = "https://waffles-be.onrender.com/api/";
// const BASE_URL = "https://ioweb3.io/knotiqapi/";

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
    },
});