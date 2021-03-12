import { io } from "socket.io-client";

// DEV
// const socket = io("http://localhost:5000", { transports: ["websocket"] });

// PROD
const socket = io("https://react-chatter-api.herokuapp.com/", {
  transports: ["websocket"],
});

export default socket;
