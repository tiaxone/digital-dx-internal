import React from "react";
import { Route, Routes  } from 'react-router-dom';
import { ProtectedRoute } from '../hooks/ProtectedRoute';
import Home from '../components/Home/Home';
import LoginLanding from '../components/Login/LoginLanding';
import Admin from '../components/Admin/Admin';
import Login from '../components/Login/Login';
import Error500 from "../components/Error/500";
import UserDetail from "../components/UserInfo/userInfo";
const Routing = () => {
    return (
        <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/login-register' element={<LoginLanding/>} />
        <Route exact path='/error-500' element={<Error500/>}/>
        <Route path='/' element={<ProtectedRoute />}>
          <Route exact path='/admin' element={<Admin/>} />
          <Route exact path='/userInfo' element={<UserDetail/>} />
        </Route>
      </Routes>
      );
}
export default Routing;