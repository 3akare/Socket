require("dotenv").config();

if (process.env.MODE === "development") {
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
}
else if (process.env.MODE === 'production'){
  const tls = require("tls");
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

  // Create a new TLS server and listen on port 3000
  const server = new tls.Server({
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt"),
  });

  server.listen(3000, () => {
    console.log(`WebSocket server started on port ${port}`);
  });
}
