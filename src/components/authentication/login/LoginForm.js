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
import {loginUser, useAuthState, useAuthDispatch} from '../../../Context';

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });
 
  const dispatch = useAuthDispatch();
	//const { loading, errorMessage } = useAuthState();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
      //remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setAlert(false); // Alert창 false로 설정
      try {
        let response = await loginUser(dispatch, values);
        if (!response){
          console.log("일치하는 값이 없을때 실행")
          setAlert(true);
          return;
        }
        navigate('/tikitaka', { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => { // 비밀번호 show / hidden
    setShowPassword((show) => !show);
  };

  const handleShowAlert = () => { // 알람이 뜬후 2초뒤에 알람 hidden
    if(alert == true){
      console.log("alert생성후 2초후 hidden");
      setTimeout(() => {
        setAlert(false)
    }, 2000);
    formik.values.email = "";
    formik.values.password = "";
    }
  };

  const joinForm = (e) => {
    e.preventDefault();
    navigate('/register', { replace: true });
  }

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
        <br/><br/>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained" onClick={joinForm}>
          회원가입
        </LoadingButton>

        
      </Form>
    </FormikProvider>
  );
}
