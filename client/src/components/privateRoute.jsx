// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authcontext';

const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/register" replace />;
  }

  return element;
};

export default PrivateRoute;
