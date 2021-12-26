/* eslint-disable */ 

import React from 'react';
import { Fragment } from 'react';

import ChatNoticeListItem from './ChatNoticeListItem';

    

export default function ChatNoticeList( {notice} ) {


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

    //--------------------------------------------------

    return (
        <Fragment>

        {notice.map(notice => <ChatNoticeListItem
        key={notice.noticeNo}
        important={notice.important}
        title={notice.title} 
        contents={notice.contents}
        name={notice.name}
        reg_date={notice.reg_date}
        />)}
      </Fragment>
    )
};