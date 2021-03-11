import axios from "axios";

const instance = axios.create({
  // DEV
  baseURL: `http://localhost:5000/api`,
  // PROD
});

export default instance;
