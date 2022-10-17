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

    const handleUserName = (e) => {
        const { value } = e.target;
        setUserDatas({
            ...userDatas,
            username: value,
        });
    }

    const registerUser = () => {
        const Sock = new SockJS('http://localhost:8080/ws');
    }