/* eslint-disable */ 

import React from 'react';
import { Fragment } from 'react';

import ChatNoticeListItem from './ChatNoticeListItem';
import { Button } from '@mui/material';

import Modal from '@mui/material/Modal';

import ChatNoticeWrite from 'src/components/ChatNoticeWrite'

    

export default function ChatNoticeList( {notice} ) {

    //--------------------------------------------------
    // modal open
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

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
        

        <div>
          <Button type="button" variant="contained" onClick={handleOpen}>
            공지 작성
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <ChatNoticeWrite notice={notice}/>
          </Modal>
        </div>

      </Fragment>
    )
};