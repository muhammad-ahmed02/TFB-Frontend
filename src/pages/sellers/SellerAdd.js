import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../../hooks/useToast';
import SellerForm from './components/SellerForm';
import { createSeller } from '../../service/api';

function SellerAdd() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { mutate } = useMutation((values) => createSeller(values), {
    onSuccess: (data) => {
      showToast(`Seller ${data.username} added`);
      navigate('/dashboard/sellers/');
    },
    onError: (error) => {
      showToast(error.message);
    },
  });
  return (
    <Container>
      <h1>Add Seller</h1>
      <SellerForm onSubmit={mutate} />
    </Container>
  );
}

export default SellerAdd;
