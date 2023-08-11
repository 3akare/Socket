require("dotenv").config();

let server;

if (process.env.MODE === "development") {
  const http = require("http");
  server = http.createServer();
  console.log("Development Mode");
} else if (process.env.MODE === "production") {
  const fs = require("fs");
  const https = require("https");
  server = https.createServer({
    key: fs.readFileSync("/etc/letsencrypt/live/3akare.tech-0001/privkey.pem"),
    cert: fs.readFileSync(
      "/etc/letsencrypt/live/3akare.tech-0001/fullchain.pem"
    ),
  });
  console.log("Production Mode");
}

const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

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

const port = 3000;
server.listen(port, () => {
  console.log(`WebSocket server started on port ${port}`);
});
