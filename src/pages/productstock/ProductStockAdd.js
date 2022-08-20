import { Container } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { createProductStock } from '../../service/api';
import ProductStockForm from './components/ProductStockForm';

function ProductStockAdd() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { mutate } = useMutation((values) => createProductStock(values), {
    onSuccess: () => {
      showToast(`Stock added`);
      navigate('/dashboard/product-stock/');
    },
    onError: (error) => {
      showToast(error.message);
    },
  });
  return (
    <Container>
      <h1>Add Stock</h1>
      <ProductStockForm onSubmit={mutate} />
    </Container>
  );
}

export default ProductStockAdd;
