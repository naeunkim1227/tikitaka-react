/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserContactTable from './UserContactTable';
import { Card, CardHeader } from '@mui/material';
import Button from '@mui/material/Button';




function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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

const UserContact = ({contactCallback, closeContact}) => {

    const [value, setValue] = React.useState(0);
    const [type, setType] =React.useState("CP");

    const handleChange = (event, newValue) => {
      setValue(newValue);
      if(newValue==1){
        setType("CP");
      }
      else if(newValue==2){
        setType("CS");
      }
    };

    const close = () => {
      closeContact();
    }

    const callback = (contactData) => {
      console.log(contactData)
      contactCallback(contactData);
    }

    return (
      <Box
      sx={{ ...style, width: 800 }}
      noValidate
      autoComplete="off"
    >
      <Card>
        <CardHeader title="연락처 전송하기" />
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
            <Tab label="전  체" {...a11yProps(0)} />
            <Tab label="부  서" {...a11yProps(1)} />
            <Tab label="거 래 처" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UserContactTable contactCallback={contactCallback} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserContactTable type={type} contactCallback={contactCallback} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UserContactTable type={type} contactCallback={contactCallback} />
        </TabPanel>
      <Button variant="contained" color='error' onClick={close}>닫기</Button>
      </Box>

      </Card>
      </Box>
    );
};

export default UserContact;