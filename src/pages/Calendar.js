/* eslint-disable */

import React, { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Calendar = ({callback, calClose}) => {
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [title, setTitle] = useState();
    const [contentsCal, setContentsCal] = useState();
    
    const inputTitle = (e)=>{
        e.preventDefault();
        setTitle(e.target.value);
    }
    const inputContents = (e)=>{
        e.preventDefault();
        setContentsCal(e.target.value);
    }

    const cancel = ()=>{
        calClose();
    }
    const backData = ()=>{
        const data = {
            title: title,
            contentsCal: contentsCal,
            startDate: startDate,
            endDate: endDate
        }
        callback(data)
    }
   
    return (
        <section style={{position:'absolute',backgroundColor:'white', 
                        top: '50%', left:'50%', transform: "translate(-50%, -50%)", 
                        borderRadius: '10px', width:500, height: 450,
                        position: 'absolute', textAlign: 'center'}}>
            <form>
            <h1 style={{backgroundColor: '#7b2cbf', textAlign:'center', color:'white', padding: 10}}><strong>일정 등록</strong></h1>
            <br/>
            <TextField
                label="제목"
                id="outlined-size-small"
                size="large"
                style={{width: '90%', border: '1px solid #7b2cbf', borderRadius: '10px'}}
                onChange={inputTitle}
                />
            <br/><br/>
            <TextField
                label="내용"
                id="outlined-size-small"
                size="large"
                style={{width: '90%'}}
                onChange={inputContents}
                />
             <br/><br/>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="시작일"
                    value={startDate}
                    onChange={setStartDate}
                    renderInput={(params) => <TextField {...params} 
                    style={{width: '90%'}}
                    />}
                />
            </LocalizationProvider>
            <br/><br/>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="종료일"
                    value={endDate}
                    onChange={setEndDate}
                    renderInput={(params) => <TextField {...params} 
                    style={{width: '90%'}}
                    />}
                />
            </LocalizationProvider>
            <br/><br/>
            <ButtonGroup variant="contained" style={{position:'absolute', right:10}}>
            <Button variant="contained" color='error' onClick={cancel}>취소</Button>&nbsp;&nbsp;
            <Button variant="contained" color='primary' onClick={backData}>등록</Button>
            </ButtonGroup>
        </form>
        </section>
    );
};

export default Calendar;