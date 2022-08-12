import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Container } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from '../../hooks/useToast';
import CashOrderForm from './components/CashOrderForm';
import { getCashOrder, updateCashOrder } from '../../service/api';

function CashOrderEdit() {
  const { id } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(['cashorder', id], () => getCashOrder(id));

  const { mutate } = useMutation((values) => updateCashOrder(id, values), {
    onSuccess: (data) => {
      showToast(`Cash order ${data.unique_id} updated`);
      navigate('/dashboard/cashorder/');
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container>
      <h1>Update Cash Order</h1>
      <CashOrderForm initialValues={data} onSubmit={mutate} />
    </Container>
  );
}

export default CashOrderEdit;
