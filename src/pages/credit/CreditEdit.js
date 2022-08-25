import { CircularProgress, Container } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { getCredit, updateCredit } from '../../service/api';
import CreditForm from './components/CreditForm';

function CreditEdit() {
  const { id } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(['credit', id], () => getCredit(id));

  const { mutate } = useMutation((values) => updateCredit(id, values), {
    onSuccess: () => {
      showToast(`Credit updated`);
      navigate('/dashboard/credit/');
    },
    onError: (error) => {
      showToast(error.message);
    },
  });
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container>
      <h1>Edit Credit</h1>
      <CreditForm initialValues={data} onSubmit={mutate} />
    </Container>
  );
}

export default CreditEdit;
