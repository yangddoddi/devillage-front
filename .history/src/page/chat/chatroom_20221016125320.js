import React, { useState, useEffect } from 'react';
import {over} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const ChatRoom = () => {
    const [userDatas, setUserDatas] = useState({
        username: '',
        receiver: '',
        connected: false,
        message: '',
    }
    );