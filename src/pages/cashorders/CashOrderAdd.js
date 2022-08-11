import { CircularProgress, Container } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { createCashOrder, getProducts } from '../../service/api';
import CashOrderForm from './components/CashOrderForm';

function CashOrderAdd() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: 'getProducts',
    queryFn: getProducts,
  });

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
      {isLoading ? <CircularProgress /> : <CashOrderForm onSubmit={mutate} products={data.results} />}
    </Container>
  );
}

export default CashOrderAdd;
