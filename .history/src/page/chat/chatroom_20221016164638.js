import React, { useState, useEffect } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { SERVER } from "../../util/Variables";
import styles from "./chatroom.module.scss";
import { useSelector } from "react-redux";

export const ChatRoom = () => {
  const token = useSelector((state) => state.token.accessToken);

  let stompClient = null;
  const [publicChat, setPublicChat] = useState([]);
  const [privateChat, setPrivateChat] = useState(new Map());
  const [userData, setUserData] = useState({
    username: "",
    receiver: "",
    connected: false,
    message: "",
  });
  const [tab, setTab] = useState("CHATROOM");

  const handleMessage = (e) => {
    const { value } = e.target;
    setUserData({
      ...userData,
      message: value,
    });
  };

  const registerUser = () => {
    const Sock = new SockJS(`${SERVER}/ws`);
    stompClient = Stomp.over(Sock);
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
    const content = `${userData.username} joined the chat`;
    const MessageType = "JOIN";
    stompClient.send(
      "/app/public",
      { Authorization: `Bearer ${token}` },
      JSON.stringify({
        content: content,
        messageType: MessageType,
      })
    );
  };

  const onPublicMessageReceived = (payload) => {
    console.log(payload);
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
    setPublicChat((publicChat) => [...publicChat, message]);
  };

  const onPrivateMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    switch (message.MessageType) {
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
      MessageType: "CHAT",
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
        <div className={styles.door}>
          <h1>Dev_illage Chat</h1>
          <div className={styles.info}>
            <h3> Dev_illage 채팅방입니다.</h3>
            <p> 1. 분란을 일으킬 수 있는 행동을 하지 마세요.</p>
            <p> 2. 불쾌한 행동을 하지 마세요.</p>
            <p> 3. 경고 없이 영구 탈퇴 처리 될 수 있습니다.</p>
          </div>

          <button onClick={registerUser}>Join</button>
        </div>
      )}
    </div>
  );
};
