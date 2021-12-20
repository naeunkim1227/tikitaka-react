import React, { useRef } from 'react'
import SockJsClient from 'react-stomp';

export default function Client(){
    const websocket = useRef(null); 
    // let topics = ['/topic/'+userId];

    return (
        <div>       
            <SockJsClient
              url= 'http://localhost:8080/TT'
            //   topics={topics}
              onMessage={msg => console.log(msg)}
              ref={websocket}
            />
        </div>    
    )
}