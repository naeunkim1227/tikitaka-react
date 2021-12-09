/* eslint-disable */
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import Chat from './pages/Chat';
import NotFound from './pages/Page404';
import Main from './pages/Main';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ImportantNotice from './pages/ImportantNotice';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import { useAuthState } from './Context';
// ----------------------------------------------------------------------

export default function Router() {
  const userDetails = useAuthState();
  return useRoutes([
    {
      path: '/',
      element: !Boolean(userDetails.token) ? (<Navigate to='tikitaka/login' />):(<DashboardLayout />),
      children: [
        { element: <Navigate to="tikitaka/login" replace /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: '/', element: <Navigate to="tikitaka/login" /> },
      ]
    },
    {
      path: '/tikitaka',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="main" replace /> },
        { path: 'login', element: <Login /> },
        { path: 'forgotPassword', element: <ForgotPassword />},
        { path: 'resetPassword', element: <ResetPassword />},
        { path: 'main', element: <Main /> },
        { path: 'user', element: <User /> },
        { path: 'importantNotice', element: <ImportantNotice /> },
        { path: 'chat', element: <Chat /> }
      ]
    },
    // {
    //   path: '/dashboard',
    //   element: <DashboardLayout />,
    //   children: [
    //     { element: <Navigate to="/dashboard/app" replace /> },
    //     { path: 'app', element: <DashboardApp /> },
    //     { path: 'user', element: <User /> },
    //     { path: 'profile', element: <Profile /> },
    //     { path: 'updateProfile', element: <UpdateProfile /> },
    //     { path: 'products', element: <Products /> },
    //     { path: 'blog', element: <Blog /> }
    //   ]
    // },
 
    // { path: '/login', element: <Login /> },
    { path: '*', element: <Navigate to="/404" replace /> }
    // { path: 'forgotPassword', element: <ForgotPassword />},
    // { path: 'resetPassword', element: <ResetPassword />}
  ]);
}