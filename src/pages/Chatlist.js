/* eslint-disable */
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
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
import { useChatStateContext } from 'src/Context/context';
import { gettopic } from 'src/Context/action';

export default function Chatlist() {
  const navigate = useNavigate();
  const [chatlist, setChatlist] = useState([]);
  const [chatroomMap, setChaproomMap] = useState(new Map());
  const auth = useAuthState();
  const dispatch = useAuthDispatch();
  const chatstate = useChatStateContext();
  const userno = auth.token;
  const arrmap = new Map();
  useEffect(() => {
    getChatlist(userno);
  }, []);
    
    //로그인하고있는 사용자의 no을 가지고 chatlist를 return 받아옴
    const getChatlist = async(userno) => {
        try{
            
            //사용자 연결되어있는 채팅리스트를 출력
            const res = await axios.post(`/TT/talk/topiclist/${userno}`)
            .then((response) => {
            var arr = [];
            arrmap.clear();
            for(var i=0; i<response.data.length; i++){
                arr.push(response.data[i].no);
                arrmap.set(response.data[i].no, response.data[i].title);
            }
            setChaproomMap(arrmap);
            return arr;

            }).catch((err)=>{
            console.log(err);
            })

            setChatlist(res);
        }
        catch(err){
            console.log("chatlist error" + err);
        }
    }

  return (
      <Page>
          <List sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper'}}>
          {chatlist && chatlist.map((chatno) => {
            return (                
            <ListItemButton alignItems="flex-start"
            onClick={(e) => {
                console.log("선택한 채팅방의 chatno: ",chatno);
                console.log("선택한 채팅방의 샤싣: ",chatroomMap.get(chatno));
                gettopic(dispatch,chatno, chatroomMap.get(chatno));
                navigate('/tikitaka/chat', { replace: true});
            }}
            >
            <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
            primary={chatroomMap.get(chatno)}
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
            //   secondary={
            //     <React.Fragment>
            //       <Typography
            //         sx={{ display: 'inline' }}
            //         component="span"
            //         variant="body2"
            //         color="text.primary"
            //       >
            //         Sandra Adams
            //       </Typography>
            //       {' — Do you have Paris recommendations? Have you ever…'}
            //     </React.Fragment>
            //   }
            />
        </ListItem>
        </List>      
        </Page>
    
    );
}
