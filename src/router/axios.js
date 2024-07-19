import axios from "axios";

export function setupAxios() {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 1000,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return instance;
}
