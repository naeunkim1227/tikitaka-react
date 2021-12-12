/* eslint-disable */ 

import React, { useEffect, useRef, useState, useReducer } from 'react';
import './components.css';
import './style.css';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';
// import SendIcon from '@mui/icons-material/Send';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TextField from '@mui/material/TextField';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import axios from 'axios';
import { useAuthState } from 'src/Context';
import { AuthReducer, initialState } from 'src/Context/reducer';
import { SentimentDissatisfied } from '@mui/icons-material';

const ChatRoom = () => {
    const [contents, setContents] = useState();
    const auth = useAuthState();

    

    const messageHandle = (e) =>{
      setContents(e.target.value);
    }

    const sendMessage = async (e) => {
      e.preventDefault();
      const data= {
        userNo: auth.token,
        name: auth.name,
        chatNo: '6',
        message: contents,
        readCount: 1
      }

      //  **순서: 채널추가 -> 해당채널번호로 메시지 전송 -> 채널삭제 / 채널리스트 출력

      //토픽(채널) 추가하는 axios
      const res = await axios.put(`/TT/talk/topic/${data.chatNo}`, {headers:{"Content-Type":"application/json"}})
      .then((res)=>{
        console.log(res);
        return res;
      }).catch((err) => {
        console.log(err);
      })

      // //메시지 보내기
      // const res = await axios.post(`/TT/talk/topic`, JSON.stringify(data), {headers:{"Content-Type":"application/json", "charset":"UTF-8"}})
      // .then((response) => {
      //   console.log("msg send");
      //   return response;
      // })
      // .catch((err) => {
      //   console.log(err);
      // })
      
      // //사용자의 연결되어있는 채팅리스트를 출력
      // const res = await axios.get(`/TT/talk/topic`)
      //                   .then((res) => {
      //                     const channellist = res.data;
      //                     console.log("추후 채팅목록에 사용:"+ channellist);
      //                   }).catch((err)=>{
      //                     console.log(err);
      //                   })
      
      // //채팅방 나가기
      // const res = await axios.delete(`/TT/talk/topic/${data.chatNo}`)
      //                   .then((res) => {
      //                     console.log("사용자가 선택한chatno 채팅방 나가기"+res);
      //                   }).catch((err) => {
      //                     console.log(err);
      //                   })
              
    }

    

    return (
      <Card sx={{ minWidth: 275 }}>
      <CardContent style={{borderBottom: "2px solid gray"}}>
        <h1>채팅방 이름, 검색창</h1>
      </CardContent>
      <CardContent sx={{ minWidth: 600 , minHeight:450}}>

        {/* <Table colspan="5" sx={{ minWidth: 220 , minHeight:150}} aria-label="simple table">
          <TableBody rowsPerPageOptions={[5]} align="center">
            <tr>
              <td colspan="1">hi</td>
              <td colspan="4"></td>
            </tr>
            <tr>
              <td colspan="1">bye</td>
              <td colspan="4" rowspan="2">
                bye
              </td>
            </tr>
          </TableBody>
        </Table> */}
      </CardContent>
      <CardContent style={{ borderTop: "2px solid gray", margin: 10, padding: 10, alignItems: 'start'}}>
      <form>
        <Button>
            <Icon sx={{ color: green[500], 
                  width: 50, 
                  height: 50, 
                  fontSize: 30, 
                  border: '2px solid gray',
                  borderRadius: '5px'}}>+</Icon>
        </Button>
      
        <TextField
          inputMode
          hiddenLabel
          id="textWindow"
          placeholder='메시지를 입력하시오.'
          variant="outlined"
          style={{align:"center", left:200 , marginRight: "10px" , minWidth: 750}}
          type='text'
          name="message"
         
          onChange={messageHandle}
          
        />
        
        <Button type='submit' variant="contained" style={{position: 'absolute', right:100, marginRight: "10px"}} size="large" onClick={sendMessage}>
          Send
        </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatRoom;