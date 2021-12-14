/* eslint-disable */ 

import React, {useEffect} from 'react';
import ChatRoom from 'src/chat/ChatRoom';
//import { useAuthState } from 'src/Context';

export default function chat(){
    // const auth = useAuthState();
    // const createTopic = async (e) =>{
    //     const data = {
    //         chatNo: auth.token
    //     }

    //     //토픽(채널) 추가하는 axios
    //     const res = await axios.put(`/TT/talk/topic/${data.chatNo}`, {headers:{"Content-Type":"application/json"}})
    //     .then((res)=>{
    //         console.log(res);
    //         return res;
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "./src/chat/components-chats-box.js"
        document.body.appendChild(script);
    },[]);

    return (
        <div>
            <h1>Chat</h1>
            <ChatRoom />
        </div>
    );
};