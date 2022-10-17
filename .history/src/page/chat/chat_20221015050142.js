import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { SERVER } from "../../util/Variables.js";
import { Stomp } from "@stomp/stompjs";

export const Chat = () => {
  const client = useRef({});

  const userId = useSelector((state) => state.token.userId);
  const [chat, setChat] = useState("");
  const [chatList, setChatList] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [chatRoomId, setChatRoomId] = useState(null);
  const location = useLocation();

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "http://localhost:8080/message",
      onConnect: () => {
        console.log("connected");
        client.current.subscribe("/sub/chat/room/" + chatRoomId, (res) => {
          console.log(res);
          const chat = JSON.parse(res.body);
          setChatList((prev) => [...prev, chat]);
        });
      },
      onStompError: (frame) => {
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      },
    });
    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const sendMessage = () => {
    client.current.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({
        chatRoomId: chatRoomId,
        userId: userId,
        message: chat,
      }),
    });
  };
};
