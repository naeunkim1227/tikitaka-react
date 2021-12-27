/* eslint-disable */ 

import React, { Fragment } from 'react';

import moment from 'moment';
import { Stack, Typography, Button } from '@mui/material';
import { Box  } from '@mui/system';

import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';




export default function ChatNoticeListItem({key, important, title, contents, name, reg_date}) {

        const regTime = moment(reg_date).format('YY/MM/DD HH:mm');

        const [open, setOpen] = React.useState(false);
    
    return (
     
        <Stack direction="row" alignItems="center" spacing={5}>
        
          <Box sx={{ minWidth: 240 }}>
            
              {/* 중요 공지일 때 빨간색으로 표시 */}
              <Typography variant="subtitle2" noWrap  color={important == 1 ? 'error' : 'text.secondary'}   >
                {title} 
              </Typography>
            

            
            <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {
            open 
            ? 
            <div>
            <KeyboardArrowUpIcon /> 
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {contents}
              </Typography>
            </div>
            :
            <KeyboardArrowDownIcon />
            } 
          </IconButton>
          </Box>
          <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
            작성자 : {name}
          </Typography>
          <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
            등록 시간 : {regTime}
          </Typography>
        </Stack>

    );
}

{/* <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {contents}
          </Typography> */}