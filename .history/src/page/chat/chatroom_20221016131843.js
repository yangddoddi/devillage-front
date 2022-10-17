import React, { useState, useEffect } from 'react';
import {over} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { SERVER } from '../../util/Variables';
import {styles} from './Chat.module.scss';

const ChatRoom = () => {

    const stompClient = null;
    const [publicChat, setPublicChat] = useState([]);
    const [privateChat, setPrivateChat] = useState(new Map());
    const [userData, setUserData] = useState({
        username: '',
        receiver: '',
        connected: false,
        message: '',
    }
    );
    const [tab, setTab] = useState('CHATROOM');

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
        if (privateChat.get(message.senderName)) {
            privateChat.get(message.senderName).push(message);
            setPrivateChat(new Map(privateChat));
        } else {
            const list = [];
            list.push(message);
            privateChat.set(message.senderName, list);
            setPrivateChat(new Map(privateChat));
    }


    const onPrivateMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        switch (message.type) {
            case 'JOIN':
                if (!privateChat.get(message.senderName)) {
                    privateChat.set(message.senderName, []);
                    setPrivateChat(new Map(privateChat));
                }
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
    }


    const onError = (error) => {
        console.log(error);
    }


    return (
        <div>
            {userDatas.connected ? (
                <div className={styles.chatBox}>
                    <div className={styles.memberList}>
                        <ul>
                            <li>Chatroom</li>
                            {publicChat.map((chat) => (
                                <li key={chat.senderName} onClick={() => setUserData({ ...userData, receiver: chat.senderName })}>
                                    {chat.senderName}
                                </li>
                            ))}
                        </ul>
                        <div className={styles.sendMessage}>
                            <input type="text" value={userData.message} onChange={(e) => setUserData({ ...userData, message: e.target.value })} />
                            <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
                </div>
            ) : (
                <div className={styles.loginBox}>
                    <input type="text" placeholder="Enter your name" onChange={handleUserName} />
                    <button onClick={registerUser}>Join</button>
                </div>
            )}
        </div>
    );
};