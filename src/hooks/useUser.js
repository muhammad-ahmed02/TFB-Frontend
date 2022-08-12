import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../service/api';

export const UserContext = createContext(null);

const initialValues = {
  pk: null,
  username: null,
  email: null,
  first_name: null,
  last_name: null,
};

export const UserProvider = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryKey: 'getUser',
    queryFn: getUser,
    refetchOnMount: false,
  });

  return <UserContext.Provider value={isLoading ? initialValues : data?.data}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
