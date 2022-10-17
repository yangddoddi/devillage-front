import * as StompJs from "../../../node_modules/stompjs/lib/stomp.js";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

export const Chat = () => {
  
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const userId = useSelector((state) => state.token.userId);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/message/");
    const client = StompJs.over(socket);



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
