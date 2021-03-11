import { io } from "socket.io-client";

const API_URL = "http://localhost:5000";
const socket = io(API_URL, { transports: ["websocket"] });

export default socket;
