import React from "react";
import Container from 'react-bootstrap/Container';
import { NavLink, useNavigate } from 'react-router-dom';
import { getToken,getUser,resetUserSession } from '../../Service/AuthService';
import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import companyLogo from "../../images/border.png";


const Navigation = () => {
    
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUsername] = useState();
  const [isAdmin, setAdmin] = useState();

  useEffect(() => {
    const token = getToken();
    if(token === 'undefined' || token === undefined || token === null || !token){
      setLoggedIn(false);
      return
    }
    const user = getUser();
    setUsername(user.name);
    setAdmin(user.isAdmin)
    setLoggedIn(true);
  });
  const logoutHandler = () => {
    resetUserSession();
    navigate('/login');
    setUsername(null);
  }
  const login = (event) => {
    event.preventDefault();
    let path = '/login-register';
    navigate(path);
  };
    return (
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="https://www.digitaldxventures.com/">
            <img 
              src={companyLogo} 
              height ="70"
              className="d-inline-block align-top"
              alt="ddx logo"
            />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="m-auto">
                <Nav.Item >
                  <NavLink exact className='nav-link' to='/'>Home</NavLink>
                </Nav.Item>
                <Nav.Item>    
                {!isAdmin && isLoggedIn && <NavLink exact  className='nav-link' to='/userInfo'>MY Info</NavLink>}
                </Nav.Item>
                <Nav.Item>
                  {isAdmin && <NavLink exact className='nav-link' to='/admin'>Admin</NavLink>}
                </Nav.Item>
                </Nav>

                <Nav pullRight>
                  {!isLoggedIn && <Nav.Item onClick={login}  variant="primary" ><Nav.Link className='nav-link' eventKey="login">Login</Nav.Link></Nav.Item>}
                  {userName && <Nav.Item >Welcome, {userName}</Nav.Item >}{isLoggedIn && <Nav.Item onClick={logoutHandler} variant="primary"><Nav.Link className='nav-link' activeClassName='active' eventKey="login">Logout</Nav.Link></Nav.Item>}

                </Nav>
              </Navbar.Collapse>

         
          </Container>
        </Navbar>
      );

}
export default Navigation;