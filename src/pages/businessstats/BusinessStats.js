import React from 'react';
import { Container, CircularProgress } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCompanyProfile, updateCompanyProfile } from '../../service/api';
import { useToast } from '../../hooks/useToast';
import BusinessStatsForm from './components/BusinessStatsForm';

function BusinessStats() {
  const { showToast } = useToast();

  const { data, isLoading } = useQuery(['companyProfile', 1], () => getCompanyProfile(1));

  const { mutate } = useMutation((values) => updateCompanyProfile(1, values), {
    onSuccess: () => {
      showToast(`Business Stats updated`);
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container>
      <h1>Business Stats</h1>
      <BusinessStatsForm initialValues={data} onSubmit={mutate} />
    </Container>
  );
}

export default BusinessStats;
