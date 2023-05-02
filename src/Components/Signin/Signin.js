import React, { useEffect } from 'react';
import {useForm} from 'react-hook-form';
import './Signin.css';
import { useContext } from 'react';
import { LoginContext } from '../../Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

function Signin() {
  let {register,
    handleSubmit,
    formState:{errors}}=useForm()

  let [currentUser, loginErr, userLoginStatus, loginUser] = useContext(LoginContext);

  const navigate=useNavigate();

  let submitForm=(data)=>{
    console.log(data);
    loginUser(data);
  }

  useEffect(()=>{
    if(userLoginStatus===true){
      navigate('/user-profile');
    }
  },[userLoginStatus])

  return (
  <div className='w-100 row'>
    <div className='col col-sm-8 col-md-6 col-lg-4 col-9 mx-auto'>
      {/* {loginErr.length!==0 && (<p className='text-danger display-3'>{loginErr}</p>)} */}
    <form onSubmit={handleSubmit(submitForm)}>
          <div className='p-1'>
          <label className='form-label' htmlFor='name'>Username:</label>
            <input id='name' className='form-control' type="text" {...register('username',{required:true})}/>
            {errors.username?.type==='required' && <p className='text-danger'>*Enter username</p>}
          </div>
          <div className='p-1'>
            <label className='form-label' htmlFor='pwd'>Password:</label>
            <input id='pwd' type="password" className='form-control' {...register('password',{required:true})}/>
            {errors.password?.type==='required' && <p className='text-danger'>*Enter password</p>}
          </div>
          <div className='text-center p-1'>
            <button type='submit' className='btn btn-info'>Login</button>
          </div>
        </form>
    </div>
  </div>
  )
}

export default Signin