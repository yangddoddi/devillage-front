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
  const [publicChat, setPublicChat] = useState([]]);

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
                    {chat.nickName}님의 말 :
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
            <h3> Dev_illage 채팅방입니다.</h3>
            <p> 1. 분란을 일으킬 수 있는 행동을 하지 마세요.</p>
            <p> 2. 비방, 욕설, 성적인 언어를 사용하지 마세요.</p>
            <p> 3. 경고 없이 영구 탈퇴 처리 될 수 있습니다.</p>
            <p> 4. 위 사항에 동의하신다면 아래 버튼을 눌러 입장하세요.</p>
          </div>
          <button onClick={registerUser}>동의합니다</button>
        </div>
      )}
    </div>
  );
};
