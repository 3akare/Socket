require("dotenv").config();

let server;

if (process.env.MODE === "development") {
  const http = require("http");
  server = http.createServer((req, res) => {
    if (req.url === "/") {
      res.end("seen! from dev");
    }
  });
  console.log("Development Mode");
} else if (process.env.MODE === "production") {
  const fs = require("fs");
  const https = require("https");
  server = https.createServer(
    {
      key: fs.readFileSync("/etc/letsencrypt/live/3akare.tech/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/3akare.tech/fullchain.pem"),
    },
    (req, res) => {
      if (req.url === "/") {
        res.end("seen! from prod");
      }
    }
  );
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

    // Broadcast the message to all connected clients (except the sender)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !== ws) {
        console.log("There are:", wss.clients.size, "person(s) online");
        client.send(
          JSON.stringify({
            content: senderMessage.content,
            size: wss.clients.size,
          })
        );
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
