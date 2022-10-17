import React, { useState, useEffect } from 'react';
import {over} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { SERVER } from '../../util/Variables';

const ChatRoom = () => {

    const stompClient = null;
    const [publicChat, setPublicChat] = useState([]);
    const [privateChat, setPrivateChat] = useState([]);
    const [userData, setUserData] = useState({
        username: '',
        receiver: '',
        connected: false,
        message: '',
    }
    );

    const handleUserName = (e) => {
        const { value } = e.target;
        setUserData({
            ...userDatas,
            username: value,
        });
    }
    const registerUser = () => {
        const Sock = new SockJS(`${SERVER}/ws`)};
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setUserData({
            ...userData,
            connected: true,
        },
        stompClient.subscribe('/topic/public', onPublicMessageReceived);
        stompClient.send('/app/public', onPrivateMessageReceived);
        );
    }

    const onPublicMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        switch (message.type) {
            case 'JOIN':
                break;
            case 'LEAVE':
                break;
            case 'CHAT':
                publicChat.push(message);
                setPublicChat([...publicChat]);
                break;
            default:
                break;
        }
    }

    const onPrivateMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        switch (message.type) {
            case 'JOIN':
                break;
            case 'LEAVE':
                break;
            case 'CHAT':
                privateChat.push(message);
                setPrivateChat([...privateChat]);
                break;
            default:
                break;
        }


    const onError = (error) => {
        console.log(error);
    }


    return (
        <div>
            {userDatas.connected ? (
                <div>
                    </div>:
                    <div className ='register'>
                        <input type='text' 
                        placeholder='Enter your name' 
                        value={userData.username} 
                        onChange={handleUserName} />