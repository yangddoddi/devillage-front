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

    return () => {
      stompClient.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      stompClient.send(
        "/pub/chat/message",
        {},
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
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.content}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};
