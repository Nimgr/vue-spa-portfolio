import axios from "axios";

const token = localStorage.getItem("token");

axios.defaults.baseURL = "https://webdev-api.loftschool.com/";
axios.defaults.headers["Authorization"] = `Bearer ${token}`;
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  error => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      return axios.post("/refreshToken").then(response => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return axios(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);

// const token = localStorage.getItem("token");
// if (!token) console.warn("Токен отсутствует");
// const $axios = axios.create({
//   baseURL: "​https://webdev-api.loftschool.com/",
//   headers: {
//     "Authorization" : `Bearer ${token}`
//   }
// })
// axios.defaults.baseURL = "https://webdev-api.loftschool.com/";
// console.log(axios.defaults.baseURL)
// const token = localStorage.getItem("token");
// if (token) {
//   axios.defaults.headers["Authorization"] = `Bearer ${token}`;
// }
// axios.interceptors.response.use(function (response) {
//   console.log(response)
//   return response;
// }, function (error) {
//   if (error.response.status === 401) {
//     return axios.post('/refreshToken').then(({data}) => {
//       localStorage.setItem('token', data.token);
//       axios.defaults.headers["Authorization"] = `Bearer ${data.token}`;
//       error.config.headers["Authorization"] = `Bearer ${data.token}`;
//       return axios(error.config)
//     })
//   }
//   return Promise.reject(error);
// });
export default axios;