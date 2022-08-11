import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, CircularProgress } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from '../../hooks/useToast';
import SellerForm from './components/SellerForm';
import { getSeller, updateSeller } from '../../service/api';

function SellerEdit() {
  const { id } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(['seller', id], () => getSeller(id));

  const { mutate } = useMutation((values) => updateSeller(id, values), {
    onSuccess: (data) => {
      showToast(`Seller ${data.username} updated`);
      navigate('/dashboard/sellers/');
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container>
      <h1>Add Seller</h1>
      <SellerForm initialValues={data} onSubmit={mutate} />
    </Container>
  );
}

export default SellerEdit;
