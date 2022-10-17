import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { SERVER } from "../../util/Variables.js";
import { Stomp } from "@stomp/stompjs";

export const Chat = () => {
  const token = useSelector((state) => state.token.accessToken);

  const userId = useSelector((state) => state.token.userId);
  const [chat, setChat] = useState("");
  const [chatList, setChatList] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [chatRoomId, setChatRoomId] = useState(null);
  const location = useLocation();

  const sock = new SockJS(`${SERVER}/message`);
  const client = Stomp.over(sock);

  const chatRef = useRef(null);
  const chatListRef = useRef(null);

  useEffect(() => {
    client.connect(
      {
        Authorization: `Bearer ${token}`,
      },
      () => {
        setStompClient(client);
        client.subscribe(
          `/topic/${chatRoomId}`,
          (data) => {
            console.log(data);
            const chat = JSON.parse(data.body);
            setChatList((chatList) => [...chatList, chat]);
          },
          { Authorization: `Bearer ${token}` }
        );
      }
    );
  }, [chatRoomId]);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatList]);

  useEffect(() => {
    if (location.state) {
      setChatRoomId(location.state.chatRoomId);
    }
  }, [location]);

  const onChangeHandler = (e) => {
    setChat(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    stompClient.send(
      `/app/message/${chatRoomId}`,
      {},
      JSON.stringify({
        chatRoomId: chatRoomId,
        userId: userId,
        message: chat,
      })
    );
    setChat("");
  };

  return (
    <div className="chat">
      <button onClick={() => setChatRoomId(1)}>1번방</button>
      <div className="chat__list">
        {chatList.map((chat) => (
          <div className="chat__item" ref={chatListRef}>
            <div className="chat__item__user">{chat.user.nickname}</div>
            <div className="chat__item__message">{chat.message}</div>
          </div>
        ))}
      </div>
      <form className="chat__form" onSubmit={onSubmitHandler}>
        <input
          className="chat__form__input"
          type="text"
          value={chat}
          onChange={onChangeHandler}
          ref={chatRef}
        />
        <button className="chat__form__button" type="submit">
          전송
        </button>
      </form>
    </div>
  );
};
