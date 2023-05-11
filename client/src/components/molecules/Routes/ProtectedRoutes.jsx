import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../../../utils/contextHook';
import Spinner from '../../atoms/Spinner';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useGlobalContext();

  if (isLoading) {
    return <Spinner />;
  }
  return user ? children : <Navigate to="/"></Navigate>;
};
export default PrivateRoute;
