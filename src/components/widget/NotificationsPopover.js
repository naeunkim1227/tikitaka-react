/* eslint-disable */
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
import moment from 'moment';
import { render } from 'react-dom';

// ----------------------------------------------------------------------



const NOTIFICATIONS =     [
  {
      id: '',
      title: '',
      description: '',
      avatar: null,
      type: 'order_placed',
      createdAt: set(new Date(), { hours: 10, minutes: 30 }),
      isUnRead: true
    }
 
    
  ]

const NEWCHAT =  [
  {
      no: '',
      title: '',
      type: 'chat_message',
      create_time: set(new Date(), { hours: 10, minutes: 30 }),
      isUnRead: true
    }
    
  ]

export default function NotificationsPopover() {

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [newchats,setNewchat] = useState(NEWCHAT);
  const [datalength, setDatalength] = useState(0);
  //const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;
  const Auth = useAuthState();
  
  const data = {
    token : Auth.token
  }


  useEffect(() => {
      getdata();
  },[]);

  const getdata = async() => {
    const response = await axios.post('/TT/getData', JSON.stringify(data), {headers:{"Content-Type":"application/json"}})
                .then((res) => {
                  console.log('data??',res);
                  if(res.statusText !== "OK"){
                      throw `${res.status} ${res.statusText}`
                    }

                    setNotifications(res.data.data.Nlist);
                    setDatalength(res.data.data.Nlist.length + res.data.data.Clist.length);
                    
                    console.log('공지리스트 >>>>>>',res.data.data.Clist)
                    setNewchat(res.data.data.Clist);

                    newchats.map((newchat) => (
                      console.log(`새 채팅 리스트 >>>>>`, newchat.no)
                      ))

                  }).catch((err) => {console.log(err)})
                }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notificaton,
        isUnRead: false
      }))
    );

    setNewchat(
      newchats.map((newchat) => ({
        ...newchat,
        isUnRead: false
      }))
    );
  };

    return (
      <>
        <IconButton
          ref={anchorRef}
          size="large"
          color={open ? 'primary' : 'default'}
          onClick={handleOpen}
          sx={{
            ...(open && {
              bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
            })
          }}
        >
          <Badge badgeContent={datalength} color="error">
            <Icon icon={bellFill} width={20} height={20} />
          </Badge>
        </IconButton>
        <MenuPopover
          open={open}
          onClose={handleClose}
          anchorEl={anchorRef.current}
          sx={{ width: 360 }}
         >
        
          <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Notifications</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                확인할 알림이 {datalength} 개 있습니다.
              </Typography>
            </Box>

            {1 > 0 && (
              <Tooltip title=" Mark all as read">
                <IconButton color="primary" onClick={handleMarkAllAsRead}>
                  <Icon icon={doneAllFill} width={20} height={20} />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          <Divider />

          <Scrollbar sx={{ height: { xs: 500, sm: 400 } }}>
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  Notice
                </ListSubheader>
              }
            >
              {notifications.slice(0, datalength).map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
                ))}
            </List>
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  Chat
                </ListSubheader>
              }>
              {newchats.map((newchat) => (
                <NewChat key={newchat.no} newchat={newchat}/>
                ))}
            </List>
          </Scrollbar>

        </MenuPopover>
        </>
    );
  }
  
  
function renderContent(notification, newchat , type) {


const title = (
  <div>
  <Typography variant="subtitle2">
    {notification.writer} 님이 공지를 등록했습니다.
  </Typography>
    <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
    {notification.c_title}
    </Typography>
    <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
    {/* {newchat.no} */}
    </Typography>
  </div>
);


const chattitle = (
  <div>
  <Typography variant="subtitle2">
    왜!왜! 안나오는데!
  </Typography>
    <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
    {/* {newchat.data}  */}
    </Typography>
  </div>
);


if (notification.type  = "notice") {
  return {
    avatar: <img alt={notification.title} src="/static/icons/ic_notification_mail.svg" />,
    title
  };
}
if (newchat.type  === 'notice') {
  return {
    avatar: <img alt={notification.title} src="/static/icons/ic_notification_chat.svg" />,
    chattitle
  };
}
return {
  avatar: <img alt={notification.title} src="/static/icons/ic_notification_mail.svg" />,
  title
};
}

NotificationItem.propTypes = {
notification: PropTypes.object.isRequired
};


NewChat.propTypes = {
  newchats: PropTypes.object.isRequired
  };
  

function NotificationItem({ notification }) {
const { title } = renderContent(notification);
const date = moment(notification.createdAt).format('YY/MM/DD HH:mm');
return (
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
      <Avatar sx={{ bgcolor: 'background.neutral' }}><img  src="/static/icons/ic_notification_mail.svg" /></Avatar>
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
          {date}
        </Typography>
      }
    />
  </ListItemButton>
);
}

function NewChat({ newchat }) {
  const { chattitle } = renderContent(newchat);
  //const date = moment(newchat.createdAt).format('YY/MM/DD HH:mm');
  return (
    <ListItemButton
      to="#"
      disableGutters
      component={RouterLink}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(newchat.isUnRead && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}><img  src="/static/icons/ic_notification_chat.svg" /></Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={chattitle}
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
            {/* //{date} */}
          </Typography>
        }
      />
    </ListItemButton>
  );
  }