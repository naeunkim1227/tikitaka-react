/* eslint-disable */
import * as React from 'react';
import { useEffect, useState } from 'react';

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
import moment from 'moment';



export default function NoticeListItem({key,title, contents, reg_date,chatTitle,writer}) {

 
    const date = moment(reg_date).format('YY/MM/DD HH:mm');
    return (
          <Stack direction="row" alignItems="center" spacing={2}>
          {/* <Box
            component="img"
            alt={}
            src={image}
            sx={{ width: 48, height: 48, borderRadius: 1.5 }}
          /> */}
          <Box sx={{ minWidth: 240 }}>
            <Link color="inherit" underline="hover" onClick={ {key} }>
              <Typography variant="subtitle2" noWrap>
                {title}
              </Typography>
            </Link>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {contents}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {chatTitle}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
            작성자 : {writer}
          </Typography>
          <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
            등록 시간 : {date}
          </Typography>
        </Stack>
      );
}


