const socket = new WebSocket("ws://88.80.187.75:3000");
socket.onopen = () => {
  console.log("WebSocket connection opened.");
};

socket.onmessage = (event) => {
  const messagesList = document.getElementById("messages");
  const messageItem = document.createElement("li");

  messageItem.textContent = event.data;
  const time = {hour: new Date().getHours(), minute: new Date().getMinutes()} //set time
  messageItem.style.setProperty("--time", `"${time.hour}:${time.minute}"`)
  messagesList.appendChild(messageItem);
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
  if (messageInput.value !== "") {
  if (event.code === "Enter") {
    event.preventDefault();
    sendMessage();
    }
  } else {
    if (event.code === "Enter") {
      event.preventDefault();
      messageInput.value = "";
    }
  }
});

document.querySelector("#buttonImage").addEventListener("click", () => {
  if (messageInput.value !== "") {
  sendMessage();
  } else {
    messageInput.value = "";
  }
});
