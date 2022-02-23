import axios from "axios";

let API_URL;

if (process.env === "production") {
  API_URL = "https://shopking-api.herokuapp.com/api/v1";
} else {
  API_URL = "https://shopking-api-dev.herokuapp.com/api/v1";
}

const apiService = axios.create({
  baseURL: API_URL,
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
