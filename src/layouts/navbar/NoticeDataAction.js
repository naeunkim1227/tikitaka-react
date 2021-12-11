/* eslint-disable */
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { set, sub, formatDistanceToNow } from 'date-fns';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
// material
import { alpha } from '@mui/material/styles';
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import { useAuthState } from '../../Context';
import axios from 'axios';

export default function NoticeDataAction() {

 const Auth = useAuthState();


  const data = {
    token : Auth.token
  }

   
    return(
    [
    {
        id: '부탁이야..',
        title: '에엑???',
        description: 'waiting for shipping',
        avatar: null,
        type: 'order_placed',
        createdAt: set(new Date(), { hours: 10, minutes: 30 }),
        isUnRead: true
      },
      {
        id: '함맍도와주라',
        title: '이거 맞냐 이거야',
        description: '5 unread messages',
        avatar: null,
        type: 'chat_message',
        createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
        isUnRead: false
      }
      
    ]
    )
};