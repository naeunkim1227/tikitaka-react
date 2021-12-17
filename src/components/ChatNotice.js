/* eslint-disable */ 

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, Stack, Grid } from '@mui/material';

import ChatNoticeList from './ChatNoticeList';

import { useAuthState } from 'src/Context';


export default function ChatNotice() {
    const auth = useAuthState();

    const [notice, setNotice] = useState([]);
    
    let data= {
      userNo: auth.token,
      chatNo: auth.chatNo 
    };

    console.log(chatNo)

    useEffect(() => {
      getNoticeList();
    }, []);

    const getNoticeList =  async () => {

      try{
        const res = await fetch(`/TT/talk/topic/890`, { // 방 번호 주기
          method: 'post',
          headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          },
          body: JSON.stringify(data)
        });

        console.log('res >>>', res)

        const json = await res.json();
        setNotice(json.data);

        console.log('json >>>',json)
        
        if(!res.ok){ 
          throw new Error(`${res.status} ${res.statusText}`)}
    
    
          if(json.result !== 'success'){
            throw json.message;
          }
    
        }catch(err){
          console.log('chat notice fetch error',err);
        }
    
    }


    return (
    <Card>
      <CardHeader title="공지 목록" />
      <Grid item xs={30} sm={6} md={3}>
        <Stack spacing={5} sx={{ p: 3, pr: 0 }}>
          <ChatNoticeList notice={ notice }/>
        </Stack>
        </Grid>
    </Card>
    );


}