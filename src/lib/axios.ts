import axiosLib, { AxiosRequestConfig } from "axios";

const API = "http://14.225.205.235:8080/api";
axiosLib.defaults.baseURL = API;

axiosLib.interceptors.request.use(
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

const axiosInstance = axiosLib.create({
  baseURL: "/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
const getUrl = (url: string) => API + url;
export const axios = {
  get: async <T = any>(url: string, config?: any) => {
    const { params } = config || {};
    console.log("params", params);
    console.log("url", url);

    const res = await axiosInstance.post<T>("/api/proxy", {
      url: getUrl(url),
      params,
      method: "GET",
    });

    return res;
  },
  post: <T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig<any> | undefined
  ) => {
    return axiosInstance.post<T>("/api/proxy", {
      url: getUrl(url),
      params,
      method: "POST",
    });
  },
  put: <T = any>(url: string, params?: any, config?: any) => {
    return axiosInstance.post<T>("/api/proxy", {
      url: getUrl(url),
      params,
      method: "PUT",
    });
  },
  delete: <T = any>(url: string, params?: any, config?: any) => {
    return axiosInstance.post<T>("/api/proxy", {
      url: getUrl(url),
      params,
      method: "DELETE",
    });
  },
};
