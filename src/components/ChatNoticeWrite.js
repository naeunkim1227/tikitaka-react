/* eslint-disable */ 
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Box from "@mui/material/Box";
import axios from 'axios';

import { useAuthState } from 'src/Context';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';


export default function NoticeForm({notice}) {
  // 접속해있는 userNo, 들어와있는 chatNo
  const auth = useAuthState();

  
  // -------------------------------------------

  const navigate = useNavigate();
  const [state, setState] = useState('0'); // 공지 중요도 

  // 입력칸이 빈 칸일 때 에러 메세지 띄우기 -> formik에서 적용시켜준다.
  const RegisterSchema = Yup.object().shape({
    title: Yup.string().required('제목 입력은 필수입니다!'),
    contents: Yup.string().required('공지 내용을 입력하세요!')
  });

  const formik = useFormik({
    // 초기값
    initialValues: {
      important: '',
      title: '',
      contents: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async(noticeForm) => {
      // noticeForm의 데이터 받아오는 지 확인하기
      console.log("important >>> " + state);
      console.log("title >>> " + noticeForm.title);
      console.log("contents >>> " + noticeForm.contents);

      let data= {
        userNo: auth.token,
        chatNo: auth.chatNo,
        important: state,
        title: noticeForm.title,
        contents: noticeForm.contents
      };

      const response = await axios.post('/TT/talk/topic/noticeWrite/', JSON.stringify(data),
                                          {headers: {
                                            'Content-Type' : 'application/json',
                                            'Accept' : 'application/json'
                                          }}
                                          )
                        .then((response) => {
                          console.log("axios response >>> " + response)
                        if(response.statusText != "OK") {
                          throw `${response.status} ${response.statusText}`;
                        }
                        if(!response.data){
                          alert("뭔가 잘못됐다;");
                          return;
                        }
                        navigate('/tikitaka/chat', { replace: true});
                        // navigate('/tikitaka', {replace: true});
                        })
                        .catch((error) => {
                          console.log("ChatNoticeWrite" + error);
                        })
    }

  });

  // navigate('/tikitaka/chat', { replace: true});

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  // box style
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

  // 중요공지 체크 선택 시
  const important = (e) => {
    setState(e.target.value);
  };
// ------------------------------------------------------------------
 
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Box
      sx={{ ...style, width: 400 }}
      noValidate
      autoComplete="off"
    >
        <Stack spacing={3}>
            <div>
              <FormControl component="fieldset">
              <RadioGroup
                defaultValue='0'
                row
                aria-label="important"
                name="controlled-radio-buttons-group"
              >
                <FormControlLabel value='0' control={<Radio />} label="일반 공지" checked={state === '0'} onChange={important}/>
                <FormControlLabel value='1' control={<Radio />} label="중요 공지" checked={state === '1'} onClick={important}/>
              </RadioGroup>
            </FormControl>
            </div>
       
          <TextField
            fullWidth
            autoComplete="title"
            type="text"
            label="제목"
            {...getFieldProps('title')}
            error={Boolean(touched.title && errors.title)}
            helperText={touched.title && errors.title}
          />

          <TextField
            fullWidth
            autoComplete="contents"
            type="text"
            label="본문"
            multiline
            rows={10}
            {...getFieldProps('contents')}
            error={Boolean(touched.contents && errors.contents)}
            helperText={touched.contents && errors.contents}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            공지 등록
          </LoadingButton>
          </Stack>
        </Box>
      </Form>
    </FormikProvider>
  );
}