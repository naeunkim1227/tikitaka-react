/* eslint-disable */

import React, { useEffect, useState, useRef } from 'react';
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
import { useAuthState, useAuthDispatch } from 'src/Context';
import { useNavigate } from 'react-router-dom';

const user = JSON.parse(localStorage.getItem('user'));

const UpdateProfile = () => {

    const navigate = useNavigate();
    const auth = useAuthState();
    const [userInfo, setUserInfo] = useState();
    const [userImage, setUserImage] = useState();
    const [imageData, setImageData] = useState(null);
    const [urlData, setUrlData] = useState(null);
    const [changeImg, setChangeImg] = useState('');
    // update form data
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [getProfile, setGetProfile] = useState(false);
    const profileRef = useRef();
    const dispatch = useAuthDispatch();

    const change = (e) => {
        setChangeImg(userInfo.profile);
    }

    const emailChange = (e) => {
        e.preventDefault();
        
        setUserEmail(e.target.value);
    }
    const phoneChange = (e) => {
        e.preventDefault();

        setUserPhone(e.target.value);
    }

    // change event
    const imageHandle = (e) => {
        setUserImage(e.target.files[0]);
        
    }

    // click event
    const changeImage = async (e) => {
        const formData = new FormData();
        formData.append('file', userImage);

        const response = await axios.post(`/TT/updateImage/${auth.token}`, formData, {headers:{"Content-Type":"multipart/form-data"}})
                                    .then((res) => {
                                        setImageData(res.data);
                                        dispatch({type:'CHANGE_PROFILE', payload:res.data});
                                        sessionStorage.setItem('currentUser',res.data);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })             
    }

    // 회원정보 수정
    const updateProfile = async (e) => {
        e.preventDefault();

        const userFormData = {
            no: auth.token,
            name: auth.name,
            email: userEmail,
            phone: userPhone
        }        

        const response = await axios.post('/TT/updateProfile', JSON.stringify(userFormData), {headers:{"Content-Type":"application/json"}})
                                    .then((res) => {
                                        console.log(res);
                                        navigate('/tikitaka/profile', { replace: true });
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })
                                    //return response;
    }


    return (
        <div align="center">
            {
                auth.role === 'CP' ?
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
                            <Avatar id='avatar' alt="" src={`http://localhost:8080/TT${auth.profile}`} sx={{ width: 100, height: 100 }} onChange={change} ref={profileRef}/>
                            </Badge>
                            <br />
                            <br />
                            <Button size="small" variant="contained" >
                            <label for='load-img' >사진등록</label>
                            <input id='load-img' type="file" accept="image/*" onChange={imageHandle} style={{display:"none"}}/>
                            </Button>
                            <Button size="small" variant="contained" onClick={changeImage}>프로필 변경</Button>
                        </form>
                        
                        <TextField
                            id="outlined-required"
                            label="이름:"
                            defaultValue={auth.name}
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
                            defaultValue={`${auth.token}`}
                            InputProps={{
                                readOnly: true
                            }}
                            variant="filled"
                            focused
                            style={{minWidth: 350, marginBottom:10}}
                        />
                        <br />
                        <br />
                        <TextField
                            id="inline"
                            label="이메일:"
                            defaultValue={auth.email}
                            focused
                            style={{minWidth: 350, marginBottom:10}}
                            onChange={emailChange}
                        />
                        <br />
                        <TextField
                            id="inline"
                            label="연락처:"
                            defaultValue={auth.phone}
                            focused
                            style={{minWidth: 350, marginBottom:10}}
                            onChange={phoneChange}
                        />
                        <br />
                    
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" 
                                style={{position: 'absolute', right:300, marginRight: "10px", marginBottom: "10px"}} 
                                size="small"
                                onClick={updateProfile}>수정하기</Button>
                    </CardActions><br/>
                    </Card>
                    </Box>
                </Container>
                :
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
                            <Avatar id='avatar' alt="" src={`http://localhost:8080/TT${auth.profile}`} sx={{ width: 100, height: 100 }} onChange={change} ref={profileRef}/>
                            </Badge>
                            <br />
                            <br />
                            <Button size="small" variant="contained" >
                            <label for='load-img' >사진등록</label>
                            <input id='load-img' type="file" accept="image/*" onChange={imageHandle} style={{display:"none"}}/>
                            </Button>
                            <Button size="small" variant="contained" onClick={changeImage}>프로필 변경</Button>
                        </form>
                        
                        <TextField
                            id="outlined-required"
                            label="거래처명:"
                            defaultValue={auth.name}
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
                            label="제품번호:"
                            defaultValue={`${auth.token}`}
                            InputProps={{
                                readOnly: true
                            }}
                            variant="filled"
                            focused
                            style={{minWidth: 350, marginBottom:10}}
                        />
                        <br />
                        <br />
                        <TextField
                            id="inline"
                            label="이메일:"
                            defaultValue={auth.email}
                            focused
                            style={{minWidth: 350, marginBottom:10}}
                            onChange={emailChange}
                        />
                        <br />
                        <TextField
                            id="inline"
                            label="연락처:"
                            defaultValue={auth.phone}
                            focused
                            style={{minWidth: 350, marginBottom:10}}
                            onChange={phoneChange}
                        />
                        <br />
                    
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" 
                                style={{position: 'absolute', right:300, marginRight: "10px", marginBottom: "10px"}} 
                                size="small"
                                onClick={updateProfile}>수정하기</Button>
                    </CardActions><br/>
                    </Card>
                    </Box>
                </Container>
            }
            
        </div>
    );
};

export default UpdateProfile;