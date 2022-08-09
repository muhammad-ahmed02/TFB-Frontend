import { CircularProgress } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { getProduct, updateProduct } from '../../service/api';
import ProductForm from './components/ProductForm';

function ProductEdit() {
  const { id } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(['product', id], () => getProduct(id));

  const { mutate } = useMutation((values) => updateProduct(id, values), {
    onSuccess: (data) => {
      showToast(`Product ${data.name} updated`);
      navigate('/dashboard/products/');
    },
    onError: (error) => {
      showToast(error.message);
    },
  });
  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <h1>Edit product</h1>
      <ProductForm initialValues={data} onSubmit={mutate} />
    </>
  );
}

export default ProductEdit;
