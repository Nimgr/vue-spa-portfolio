import axios from "axios";

axios.defaults.baseURL = " ​https://webdev-api.loftschool.com/";

const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}

axios.interceptors.response.use(function (response) {
  console.log(response)
  return response;
}, function (error) {
  if (error.response.status === 401) {
    return axios.post('/refreshToken').then(({data}) => {
      localStorage.setItem('token', data.token);
      axios.defaults.headers["Authorization"] = `Bearer ${data.token}`;
      error.config.headers["Authorization"] = `Bearer ${data.token}`;

      return axios(error.config)
    })
  }
  return Promise.reject(error);
});

export default axios;