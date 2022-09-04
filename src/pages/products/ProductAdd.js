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
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    alert('tesing');
  });
  const { mutate } = useMutation((values) => createProduct(values), {
    onSuccess: (data) => {
      showToast(`${data.name} added`);
      navigate('/dashboard/products/');
    },
    onError: (error) => {
      showToast(error.message);
    },
  });
  return (
    <Container>
      <h1>Add Product</h1>
      <ProductForm onSubmit={mutate} />
    </Container>
  );
}

export default ProductAdd;
