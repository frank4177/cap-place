import axios from "axios";


const BASE_URL = "http://127.0.0.1:4010/api"


export const request = axios.create({
  baseURL: BASE_URL
});