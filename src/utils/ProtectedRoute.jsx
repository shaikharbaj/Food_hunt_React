import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, useLocation } from 'react-router-dom';


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
    const location = useLocation();
    console.log(location);
  
    if (!user) {
      return <Navigate to="/login" state={{from:location}}  replace={true}></Navigate>;
    }
    return children;
  }
export default ProtectedRoute;