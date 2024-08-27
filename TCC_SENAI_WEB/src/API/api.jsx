import axios from "axios";

export const api = axios.create({
  baseURL: "https://tcc-senai-back-alpha.vercel.app"
});