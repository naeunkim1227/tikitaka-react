/* eslint-disable */
import * as React from 'react';
import { useEffect, useState ,Fragment} from 'react';

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


import NoticeListItem from './NoticeListItem';
// NoticeList.propTypes = {
//   news: PropTypes.object.isRequired
// };

export default function NoticeList({ notice }) {
  return (
    <Fragment>
    {notice.map(notice => <NoticeListItem
      key={notice.no}  
      title={notice.title} 
      chatTitle={notice.chatTitle}
      reg_date={notice.reg_date}
      contents={notice.contents}
      />)}
    </Fragment>
  );
}