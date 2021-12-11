/* eslint-disable */
import React from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';
import { noCase } from 'change-case';
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
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton
} from '@mui/material';
// utils
import { mockImgAvatar } from '../../utils/mockImages';
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import { useAuthState } from '../../Context';
import axios from 'axios';


const NOTIFICATIONS = [
    {
      id: faker.datatype.uuid(),
      title: 'Your order is placed',
      description: 'waiting for shipping',
      avatar: null,
      type: 'order_placed',
      createdAt: set(new Date(), { hours: 10, minutes: 30 }),
      isUnRead: true
    },
    {
      id: faker.datatype.uuid(),
      title: 'You have new message',
      description: '5 unread messages',
      avatar: null,
      type: 'chat_message',
      createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
      isUnRead: false
    },
    {
      id: faker.datatype.uuid(),
      title: 'You have new mail',
      description: 'sent from Guido Padberg',
      avatar: null,
      type: 'mail',
      createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
      isUnRead: false
    },
    {
      id: faker.datatype.uuid(),
      title: 'Delivery processing',
      description: 'Your order is being shipped',
      avatar: null,
      type: 'order_shipped',
      createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
      isUnRead: false
    }
  ];


const NotificationList = () => {
    return (
        <div>
    <ListItemButton
      to="#"
      disableGutters
      component={RouterLink}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar> 프로필
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5, 
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
            {formatDistanceToNow(new Date(notification.createdAt))}
          </Typography>
        }
      />
    </ListItemButton>



            
        </div>
    );
};

export default NotificationList;