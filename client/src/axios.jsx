import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://localhost:5555/api",
});

export default baseUrl;
