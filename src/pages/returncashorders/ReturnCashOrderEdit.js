import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Container } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from '../../hooks/useToast';
import ReturnCashOrderForm from './components/ReturnCashOrderForm';
import { getReturnCashOrder, updateReturnCashOrder } from '../../service/api';

function ReturnCashOrderEdit() {
  const { id } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(['return-cashorder', id], () => getReturnCashOrder(id));

  const { mutate } = useMutation((values) => updateReturnCashOrder(id, values), {
    onSuccess: () => {
      showToast(`Return cashorder updated`);
      navigate('/dashboard/return-cashorder/');
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container>
      <h1>Update Return Cash Order</h1>
      <ReturnCashOrderForm initialValues={data} onSubmit={mutate} />
    </Container>
  );
}

export default ReturnCashOrderEdit;
