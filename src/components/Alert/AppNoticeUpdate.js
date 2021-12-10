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


export default function AppNewsUpdate() {


const [notice, setNotice] = useState([]);

  //임의 데이터 생성
const data = {
  userno: 1
}

const datas = [
  {no: 1,
  title: 'test'},
  {no: 2,
    title: 'test2'},
  {no: 3,
      title: 'test3'},
]


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

    console.log(json.data);
    
    setNotice(json.data);
    console.log(notice);
    

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
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          <NoticeList notice={notice} />
        </Stack>
      </Scrollbar>
      <Divider />
    </Card>
  );
}
