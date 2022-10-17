import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { SERVER } from "../../util/Variables.js";
import { Stomp } from "@stomp/stompjs";

export const Chat = () => {
  const client = useRef({});
  const token = useSelector((state) => state.token.accessToken);

  const userId = useSelector((state) => state.token.userId);
  const [chat, setChat] = useState("");
  const [chatList, setChatList] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [chatRoomId, setChatRoomId] = useState(null);
  const location = useLocation();

  Stomp.over = function (socket) {
    return new StompJs.Client({
      brokerURL: () => socket,
      connectHeaders: {
        Authorization: token,
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
  }

    useEffect(() => {
        const socket = new SockJS(`ws://localhost:8080/message`);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe(`/sub/chat/room/${chatRoomId}`, (msg) => {
                const chat = JSON.parse(msg.body);
                setChatList((chatList) => [...chatList, chat]);
            });
        });
        setStompClient(stompClient);
    }
    , [chatRoomId]);
    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            onClick();
        }
    }
    const onClick = () => {
        const chat = {
            userId: userId,
            chatRoomId: chatRoomId,
            message: chat,
        };
        stompClient.send(`/pub/chat/message`, {}, JSON.stringify(chat));
        setChat("");
    }



    return (
        <h1>Chat</h1>
    )