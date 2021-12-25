/* eslint-disable */
import { useNavigate } from 'react-router-dom';
import {useEffect, useState, useRef, Fragment} from 'react';
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

  const socket = new SockJS('http://localhost:8080/TT/alertsocket');
  const stompClient = Stomp.over(socket);


  useEffect(() => {
    getChatlistinit(userno);
    return() => {
      stompClient.disconnect();
      socket.close();
    }
  },[])

  useEffect(() => { 
    opensocket(userno);
    return() => {
      stompClient.disconnect();
      socket.close();
    }
  },[chatContentMap]); 

  //socket으로 받아오는 마지막 메시지
  const upsetContent = (key, value) => {
    setChatContentMap((prev) => new Map(prev).set(key, value));
  }
  //socket으로 받아오는 안읽은 메시지 카운트
  const upsetnoReadcount = (key) => {
    setChatNoreadMap((prev) => new Map(prev).set(key, prev.get(key)+1));
  }

      //로그인하고있는 사용자의 no을 가지고 chatlist를 return 받아옴
      const getChatlistinit = async(userno) => {
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
                if(response.data[i].type == 'IMAGE'){
                  const contents = `사진을 보냈습니다.`
                  arrcontentmap.set(response.data[i].chat_no, contents);
                }
                else{
                  arrcontentmap.set(response.data[i].chat_no, response.data[i].contents);
                }
                
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

  
    //소켓으로 실시간으로 받아옴
    const opensocket = (userno) => {
        try{

            stompClient.connect({},function(){
              console.log('SUB USER NO(ChatList) >>>>>>>>>>>>' , userno);
              stompClient.subscribe(`/topic/${userno}`,  (message) => {
              const msg =  JSON.parse(message.body);
              console.log("Chatlist Data>>" , msg);
              for(var i=0; i<chatNolist.length; i++){
                if(msg.chatNo == chatNolist[i]){ //해당 chatno if문으로 비교

                  if(msg.type === 'TEXT'){
                    upsetContent(parseInt(msg.chatNo), msg.contents);
                  }
                  else if(msg.type === 'IMAGE'){
                    const contents = `사진을 보냈습니다.`
                    upsetContent(parseInt(msg.chatNo), contents);
                  }

                  if(msg.userNo != userno){
                    upsetnoReadcount(parseInt(msg.chatNo))

                  }
                  else{
                    console.log("NO COUNT")
                  } 
                }
              }
            });
          })    



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
                gettopic(dispatch,chatno, chatroomNameMap.get(chatno)); //컨테츠에 챗넘버랑 타이틀 업테이트해주면 네비게이트로 chat컴포넌트만 들어가면 저기 sub을 해준다.
                navigate('/tikitaka/chat');
                getChatlistinit(userno);
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
        </List>      
        </Page>
    
    );

}