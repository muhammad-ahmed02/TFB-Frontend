import { Container } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { createClaim } from '../../service/api';
import ClaimForm from './components/ClaimForm';

function ClaimAdd() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { mutate } = useMutation((values) => createClaim(values), {
    onSuccess: () => {
      showToast(`Claim added`);
      navigate('/dashboard/claim/');
    },
    onError: (error) => {
      showToast(error.message);
    },
  });
  return (
    <Container>
      <h1>Add Claim</h1>
      <ClaimForm onSubmit={mutate} />
    </Container>
  );
}

export default ClaimAdd;
