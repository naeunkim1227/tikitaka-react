/* eslint-disable */ 

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, Stack, Grid } from '@mui/material';

import ChatNoticeList from './ChatNoticeList';

import { useAuthState } from 'src/Context';
import Box from "@mui/material/Box";
import Scrollbar from 'src/components/Scrollbar';

import { Button } from '@mui/material';

import Modal from '@mui/material/Modal';

import ChatNoticeWrite from 'src/components/ChatNoticeWrite'



export default function ChatNotice({handleClose, recentNotice}) {
    const auth = useAuthState();

    const [notice, setNotice] = useState([]);

    const recent = () => {
      recentNotice();
    }

    const close = () => {
      handleClose();
    }
    
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

    //--------------------------------------------------
    // modal open
    const [open, setOpen] = React.useState(false);
    const writeOpen = () => {
      setOpen(true);
    };
    const writeClose = () => {
      setOpen(false);
    };

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
      <Scrollbar sx={{ height: { xs: 500, sm: 600 } }}>
      <Grid item xs={30} sm={6} md={3}>
        <Stack spacing={5} sx={{ p: 3, pr: 0 }}>
          <ChatNoticeList notice={ notice }/>
        

        </Stack>
        </Grid>
      </Scrollbar>
      <div>
          <Button type="button" variant="contained" onClick={writeOpen} >
            공지 작성
          </Button>

          <Modal
            open={open}
            onClose={writeClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <ChatNoticeWrite notice={notice} close={close} onClose={writeClose} recent={recent}/>
          </Modal>
        </div>
    </Card>
        </Box>
    );


}