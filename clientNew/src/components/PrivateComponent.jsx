import React from 'react'
import useAuthStatus from '../hooks/useAuthStatus'
import Loading from '../pages/Loading'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponent = () => {
  
  const {loggedIn, checkUser} = useAuthStatus()
  if(checkUser){
    return <Loading />
  }

  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />;


}

export default PrivateComponent