import axios from "axios";

axios.defaults.baseURL = "http://14.225.205.235:8080/api";

axios.interceptors.request.use(
  function (config) {
    // const token = localStorage.getItem('token');
    // const data = getSession();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
