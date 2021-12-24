/* eslint-disable */
import { useNavigate } from 'react-router-dom';
import {useEffect, useState, useRef} from 'react';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { useAuthState } from 'src/Context';
import axios from 'axios';
import Page from 'src/components/Page';
import Scrollbar from 'src/components/Scrollbar';
import {  useAuthDispatch } from 'src/Context'; // gettopic 나중에 수정후 필요
import { useChatContext, useChatStateContext } from 'src/Context/context';
import { gettopic } from 'src/Context/action';
import { Box, styled } from '@mui/system';
import Badge from "@mui/material/Badge";
import {makeStyles} from "@material-ui/core";

//socket
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';


const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -50,
    top: 20,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    background: "#ff4d4f"
  }
}));

const useStyles = makeStyles((theme) => ({
  mainContent: {
    display: 'box',
    lineClamp: 2,
    boxOrient: 'vertical',  
    overflow: 'hidden',
  }
}));



export default function Chatlist() {
  const classes = useStyles(); //frontend
  const navigate = useNavigate();
  const [chatNolist, setChatlist] = useState([]);
  const arrtitlemap = new Map(); //채팅방 title (key:chatNo value:title)
  let arrcontentmap = new Map(); //채팅방 last_content (key:chatNo value:last_content)
  let arrnoreadmap = new Map(); //채팅방 NoReadCount (key:chatNo value:NoReadCount)
  const [chatroomNameMap, setChaproomMap] = useState(new Map());
  const [preContentMap, setPreContentMap] = useState(arrcontentmap);
  const [chatContentMap, setChatContentMap] = useState(new Map());
  const [preNoreadMap, setpreNoreadMap] = useState(arrnoreadmap);
  const [chatNoreadMap, setChatNoreadMap] = useState(new Map());


  const auth = useAuthState();
  const dispatch = useAuthDispatch();
  const chatstate = useChatStateContext();
  const opuser = useChatContext();
  const userno = auth.token;


  useEffect(() => {
    getChatlist1(userno);
  },[])

  useEffect(() => { //처음 마운트될때 실행됨
    getChatlist(userno);
    
  },[chatContentMap]);


      //로그인하고있는 사용자의 no을 가지고 chatlist를 return 받아옴
      const getChatlist1 = async(userno) => {
        try{
            
            //사용자 연결되어있는 채팅리스트를 출력
            const res = await axios.post(`/TT/talk/topiclist/${userno}`)
            .then((response) => {
            var arr = [];
            arrtitlemap.clear();
            console.log("chatlist data!!!!!!!!"+JSON.stringify(response));
            for(var i=0; i<response.data.length; i++){
                arr.push(response.data[i].no);
                arrtitlemap.set(response.data[i].no, response.data[i].title);
                console.log('>>>>>>>>>>>>>>>>>>>>>>>', response.data);
            }
            setChaproomMap(arrtitlemap);
            return arr;
            }).catch((err)=>{
            console.log(err);
            })
            setChatlist(res);
            //noReadMessage count하기
            for(var i=0; i<res.length; i++){
              await getnoReadmsgCount(userno,res[i]);
            }
            //채팅방 list에서 마지막으로 보여지는 메시지만 가져옴
            const res2 = await axios.post(`/TT/talk/topiclistmsg/${userno}`)
            .then((response) => {
              arrcontentmap.clear();
              for(var i=0; i<response.data.length; i++){
                arrcontentmap.set(response.data[i].chat_no, response.data[i].contents);
              }
              setPreContentMap(arrcontentmap);
              setChatContentMap(arrcontentmap);
            }).catch((err)=>{
            console.log(err);
            })

            // 채팅방번호로 속한 멤버 정보 가져오기
            const res3 = await axios.post(`/TT/searchlotinfo/${userno}`)
                        .then((response) => {
                          console.log(response);
                          chatstate({type: 'STORE_TITLE', chatdata: response.data})
                          sessionStorage.setItem('chatMessage',response.data)
                        }).catch((err)=> {
                          console.log(err);
                        })
            
        }
        catch(err){
            console.log("chatlist error" + err);
        }
    }

  
    //로그인하고있는 사용자의 no을 가지고 chatlist를 return 받아옴
    const getChatlist = async(userno) => {
        try{
            
            //사용자 연결되어있는 채팅리스트를 출력
            const chatnolist = await axios.post(`/TT/talk/topiclist/${userno}`)
            .then((response) => {
            var arr = [];
            arrtitlemap.clear();
            for(var i=0; i<response.data.length; i++){
                arr.push(response.data[i].no);
                arrtitlemap.set(response.data[i].no, response.data[i].title);
            }
            setChaproomMap(arrtitlemap);
            return arr;
            }).catch((err)=>{
            console.log(err);
            })
            setChatlist(chatnolist);


            const socket = new SockJS('http://localhost:8080/TT/alertsocket');
            const stompClient = Stomp.over(socket);
            

            if(chatnolist){
            stompClient.connect({},function(){
              chatnolist.map((chat) => {
              console.log('SUB CHAT NO(ChatList) >>>>>>>>>>>>' , chat);
                stompClient.subscribe(`/topic/${chat}`,  (message) => {
                  const msg =  JSON.parse(message.body);
                  console.log("lastMsgDATA 222222>>" , msg);
                  if(msg.type === 'TEXT'){
                    arrcontentmap = preContentMap;
                    arrcontentmap.set(chat, msg.contents);
                    setPreContentMap(arrcontentmap);
                    setChatContentMap(arrcontentmap);

                    // arrnoreadmap = preNoreadMap;
                    // let countplus = arrnoreadmap.get(chat) + 1; //해당 챗넘버 key로 안읽은 메시지 수량 파악하고
                    // console.log("청소부청소부청소부청소부청소부",countplus);
                    // arrnoreadmap.set(chat, countplus);
                    // setChatNoreadMap(arrnoreadmap);


                  }
                  // else if(msg.type === 'IMAGE'){
                  //   const contents = `${msg.name} 님이 사진을 보냈습니다.`
                  //   setContents(contents);
                  // }

                });
              })
          
            })
          }






            // //채팅방 list에서 마지막으로 보여지는 메시지만 가져옴
            // const res2 = await axios.post(`/TT/talk/topiclistmsg/${userno}`)
            // .then((response) => {
            //   arrcontentmap.clear();
            //   for(var i=0; i<response.data.length; i++){
            //     arrcontentmap.set(response.data[i].chat_no, response.data[i].contents);
            //   }
            //   setChatContentMap(arrcontentmap);
            // }).catch((err)=>{
            // console.log(err);
            // })
            
        }
        catch(err){
            console.log("chatlist error" + err);
        }
    }

  //채팅방 사용자가 읽지않은 Message 갯수 count
  const getnoReadmsgCount = async(userno, chatno) => {
    try{
        
        //사용자 연결되어있는 채팅리스트를 출력
        const res = await axios.post(`/TT/talk/topiclistnoread/${userno}/${chatno}`)
        .then((response) => {
          //arrnoreadmap.clear();
          console.log("여기찍히니",response.data);
          //arrnoreadmap = preNoreadMap;
          arrnoreadmap.set(chatno, response.data);
          setpreNoreadMap(arrnoreadmap);
          setChatNoreadMap(arrnoreadmap);
        }).catch((err)=>{
        console.log(err);
        })
    }
    catch(err){
        console.log("chatlist error" + err);
    }
  }

  return (
      <Page>
          <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper'}}>
          {chatNolist && chatNolist.map((chatno) => {
            return (             
            <ListItemButton alignItems="flex-start"
            onClick={() => {
                gettopic(dispatch,chatno, chatroomNameMap.get(chatno));
                navigate('/tikitaka/chat', { replace: true});
            }}
            >
            <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
            primary={                
            <Typography
              sx={{ display: 'inline' }}
              variant="overline"
              fontSize= "15px"
              color="text.secondary"
            >

              {chatroomNameMap.get(chatno)}
              
            </Typography>}
            secondary=
            {
              <React.Fragment>
                {
                  chatContentMap.get(chatno) == null ?
                  null:
                  <StyledBadge badgeContent={chatNoreadMap.get(chatno)} color="secondary">
                  <Typography
                    width="140px"
                    variant="body2"
                    color="text.primary"
                    className={classes.mainContent}
                    gutterBottom
                  >
                  {chatContentMap.get(chatno)}
                  </Typography>
                  </StyledBadge>
                }
              </React.Fragment>
            }
            
            />
            <ListItemText
            
            />
            </ListItemButton>
            
            )
          })}

        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText 
             primary="Design수정"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    seung woo
                  </Typography>
                  {' — Do you have Paris recommendations? Have you ever…'}
                </React.Fragment>
              }
            />
        </ListItem>
        </List>      
        </Page>
    
    );
}