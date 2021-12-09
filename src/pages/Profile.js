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

const move = function(){
    window.location.href="/dashboard/updateProfile"
}
//
const Prifile = () => {
    return (
        <div align="center">
        <Container >
            <Card sx={{ maxWidth: 500 }} align="center">
            <CardContent>
                <Badge color="success" overlap="circular" badgeContent=" ">
                <Avatar alt="" src="" sx={{ width: 100, height: 100 }} />
                </Badge>
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
                />
                <br />
                <TextField
                    id="inline"
                    label="근무지사:"
                    color="warning"
                    value="부산 본부"
                    InputProps={{
                    readOnly: true
                    }}
                    variant="filled"
                    focused
                />
                <br />
                <TextField
                    id="inline"
                    label="부서:"
                    color="warning"
                    value="플랫폼 개발 사업본부"
                    InputProps={{
                    readOnly: true
                    }}
                    variant="filled"
                    focused
                />
                <br />
                <TextField
                    id="inline"
                    label="직책:"
                    color="warning"
                    value="신입사원"
                    InputProps={{
                    readOnly: true
                    }}
                    variant="filled"
                    focused
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
                />
                <br />
                </Box>
            </CardContent>
            <CardActions>
                <Button variant="contained" style={{position: 'absolute', right:10, marginRight: "10px", marginBottom: "10px"}} onClick={move}>프로필 변경하기</Button>
            </CardActions><br/>
            </Card>
        </Container>
        </div>
      );
};

export default Prifile;