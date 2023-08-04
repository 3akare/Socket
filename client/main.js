import { io } from "socket.io-client";

const socket = io("http://88.80.187.75/", {
  path: "/mysocket",
});