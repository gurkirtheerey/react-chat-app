import { io } from "socket.io-client";

// DEV
const socket = io("http://localhost:5000", { transports: ["websocket"] });
// PROD
// const socket = io("http://localhost:5000", { transports: ["websocket"] });

export default socket;
