import * as StompJs from "../../../node_modules/stompjs/lib/stomp.js";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";

export const Chat = () => {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/chat");
    const client = StompJs.over(socket);
    setClient(client);
    client.connect({}, () => {
      client.subscribe("/sub/chat/room/1", (data) => {
        console.log(data);
        setMessages([...messages, data.body]);
      });
    });
  }, []);

  const sendMessage = () => {
    client.send("/pub/chat/message", {}, message);
    setMessage("");
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
