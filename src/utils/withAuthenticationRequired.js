import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserProvider } from '../hooks/useUser';
import { getToken } from './helpers';

const withAuthenticationRequired = (ComposedComponent) => {
  const Component = (props) => {
    if (getToken()) {
      return (
        <UserProvider>
          <ComposedComponent {...props} />
        </UserProvider>
      );
    }
    return <Navigate to={'/login'} />;
  };
  return <Component />;
};

export default withAuthenticationRequired;
