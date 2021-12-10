/* eslint-disable */

import React, { useEffect, useState } from 'react';
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Badge } from "@mui/material";
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

const UpdateProfile = () => {

    const [userPassword, setUserPassword] = useState('');
    const [userEmail, setUserEmail] = useState(user.email);
    const [userPhone, setUserPhone] = useState(user.phone);
    const [userImage, setUserImage] = useState();
    const [imgData, setImageData] = useState(null);
    const [urlData, setUrlData] = useState(null);

    const passwordChange = (e) => {
        e.preventDefault();
        
        setUserPassword(e.target.value);
    }
    const emailChange = (e) => {
        e.preventDefault();
        
        setUserCompany(e.target.value);
    }
    const phoneChange = (e) => {
        e.preventDefault();

        setUserCompany(e.target.value);
    }

    // change event
    const imageHandle = (e) => {
        setUserImage(e.target.files[0]);
        
    }

    // click event
    const changeImage = async (e) => {
        const formData = new FormData();
        formData.append('file', userImage);

        const response = await axios.post('/TT/updateImage', formData, {headers:{"Content-Type":"multipart/form-data"}})
                                    .then((res) => {
                                        setUserImage(res.data);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })             
    }


    const updateProfile = async (e) => {
        e.preventDefault();

        let profileData = {
            no: '1',
            name: user.name,
            password: userPassword,
            email: userEmail,
            phone: userPhone
        }
        console.log(profileData);

        const response = await axios.post('/TT/updateProfile', JSON.stringify(profileData), {headers:{"Content-Type":"application/json"}})
                                    .then((res) => {
                                        console.log(res);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })

                                    
                                    return response;
    }
    

    return (
        <div align="center">
            <Container >
            <Box
                component="form"
                noValidate
                autoComplete="off"
                >
            <Card sx={{ minWidth: 500 }} align="center">
            <CardContent>
                <form encType="multipart/form-data">
                    <Badge color="success" overlap="circular" badgeContent=" ">
                    <Avatar id='avatar' alt="" src={`/TT${userImage}`} sx={{ width: 100, height: 100 }} />
                    </Badge>
                    <br />
                    <br />
                    <input type="file" accept="image/*" onChange={imageHandle}/>
                    <Button size="small" variant="contained" onClick={changeImage}>프로필 변경</Button>
                </form>
                
                <TextField
                    id="outlined-required"
                    label="이름:"
                    defaultValue={user.name}
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
                    label="사원번호:"
                    defaultValue={`${user.company}-${user.dept}-${user.position}-1`}
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
                    label="비밀번호:"
                    defaultValue=''
                    focused
                    style={{minWidth: 350, marginBottom:10}}
                    onChange={passwordChange}
                />
                <br />
                <TextField
                    id="inline"
                    label="이메일:"
                    defaultValue={user.email}
                    focused
                    style={{minWidth: 350, marginBottom:10}}
                    onChange={emailChange}
                />
                <br />
                <TextField
                    id="inline"
                    label="연락처:"
                    defaultValue={user.phone}
                    focused
                    style={{minWidth: 350, marginBottom:10}}
                    onChange={phoneChange}
                />
                <br />
            
            </CardContent>
            <CardActions>
                <Button variant="contained" 
                        style={{position: 'absolute', right:400, marginRight: "10px", marginBottom: "10px"}} 
                        size="large"
                        onClick={updateProfile}>수정하기</Button>
            </CardActions><br/>
            </Card>
            </Box>
        </Container>
        </div>
    );
};

export default UpdateProfile;