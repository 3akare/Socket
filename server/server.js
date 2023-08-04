import { Server } from "socket.io";

const io = new Server({
  path: "/mysocket/"
});

io.on("connection", (socket) => {
  console.log(socket.id);
});