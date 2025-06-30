import axios from "axios";

export function setUpAPI() {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3111",
  });
  return api;
}
