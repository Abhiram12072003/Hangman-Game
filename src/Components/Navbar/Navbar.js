import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import "bootstrap/js/src/collapse";
import './Navbar.css';
import {LoginContext} from '../../Contexts/LoginContext';

function Navbar() {
  
  let [currentUser, loginErr, userLoginStatus, loginUser, logOutUser]=useContext(LoginContext);
  // let userLoginStatus=false;
  const activeLink={
    color:"#87CEEB",
    fontWeight:'bold'
  }
  
  const inactiveLink={
    color:"#FFFFFF"
  }

  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-lg bg-body-tertiary bg-dark">
        <div className="container-fluid">
          <NavLink className="header" to="/">
            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/WLM_logo-2.svg" height="45px" width="45px" alt="" /> */}
            Hangman
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  to="/"
                  style={({isActive})=>{
                    return isActive? activeLink: inactiveLink;
                  }}
                  >Home</NavLink>
              </li>
              {userLoginStatus? 
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  to="/signin"
                  style={({isActive})=>{
                    return isActive? activeLink: inactiveLink;
                  }}
                  onClick={logOutUser} 
                  >Log out</NavLink>
              </li>
              :
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  to="/signin"
                  style={({isActive})=>{
                    return isActive? activeLink: inactiveLink;
                  }}
                  >Login</NavLink>
              </li>
              } 
              {!userLoginStatus &&
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  to="/signup"
                  style={({isActive})=>{
                    return isActive? activeLink: inactiveLink;
                  }}
                  >Register</NavLink>
              </li>
              }   
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )}

export default Navbar