/* eslint-disable */
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Navigate,Link as RouterLink } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';
import ThemeConfig from 'src/theme';

// ----------------------------------------------------------------------
import { useAuthState } from '../../Context';

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/'
  },
  {
    label: 'Profile',
    icon: personFill,
    linkTo: '/dashboard/profile'
  },
  {
    label: 'Settings',
    icon: settings2Fill,
    linkTo: '#'
  }
];


//로그아웃
const logout = async(e) => {

    e.preventDefault();
     
      try {
          const response = await fetch('/TT/logout', {
              method: 'get',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
          })
          .then((response) => {
            console.log(response);
          });

          if(!response.ok) {
              throw new Error(`${response.status} ${response.statusText}`);
          }

          const json = await response.json();

          console.log(json);

          if(json.result !== 'success') {
              throw json.message;
          }

      } catch(err) {
          console.error(err);
      
  
  }
}

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const loaduser = useAuthState(); //useContext를 이용하여 user값 불러옴
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [showloginout, setShowloginout] = useState(false); //login유무에 따라 보여지는게 달라짐
  const handleOpen = () => {
    setOpen(true);
    setShowloginout(loaduser.token);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>
      {
        showloginout ?  
        <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {loaduser.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {loaduser.password}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={ logout }>
            Logout
          </Button>
        </Box>
      </MenuPopover>
      :
      <MenuPopover
      open={open}
      onClose={handleClose}
      anchorEl={anchorRef.current}
      sx={{ width: 220 }}
      >
        <Box sx={{ p: 2, pt: 1.5 }}>
        <Button fullWidth color="inherit" variant="outlined" onClick={ <Navigate to='/login' /> }>
          LogIn
        </Button>
        </Box>
      </MenuPopover>
      }
      

    </>
  );
}
