/* eslint-disable */ 
import { filter } from 'lodash';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//

// import USERLIST from '../_mocks_/user'; // 임시 데이터
import { useEffect } from 'react';
import { map } from 'lodash-es';
import { useAuthState, useAuthDispatch, maketopic, opensocket } from 'src/Context';
import axios from 'axios'

// Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false }, 
  { id: 'chat', label: 'Chat', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [userList ,setUserList] = useState([]);
  
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = user.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList) : 0;

  const filteredUsers = applySortFilter(user, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  //-----------------------------------------------------------------------------------------------
  const [messages, setMessages] = useState([]);
  const [chatNo, setChatNo] = useState(0);

  const auth = useAuthState();
  const dispatch = useAuthDispatch();



  let data= {
    userNo: auth.token
  };

  // 친구 목록 (no, role, name, status, profile 가져오기)	
  useEffect(() => {
    getStatusData();
  }, []);

  const getStatusData = async() => {
    console.log("test")
    try {
      const response = await fetch(`/TT/user/`, {
        method: 'post',
        headers: {
          'Content-Type' : 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`);
      }
      

      const json = await response.json();

      setUser(json.data);
      console.log('데이터',json.data)
      

      console.log('길이', json.data.length)
      setUserList(json.data.length); // 길이


    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    console.log('page >>> ',page)
    console.log('rowsPerPage >>> ',rowsPerPage)

  },[page,rowsPerPage])

/////////
const enterchat = async(dispatch,no,auth) => {
    console.log('enterchat 실행')
    const response = await axios.put(`/TT/talk/searchchat/${no}`, JSON.stringify(auth), {headers:{"Content-Type":"application/json"}})
    .then((res) => {
      if(!res){
        console.log('res값 x');
        return;
      }
      // JSON.stringify()
      console.log(res);
      const chatNo = res.data

      console.log("채팅방번호확인" + chatNo);
      if(res.data){
        console.log('chatno 있음 >> socket sub');
        var socket = new SockJS('http://localhost:8080/TT/websocket');
        var stompClient = Stomp.over(socket);
        stompClient.connect({},function(){
          console.log('link sub socket');
          stompClient.subscribe(`/topic/${res.data}`, (message) =>{
            const msg =  JSON.parse(message.body);
            console.log('안나오냐규' ,msg);
            console.log(msg.data);
            
          })
        })
        dispatch({type:'GET_TOPIC',payload: chatNo})
        navigate('/tikitaka/chat', { replace: true});
      }
      else{
        console.log('false >> create topic');
        createTopic(no, auth);
      }
    }).catch((err) => {
      console.log('enterchat axios err :' , err);
    });
    

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




 


var index = 0;

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((value) => {
                      console.log('value >>>',value)
                      // row 라고 지정해둔거 >>> 기존 템플릿에서 임시 지정
                      const {no, name, role, status, profile} = value;

                      // 체크박스
                      const isItemSelected = selected.indexOf(no) !== -1;

                      return (
                        <TableRow
                          hover
                          key={no}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          
                        >

                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, no)}
                            />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                          
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* 사진 */}
                              <Avatar alt={name} src={profile} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{role == 'CS' ? '고객' : '사원'}</TableCell>

                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={status == 0 ? 'error' : 'success'}
                            >
                              {status == 0 ? '오프라인' : '온라인' }
                            </Label>
                          </TableCell>

                          <TableCell>
                            <Button type="button" variant="contained" onClick={(e) =>{ enterchat(dispatch,no,auth) }} >대화하기</Button>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>

                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={user.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}