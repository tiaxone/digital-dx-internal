import React from "react";
import { Route, Routes  } from 'react-router-dom';
import { ProtectedRoute } from '../hooks/ProtectedRoute';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Admin from '../components/Admin/Admin';
import Register from '../components/Register/Register';
const Routing = () => {
    return (
        <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route path='/' element={<ProtectedRoute />}>
          <Route exact path='/admin' element={<Admin/>} />
          <Route exact path='/user' element={<Admin/>} />
        </Route>
      </Routes>
      );
}
export default Routing;