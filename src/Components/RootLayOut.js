import React from 'react'
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import './RootLayout.css';

function RootLayOut() {
  return (
    <div>
      <Navbar/>
      {/* placeholder dynamic content */}
      <div style={{minHeight:'70vh'}} className='d-flex align-items-center justify-content-center'>
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayOut;