/* eslint-disable */
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/navbar';
import UserLayout from './layouts/navbar/userindex';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Main from './pages/Main';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ImportantNotice from './pages/ImportantNotice';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import { useAuthState } from './Context';
import { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router';
import ChatRoom from './pages/ChatRoom';
// ----------------------------------------------------------------------

export default function Router() {
  const loginUser = useAuthState();

  // const [flag, setFlag] = useState(loginUser.token);
  // useEffect(() => {
  //   console.log('Rendering checkUserToken',flag);
  //   if(flag == undefined){
  //     console.log("token==undefined ->/login이동");
  //     setFlag("checkuser");
  //     //window.location.href="/login";
  //   }
  // });
  
  return useRoutes([
    {
      path: '/tikitaka',
      element: !Boolean(loginUser.token) ? (<Navigate to='/login' />):(<UserLayout />),  //loginUser.token == 로그인된 userno
      children: [
        { element: <Navigate to="/tikitaka/main" replace /> },
        { path: 'main', element: <Main /> },
        { path: 'user', element: <User /> },
        { path: 'chat', element: <ChatRoom /> },
        { path: 'importantNotice', element: <ImportantNotice /> },
        { path: 'profile', element: <Profile /> },
        { path: 'updateProfile', element: <UpdateProfile />}

      ]
    },
    {
            /**
       * localhost:8080 ('/') 으로 들어가면 <DashboardLayout />이 뷰에 그려지고 children.element프로퍼티에 의해
       * /tikitaka/main 주소로 가게 된다. /tikitaka에서 userno(token)값 유무를 묻게 되고 false이면 로그인화면('/login')으로,
       * true면 /tikitaka/main로 가서 <Main />이 뷰에 그려지게 된다..
       */
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/tikitaka/main" replace /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: 'forgotPassword', element: <ForgotPassword />},
        { path: 'resetPassword', element: <ResetPassword />}
      ]
    }
  ]);
}

    //react-router v5 -> react-router v6
    //useHistory -> useNavigate
    //history.push('/') ==> navigate('/') : Browser History에 페이지 이동 기록이 쌓인다. 
    // 그래서 뒤로가기 클릭시 쌓였던 기록순서대로 돌아가게된다.
    //ex) home > items(navigate('/login')실행)) > login > item 순으로 들어왔을때 뒤로가기하면 기록대로 되돌아간다.
    
    //history.replace('/') ==> navigate('/', {replace:true}) : 새로운 히스토리를 하나 생성하는 대신에 현재의 히스토리 엔트리를 변경한다.
    //ex) home > items(navigate('/login', {replace:true})) > login > items 순서에서 replace사용할경우
    // home > login > items 으로 바뀐다. (items이 login으로 대체되었다.)