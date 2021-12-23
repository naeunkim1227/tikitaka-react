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
  const time = moment(now()).format('HH:mm');
  const [contents,setContents] = useState(`${time}`);
  const [alert ,setAlert] =useState(0);

  
      
  const socket = new SockJS('http://localhost:8080/TT/alertsocket');
  const stompClient = Stomp.over(socket);
  
  useEffect(() => {

    return() => {
      stompClient.disconnect();
      socket.close();
    }
  }, []);
  
  
  useEffect(() => {
    AlertSocket();
    toast(`${contents}`);
  }, [contents])
  
  
  const AlertSocket = async() => {
    console.log('SOCKET CONNECT >>>>>>')
   
  
   
      stompClient.connect({},function(){
        console.log('나의 번호', auth.token)
          stompClient.subscribe(`/topic/${auth.token}`,  (message) => {
            const msg =  JSON.parse(message.body);
            console.log("3. AlertDATA >>" , msg);
            const time = moment(now()).format('HH:mm');
            if(msg.type === 'TEXT'){
              const contents = `${msg.name} : ${msg.contents} | 전송시각 : ${time}`
              setContents(contents);
              setAlert(alert + 1 );
            }else if(msg.type === 'IMAGE'){
              const contents = `${msg.name} 님이 사진을 보냈습니다. | 전송시각 : ${time}`
              setContents(contents);
              setAlert(alert + 1 );


            }
          
          });
  
        })

  
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