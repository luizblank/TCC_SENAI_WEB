import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.196.20.68:8080",
});