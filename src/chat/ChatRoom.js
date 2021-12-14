/* eslint-disable */ 

import React, {useState, Fragment } from 'react';
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
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import ImageIcon from '@mui/icons-material/Image';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';


const ChatRoom = () => {
    const [contents, setContents] = useState();
    const auth = useAuthState();
    const [state,setState] = useState(false)
    

    const messageHandle = (e) =>{
        setContents(e.target.value);
    }  
     
    

    const sendMessage = async (e) => {
      e.preventDefault();
      const data= {
        userNo: auth.token,
        name: auth.token,
        chatNo: '6',
        message: contents,
        readCount: 1
      }

      //  **순서: 채널추가 -> 해당채널번호로 메시지 전송 -> 채널삭제 / 채널리스트 출력(한개씩 주석풀면서 테스트해보면)

      //토픽(채널) 추가하는 axios
      // const res = await axios.put(`/TT/talk/topic/${data.chatNo}`, {headers:{"Content-Type":"application/json"}})
      // .then((res)=>{
      //     console.log(res);
      //     return res;
      // }).catch((err) => {
      //     console.log(err);
      // })

      //메시지 보내기
      const res = await axios.post(`/TT/talk/topic`, JSON.stringify(data), {headers:{"Content-Type":"application/json", "charset":"UTF-8"}})
      .then((response) => {
        console.log("msg send");
        return response;
      })
      .catch((err) => {
        console.log(err);
      })
      
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

      
        
      </CardContent>
      <CardContent style={{ borderTop: "2px solid gray", margin: 10, padding: 10}}>
      <form style={{alignItems: "center"}}>
      <Box
        sx={{
          display: 'flex',
          position:'abslolute',
          flexDirection: 'row',
          alignItems: 'center',
          '& > *': {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant='string'>
          <Button>
            <ArticleIcon sx={{ width: 40, height: 40}} />
          </Button>
          <Button>
            <AssignmentIndIcon sx={{ width: 40, height: 40}} />
          </Button>
          <Button>
            <ImageIcon sx={{ width: 40, height: 40}} />
          </Button>
          <Button>
            <UploadFileRoundedIcon sx={{ width: 40, height: 40}} />
          </Button>
          <Button>
            <RoomIcon sx={{ width: 40, height: 40}} />
          </Button>
        </ButtonGroup>
        <TextField
          inputMode
          hiddenLabel
          id="textWindow"
          placeholder='메시지를 입력하시오.'
          variant="outlined"
          style={{align:"center" , width: '50%'}}
          type='text'
          name="message"
          onChange={messageHandle}
          
        />
        <Button>
            <EmojiEmotionsIcon sx={{ position: 'absolute', width: 40, height: 40}} />
          </Button>
        <Button type='submit' variant="contained" style={{position: 'absolute', right:200}} size="large" onClick={sendMessage}>
          보내기
        </Button>
        </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatRoom;