/* eslint-disable */ 

import React, {useEffect} from 'react';
import ChatRoom from 'src/chat/ChatRoom';

export default function chat(){

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "./src/chat/components-chats-box.js"
        document.body.appendChild(script);
    },[]);

    return (
        <div>
            <h1>Chat</h1>
            <ChatRoom/>
        </div>
    );
};