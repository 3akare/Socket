require("dotenv").config();

let server;

if (process.env.MODE === 'development'){
  const http = require("http");
  server = http.createServer();
}

else if(process.env.MODE === 'production'){
  const https = require("https");
  server = https.createServer({
    // Provide your SSL certificate and private key paths here
    cert: fs.readFileSync("/etc/letsencrypt/live/3akare.tech/fullchain.pem"),
    key: fs.readFileSync("/etc/letsencrypt/live/3akare.tech/privkey.pem"),
  });
}

const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("A new client connected.");

  // Handle incoming messages from clients
  ws.on("message", (message) => {
    console.log("Received message:", message);
    // Broadcast the message to all connected clients (including the sender)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
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
