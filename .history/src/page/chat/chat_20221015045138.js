import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { useEffect, useState } from "react";
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

  const stompClient = StompJs.over(new SockJS(`${SERVER}/ws-stomp`));
  stompClient.connect({ Authorization: `Bearer ${token}` }, () => {
    stompClient.subscribe(`/sub/chat/room/${roomId}`, (msg) => {
      const message = JSON.parse(msg.body);
      setMessages((messages) => [...messages, message]);
    });
  });

  const sendMessage = (e) => {
    e.preventDefault();
    stompClient.send(
      `/pub/chat/message`,
      {},
      JSON.stringify({ userId, roomId, message })
    );
    setMessage("");
  };

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.userId} : {message.message}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input type="text" value={message} onChange={onChangeMessage} />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};
