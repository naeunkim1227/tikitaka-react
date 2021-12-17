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

  const enter = async(dispatch,no,auth) => {
    console.log('enterchat 실행')
      let response = await enterchat(dispatch.no,auth);
     console.log(response);
  
     if(response === "0"){
           console.log('false >> create topic');
          createTopic(no, auth);
  
     }
  
  }  
  
    const createTopic = async (no, auth) =>{
      console.log('토픽 추가, 스톰프 실행!')
        // chatNo 반환 + topic 생성
        let res = await maketopic(dispatch, no, auth);
        console.log('res 값 출력 :' ,res);
  
        //chatNo 가지고 socket연결
         const cno = res.replace(/"/g,"");
         await opensocket(cno);
          
  
        if(!res){
            console.log("실패");
              return;
        }else{
            //chatNo 가지고 socket연결
            const cno = res.replace(/"/g,"");
            await opensocket(cno);
            navigate('/tikitaka/chat', { replace: true});
        }
   
  
  }


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