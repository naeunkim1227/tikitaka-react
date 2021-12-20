/* eslint-disable */
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Button
} from '@mui/material';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';


// import USERLIST from '../_mocks_/user'; // 임시 데이터
import { useEffect } from 'react';
import { useAuthState, useAuthDispatch, maketopic, opensocket , gettopic } from 'src/Context';

import axios from 'axios'

// Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useChatContext, useChatStateContext } from 'src/Context/context'; 
// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 60,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 250,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 250, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));




// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  talkNo: PropTypes.array
};
export default function UserListToolbar({ numSelected, filterName, onFilterName, talkNo, allUncheck }) {
  const navigate = useNavigate();
  const auth = useAuthState();
  const dispatch = useAuthDispatch();
  const chatstate = useChatStateContext();
  const message = useChatContext();

    /////////////////소켓 연결
const enterchat = async(chatstate,dispatch,talkNo,auth) => {
  console.log('enterchat 실행')
  console.log('길이' ,talkNo.length) 


  //상대방 정보 저장
  // const getinfo = await axios.post(`/TT/searchinfo/${talkNo[0]}`,{headers:{"Content-Type":"application/json"}})
  //                 .then((res) => {
  //                   console.log('GET INFO >>>')


  //                 })




  //group personal인지 
  if(talkNo.length === 1){
    console.log('개인 톡방 들어가기')
    const type = "PERSONAL";
    console.log(type)
      const response = await axios.put(`/TT/talk/searchchat/${talkNo[0]}/${type}`, JSON.stringify(auth), {headers:{"Content-Type":"application/json"}})
      .then((res) => {
        if(!res){
          console.log('res값 x');
          return;
        }
        // JSON.stringify()
        console.log(res);
        const chatNo = res.data


        console.log("채팅방번호확인" + chatNo);
        if(res.data !== 0){
          console.log('chatno 존재  >>>> socket sub');
          // chatstate({type: 'GET_CHATROOM', chatdata: res.data})
          // sessionStorage.setItem('chatMessage', chatNo);
          dispatch({type:'STORE_TOPIC',payload: chatNo})
         sessionStorage.setItem('currentUser',chatNo)
        }
        else{
          console.log('새로운 채팅방 생성 >>>> create topic');
          //taleNo.length가 1이면 개인톡방 생성
          createTopic(talkNo[0], auth , type);

        }
      }).catch((err) => {
        console.log('enterchat axios err :' , err);
      });
      }else{
      
      
      }
  
  navigate('/tikitaka/chat', { replace: true});
}  


  const createTopic = async (no, auth , type) =>{
    console.log('CREATE TOPIC >> ')
     await maketopic(dispatch, no, auth, type);
    }



  
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'text.disabled',
          bgcolor: ''
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          // placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      )}

      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Icon icon={trash2Fill} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Icon icon={roundFilterList} />
          </IconButton>
        </Tooltip>
      )} */}

      {
        numSelected > 0 ?
        <Button
        onClick={(e) =>{ 
          enterchat(chatstate,dispatch,talkNo,auth) 
          allUncheck();
        }}
      >
        <AddCommentOutlinedIcon color="action"  />
      </Button>
      :
      null
      }


    </RootStyle>
  );
}