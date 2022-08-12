import { Container } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { createReturnCashOrder } from '../../service/api';
import ReturnCashOrderForm from './components/ReturnCashOrderForm';

function ReturnCashOrderAdd() {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { mutate } = useMutation((values) => createReturnCashOrder(values), {
    onSuccess: () => {
      showToast(`Return cashorder added`);
      navigate('/dashboard/return-cashorder/');
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return (
    <Container>
      <h1>Add Return Cash Order</h1>
      <ReturnCashOrderForm onSubmit={mutate} />
    </Container>
  );
}

export default ReturnCashOrderAdd;
