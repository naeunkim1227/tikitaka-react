/* eslint-disable */ 

import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import data from '@iconify/icons-eva/menu-2-fill';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState ]= useState('');

  const RegisterSchema = Yup.object().shape({
    userNo: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('userNo required'),
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    phone: Yup.string().required('Phone is required')
  });

  const formik = useFormik({
    initialValues: {
      role: '', 
      userNo: '',
      name: '',
      password: '',
      email: '',
      phone: '',
      proName: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (data) => {
      console.log(data.role);
      const response = await axios.post('/TT/join', data)
                      .then((response) => {
                        console.log(response);
                        if(response.statusText !== "OK") {
                          throw  `${response.status} ${response.statusText}`;
                        }
                        if(!response.data){
                          alert("중복된 이메일입니다");
                          return;
                        }
                        navigate('/login', { replace: true });
                      })
                      .catch((error) => {
                        console.log(error);
                      })
                      
    }

  });

  const chooseRole = (e) => {
    
    setState(e.target.value);
    formik.initialValues.role = state;
  };
 
  const { errors, touched,handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      
      <Form autoComplete="off" 
            noValidate 
            onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <RadioGroup defaultValue="CP" row aria-label="role" name="radio-group" >
          <FormControlLabel name="role" type="text" value="CP"  control={<Radio />} label="사원" checked={state === "CP"}  onChange={chooseRole}/>
          <FormControlLabel name="role" type="text" value="CS"  control={<Radio />} label="고객" checked={state === "CS"}  onClick={chooseRole}/>
          </RadioGroup>
          {
            state == "CP" ? 
            <div>
            <TextField
            fullWidth
            autoComplete="userNo"
            type="text"
            label="사원번호"
            value={formik.userNo}
            {...getFieldProps('userNo')}
            error={Boolean(touched.userNo && errors.userNo)}
            helperText={touched.userNo && errors.userNo}/> 
            
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
          </div>

          : 
          <div>
          <TextField
            fullWidth
            autoComplete="userNo"
            type="text"
            label="거래처번호"
            value={formik.userNo}
            {...getFieldProps('userNo')}
            error={Boolean(touched.userNo && errors.userNo)}
            helperText={touched.userNo && errors.userNo}
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
            autoComplete="name"
            type="test"
            label="거래처명"
            value={formik.name}
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
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

            <TextField
            fullWidth
            autoComplete="proName"
            type="test"
            label="제품명"
            value={formik.name}
            {...getFieldProps('proName')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />

          </div>
          }
          
          
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
