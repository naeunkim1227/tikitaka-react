/* eslint-disable */ 
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useRef, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
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
import { useAuthState } from 'src/Context';
import axios from 'axios'
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false }
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

  const auth = useAuthState();

  

  let data= {
    userNo: auth.token
  };

  console.log(auth.token)


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
      setUserList(json.data.length);

      // console.log('이름', user[].name)
      

      // if(json.result !== 'success') {
      //   throw json.message;
      // }

      // setMessages([...messages, ...json.data]);

    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    console.log('page >>> ',page)
    console.log('rowsPerPage >>> ',rowsPerPage)

  },[page,rowsPerPage])

// const [index, setIndex] = useState(0);

  
  const createTopic = async (no, auth) =>{
    //토픽(채널) 추가하는 axios
    const res = await axios.put(`/TT/talk/topic/${no}`, auth.token, {headers:{"Content-Type":"application/json"}})
    .then((res)=>{
        if (!res){
          console.log("res값 없음")
          return;
        }
        console.log("auth의 no ",res.config.data);
        return res.config.data;
    }).catch((err) => {
        console.log(err);
    })

    //react-router v5 -> react-router v6
    //useHistory -> useNavigate
    //history.push('/') ==> navigate('/') : Browser History에 페이지 이동 기록이 쌓인다. 
    // 그래서 뒤로가기 클릭시 쌓였던 기록순서대로 돌아가게된다.
    //ex) home > items(navigate('/login')실행)) > login > item 순으로 들어왔을때 뒤로가기하면 기록대로 되돌아간다.
    
    //history.replace('/') ==> navigate('/', {replace:true}) : 새로운 히스토리를 하나 생성하는 대신에 현재의 히스토리 엔트리를 변경한다.
    //ex) home > items(navigate('/login', {replace:true})) > login > items 순서에서 replace사용할경우
    // home > login > items 으로 바뀐다. (items이 login으로 대체되었다.)
    navigate('/tikitaka/chat',  { replace: true });

  }

var index = 0;

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New User 
          </Button>
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
                  rowCount={user.length}
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
                      // const { key, id, role, status, avatarUrl } = value;
                      
                      // const {
                      //         key: {user.no},  
                      //         role : {user.role}, 
                      //         name: {user.name},
                      //         status : {user.status},
                      //         profile: {user.profile}
                      //         } = row;

                      // 체크박스
                      const isItemSelected = selected.indexOf(no) !== -1;

                      return (
                        // <UserListItem user={users} />
                        // <Table data={user} />
                         //  map.data => <TableItem key={data.no} 
                        <TableRow
                          hover
                          key={no}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          
                        >
                         
                         {/* 정렬 안맞는 거 임시로 해결 */}
                         {/* <TableCell component="th" scope="row">
                         {page * rowsPerPage + value + 1}
                           </TableCell> */}

                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
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

                          <TableCell align="left">{role}</TableCell>

                          <TableCell align="left">
                            <Label
                              // variant="ghost"
                              color={(status === '0' && 'error') || 'success'}
                            >
                              
                              {status == 0 ? '오프라인' : '온라인' }
                            </Label>
                          </TableCell>

                          <TableCell>
                            <Button type="button" variant="contained" onClick={(e) =>{ createTopic(no, auth)}} >대화하기</Button>
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