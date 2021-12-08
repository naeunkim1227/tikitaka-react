/* eslint-disable */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import {Alert} from "reactstrap";
// material
import {
  Link,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(false);

  // useEffect(() => {
  //   console.log("hook action");
  //   //alert("test");

  //   //Fetch GET
  //   fetch('/TT/logincheck')
  //     .then(response => response.text)
  //     .then(testtext => {setTesttext(testtext)
  //     });

  // },[TextField]);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setAlert(false); // 팝업창 false로 설정

      const useremail = values.email;
      const userpassword = values.password;

      //Fetch POST
      const response = await fetch('/TT/login',{
        method: "post",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify({
          email: useremail,
          password: userpassword })
      }).then(response => {
        if(!response.ok){
          setAlert(true);
      }else {
          //console.log(response.json());
          return response.json();
      }
    }).then(res => {
      console.log(res.result);
      return res.result});



      if(response == 'success'){ //입력창이 빈칸이 아닐때
        //navigate('/dashboard', { replace: true });
      } else{
        setAlert(true);
      }
      console.log(response)
      
     // navigate('/dashboard', { replace: true });

    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => { // 비밀번호 show / hidden
    setShowPassword((show) => !show);
  };

  const handleShowAlert = () => { // 알람이 뜬후 2초뒤에 알람 hidden
    if(alert == true){
      console.log("이프문 트루");
      setTimeout(() => {
        setAlert(false)
    }, 2000);
    formik.values.email = "";
    formik.values.password = "";
    }
  };

  useEffect(() => {
    handleShowAlert();
    console.log("disable alert hook action");
  },[alert]);

  return (
    <FormikProvider value={formik}>
      <Alert isOpen={alert} color="secondary">아이디/패스워드를 다시 확인해주세요.</Alert>
      <br/>
      <br/>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="이메일"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="비밀번호"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Link component={RouterLink} variant="subtitle2" to="/forgotPassword">
            비밀번호를 잊으셨나요?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          로그인
        </LoadingButton>

        
      </Form>
    </FormikProvider>
  );
}
