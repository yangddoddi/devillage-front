import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { SERVER } from "../../util/Variables.js";
import { Stomp } from "@stomp/stompjs";

export const Chat = () => {
  const token = useSelector((state) => state.token.accessToken);

  let client = useRef({});
  let stompClient = useRef({});
  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  const [publicChat, setPublicChat] = useState(true);

  const location = useLocation();

  client.current = new StompJs.Client({
    webSocketFactory: () => new SockJS(`${SERVER}/ws`),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: (str) => {
      console.log(new Date(), str);
    },
    onConnect: () => {
      console.log("connected");
      onConnected();
    },
    onStompError: (frame) => {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    },
    onUnhandledMessage: (message) => {
      console.log("Unhandled message", message);
    },
    onWebSocketClose: () => {
      console.log("Websocket closed");
    },
    onWebSocketError: (event) => {
      console.log("Websocket error", event);
    },
    onUnhandledFrame: (frame) => {
      console.log("Unhandled frame", frame);
    },
    onUnhandledReceipt: (receiptId) => {
      console.log("Unhandled receipt", receiptId);
    },
    onDisconnect: () => {
      console.log("disconnected");
      registerUser();
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    connectionTimeout: 10000,
  });

  useEffect(() => {
    client.current.activate();
  }, []);

  const onConnected = () => {
    stompClient.current = client.current.subscribe(
      "/topic/public",
      onMessageReceived
    );
    client.current.publish({
      destination: "/app/chat.register",
      body: JSON.stringify({
        content: "test",
        type: "JOIN",
      }),
    });
  };

  const onPublicMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    const { content, nickName, messageType, createdAt } = message;
    const chat = {
      content,
      nickName,
      messageType,
      createdAt,
    };
    setPublicChat((prev) => [...prev, chat]);
  };

  return (
    <div className={styles.chattingContainer}>
      {userData.connected ? (
        <div className={styles.chatBox}>
          <div className={styles.memberList}>
            <ul>
              <li className={styles.chatHeader}>Chatroom</li>
              {publicChat.map((chat, index) => (
                <li key={index} className={styles.chat}>
                  <div className={styles.nickName}>
                    {chat.nickName}?????? ??? :
                  </div>
                  <div className={styles.content}>{chat.content}</div>
                  <div className={styles.createdAt}>
                    {chat.createdAt.split("T")[1].split(".")[0]}
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.sendMessage}>
              <input
                type="text"
                name="message"
                value={input}
                onChange={handleMessages}
              />
              <button onClick={sendPublicMessage} className={styles.send}>
                Send
              </button>
              <button onClick={disconnect} className={styles.disconnect}>
                Disconnect
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.door}>
          <h1>Dev_illage Chat</h1>
          <div className={styles.info}>
            <h3> Dev_illage ??????????????????.</h3>
            <p> 1. ????????? ????????? ??? ?????? ????????? ?????? ?????????.</p>
            <p> 2. ??????, ??????, ????????? ????????? ???????????? ?????????.</p>
            <p> 3. ?????? ?????? ?????? ?????? ?????? ??? ??? ????????????.</p>
            <p> 4. ??? ????????? ?????????????????? ?????? ????????? ?????? ???????????????.</p>
          </div>
          <button onClick={registerUser}>???????????????</button>
        </div>
      )}
    </div>
  );
};
