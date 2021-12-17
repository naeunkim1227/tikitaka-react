/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserlistTable from './UserlistTable';

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

const UserlistTabbar = () => {

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

    return (
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="전  체" {...a11yProps(0)} />
            <Tab label="부  서" {...a11yProps(1)} />
            <Tab label="거 래 처" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UserlistTable/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserlistTable type={type}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UserlistTable type={type}/>
        </TabPanel>
      </Box>
    );
};

export default UserlistTabbar;