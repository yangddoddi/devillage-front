import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { SERVER } from "../../util/Variables.js";
import styles from "./chatroom.module.scss";

export const Chat = () => {
  const token = useSelector((state) => state.token.accessToken);

  let client = useRef({});
  let stompClient = useRef({});
  const [publicChat, setPublicChat] = useState([]);
  const [connected, setConnected] = useState(false);
  const [input, setInput] = useState("");

  const registerUser = () => {
    client.current.activate();
  };

  const onMessageReceived = (msg) => {
    console.log("msg", msg);
    const message = JSON.parse(msg.body);
    console.log("message", message);
    setPublicChat((prev) => [...prev, message]);
  };

  useEffect(() => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS(`http://localhost:8080/ws`),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => {
        console.log(new Date(), str);
      },
      onConnect: () => {
        console.log("onConnect");
        setConnected(true);
        client.current.subscribe("/topic/public", onMessageReceived, {
          Authorization: `Bearer ${token}`,
        });
        joinUser();
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
  });

  const joinUser = () => {
    client.current.publish({
      destination: "/app/public",
      body: JSON.stringify({
        content: `${localStorage.getItem("username")}????????? ?????????????????????.`,
        type: "JOIN",
      }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const sendPublicMessage = () => {
    if (input) {
      client.current.publish({
        destination: "/app/chat",
        body: JSON.stringify({
          sender: "user",
          content: input,
          type: "CHAT",
        }),
      });
      setInput("");
    }
  };

  const disconnect = () => {
    client.current.disconnect(() => {
      console.log("disconnected");
      setConnected(false);
    });
  };

  const handleMessages = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.chattingContainer}>
      {connected ? (
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
