import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Обработка ошибки
    console.error("Error occurred:", error);
    return Promise.reject(error);
  },
);
export default api;
