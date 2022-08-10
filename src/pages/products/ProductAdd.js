import { Container } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { createProduct } from '../../service/api';
import ProductForm from './components/ProductForm';

function ProductAdd() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { mutate } = useMutation((values) => createProduct(values), {
    onSuccess: (data) => {
      showToast(`Product ${data.name} added`);
      navigate('/dashboard/products/');
    },
    onError: (error) => {
      showToast(error.message);
    },
  });
  return (
    <Container>
      <h1>Add product</h1>
      <ProductForm onSubmit={mutate} />
    </Container>
  );
}

export default ProductAdd;