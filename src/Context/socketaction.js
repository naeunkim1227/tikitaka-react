/* eslint-disable */
import { Iron } from "@mui/icons-material";
import axios from 'axios';

// Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useChatContext, useChatStateContext } from "./context";

//소켓 열기
export const opensocket = async(chatstate, chatNo) => {

   //보낸 메세지 상태 관리,저장 context
   const chatstate =  useChatStateContext();
   const sendmessge = useChatContext(); 


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

          dispatch({type: 'VIEW_MESSAGE', payload: msg})
          sessionStorage.setItem('chatMessage', msg );
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
        console.log("get topic에서의 데이터" , msg.contents);
        chatstate({type: 'VIEW_MESSAGE', chatdata: msg});
        sessionStorage.setItem('chatMessage',msg);
        
       });
    })
    dispatch({type:'STORE_CHATNO',payload: chatNo})
    sessionStorage.setItem('currentuser', chatNo)

}