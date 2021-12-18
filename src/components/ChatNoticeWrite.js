/* eslint-disable */ 
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";

import Button from '@mui/material/Button';

import { useAuthState } from 'src/Context';


const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function NoticeForm({notice}) {

  const auth = useAuthState();
  
  let data = {
    userNo : auth.token
  }
  
  console.log(notice);
  console.log("userNo >>> " + data.userNo) // 작성자 userNo

  const [value, setValue] = React.useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
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

  // const refForm = useRef(null);


// ------------------------------------------------------------------

  return (
    <Stack spacing={3}>
    <Box
      sx={{ ...style, width: 400 }}
      noValidate
      autoComplete="off"
    >
      <form
            // ref={refForm}
            // onSubmit={handleSubmit}>
            >
              
        <div>
          <Checkbox
            {...label}
            defaultChecked
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600]
              }
            }}
          />
          중요 공지
        </div>
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="제목"
            multiline
            maxRows={2}
            value={value}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-static"
            label="본문"
            multiline
            rows={4}
          />
        </div>

          <Button type="submit" variant="contained" >
          작성완료
          </Button>
      </form>
    </Box>
    </Stack>
  );
}