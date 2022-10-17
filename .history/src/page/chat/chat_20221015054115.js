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

  const connect = () => {
    Stomp.over(function () {
      return new SockJS(`${SERVER}/message`);
    }).connect({}, function (frame) {
      console.log("Connected: " + frame);
      client.current.subscribe("/topic/" + chatRoomId, function (message) {
        console.log(message);
        // showMessage(JSON.parse(message.body));
      });
    });
  };
};
