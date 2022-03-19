import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`,
});

export default api;
