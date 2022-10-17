var usernamePage = document.querySelector("#username-page");
var chatPage = document.querySelector("#chat-page");
var usernameForm = document.querySelector("#usernameForm");
var messageForm = document.querySelector("#messageForm");
var messageInput = document.querySelector("#message");
var messageArea = document.querySelector("#messageArea");
var connectingElement = document.querySelector(".connecting");

var stompClient = null;
var username = null;

var colors = [
  "#2196F3",
  "#32c787",
  "#00BCD4",
  "#ff5652",
  "#ffc107",
  "#ff85af",
  "#FF9800",
  "#39bbb0",
];
token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RAYXNkLmNvbSIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJzZXF1ZW5jZSI6MTIxLCJpYXQiOjE2NjU2NjE0OTQsImV4cCI6MTY2NTY2MzI5NH0.nlyRYEjEn-s_7QoR_9tihLfrgS_qk7MegBjc2eAIraI";

header = { Authorization: "Bearer " + token };

function connect(event) {
  username = document.querySelector("#name").value.trim();
  roomname = document.querySelector("#room").value.trim();

  if (username && roomname) {
    usernamePage.classList.add("hidden");
    chatPage.classList.remove("hidden");

    // const stompConfig = {
    //   connectHeader: {
    //     Authorization: "Bearer " + token,
    //   },

    //   brokerURL: "http://localhost:8080/chat/" + roomname,
    // };
    // stompClient = new StompJs.Client(stompConfig);

    var socket = new SockJS("http://localhost:8080/message/");
    stompClient = Stomp.over(socket);

    stompClient.connect(header, onConnected, onError);
  }
  event.preventDefault();
}

function onConnected() {
  // Subscribe to the Public Topic
  stompClient.subscribe("/topic/" + roomname, onMessageReceived);

  // Tell your username to the server
  stompClient.send(
    "/app/message/" + roomname,
    header,
    JSON.stringify({
      // sender: username,
      content: null,
      messageType: "JOIN",
    })
  );

  connectingElement.classList.add("hidden");
}

function onError(error) {
  connectingElement.textContent =
    "Could not connect to WebSocket server. Please refresh this page to try again!";
  connectingElement.style.color = "red";
}

function sendMessage(event) {
  var messageContent = messageInput.value.trim();
  if (messageContent && stompClient) {
    var chatMessage = {
      // sender: username,
      sender: null,
      content: messageInput.value,
      messageType: "CHAT",
    };
    stompClient.send(
      "/app/message/" + roomname,
      header,
      JSON.stringify(chatMessage)
    );
    messageInput.value = "";
  }
  event.preventDefault();
}

function exit(event) {
  // var messageContent = messageInput.value.trim();
  if (stompClient) {
    var chatMessage = {
      // sender: username,
      // content: messageInput.value,
      content: null,
      messageType: "LEAVE",
    };
    stompClient.send(
      "/app/message/" + roomname,
      header,
      JSON.stringify(chatMessage)
    );
    // messageInput.value = "";
  }
  event.preventDefault();
}

function onMessageReceived(payload) {
  var message = JSON.parse(payload.body);

  var messageElement = document.createElement("li");

  if (message.messageType === "JOIN") {
    messageElement.classList.add("event-message");
    message.content = message.nickName + " joined!";
  } else if (message.messageType === "LEAVE") {
    messageElement.classList.add("event-message");
    message.content = message.nickName + " left!";
  } else {
    messageElement.classList.add("chat-message");

    var avatarElement = document.createElement("i");
    var avatarText = document.createTextNode(message.nickName[0]);
    avatarElement.appendChild(avatarText);
    avatarElement.style["background-color"] = getAvatarColor(message.nickName);

    messageElement.appendChild(avatarElement);

    var usernameElement = document.createElement("span");
    var usernameText = document.createTextNode(message.nickName);
    usernameElement.appendChild(usernameText);
    messageElement.appendChild(usernameElement);
  }

  var textElement = document.createElement("p");
  var messageText = document.createTextNode(message.content);
  textElement.appendChild(messageText);

  messageElement.appendChild(textElement);

  messageArea.appendChild(messageElement);
  messageArea.scrollTop = messageArea.scrollHeight;
}

function getAvatarColor(messageSender) {
  var hash = 0;
  for (var i = 0; i < messageSender.length; i++) {
    hash = 31 * hash + messageSender.charCodeAt(i);
  }
  var index = Math.abs(hash % colors.length);
  return colors[index];
}

usernameForm.addEventListener("submit", connect, true);
messageForm.addEventListener("submit", sendMessage, true);
exitForm.addEventListener("submit", exit, true);
