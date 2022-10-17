import * as StompJs from "../../../node_modules/stompjs/lib/stomp.js";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const userId = useSelector((state) => state.token.userId);
  const token = useSelector((state) => state.token.accessToken);

  const sock = new SockJS("http://localhost:8080/message/");
  const stompClient = StompJs.over(sock);

  useEffect(() => {
    stompClient.connect({}, () => {
      stompClient.subscribe(
        "/sub/chat/room",
        (msg) => {
          const chatMessage = JSON.parse(msg.body);
          setMessages((messages) => [...messages, chatMessage]);
        },
        { Authorization: "Bearer " + token }
      );
    });
  }, []);

  const onConnected = () => {
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
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      stompClient.send(
        "/pub/chat/message",
        { Authorization: "Bearer " + token },
        JSON.stringify({
          sender: userId,
          content: message,
          type: "CHAT",
        })
      );
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        {messages.map((message) => (
          <p>{message}</p>
        ))}
      </div>
    </div>
  );
};
