import axios from "axios";
const API_KEY = 
import.meta.env.MODE === "development"
    ? import.meta.env.VITE_REACT_APP_DEV_API_URL
    :import.meta.env.VITE_REACT_APP_PROD_API_URL;

const instance = axios.create({
  baseURL: API_KEY,
});

instance.defaults.timeout = 1000000;
instance.interceptors.request.use((config) => {
  config.headers= {};
  if (sessionStorage.getItem("token")) {
    config.headers["Authorization"] = "Bearer " + sessionStorage.getItem("token");
  }
  return config;
});

export default instance;
