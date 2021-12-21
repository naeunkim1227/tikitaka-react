/* eslint-disable */

import React from 'react';
import FullCalendar, { whenTransitionDone } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Box from "@mui/material/Box";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: 'white',
    transform: "translate(-50%, -50%)",
}

const Calendar = () => {
    return (
    <Box
      sx={{ ...style, width: 700, }}
      noValidate
      autoComplete="off"
    >
    <FullCalendar 
        defaultView="dayGridMonth" 
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        dateClick={(e)=>{
            console.log("dateClick!!"+e.dateStr);
        }}
        headerToolbar = {{
            center: 'dayGridMonth, timeGridWeek, timeGridDay',
        }}/>
    </Box>
    );
};

export default Calendar;