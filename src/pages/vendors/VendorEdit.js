import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import { useToast } from '../../hooks/useToast';
import { getVendor, updateVendor } from '../../service/api';
import VendorForm from './components/VendorForm';

function VendorEdit() {
  const { id } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(['vendor', id], () => getVendor(id));

  const { mutate } = useMutation((values) => updateVendor(id, values), {
    onSuccess: (data) => {
      showToast(`Vendor ${data.name} updated`);
      navigate('/dashboard/vendors/');
    },
    onError: (error) => {
      showToast(error.message);
    },
  });
  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <h1>Edit vendor</h1>
      <VendorForm initialValues={data} onSubmit={mutate} />
    </>
  );
}

export default VendorEdit;
