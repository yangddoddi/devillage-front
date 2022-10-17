import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { SERVER } from "../../util/Variables.js";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const userId = useSelector((state) => state.token.userId);
  const token = useSelector((state) => state.token.accessToken);

  const location = useLocation();
  const roomId = location.pathname.split("/")[2];

  const stompClient = null;

  useEffect(() => {
    const socket = new SockJS(`${SERVER}/message/`);
    stompClient = StompJs.over(socket);
    stompClient.connect({ Authorization: `Bearer ${token}` }, () => {
      stompClient.subscribe(`/sub/chat/room/${roomId}`, (msg) => {
        const message = JSON.parse(msg.body);
        setMessages((messages) => [...messages, message]);
      });
    });
  }, [roomId, token]);

  const onSubmit = (e) => {
    e.preventDefault();
    const chatMessage = {
      sender: userId,
      content: message,
      messageType: "CHAT",
    };
    stompClient.send(
      `/pub/chat/message/${roomId}`,
      {},
      JSON.stringify(chatMessage)
    );
    setMessage("");
  };

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.sender}: {message.content}
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="메시지를 입력하세요."
          value={message}
          onChange={onChangeMessage}
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};
