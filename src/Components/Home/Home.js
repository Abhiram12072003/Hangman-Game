import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useContext } from 'react';
import { LoginContext } from '../../Contexts/LoginContext';
import UserProfile from '../user-profile/user-profile';

function Home() {
  let navigate = useNavigate();
  let gotoLogin=()=>{
    navigate('/signin');
  }
  let gotoRegister=()=>{
    navigate('/signup');
  }
  let gotoGame=()=>{
    navigate('/user-profile');
  }
  let [currentUser, loginErr, userLoginStatus, loginUser,logOutUser]=useContext(LoginContext);

  return (
    <div className='home'>
      <div className='text-center'>
        <p className='display-3'>Wanna Play Hangman?</p>
      </div>
      {!userLoginStatus &&
      <div className='d-flex justify-content-center'>
        <div className='p-2 m-2'>
        <button className='btn btn-info fs-3' onClick={gotoLogin}>Login</button>
        </div>
        <div className='p-2 m-2'>
        <button className='btn btn-info fs-3' onClick={gotoRegister}>Register with us</button>
        </div>
      </div>
      }
      {userLoginStatus &&
      <div className='p-2 text-center'>
        <button className='btn btn-info fs-3' onClick={gotoGame}>Play</button>
      </div>
      }
    </div>
  )
}

export default Home;