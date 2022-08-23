import React from 'react';
import { Container } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { createVendor } from '../../service/api';
import VendorForm from './components/VendorForm';

function VendorAdd() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { mutate } = useMutation((values) => createVendor(values), {
    onSuccess: (data) => {
      showToast(`${data.name} added`);
      navigate('/dashboard/vendors/');
    },
    onError: (error) => {
      showToast(error.message);
    },
  });
  return (
    <Container>
      <h1>Add Vendor</h1>
      <VendorForm onSubmit={mutate} />
    </Container>
  );
}

export default VendorAdd;
