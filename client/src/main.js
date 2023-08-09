const socket = new WebSocket("ws://localhost:3000");
socket.onopen = () => {
  console.log("WebSocket connection opened.");
};

socket.onmessage = (event) => {
  const messagesList = document.getElementById("messages");
  const messageItem = document.createElement("li");
  messageItem.setAttribute('class', 'receiver')
  messageItem.textContent = event.data;
  const time = { hour: new Date().getHours(), minute: new Date().getMinutes() }; //set time
  messageItem.style.setProperty("--time", `"${time.hour}:${time.minute}"`);
  messagesList.appendChild(messageItem);
};

socket.onclose = () => {
  console.log("WebSocket connection closed.");
};

function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value;

  const senderMessage = {
    content: message,
    sender: true,
  };

  socket.send(JSON.stringify(senderMessage));
  messageInput.value = "";
  document.querySelector("#inScope").scrollIntoView({ behavior: "smooth" });
}

document.querySelector("textarea").addEventListener("keydown", (event) => {
  if (messageInput.value !== "") {
    if (event.code === "Enter") {
      const messagesList = document.getElementById("messages");
      const messageItem = document.createElement("li");
      messageItem.setAttribute("class", "sender");
      messageItem.textContent = messageInput.value;

      event.preventDefault();
      sendMessage();

      const time = {
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
      }; //set time
      messageItem.style.setProperty("--time", `"${time.hour}:${time.minute}"`);
      messagesList.appendChild(messageItem);
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
