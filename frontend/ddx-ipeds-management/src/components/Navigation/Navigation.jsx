import React from "react";
import { BrowserRouter, NavLink, Route, Routes  } from 'react-router-dom';
import companyLogo from "../../images/border.png";
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
           <img src={companyLogo} alt="digital Dx"/>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <NavLink exact className='nav-link' activeClassName='active' to='/'>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact  className='nav-link' activeClassName='active' to='/info'>MY Info</NavLink>
              </li>
              <li className="nav-item ">
                <NavLink exact className='nav-link' activeClassName='nav-link' to='/admin'>Admin</NavLink>

              </li>
              <li className="nav-item ">
                <NavLink exact className='nav-link' activeClassName='nav-link' to='/register'>Register</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      );

}
export default Navbar;