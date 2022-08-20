import { CircularProgress } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { getProductStock, updateProductStock } from '../../service/api';
import ProductStockForm from './components/ProductStockForm';

function ProductStockEdit() {
  const { id } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(['product-stock', id], () => getProductStock(id));

  const { mutate } = useMutation((values) => updateProductStock(id, values), {
    onSuccess: () => {
      showToast(`Stock updated`);
      navigate('/dashboard/product-stock/');
    },
    onError: (error) => {
      showToast(error.message);
    },
  });
  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <h1>Edit stock</h1>
      <ProductStockForm initialValues={data} onSubmit={mutate} />
    </>
  );
}

export default ProductStockEdit;
