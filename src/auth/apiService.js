import axios from "axios";

const apiService = axios.create({
  baseURL: "https://shopking-api.herokuapp.com/api/v1",
});

apiService.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("auth");
    if (auth) {
    }
    config.headers.Authorization = `Bearer ${JSON.parse(auth)}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export { apiService };
