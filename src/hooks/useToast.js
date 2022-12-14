import React, { useState, createContext, useContext } from 'react';

export const ToastContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const ToastProvider = ({ children }) => {
  const [message, setMessage] = React.useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const showToast = (message) => {
    setMessage(message);
    setOpen(true);
  };

  const value = { open, message, handleClose, showToast };
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = () => useContext(ToastContext);
