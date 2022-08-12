import React from 'react';
import { Container, CircularProgress } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getSettings, updateSettings } from '../../service/api';
import { useToast } from '../../hooks/useToast';
import SettingForm from './components/SettingForm';

function Settings() {
  const { showToast } = useToast();

  const { data, isLoading } = useQuery(['settings', 1], () => getSettings(1));

  const { mutate } = useMutation((values) => updateSettings(1, values), {
    onSuccess: () => {
      showToast(`Settings updated`);
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container>
      <h1>Settings</h1>
      <SettingForm initialValues={data} onSubmit={mutate} />
    </Container>
  );
}

export default Settings;
