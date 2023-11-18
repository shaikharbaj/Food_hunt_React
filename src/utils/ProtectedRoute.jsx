import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';


const isAuthenticated = () => {
  const loggedUser = useSelector((state)=>state?.user?.loggedUser);
  if(loggedUser)
  {
      return true;
  }else{
      return false
  }
};
const ProtectedRoute = ({ children })=> {
    const user = useSelector((state)=>state?.user?.loggedUser);
  
    if (!user) {
      return <Navigate to="/login" replace={true}></Navigate>;
    }
    return children;
  }
export default ProtectedRoute;