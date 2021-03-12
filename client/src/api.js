import axios from "axios";

const instance = axios.create({
  // PROD
  baseURL: `https://react-chatter-api.herokuapp.com/api`,
  // DEV
  // baseURL: "http://localhost:5000/api",
});

export default instance;
