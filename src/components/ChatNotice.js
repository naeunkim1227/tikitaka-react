/* eslint-disable */ 

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, Stack, Grid } from '@mui/material';

import ChatNoticeList from './ChatNoticeList';

import { useAuthState } from 'src/Context';
import Box from "@mui/material/Box";


export default function ChatNotice() {
    const auth = useAuthState();

    const [notice, setNotice] = useState([]);
    
    let data= {
      userNo: auth.token,
      chatNo: auth.chatNo 
    };
    console.log("auth.token >>>> " + data.userNo)

    console.log("chatNo >>>> " + data.chatNo)

    useEffect(() => {
      getNoticeList();
    }, []);

    const getNoticeList =  async () => {

      try{
        const res = await fetch(`/TT/talk/topic/noticeList/${data.chatNo}}`, { // 방 번호 주기
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

    // box style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 3,
    pt: 2,
    px: 4,
    pb: 3
  };

    return (
      <Box
      sx={{ ...style, width: 800 }}
      noValidate
      autoComplete="off"
    >
    <Card>
      <CardHeader title="공지 목록" />
      <Grid item xs={30} sm={6} md={3}>
        <Stack spacing={5} sx={{ p: 3, pr: 0 }}>
          <ChatNoticeList notice={ notice }/>
        </Stack>
        </Grid>
    </Card>
        </Box>
    );


}