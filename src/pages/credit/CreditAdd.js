import { Container } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { createCredit } from '../../service/api';
import CreditForm from './components/CreditForm';

function CreditAdd() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { mutate } = useMutation((values) => createCredit(values), {
    onSuccess: () => {
      showToast(`Credit added`);
      navigate('/dashboard/credit/');
    },
    onError: (error) => {
      showToast(error.message);
    },
  });
  return (
    <Container>
      <h1>Add Credit</h1>
      <CreditForm onSubmit={mutate} />
    </Container>
  );
}

export default CreditAdd;
