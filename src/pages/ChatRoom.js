/* eslint-disable */

import React, {useState, useEffect, useRef } from 'react';
import './assets/css/components.css';
import './assets/css/style.css';
import './assets/css/chatroom.css';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';
// import SendIcon from '@mui/icons-material/Send';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import { green, grey, lightGreen, red } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import axios from 'axios';
import { useAuthState } from 'src/Context';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import ImageIcon from '@mui/icons-material/Image';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import $ from 'jquery';
import Calendar from './Calendar';

import Avatar from "@mui/material/Avatar";

import SendIcon from "@mui/icons-material/Send";
import LogoutIcon from "@mui/icons-material/Logout";

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

import IconButton from 'src/theme/overrides/IconButton';
import { CardFooter } from 'reactstrap';
import Scrollbar from 'src/components/Scrollbar';
import { useNavigate } from 'react-router-dom';

import saveAs from 'file-saver';

import UserContact from 'src/components/UserContact';

///////////////////////////////////////////////////////////////////////

const ChatRoom = () => {
    const [contents, setContents] = useState();
    const auth = useAuthState();
    const navigate = useNavigate();
    const opuser = useChatContext();
    const [messageList, setMessageList] = useState([]);
    const [roomCallState, setRoomCallState] = useState(false);
    const [image, setImage] = useState();
    const [loadImg, setLoadImg] = useState();
    const [typeState, setTypeState] = useState();
    const imgRef = useRef(null);
    const sendImgRef = useRef();
    const sendMsgRef = useRef();

    const [file, setFile] = useState();
    const [loadFile, setloadFile] = useState(); // append로 보낼 formData
    const fileRef = useRef(null);
    const sendFileRef = useRef();

    

    

    
   
    const socket = new SockJS('http://localhost:8080/TT/websocket');
    const stompClient = Stomp.over(socket);
    // const chatinfo= {
    //   userNo: auth.token
    // }

  //보낸 메세지 상태 관리,저장 context
  const chatstate = useChatStateContext();
  // const ttmessage = useChatContext();
  const [msg,setMsg] = useState({});

  // 최근 공지 채팅방 상단에 띄우기
  const [rcNotice, setRcNotice] = useState([]);

  useEffect(() => {
    console.log('1. OPEN SOCKET')
    console.log('>>>>>opuser',opuser);
    console.log(auth.profile);
    opensocket();
    recentNotice(); // 최근 공지 상단에 고정

    return() => {
      stompClient.disconnect();
      socket.close();
      exitTimeUpdate(); //chatroom 나갈떄 현재 시간 DB에 update
    }
}, [auth.chatNo]);
 
    const messageHandle = (e) =>{
        setContents(e.target.value);
        setTypeState('TEXT');
    }  

    const uploadImage = (e) =>{
      setLoadImg(e.target.files[0]); // 등록된 파일 가져오려면 [0]으로 들고와야함
      setTypeState('IMAGE');
    }

    const messageReset = () =>{
      sendMsgRef.current.value='';
      setContents('');
    }

    const loadImgReset = ()=>{
      sendImgRef.current.value='';
      setLoadImg('');
    }

    // // Spring에 보낸 파일 삭제
    const loadFileReset = () => { 
      sendFileRef.current.value='';
      setloadFile('');
    }

    // Button 클릭 시 uploadFile
    const uploadFile = (e) => {
      setloadFile(e.target.files[0]);
      setTypeState('FILE'); // switch(typeState){ => case 'FILE':
      // e.target.value =''; // Spring에 보낸 파일 삭제

      
    }

    const [soc,setSoc] = useState();

    const opensocket = async() => {
      console.log('2. SOCKET CHAT NO >> ',auth.chatNo);
      if(auth.chatNo){
        stompClient.connect({},function(){
          console.log('link sub socket');
          stompClient.subscribe(`/topic/${auth.chatNo}`,  (message) => {
            const msg =  JSON.parse(message.body);
            
            setMsg(msg);

            console.log("3. DATA >>" , msg);
            console.log("subData type!!!!"+msg.type);
            if(msg.type === undefined){
              showCalendar(msg);
            }else{
              showMessage(msg);
            }
            
            
          });
      })
      }
      
        
    }

        //채팅방 나가기
    const outChat = async(e) =>{
      console.log("OUTCHAT >>>>>>>", auth.chatNo);
      
     
       const res = await axios.delete(`/TT/talk/topic/${auth.chatNo}`)
                        .then((res) => {
                          console.log("사용자가 선택한chatno topic 삭제하기");
                          stompClient.disconnect();
                          socket.close();

                        }).catch((err) => {
                          console.log(err);
                        })
                        
        navigate('/tikitaka/main', { replace: true});
    }

    //채팅방 나갈때 time을 체크해서 채팅room list에서 안읽은 메시지 갯수 카운팅
    const exitTimeUpdate = async() =>{
      console.log('TIME UPDATE >> ')
      //const time = moment(now()).format('Y-MM-DD HH:mm:ss');
      const data={
        userno:auth.token,
        chatno:auth.chatNo
      }
      const res = await axios.post(`/TT/talk/updateouttime/`, JSON.stringify(data),{headers:{"Content-Type":"application/json", "charset":"UTF-8"}}) 
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
                  // showMessage(response);
                  messageReset();
                  return response;
                })
                .catch((err) => {
                  console.log(err);
                })

        case 'IMAGE':
          const formData = new FormData(); 
          formData.append('image', loadImg);
          const result = await axios.post(`/TT/talk/topic/sendimage`, formData, {headers:{"Content-Type":"multipart/form-data", "charset":"UTF-8"}})
                .then((response) => {
                    setImage(response.data); 
                    loadImgReset(); // 보내고 나서 전송한 파일 삭제
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
          const fileData = new FormData(); // FormData에는 키와 값 쌍으로 담아주어야 함
          // "file" -> key값 => Spring @RequestParam
          fileData.append("file", loadFile); // const [loadImg, setLoadImg] = useState(); 

          // Spring에서 File url을 리턴(fileResult로)받기 
          const fileResult = await axios.post(`/TT/talk/topic/sendFile`, 
                                        fileData, 
                                        { headers : {"Content-Type":"application/json" , 
                                                     "charset":"UTF-8"}
                                        })
                      .then((response) => {
                        setFile(response.data);
                        loadFileReset(); // Spring에 보낸 파일 삭제 (안하면 남아있어서 직접 삭제해 주어야한다.) 

                        console.log("file response data >>> ", file)

                        return response.data; // Spring - service에서 uuid로 생성한 url 값
                      })
                      .catch((err) => {
                        console.log("fileUpload error >>> ", err)
                      });
          
          const fResult = await fileResult;

          const sendFileData = {
            userNo : auth.token,
            name : auth.name,
            chatNo : JSON.parse(auth.chatNo),
            type : typeState,
            message : fResult,
            readCount : 1,
            regTime : time
          }

          // 메세지 전송하듯이
          return axios.post(`/TT/talk/topic`,
                            JSON.stringify(sendFileData),
                            {headers: {"Content-Type":"application/json" , 
                                      "charset":"UTF-8"}
                          })
                .then ((response) => {
                  console.log("file send >>> ", response);

                  return response;
                })
                .catch((err) => {
                  console.log(err);
                })

         
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
      try {
        const res =  await axios.get(`/TT/talk/chatList/${chatNo}`)
                               .then((res)=>{
                                 setMessageList(res.data);
                                 console.log('함 보자.....' ,res.data);
                               })
      } catch (error) {
        console.log(error);
      }
      showList();
    }





    //채팅목록 띄우기
    const showList = () => {
      messageList.map((list) => {
        const time = moment(list.reg_time).format('YY/MM/DD   HH:mm');
        switch(list.type){
          case 'TEXT':
            if(list.user_no === auth.token){
              return $("#chat-room").append("<div id='mybubble'><div id='bubble-name'>"+ list.name+ `<img id='bubble-image' src=http://localhost:8080/TT${auth.profile} ref={imgRef}></img>`
              +"</div><div id='myMessage'>" + list.contents + "<div id='bubble-time'>" + time + "</div></div>"
              + "</div>"
               );
            }else {
              return $("#chat-room").append("<div id='yourbubble'>" +
              "<div id='bubble-name'>"
              + list.name+`<img id='bubble-image' src=http://localhost:8080/TT${opuser.profile} ref={imgRef}></img>`  
              + "</div><div id='yourMessage'>" + list.contents + "<div id='bubble-time'>" + time + "</div></div>"
              + "</div>"
               );
            }

          case 'IMAGE':
            if(list.user_no === auth.token){
              return $("#chat-room").append("<div id='mybubble'><div id='bubble-name'>"+ list.name+ `<img id='bubble-image' src=http://localhost:8080/TT${auth.profile} ref={imgRef}></img>`
              +"</div><div id='myMessage'>" + list.contents + "<div id='bubble-time'>" + time + "</div></div>"
              + "</div>"
               );
            }else {
              return $("#chat-room").append("<div id='mybubble'><div id='bubble-name'>"+ list.name+ `<img id='bubble-image' src=http://localhost:8080/TT${auth.profile} ref={imgRef}></img>`
              +"</div><div id='myMessage'>" + list.contents + "<div id='bubble-time'>" + time + "</div></div>"
              + "</div>"
               );
            }

          case 'FILE':
            if(list.user_no === auth.token){
              return $("#chat-room").append("<div id='mybubble'>" +
              "<div id='bubble-name'>"
              + list.name+ `<img id='bubble-image'  src=http://localhost:8080/TT${auth.profile} ref={fileRef}></img>`  
              + "</div><div id='fileMessage'>" + list.contents + "<br></br>" + "<button id='fileDownButton' onclick='fileDown()'> 다운로드 </button>" + "<div id='bubble-time'>" + time + "</div></div>"
              + "</div>"
              ); 

            }else {
              return $("#chat-room").append("<div id='mybubble'>" +
              "<div id='bubble-name'>"
              + list.name+ `<img id='bubble-image'  src=http://localhost:8080/TT${auth.profile} ref={fileRef}></img>`  
              + "</div><div id='fileMessage'>" + list.contents + "<br></br>" + "<button id='fileDownButton' onclick='fileDown()'> 다운로드 </button>" + "<div id='bubble-time'>" + time + "</div></div>"
              + "</div>"
              ); 
            }

          

        }
      })
      setRoomCallState(true);
    }
    
    
    // 채팅창에서 파일다운로드 버튼 클릭시 
    window.fileDown = async(e) => {
      console.log('파일 다운로드 합시다')
      console.log("받아오나요? >>>>>>>> ", msg.contents)

      
    }

    const showMessage = (msg) =>{
      // const result = JSON.parse(response.config.data);

      switch(msg.type){
        case 'TEXT':
           if(msg.userNo === auth.token){

             return $("#chat-room").append("<div id='mybubble'>" +
             "<div id='bubble-name'>"
             + msg.name+ `<img id='bubble-image'  src=http://localhost:8080/TT${auth.profile} ref={imgRef}></img>`  
             + "</div><div id='myMessage'>" + msg.contents + "<div id='bubble-time'>" + msg.regTime + "</div></div>"
             + "</div>"
              );
          
          }else if(auth.token !== msg.userNo){
            return $("#chat-room").append("<div id='yourbubble'>" +
            "<div id='bubble-name'>"
            + msg.name+`<img id='bubble-image'  src=http://localhost:8080/TT${opuser.profile} ref={imgRef}></img>`  
            + "</div><div id='yourMessage'>" + msg.contents + "<div id='bubble-time'>" + msg.regTime + "</div></div>"
            + "</div>"
             );

          }

        case 'IMAGE':
          console.log("IMAGE 실행됨!!");
          if(msg.userNo === auth.token){
            return $("#chat-room").append("<div id='mybubble'>"+"<div id='bubble-name'>"  + msg.name+ `<img id='bubble-image'  src=http://localhost:8080/TT${auth.profile} ref={imgRef}></img>`  
            + "</div><div id='imgMessage'>" +  `<img id='myimg' src=http://localhost:8080/TT${msg.contents} width='1250' height='250' ref={imgRef}/>` + "<div id='bubble-time'>" + msg.regTime + "</div></div>"
            + "</div>"
             );



          }else{
            return $("#chat-room").append("<div id='yourbubble'>"+"<div id='bubble-name'>"  + msg.name+ `<img id='bubble-image'  src=http://localhost:8080/TT${opuser.profile} ref={imgRef}></img>`  
              + "</div><div id='imgMessage'>" +  `<img id='yourimg' src=http://localhost:8080/TT${msg.contents} width='250' height='250' ref={imgRef}/>` + "<div id='bubble-time'>" + msg.time+ "</div></div>"
              + "</div>"
               );
  
          }

        case 'FILE':
          console.log("FILE UPLOAD 실행됨!!")
          if(msg.userNo === auth.token){ // 다운로드 이미지하면서 수정할겁니다,,,
            return $("#chat-room").append("<div id='mybubble'>" +
             "<div id='bubble-name'>"
             + msg.name+ `<img id='bubble-image'  src=http://localhost:8080/TT${auth.profile} ref={imgRef}></img>`  
             + "</div><div id='fileMessage'>" + "<div> 파일 다운로드 </div> <br> </br>" 
            //  + `<a href=http://localhost:8080/TT${msg.contents} download>`  
             + "<button id='fileDownButton' onclick='fileDown()'> 다운로드 </button> " 
             + "<div id='bubble-time'>" + msg.regTime + "</div></div>"
             + "</div>"
              );
          } else if(auth.token !== msg.userNo){
            return $("#chat-room").append("<div id='mybubble'>" +
            "<div id='bubble-name'>"
            + msg.name+ `<img id='bubble-image'  src=http://localhost:8080/TT${auth.profile} ref={imgRef}></img>`  
            + "</div><div id='fileMessage'>" + ` <div> <a href=http://localhost:8080/TT/${msg.contents} download>  </a> </div>`  + "<br></br>" + "<button id='fileDownButton' onclick='fileDown()'> 다운로드 </button>" + "<div id='bubble-time'>" + msg.regTime + "</div></div>"
            + "</div>"
             );

          }

          case 'CONTACT':
            if(msg.userNo === auth.token){
 
              // return $("#chat-room").append("<div id='mybubble'>" +
              // "<div id='bubble-name'>"
              // + msg.name+ `<img id='bubble-image'  src=http://localhost:8080/TT${auth.profile} ref={imgRef}></img>`  
              // + "</div><div id='myMessage'>" + msg.contents + "<div id='bubble-time'>" + msg.regTime + "</div></div>"
              // + "</div>"
              //  );

              return $("#chat-room").append("<div id='myContact'>"
                                            + "<div id='con-head'> <p> 연락처 <p> </div> <br /> "
                                            + "<div id='con-body>"
                                            + "<div id='con-text'>"
                                            + "<p><strong> 이름 : </strong>" + msg.name + "</p>"
                                            + "<p><strong> 전화번호 : </strong>" + msg.contents + "</p>"
                                            + "</div> </div> </div>"
              );
           
           }else if(auth.token !== msg.userNo){
            return $("#chat-room").append("<div id='yourContact'>"
                                          + "<div id='con-head'> <p> 연락처 <p> </div> <br /> "
                                          + "<div id='con-body>"
                                          + "<div id='con-text'>"
                                          + "<p><strong> 이름 : </strong>" + msg.name + "</p>"
                                          + "<p><strong> 전화번호 : </strong>" + msg.contents + "</p>"
                                          + "</div> </div> </div>"
            );
 
           }  

      }
      
      
    }
  
    // const authNo = no;
    // //const fuserNo = res.data.userNo; // response데이터의 userNo 변수로저장 후 userNo와 현재로그인한 유저의 번호를 비교하여
  
  useEffect(() => {
    if (roomCallState === false) {
      chatList();
    } else {
      return;
    }
  });
  // const authNo = no;
  // //const fuserNo = res.data.userNo; // response데이터의 userNo 변수로저장 후 userNo와 현재로그인한 유저의 번호를 비교하여
  //                                 // 화면에 채팅창을 나눠서 표시


  


  //--------------------------------------------------
  // notice Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //--------------------------------------------------
  // contact Modal
  const [ctState, setCtState] = React.useState(false);
  const openContact = () => {
    setCtState(true);
  }
  const closeContact = () => {
    setCtState(false);
  }
  //--------------------------------------------------
  const sendContact = async (contactData) => {

    console.log("contactData >>>>>>>>>", contactData)
    const cData = {
      authNo : auth.token, // Long
      chatNo : auth.chatNo, // Long
      userName : contactData.userName.name, // String
      userPhone : contactData.userPhone.phone // String
    }

    console.log("cData>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" ,cData)

    // 받을 게 없으니 보내기만 하면 된다 - 메세지 보내듯이
    const res = await axios.post('/TT/talk/topic/sendContact', cData);

    return await axios.post(`/TT/talk/topic/sendContact`, 
                            JSON.stringify(cData), 
                            {headers:
                              {"Content-Type":"application/json", "charset":"UTF-8"}
                            })
                      .then((response) => {


                      console.log("dsfsdfsd >>>>>> >>>>>>>>> ", response)
                      console.log("sdfsdfdsf" , response.data)
                      messageReset();
                      return response;
                    })
                    .catch((err) => {
                      console.log(err);
                    })
    }

    
  




  const logintime = moment(opuser.login_time).format('YY/MM/DD HH:mm');
  
  
  //--------------------------------------------------
  // cal Modal
  const [calState, setCalstate] = React.useState(false);
  const calClose = () =>{
    setCalstate(false);
  }
  const openCalendar = ()=>{
    setCalstate(true);
  }

  // ========================

  const sendCalendar = async (data) =>{
    const calData = {
      chatNo: auth.chatNo,
      userNo: auth.token,
      title: data.title,
      contents: data.contentsCal,
      startDate: data.startDate,
      endDate: data.endDate
    }
    const response = await axios.post('/TT/talk/topic/addCalendar', calData);
  }
  
  const showCalendar = (cal) =>{
    if(auth.token === cal.userNo){
      return $("#chat-room").append("<div id='myCal'><p>알림등록</p>" +
                                    "<div id='cal-body'>"+ "<div id='cal-text'>" +
                                    "<p><strong>제목:&nbsp;</strong>"+ `${cal.title}</p>` + 
                                    "<p><strong>내용:&nbsp;</strong>"+ `${cal.contents}</p>` +
                                    "<p><strong>시작일:&nbsp;</strong>"+ `${cal.startDate}</p>` +
                                    "<p><strong>종료일:&nbsp;</strong>"+ `${cal.endDate}</p>` +
                                +"</div></div></div>");
    } else {
      return $("#chat-room").append("<div id='yourCal'><p>알림등록</p>" +
                                    "<div id='cal-body'>"+ "<div id='cal-text'>" +
                                    "<p><strong>제목:&nbsp;</strong>"+ `${cal.title}</p>` + 
                                    "<p><strong>내용:&nbsp;</strong>"+ `${cal.contents}</p>` +
                                    "<p><strong>시작일:&nbsp;</strong>"+ `${cal.startDate}</p>` +
                                    "<p><strong>종료일:&nbsp;</strong>"+ `${cal.endDate}</p>` +
                                +"</div></div></div>");
    }
    
  }

  const callback = (data) =>{
    calClose();
    data.startDate = moment(data.startDate).format('YY/MM/DD HH:mm');
    data.endDate = moment(data.endDate).format('YY/MM/DD HH:mm');
    sendCalendar(data);
  }  

  const contactCallback = (data) => {
    closeContact(); // cantact Modal 닫아주기
    console.log("contact!!!!!!!!!!!"+data);
    sendContact(data);   
  }
  

    return (
      <Card sx={{ minWidth: 275 }}>

      <CardHeader
        avatar={
          <Avatar aria-label="recipe"  src={`http://localhost:8080/TT${opuser.profile}`}>
          </Avatar>
        }
        title={opuser.name}
        subheader={`마지막 접속 시간 : ${logintime}`}
      >
        
      </CardHeader>

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
          
          {/* 연락처 >>> Button, Modal */}
          <div>
          <Button onClick={openContact}>
            <AssignmentIndIcon sx={{ width: 40, height: 40}} />
          </Button>
          <Modal
                open={ctState}
                onClose={closeContact}
              >
              {/* callback과 close 전달 */}
              <UserContact contactCallback={contactCallback} closeContact={closeContact}/>
          </Modal>
          </div>

          <Button >
            <label for='input-file'><ImageIcon sx={{ width: 40, height: 40}}/></label>
            <input id='input-file' type='file' accept='images/*' onChange={uploadImage} ref={sendImgRef} style={{display:"none"}}/>
          </Button>

          <Button>
            <label for='input-file2'><UploadFileRoundedIcon sx={{ width: 40, height: 40}} /></label>
            {/* input태그의 accept : 서버로 업로드할 수 있는 파일의 타입을 명시 */}
            <input id='input-file2' type='file' accept='text/plain' onChange={uploadFile} ref={sendFileRef} style={{display:"none"}}/>
          </Button>
          <div>
            <Button onClick={openCalendar}>
              <CalendarIcon sx={{ width: 40, height: 40}} />
            </Button>
            <Modal open={calState}
                   onClose={calClose}>
              <Calendar callback={callback} calClose={calClose}/>
            </Modal>
          </div>
        </ButtonGroup>
        <TextField
          inputMode
          hiddenLabel
          id="textWindow"
          placeholder='메시지를 입력하시오.'
          variant="outlined"
          style={{align:"center" , width: '40%'}}
          type='text'
          name="message"
          value={contents}
          onChange={messageHandle}
          ref = {sendMsgRef}
        />
       
        
      <Button variant="contained" style={{position: 'absolute', right:110 ,bottom: 40}} size="large" endIcon={<SendIcon />} onClick={sendMessage}>
        Send
      </Button>
      <Button variant="outlined" style={{position: 'absolute', right:0, bottom: 40}}  size="medium" startIcon={<LogoutIcon />} onClick={outChat}>
        나가기
      </Button>

      
       
        </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatRoom;
