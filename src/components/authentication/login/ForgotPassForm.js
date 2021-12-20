/* eslint-disable */
import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PassRadio from './PassRadio';

// ----------------------------------------------------------------------

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <PassRadio />
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />

      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>

          {/* 사원번호, 고객번호 -> Validation 수정해야 합니다 */}
          <TextField
            fullWidth
            autoComplete="userNo"
            type="text"
            label="사원번호 또는 거래처번호"
            {...getFieldProps('userNo')}
            error={Boolean(touched.userNo && errors.userNo)}
            helperText={touched.userNo && errors.userNo}
          />

          {/* 이메일 */}
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="이메일"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          

          
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />
          
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          비밀번호 찾기
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
