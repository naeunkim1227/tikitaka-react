/* eslint-disable */

import React, {useState, useEffect, useRef } from 'react';
import './assets/css/components.css';
import './assets/css/style.css';
import './assets/css/chatroom.css';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';
// import SendIcon from '@mui/icons-material/Send';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import { green, lightGreen, red } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import axios from 'axios';
import { useAuthState } from 'src/Context';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import ImageIcon from '@mui/icons-material/Image';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import $ from 'jquery';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Block } from '@mui/icons-material';
import { Air } from '@mui/icons-material';

// Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { now } from 'lodash';
import moment from 'moment';

import Modal from '@mui/material/Modal';
import ChatNotice from 'src/components/ChatNotice';
import { useChatContext, useChatStateContext } from 'src/Context/context';
import Scrollbar from 'src/components/Scrollbar';

///////////////////////////////////////////////////////////////////////

const ChatRoom = () => {
    const [contents, setContents] = useState();
    const auth = useAuthState();
    const [messageList, setMessageList] = useState([]);
    const [roomCallState, setRoomCallState] = useState(false);
    const [image, setImage] = useState();
    const [loadImg, setLoadImg] = useState();
    const [typeState, setTypeState] = useState();
    const imgRef = useRef(null);
    const sendImgRef = useRef();
    const sendMsgRef = useRef();
    // const chatinfo= {
    //   userNo: auth.token
    // }

  //보낸 메세지 상태 관리,저장 context
  const chatstate = useChatStateContext();
  const ttmessage = useChatContext();
  const [msg,setMsg] = useState({});

  // 최근 공지 채팅방 상단에 띄우기
  const [rcNotice, setRcNotice] = useState([]);

  useEffect(() => {
    console.log('1. OPEN SOCKET')
    opensocket();
    recentNotice(); // 최근 공지 상단에 고정
}, [auth.chatNo]);
 
    const messageHandle = (e) =>{
        setContents(e.target.value);
        setTypeState('TEXT');
    }  

    const uploadImage = (e) =>{
      setLoadImg(e.target.files[0]);
      setTypeState('IMAGE');
    }

    const messageReset = () =>{
      console.log("메세지 입력창 초기화!!!");
      sendMsgRef.current.value='';
      setContents('');
    }

    const loadImgReset = ()=>{
      console.log("이미지 업로드 초기화!!!");
      sendImgRef.current.value='';
      setLoadImg('');
    }


    const opensocket = async() => {
      console.log('2. SOCKET CHAT NO >> ',auth.chatNo);
      if(auth.chatNo){
        var socket = new SockJS('http://localhost:8080/TT/websocket');
        var stompClient = Stomp.over(socket);
        stompClient.connect({},function(){
          console.log('link sub socket');
          stompClient.subscribe(`/topic/${auth.chatNo}`,  (message) => {
            const msg =  JSON.parse(message.body);
            
            console.log("3. DATA >>" , msg);
            showMessage(msg);
          });

      })
      }
        
    }

    // 최근 공지 채팅방 상단에 띄우기
    const recentNotice = async() => {
      console.log('<<< recentNotice 들어옴 >>>', auth.chatNo);
      const res = await axios.post(`/TT/talk/topic/recentNotice/${auth.chatNo}`,
                                    {headers: {
                                      'Content-Type' : 'application/json',
                                      'Accept' : 'application/json'
                                    }}
      )
      .then((res) => {
        console.log("recentNotice >>>" + JSON.stringify(res.data.data));
        setRcNotice(res.data.data);
      })
    }

    const sendMessage = async (e) => {
      e.preventDefault();
      // const data= {
      //   userNo: auth.token,
      //   name: auth.token,
      //   type: typeState,
      //   chatNo: auth.chatNo,
      //   message: contents,
      //   readCount: 1,
      //   regTime: time        
      // }
      console.log('SEND MESSAGE TO ', auth.chatNo)
      const time = moment(now()).format('YY/MM/DD HH:mm');
    
      switch(typeState){
        case 'TEXT':
          const messageData= {
            userNo: auth.token,
            name: auth.name,
            chatNo: auth.chatNo,
            type: typeState,
            message: contents,
            readCount: 1,
            regTime: time
          }
          return await axios.post(`/TT/talk/topic`, JSON.stringify(messageData), {headers:{"Content-Type":"application/json", "charset":"UTF-8"}})
                .then((response) => {
                  console.log("msg send: ", response);
                  // showMessage(response);
                  messageReset();
                  return response;
                })
                .catch((err) => {
                  console.log(err);
                })

        case 'IMAGE':
          const formData = new FormData();
          formData.append('file', loadImg);
          console.log(loadImg);
          const result = await axios.post(`/TT/talk/topic/sendimage`, formData, {headers:{"Content-Type":"multipart/form-data", "charset":"UTF-8"}})
                .then((response) => {
                  console.log("img send: ", response.data);
                    setImage(response.data);
                    loadImgReset();
                  return response.data;
                })
                .catch((err) => {
                  console.log(err);
                });
          const ans = await result;
          
          const imageData = {
            chatNo : JSON.parse(auth.chatNo),
            userNo : auth.token,
            name: auth.name,
            type: typeState,
            message: result,
            readCount: 1,
            regTime: time
          } 
          console.log("imageData!!!!!!!!!!!!!!!"+imageData.message);
          return  axios.post(`/TT/talk/topic`, JSON.stringify(imageData), {headers:{"Content-Type":"application/json", "charset":"UTF-8"}})
                          .then((response) => {
                            console.log("img send: ", response);
                            //showMessage(response);
                            return response;
                          })
                          .catch((err) => {
                            console.log(err);
                          })
          
        case 'FILE':
          return
    }



    //  **순서: 채널추가 -> 해당채널번호로 메시지 전송 -> 채널삭제 / 채널리스트 출력(한개씩 주석풀면서 테스트해보면)
      //메시지 보내기
      // const res = await axios.post(`/TT/talk/topic`, JSON.stringify(data), {headers:{"Content-Type":"application/json", "charset":"UTF-8"}})
      // .then((response) => {
      //   console.log("msg send: ", response);
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

    // //이전 채팅 목록 불러오기 아직 완료 안함 스프링 연동만 했음
    // const getmessage = async(e) => {
    //   try{
    //     console.log('데이터 보내버렷',chatinfo.chatNo);
    //     const res = await axios.post('/TT/talk/getmsg', JSON.stringify(chatinfo),{headers:{"Content-Type":"application/json"}})
    //     .then((res) => {
    //       console.log('data test', res)
    //       if(res.statusText !== "OK"){
    //         throw `${res.status} ${res.statusText}`
    //       }
    //     })
    //   }catch{
  
    //   }
    // }

    const chatList =  async () =>{
      // auth의 chatNo로 chatNo가 가진 UserNo을 모두 가져오기 
      const chatNo = JSON.parse(auth.chatNo);
      console.log("chatList 불러옴!!!!");
  
      try {
        const res =  await axios.get(`/TT/talk/chatList/${chatNo}`)
                               .then((res)=>{
                                 console.log("chatList: "+JSON.stringify(res.data));
                                 setMessageList(res.data);
                               })
      } catch (error) {
        console.log(error);
      }
      showList();
    }
    
    const showList = () => {
      messageList.map((list) => {
        console.log("showList map 들어옴!!!!!!!!!!!!!!!!!!!!!!");
        console.log(list.type);
        console.log(list.contents);
        console.log(list.user_no);
        switch(list.type){
          case 'TEXT':
            if(list.user_no === auth.token){
              return $("#chat-room").append("<h3>"+ list.name+": </h3>" + "<p id='myMessage'>" + list.contents + "</p>" + list.reg_time + "</br>" );
            }else {
              return $("#chat-room").append("<h3>"+list.name+": </h3>" + "<p id='yourMessage'>" + list.contents + "</p>" + list.reg_time + "</br>");
            }
          case 'IMAGE':
            if(list.user_no === auth.token){
              return $("#chat-room").append("<h3>"+ list.name+": </h3>" + "</br>" + `<img id='myimg' src=http://localhost:8080/TT${list.contents} width='250' height='250' ref={imgRef}/>`);
            }else {
              return $("#chat-room").append("<h3>"+ list.name+": </h3>" + "</br>" + `<img id='yourimg' src=http://localhost:8080/TT${list.contents} width='250' height='250' ref={imgRef}/>`);
            }
        }
      })
      setRoomCallState(true);
    }

    const showMessage = (msg) =>{
      // const result = JSON.parse(response.config.data);
      
      console.log(">>>>>>>>>>>>>>>>>>" ,msg.contents);
      console.log(">>>>>>>>>>>>>>>>>>" ,typeof msg.userNo);
      console.log(">>>>>>>>>>>>>>>>>>" ,msg.name);
      console.log(">>>>>>>>>>>>>>>>>>" ,msg.regTime);
      console.log(">>>>>>>>>>>>>>>>>>" ,msg.chatNo);
      console.log(">>>>>>>>>>>>>>>>>>" ,msg.type);
      console.log(">>>>>>>>>>>>>>>>>>>>auth",typeof auth.token);
     

      switch(msg.type){
        case 'TEXT':
          console.log("TEXT 실행됨!!");
          console.log("4. VIEW MSG >>>>>" ,msg.contents);
           if(msg.userNo === auth.token){
             console.log('>>>>>>>> 보내는 내용');
            return $("#chat-room").append("<h3>"+ msg.name+": </h3>" + "<p id='myMessage'>" + msg.contents + "</p>" + msg.regTime + "</br>" );
          }else if(auth.token !== msg.userNo){
            console.log('<<<<<<<<< 받아야 하는 내용');
            return $("#chat-room").append("<h3>"+msg.name+": </h3>" + "<p id='yourMessage'>" + msg.contents + "</p>" + msg.regTime + "</br>");
          }

        case 'IMAGE':
          console.log("IMAGE 실행됨!!");
          if(msg.userNo === auth.token){
            return $("#chat-room").append("<h3>"+ msg.name+": </h3>" + "</br>" + `<img id='myimg' src=http://localhost:8080/TT${msg.contents} width='250' height='250' ref={imgRef}/>`);
          }else{
            return $("#chat-room").append("<h3>"+ msg.name+": </h3>" + "</br>" + `<img id='yourimg' src=http://localhost:8080/TT${msg.contents} width='250' height='250' ref={imgRef}/>`);
          }
        case 'FILE':
      }
      
      
    }
  
    // const authNo = no;
    // //const fuserNo = res.data.userNo; // response데이터의 userNo 변수로저장 후 userNo와 현재로그인한 유저의 번호를 비교하여

  // //이전 채팅 목록 불러오기 아직 완료 안함 스프링 연동만 했음
  // const getmessage = async(e) => {
  //   try{
  //     console.log('데이터 보내버렷',chatinfo.chatNo);
  //     const res = await axios.post('/TT/talk/getmsg', JSON.stringify(chatinfo),{headers:{"Content-Type":"application/json"}})
  //     .then((res) => {
  //       console.log('data test', res)
  //       if(res.statusText !== "OK"){
  //         throw `${res.status} ${res.statusText}`
  //       }
  //     })
  //   }catch{

  //   }
  // }
  // const chatList =  async () =>{
  //   // auth의 chatNo로 chatNo가 가진 UserNo을 모두 가져오기
  //   const chatNo = JSON.parse(auth.chatNo);

  //   try {
  //     const res =  await axios.get(`/TT/talk/chatList/chatNo`)
  //                            .then((res)=>{
  //                              console.log(JSON.stringify(res.data.list.no));
  //                              setMessageList(JSON.stringify(res.data));
  //                            })
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }
  
  useEffect(() => {
    if (roomCallState === false) {
      console.log("chatList 들어옴!!!");
      chatList();
    } else {
      return;
    }
  });
  // const authNo = no;
  // //const fuserNo = res.data.userNo; // response데이터의 userNo 변수로저장 후 userNo와 현재로그인한 유저의 번호를 비교하여
  //                                 // 화면에 채팅창을 나눠서 표시


  


  //--------------------------------------------------
  // modal open
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // modal style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 3,
    pt: 2,
    px: 4,
    pb: 3
  };
  //--------------------------------------------------


    return (
      <Card sx={{ minWidth: 275 }}>
      <CardContent id='room-top'>
        <h3>{auth.name}님의 채팅방</h3>
      </CardContent>
      <CardContent id='room-top'>
        {/* chatNo에 해당하는 채팅방의 최근 공지 가져와서 채팅방 상단에 띄우기 
            no (noticeNo), reg_date, contents, name, title*/}
        {rcNotice.map((rclist)=> {
          return(
            <div>
            <h4>공지 제목 : {rclist.title} </h4>  
            <h5>내용 : {rclist.contents} </h5> 
            <h5>작성자 : {rclist.name} / 작성일 : {rclist.reg_date} </h5>
            </div>
          ); 
         
        }
        )
      }
        
      </CardContent>
      <CardContent id='room' sx={{ width:'100%' , height:"70vh"}}>
        <Scrollbar sx={{ height: { xs: 500, sm: 600 } }}>
        <div id='chat-room'>
          
        </div>  
        {/* <img src={`http://localhost:8080/TT${image}`} width="250" height="250" ref={imgRef}/>   */}
        {/* {() => {
          const datalist = messageList.map((message) => {
           
            return(
              auth.token === message.list.no
              ?
              <ListItem style={{width: 400, borderRadius: '10px', backgroundColor: 'greenyellow'}} key={index}>
                <ListItemText>
                  {message.contents}
                </ListItemText> 
                </ListItem> 
                :
                <ListItem style={{width: 400, borderRadius: '10px', backgroundColor: 'skyblue'}} key={index}>
                  <ListItemText>
                    {message.contents}
                  </ListItemText>
                </ListItem> 
            )
          })
    
          return(
            <List>
              {datalist}
            </List>
          )

        }}  */}
        


      
        </Scrollbar>
      </CardContent>
      <CardContent id='room-bottom'>
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
          {/* 공지 >>> Button, Modal */}
          <div>
            <Button onClick={handleOpen}>
              <ArticleIcon sx={{ width: 40, height: 40}} />
            </Button>
                <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <ChatNotice />
            </Modal>
          </div>
          
          <Button>
            <AssignmentIndIcon sx={{ width: 40, height: 40}} />
          </Button>
          <Button >
            <label for='input-file'><ImageIcon sx={{ width: 40, height: 40}}/></label>
            <input id='input-file' type='file' accept='images/*' onChange={uploadImage} ref={sendImgRef} style={{display:"none"}}/>
          </Button>
          <Button>
            <UploadFileRoundedIcon sx={{ width: 40, height: 40}} />
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
          value={contents}
          onChange={messageHandle}
          ref = {sendMsgRef}
        />
        
       
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