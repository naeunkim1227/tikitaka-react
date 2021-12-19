/* eslint-disable */
import { Iron } from "@mui/icons-material";
import axios from 'axios';

// Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

//소켓 열기
export const opensocket = async(chatstate, chatNo) => {

    try{
      //소켓 열기
      console.log('opensocket');
      console.log(chatNo)
      var socket = new SockJS('http://localhost:8080/TT/websocket');
      var stompClient = Stomp.over(socket);
      // SockJS와 stomp client를 통해 연결을 시도.
      stompClient.connect({}, function () {
        console.log('Connected: ');
        stompClient.subscribe(`/topic/${chatNo}`,  (message) => {
         const msg =  JSON.parse(message.body);
         console.log(msg.contents);
         console.log('maketopic의 msg' ,msg);

         chatstate({type: 'VIEW_MESSAGE', chatdata: msg.contents})
         sessionStorage.setItem('chatMessage', msg.contents)
         console.log(sessionStorage.getItem('chatMessage'));
        });
      });
    
        console.log(msg);
        return null;
    
        }catch (error){
            console.log(error);
        }
    
    
    }
    
//이미 생성된 방일경우, topic가져와서 연결
export const gettopic = async(chatstate,dispatch,chatNo) => {
    
    console.log('gettopic');
    var socket = new SockJS('http://localhost:8080/TT/websocket');
    var stompClient = Stomp.over(socket);
    stompClient.connect({},function(){
      console.log('link sub socket');
      stompClient.subscribe(`/topic/${chatNo}`,  (message) => {
        const msg =  JSON.parse(message.body);
        console.log(msg.contents);
        console.log('gettopic의 msg',msg);

        chatstate({type: 'VIEW_MESSAGE', chatdata: msg.contents})
        sessionStorage.setItem('chatMessage', msg.contents)
        console.log(sessionStorage.getItem('chatMessage'));
        
       });
    })
    dispatch({type:'GET_TOPIC',payload: chatNo})

}