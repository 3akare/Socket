require("dotenv").config();

const WebSocket = require("ws");
const wss = new WebSocket.Server();

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("A new client connected.");

  // Handle incoming messages from clients
  ws.on("message", (message) => {
    console.log("Received message from sender");
    const senderMessage = JSON.parse(message);
    const sender = senderMessage.id;

    console.log(senderMessage.id);
    // Broadcast the message to all connected clients (including the sender)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !== ws) {
        client.send(senderMessage.content);
      }
    });
  });

  // Handle client disconnection
  ws.on("close", () => {
    console.log("Client disconnected.");
  });
});

wss.listen(3000, () => {
  console.log(`WebSocket server started on port ${port}`);
});
