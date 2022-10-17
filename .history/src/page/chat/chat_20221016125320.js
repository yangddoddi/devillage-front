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
  const [message, setMessage] = useState("");
  const location = useLocation();

  const sock = new SockJS(`${SERVER}/ws`);
  const client = Stomp.over(sock);
};
