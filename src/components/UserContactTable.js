/* eslint-disable */ 
import { filter } from 'lodash';
import { useState } from 'react';
// material
import {
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  Badge,
  styled
} from '@mui/material';

// components
import Page from 'src/components/Page';
import Scrollbar from 'src/components/Scrollbar';
import SearchNotFound from 'src/components/SearchNotFound';
import { UserListToolbar } from 'src/components/_dashboard/user';

import { LoadingButton } from '@mui/lab';

import { useEffect } from 'react';
import { useAuthState } from 'src/Context';


// ----------------------------------------------------------------------

//로그인 상태관리
const StyledBadgeon = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const StyledBadgeoff = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#b71500',
    color: '#b71500',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));
//로그인 상태관리

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

export default function UserContactTable({type, contactCallback}) {
  
  const [user, setUser] = useState([]);
  const [userList ,setUserList] = useState([]);
  
  
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [selectedname, setSelectedname] = useState([]);
  let [isItemSelected, setIsItemSelected] = useState(false);

  
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

  let userRoleFilter = user;
  if(type == 'CS'){
    userRoleFilter = user.filter((el) => {return el.role=='CS'})
  }
  else if(type == 'CP'){
    userRoleFilter = user.filter((el) => {return el.role=='CP'})
  }

  const filteredUsers = applySortFilter(userRoleFilter, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  //-----------------------------------------------------------------------------------------------


  const auth = useAuthState();

  

  useEffect(() => {
    getStatusData();
  }, []);

  const getStatusData = async() => {
    try {
      const response = await fetch(`/TT/user/`, {
        method: 'post',
        headers: {
          'Content-Type' : 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(auth.token)
      });     
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`);
      }     

      const json = await response.json();

      setUser(json.data);
      setUserList(json.data.length);

    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
  },[page,rowsPerPage])


  //채팅방생성 아이콘 클릭시 체크된아이템이 uncheck
  const allUncheck = () => {
    setSelected([]);
    setSelectedname([]);
  }

  // 연락처 전송하기
  const isSubmitting = (userName, userPhone) => {

    console.log("이름만? >>>", userName)
    console.log("전화번호만? >>>", userPhone)

    const contactData = {
      userName : userName,
      userPhone : userPhone

    }

    contactCallback(contactData);

  }
  

// var index = 0;


  return (
    <Page title="User | Minimal-UI">
      <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            talkNo={selected}
            talkName={selectedname}
            allUncheck={allUncheck}
      />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 280 }}>
              <Table>

                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((value) => {

                      // row 라고 지정해둔거 >>> 기존 템플릿에서 임시 지정
                      const {no, name, role, status, profile, phone} = value;

                      // 체크박스
                      isItemSelected = selected.indexOf(no) !== -1;

                      return (
                        <TableRow
                          hover
                          key={no}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >


                          <TableCell component="th" scope="row" padding="none">
                          
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* 사진 */}
                              {status == 1 ? 
                                <StyledBadgeon
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                              >
                                <Avatar alt={name} src={profile} />
                              </StyledBadgeon> 
                              :
                              <StyledBadgeoff
                              overlap="circular"
                              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                              variant="dot"
                              >
                              <Avatar alt={name} src={profile} />
                              </StyledBadgeoff> 
                              }

                              <Typography variant="subtitle2" noWrap>
                                {name}
                                <br/>
                                {role}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="right">
                              <LoadingButton
                                  size="small"
                                  type="submit"
                                  variant="contained"
                                  onClick={() => isSubmitting({name}, {phone} )}
                                >
                                  연락처 전송
                            </LoadingButton>
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
                
                {/* 검색창에서 일치하는 값이 없을때 */}
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
            labelRowsPerPage={"Page:"}
          />
    </Page>
  );
}