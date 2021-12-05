import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function MultilineTextFields() {
  const [value, setValue] = React.useState("제목을 입력하세요");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" }
      }}
      noValidate
      autoComplete="off"
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
        />{" "}
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
          defaultValue="내용을 입력하세요"
        />
      </div>
    </Box>
  );
}
