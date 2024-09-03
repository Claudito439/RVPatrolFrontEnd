import axios from "axios";

export const URL_API = import.meta.env.VITE_URL_API || 'https://rvpatrolapibackend.onrender.com/api/v1';

const instance = axios.create({
    baseURL: URL_API,
    withCredentials: true
});

export default instance;