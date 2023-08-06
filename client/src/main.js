const socket = new WebSocket("ws://localhost:3000");
// const socket = new WebSocket("wss://3akare.tech/websocket/");

socket.onopen = () => {
  console.log("WebSocket connection opened.");
};

socket.onmessage = (event) => {
  const messagesList = document.getElementById("messages");
  const messageItem = document.createElement("li");

  const reader = new FileReader();
  reader.onload = () => {
    messageItem.textContent = reader.result; // reader.result contains the text data
    messagesList.appendChild(messageItem);
  };
  reader.readAsText(event.data); // Read the Blob as text
};

socket.onclose = () => {
  console.log("WebSocket connection closed.");
};

function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value;
  socket.send(message);
  messageInput.value = "";
  document.querySelector("#inScope").scrollIntoView({ behavior: "smooth" });
}

document.querySelector("textarea").addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});

document.querySelector("#buttonImage").addEventListener("click", () => {
  sendMessage();
});
