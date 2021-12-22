/* eslint-disable */
// material
import { Box, Grid, Container, Typography, Collapse, Alert, IconButton } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppNewsUpdate
} from '../components/_dashboard/app';

import AppNoticeUpdate  from  '../components/alert/AppNoticeUpdate';
import * as React from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { height } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/toast.css';


// ----------------------------------------------------------------------
//socket
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import { useEffect } from 'react';
import { useAuthState } from 'src/Context';
import { useState } from 'react';
import moment, { now } from 'moment';



export default function DashboardApp() {

  const auth = useAuthState();
  const time = moment(now()).format('YY/MM/DD   HH:mm');
  const [name,setName] = useState(`안녕하세요 ${auth.name}`);
  const [regTime,setRegtime] = useState(``);
  const [contents,setContents] = useState('');
  const [alert ,setAlert] =useState(false);
  
  useEffect(() => {

    setInterval
    AlertSocket();
  }, []);

  
  useEffect(() => {
    toast(`${name} 님  :    ${contents} `);
  }, [alert])
  
  
  const AlertSocket = async() => {
    console.log('SOCKET CONNECT >>>>>>')
      const list = await axios.post(`/TT/ring/alert/${auth.token}`, {headers:{"Content-Type":"application/json"}} )
                  .then((res) => {
                    if(!res){
                      console.log('res값 x')
                      return
                    }
                    const chatNolist = res.data;
                    console.log(chatNolist)
                    console.log(res.data[0].no)
                    return chatNolist
                  }).catch((err) => {
                    console.log(err);
                  })
  
   
      
      const socket = new SockJS('http://localhost:8080/TT/alertsocket');
      const stompClient = Stomp.over(socket);
      
      if(list){
      stompClient.connect({},function(){
      list.map((chat) => {
        console.log('SUB CHAT NO >>>>>>>>>>>>' , chat.no);
          stompClient.subscribe(`/topic/${chat.no}`,  (message) => {
            const msg =  JSON.parse(message.body);
            console.log("3. AlertDATA >>" , msg);
            setName(msg.name);
            setRegtime(msg.regTime);
            setContents(msg.contents);
            setAlert(true);
          });
  
        })
    
      })
    }
  
  }
  



  return (
    <Page title="TIKITAKA">
      <Container maxWidth="xl">
          <AppNoticeUpdate />
      </Container>
      <div>
      <ToastContainer position="bottom-right" style={{minHeight: "100px"}}/>
      </div>
     
    </Page>
  );
}
