import React from 'react'
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  // let headingstyles={color:'blue',fontSize:'32px'}
  let {register,
    handleSubmit,
    formState:{errors}
  } = useForm();
  let [err, setErr] = useState("");
  let navigate=useNavigate();  
  let newUser=(data)=>{
    console.log(data);
    axios.post("http://localhost:3500/user-api/register",data)
    .then((response)=>{
      console.log("response is ",response)
      if(response.status===201){
        // navigate to login commponent
        navigate('/signin')
      }
      else if(response.status===200){
        console.log(response.data?.message);
        setErr(response.data?.message);
      }  
      else{
        setErr(response.data?.message);
      }
    })
    .catch((error)=>{
      console.log(error.message);
      setErr(error.message)
    });
  }

  return (
  <div className='w-100 row'>
    {err.length!==0 && <p className='text-danger text-center display-3'>User already exists</p>}
    <div className='col-10 col-sm-6 col-md-4 col-lg-3 mx-auto bg-body form p-0 rounded'>
    <form onSubmit={handleSubmit(newUser)}> 
      <div className='p-1'>
        <label className='form-label' htmlFor='name'>Username:</label>
        <input className='form-control' id='name' type="text" {...register('username',{required:true})}/>
        {errors.username?.type==='required' && <p className='text-danger'>*Enter username</p>}
      </div>
      <div className='p-1'>
        <label className='form-label' htmlFor='email'>Email:</label>
        <input type="email" id='pwd' className='form-control' {...register('email',{required:true})}/>
        {errors.email?.type==='required' && <p className='text-danger'>*Enter email</p>}
      </div>
      <div className='p-1'>
        <label className='form-label' htmlFor='pwd'>Password:</label>
        <input type="password" id='pwd' className='form-control' {...register('password',{required:true})}/>
        {errors.password?.type==='required' && <p className='text-danger'>*Enter password</p>}
      </div>
      <div className='text-center p-1'>
        <button type='submit' className='btn btn-info'>Register</button>
      </div>
    </form>
  </div>
  </div>
  )
}

export default Signup;