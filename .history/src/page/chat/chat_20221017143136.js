import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { SERVER } from "../../util/Variables.js";
import { Stomp } from "@stomp/stompjs";
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

  const onConnected = () => {
    setConnected(true);
    console.log("connected");
  };

  const onError = (err) => {
    console.log("error", err);
  };

  const onMessageReceived = (msg) => {
    console.log("msg", msg);
    const message = JSON.parse(msg.body);
    console.log("message", message);
    setPublicChat((prev) => [...prev, message]);
  };

  useEffect(() => {
    client.current = StompJs.client(`${SERVER}/ws`);
    client.current.debug = (str) => {
      console.log("debug", str);
    };
    client.current.connect(
      { Authorization: `Bearer ${token}` },
      onConnected,
      onError
    );
    client.current.onConnect = () => {
      console.log("onConnect");
      client.current.subscribe("/topic/public", onMessageReceived);
    };
  }, []);

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
