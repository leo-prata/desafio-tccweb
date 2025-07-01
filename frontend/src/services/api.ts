import axios from "axios";

export function setUpAPI() {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  console.log("API base URL:", import.meta.env.VITE_API_BASE_URL);
  return api;
}
