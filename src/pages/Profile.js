/* eslint-disable */

import React from 'react';
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Badge } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
        
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

//
const Profile = () => {

    
    
    const user = {
        // axios 로 사원에대한 정보 localstorage에 저장하기
        profile: "",
        name: "김티키",
        company: "부산 본부",
        dept: "플랫폼 개발 사업본부",
        position: "신입사원",
        email:"jinwoo@gmail.com",
        phone: "010-1234-2345"
    }

    localStorage.setItem('user', JSON.stringify(user));

    const move = (e) => {
        e.preventDefault();

        window.location.href="/tikitaka/updateProfile"
    };

    return (
        <div align="center">
        <Container >
            <Card sx={{ minWidth: 500 }} align="center">
            <CardContent>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
      >
                    <Avatar alt="" src="" sx={{ width: 100, height: 100 }} />
                </StyledBadge>
                <br />
                <br />
                <Box
                component="form"
                sx={{
                    "& < :not(style)": { m: 1, width: "25ch" }
                }}
                noValidate
                autoComplete="off"
                >
                <TextField
                    id="inline"
                    label="이름:"
                    color="warning"
                    value={sessionStorage.getItem("name")}
                    InputProps={{
                    readOnly: true
                    }}
                    variant="filled"
                    focused
                    style={{minWidth: 350, marginBottom:10}}
                />
                <br />
                <TextField
                    id="inline"
                    label="근무지사:"
                    color="warning"
                    value={user.company}
                    InputProps={{
                    readOnly: true
                    }}
                    variant="filled"
                    focused
                    style={{minWidth: 350, marginBottom:10}}
                />
                <br />
                <TextField
                    id="inline"
                    label="부서:"
                    color="warning"
                    value={user.dept}
                    InputProps={{
                    readOnly: true
                    }}
                    variant="filled"
                    focused
                    style={{minWidth: 350, marginBottom:10}}
                />
                <br />
                <TextField
                    id="inline"
                    label="직책:"
                    color="warning"
                    value={user.position}
                    InputProps={{
                    readOnly: true
                    }}
                    variant="filled"
                    focused
                    style={{minWidth: 350, marginBottom:10}}
                />
                <br />
                <TextField
                    id="inline"
                    label="이메일:"
                    color="warning"
                    value={user.email}
                    InputProps={{
                    readOnly: true
                    }}
                    variant="filled"
                    focused
                    style={{minWidth: 350, marginBottom:10}}
                />
                <br />
                <TextField
                    id="inline"
                    label="연락처:"
                    color="warning"
                    value={sessionStorage.getItem("phone")}
                    InputProps={{
                    readOnly: true
                    }}
                    variant="filled"
                    focused
                    style={{minWidth: 350, marginBottom:10}}
                />
                <br />
                </Box>
            </CardContent>
            <CardActions>
                <Button variant="contained" 
                        style={{position: 'absolute', right:400, marginRight: "10px", marginBottom: "10px"}} 
                        size="large"
                        onClick={move}>회원정보 수정하기</Button>
            </CardActions><br/>
            </Card>
        </Container>
        </div>
      );
};

export default Profile;