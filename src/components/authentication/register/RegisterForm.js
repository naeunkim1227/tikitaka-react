/* eslint-disable */ 

import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const[totaldata, setTotalData] = useState({
    userNo: '',
    name: '',
    password: '',
    email: '',
    phone: ''
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    //설정할 초기값
    initialValues: {
      userNo: '',
      name: '',
      password: '',
      email: '',
      phone: ''
    },
    //validation 처리
    validationSchema: RegisterSchema,
    //제출시 처리할 함수. 인자는 없는 상태
    onSubmit: async (e) => {

      const res = await fetch('http://localhost:8080/TT/joinsuccess',{
        method: 'post',
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          userNo: "totaldata.userNo",
          name: "totaldata.name",
          password: "totaldata.password",
          email: "totaldata.email",
          phone: "totaldata.phone"
        })
      });

      navigate('/dashboard', { replace: true });
    }
  });




  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack> */}
          <TextField
            fullWidth
            autoComplete="userNo"
            type="text"
            label="사원번호"
            value={totaldata.userNo}
            onChange={(e) => setTotalData(Object.assign({}, totaldata, {userNo:e.target.value}))}
            {...getFieldProps('userNo')}
            error={Boolean(touched.userNo && errors.userNo)}
            helperText={touched.userNo && errors.userNo}
          />
          <TextField
            fullWidth
            autoComplete="name"
            type="test"
            label="이름"
            value={totaldata.name}
            onChange={(e) => setTotalData(Object.assign({}, totaldata, {name:e.target.value}))}
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            fullWidth
            autoComplete="password"
            type={showPassword ? 'text' : 'password'}
            label="비밀번호"
            value={totaldata.password}
            onChange={(e) => setTotalData(Object.assign({}, totaldata, {password:e.target.value}))}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="이메일"
            value={totaldata.email}
            onChange={(e) => setTotalData(Object.assign({}, totaldata, {email:e.target.value}))}
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            autoComplete="phone"
            type="text"
            label="전화번호"
            value={totaldata.phone}
            onChange={(e) => setTotalData(Object.assign({}, totaldata, {phone:e.target.value}))}
            {...getFieldProps('phone')}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            회원가입
          </LoadingButton>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            로그인
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
