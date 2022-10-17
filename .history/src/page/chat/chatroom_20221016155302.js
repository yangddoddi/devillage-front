import React, { useState, useEffect } from "react";
import { over } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { SERVER } from "../../util/Variables";
import { styles } from "./Chat.module.scss";
import { useSelector } from "react-redux";

export const ChatRoom = () => {
  const token = useSelector((state) => state.token.accessToken);

  const stompClient = null;
  const [publicChat, setPublicChat] = useState([]);
  const [privateChat, setPrivateChat] = useState(new Map());
  const [userData, setUserData] = useState({
    username: "",
    receiver: "",
    connected: false,
    message: "",
  });
  const [tab, setTab] = useState("CHATROOM");

  const handleUserName = (e) => {
    const { value } = e.target;
    setUserData({
      ...userData,
      username: value,
    });
  };

  const handleMessage = (e) => {
    const { value } = e.target;
    setUserData({
      ...userData,
      message: value,
    });
  };

  const registerUser = () => {
    const Sock = new SockJS(`${SERVER}/ws`);
    stompClient = over(Sock);
    stompClient.connect(
      { Authorization: `Bearer ${token}` },
      onConnected,
      onError
    );
    };

const onConnected = () => {
  setUserData(
    {
      ...userData,
      connected: true,
    },
    stompClient.subscribe("/topic/public", onPublicMessageReceived)
    // stompClient.subscribe('/app/public', onPrivateMessageReceived);
  );
  userJoin();
};

const userJoin = () => {
  const userJoinMessage = {
    message: `${userData.username} joined the chat`,
  };
  stompClient.send(
    "/app/public",
    { Authorization: `Bearer ${token}` },
    JSON.stringify(userJoinMessage)
  );
};

const onPublicMessageReceived = (payload) => {
  const message = JSON.parse(payload.body);
  if (privateChat.get(message.senderName)) {
    privateChat.get(message.senderName).push(message);
    setPrivateChat(new Map(privateChat));
  } else {
    const list = [];
    list.push(message);
    privateChat.set(message.senderName, list);
    setPrivateChat(new Map(privateChat));
  }

  const onPrivateMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    switch (message.type) {
      case "JOIN":
        if (!privateChat.get(message.senderName)) {
          privateChat.set(message.senderName, []);
          setPrivateChat(new Map(privateChat));
        }
        break;
      case "LEAVE":
        break;
      case "CHAT":
        privateChat.push(message);
        setPrivateChat([...privateChat]);
        break;
      default:
        break;
    }
  };

  const onError = (error) => {
    console.log(error);
  };

  const sendPublicMessage = () => {
    const message = {
      content: userData.message,
      type: "CHAT",
    };
    stompClient.send("/app/public", {}, JSON.stringify(message));
    setUserData({
      ...userData,
      message: "",
    });
  };

  // const sendPrivateMessage = () => {
  //     const message = {
  //         content: userData.message,
  //         type: 'CHAT',
  //         receiver: userData.receiver,
  //     };
  //     stompClient.send('/app/private', {}, JSON.stringify(message));
  //     setUserData({
  //         ...userData,
  //         message: '',
  //     });
  // }

  return (
    <div>
      {userData.connected ? (
        <div className={styles.chatBox}>
          <div className={styles.memberList}>
            <ul>
              <li>Chatroom</li>
              {publicChat.map((chat) => (
                <li
                  key={chat.senderName}
                  onClick={() =>
                    setUserData({ ...userData, receiver: chat.senderName })
                  }
                >
                  {chat.senderName}
                </li>
              ))}
            </ul>
            <div className={styles.sendMessage}>
              <input
                type="text"
                value={userData.message}
                onChange={(e) =>
                  setUserData({ ...userData, message: e.target.value })
                }
              />
              <button onClick={sendPublicMessage}>Send</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.loginBox}>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={handleUserName}
          />
          <button onClick={registerUser}>Join</button>
        </div>
      )}
    </div>
  );
};
