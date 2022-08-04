import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from './helpers';

const withAuthenticationRequired = (ComposedComponent) => {
  const Component = (props) => {
    if (getToken()) {
      return <ComposedComponent {...props} />;
    }
    return <Navigate to={'/login'} />;
  };
  return <Component />;
};

export default withAuthenticationRequired;
