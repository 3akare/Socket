const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:4173"],
  },
});

io.on('connection', socket => {
    console.log(socket.id);
})