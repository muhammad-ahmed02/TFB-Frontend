import { CircularProgress, Container } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { getClaim, updateCredit } from '../../service/api';
import ClaimForm from './components/ClaimForm';

function ClaimEdit() {
  const { id } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(['claim', id], () => getClaim(id));

  const { mutate } = useMutation((values) => updateCredit(id, values), {
    onSuccess: () => {
      showToast(`Claim updated`);
      navigate('/dashboard/claim/');
    },
    onError: (error) => {
      showToast(error.message);
    },
  });
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container>
      <h1>Edit Claim</h1>
      <ClaimForm initialValues={data} onSubmit={mutate} />
    </Container>
  );
}

export default ClaimEdit;
