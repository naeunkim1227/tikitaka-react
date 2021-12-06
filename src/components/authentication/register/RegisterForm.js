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
import axios from 'axios';
import data from '@iconify/icons-eva/menu-2-fill';

// ----------------------------------------------------------------------

export default function RegisterForm() {
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
    initialValues: {
      userNo: '',
      name: '',
      password: '',
      email: '',
      phone: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async() => {
      const data = await axios.post('/TT/join', initialValues)
      .then(function(response){
        console.log(response);
        // console.log(initialValues.userNo + ":",
        //           initialValues.name + ":",
        //           initialValues.password + ":",
        //           initialValues.email + ":",
        //           initialValues.phone + ":",);
      })
      
      //navigate('/dashboard', { replace: true });
    }

  }, []);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;


  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          
          <TextField
            fullWidth
            autoComplete="userNo"
            type="text"
            label="사원번호"
            value={formik.userNo}
            {...getFieldProps('userNo')}
            error={Boolean(touched.userNo && errors.userNo)}
            helperText={touched.userNo && errors.userNo}
          />
          <TextField
            fullWidth
            autoComplete="name"
            type="test"
            label="이름"
            value={formik.name}
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            fullWidth
            autoComplete="password"
            type={showPassword ? 'text' : 'password'}
            label="비밀번호"
            value={formik.password}
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
            value={formik.email}
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            autoComplete="phone"
            type="text"
            label="전화번호"
            value={formik.phone}
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
