import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
    withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const parsedAuth = JSON.parse(auth);
      if (parsedAuth.token) {
        config.headers.Authorization = `Bearer ${parsedAuth.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;