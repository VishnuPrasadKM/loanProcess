import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
    let click = window.sessionStorage.getItem('clicked')
    console.log(click);
  return (
    click ? <Outlet/> : <Navigate to='/'/>
  )
}

export default ProtectedRoute