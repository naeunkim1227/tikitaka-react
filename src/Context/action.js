/* eslint-disable */

import { Iron } from "@mui/icons-material";
import axios from 'axios';

// Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { red } from "@mui/material/colors";

   //보낸 메세지 상태 관리,저장 context


export const loginUser=async (dispatch,loginPayload)=>{
    try{
        const response = await fetch('/TT/login',{
            method: "post",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(
                loginPayload )
        }).then(response =>{
            if(!response.ok){
                console.log("fail");
            }else{
                return response.json();
            }
        });
        console.log("action called", response.data);
        if(response.result === "success"){
            console.log("acton-loginsuccess 실행");
            dispatch({type:'LOGIN_SUCCESS',payload: response.data})
            sessionStorage.setItem('currentUser',response.data)
            return response.data;
        }
        
        dispatch({type:'LOGIN_ERROR',error:response.result})
        return ;

    }catch (error){
        dispatch({type:'LOGIN_ERROR',error: error})
        console.log(error);
    }
}

export const logout = async (dispatch,data) =>  {
    console.log('logout 메서드 실행');

    try{
        const res = await fetch(`/TT/logout`,{
            method: 'post',
            headers : {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }) 

        const json = await res.json();
        console.log('json data 받아오기! ', json.result);


        if(!res.ok){
            throw new Error(`${response.status} ${response.statusText}`)
        }
        
        if(json.result !== 'success2'){
            throw json.message;
        }
        
        if(json.result == 'success2'){
            dispatch({ type: 'LOGOUT' });
            sessionStorage.removeItem('currentUser');
            sessionStorage.removeItem('token');
        }

    }catch(err){
        throw console.log(`logout error:`, err);
    }


}



export const maketopic=async (dispatch, no, auth, type, title)=>{
    try{
        //type이 필요한가에 대한 고민해보기
        console.log('maketopic')
        const res = await axios.put(`/TT/talk/topic/${no}/${type}/${title}`, JSON.stringify(auth), {headers:{"Content-Type":"application/json"}})
        .then( (res) =>{
            if (!res){
              console.log("res값 없음")
              return;
            }
            console.log('MAKE TOPIC >>>>>>')
            const chatNo = res.data;
            dispatch({type:'STORE_CHATNO',payload: {chatNo, title}})
            sessionStorage.setItem('currentUser',res.data);
            sessionStorage.setItem('currentUser', title);
            
        }).catch((err) => {
            console.log(err);
        });
        
    }catch (error){
        dispatch({type:'LOGIN_ERROR',error: error})
        console.log(error);
    }
}


//이미 생성된 방일경우, chatno과 title을 Context에 저장
export const gettopic = async (dispatch,chatNo, title) => {

    console.log('gettopic');
    console.log(chatNo);
    dispatch({type:'STORE_CHATNO',payload: {chatNo, title} })
    sessionStorage.setItem('currentUser', title);
    sessionStorage.setItem('currentUser', chatNo); 
} 
