/* eslint-disable */ 

import React, { useEffect, useRef, useState } from 'react';
import './components.css';
import './style.css';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';
// import SendIcon from '@mui/icons-material/Send';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TextField from '@mui/material/TextField';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import axios from 'axios';

const ChatRoom = () => {
    const [message, setMessage] = useState([]);

    const messageHandle = (e) => {
      setMessage(e.target.value);
    }

    const sendMessage = async (e) => {
      e.preventDefault();
      
      let data= {
        userNo: '2',
        chatNo: '5',
        type: "TEXT",
        contents: message,
        readCount: 3
      };

      await axios.post('/TT/send', JSON.stringify(data), {headers:{"Content-Type":"application/json"}})
      .then((response) => {
        console.log("response:"+response);
      })
      .catch((err) => {
        console.log(err);
      })

    }

    return (
      <Card sx={{ minWidth: 275 }}>
      <CardContent style={{borderBottom: "2px solid gray"}}>
        <h1>채팅방 이름, 검색창</h1>
      </CardContent>
      <CardContent sx={{ minWidth: 600 , minHeight:450}}>

        {/* <Table colspan="5" sx={{ minWidth: 220 , minHeight:150}} aria-label="simple table">
          <TableBody rowsPerPageOptions={[5]} align="center">
            <tr>
              <td colspan="1">hi</td>
              <td colspan="4"></td>
            </tr>
            <tr>
              <td colspan="1">bye</td>
              <td colspan="4" rowspan="2">
                bye
              </td>
            </tr>
          </TableBody>
        </Table> */}
      </CardContent>
      <CardContent style={{ borderTop: "2px solid gray", margin: 10, padding: 10, alignItems: 'start'}}>
      <form onSubmit={sendMessage}>
        <Button>
            <Icon sx={{ color: green[500], 
                  width: 50, 
                  height: 50, 
                  fontSize: 30, 
                  border: '2px solid gray',
                  borderRadius: '5px'}}>+</Icon>
        </Button>
      
        <TextField
          inputMode
          hiddenLabel
          id="textWindow"
          placeholder='메시지를 입력하시오.'
          variant="outlined"
          style={{align:"center", left:200 , marginRight: "10px" , minWidth: 750}}
          type='text'
          name="message"
          onChange={messageHandle}
        />
        
        <Button type='submit' variant="contained" style={{position: 'absolute', right:100, marginRight: "10px"}} size="large">
          Send
        </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatRoom;