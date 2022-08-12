import { Container } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { createCashOrder } from '../../service/api';
import CashOrderForm from './components/CashOrderForm';

function CashOrderAdd() {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { mutate } = useMutation((values) => createCashOrder(values), {
    onSuccess: (data) => {
      showToast(`Cashorder ${data.unique_id} added`);
      navigate('/dashboard/cashorder/');
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return (
    <Container>
      <h1>Add Cash Order</h1>
      <CashOrderForm onSubmit={mutate} />
    </Container>
  );
}

export default CashOrderAdd;
