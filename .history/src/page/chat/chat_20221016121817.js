import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { SERVER } from "../../util/Variables.js";
import { Stomp } from "@stomp/stompjs";

export const Chat = () => {
  const token = useSelector((state) => state.token.accessToken);
  
const stompjs = StompJs;

  const endPoint = `${SERVER}/ws`;
  const sock = stomp