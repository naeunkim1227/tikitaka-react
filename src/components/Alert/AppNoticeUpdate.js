/* eslint-disable */
import * as React from 'react';
import { useEffect, useState } from 'react';

import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { mockImgCover } from '../../utils/mockImages';
//
import Scrollbar from '../Scrollbar';

//component 추가
import NoticeList from './NoticeList';
import { useAuthState } from '../../Context';

//socket
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';

export default function AppNoticeUpdate() {


const [notice, setNotice] = useState([]);
const auth = useAuthState();
const [chatNolist,SetchatNolist] = useState();


const socket = new SockJS('http://localhost:8080/TT/alertsocket');
const stompClient = Stomp.over(socket);


const data = {
  token : auth.token
}

useEffect(() => {
    getAlertData();
}, []);



const getAlertData =  async () => {
    
  try{
    const res = await fetch(`/TT/main/`, {
      method: 'post',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    setNotice(json.data);
    
    if(!res.ok){ 
      throw new Error(`${res.status} ${res.statusText}`)}


      if(json.result !== 'success'){
        throw json.message;
      }


    }catch(err){
      console.log('main fetch error',err);
    }


}

  return (
    <Card>
      <CardHeader title="중요 공지" />
      <Scrollbar sx={{ height: { xs: 500, sm: 600 } }}>
        <Stack spacing={7} sx={{ p: 5, pr: 0 }}>
          <NoticeList notice={notice} />
        </Stack>
      </Scrollbar>
      <Divider />
    </Card>
  );
}