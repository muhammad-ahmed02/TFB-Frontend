import React from 'react';
import { useFormik } from 'formik';
import { Card, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { businessStatsSchema } from './businessStatsSchema';

function BusinessStatsForm({
  initialValues = {
    owner_name: '',
    owner_balance: 0,
    business_balance: 0,
  },
  onSubmit,
  validationSchema,
}) {
  // useFormik
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: validationSchema ?? businessStatsSchema,
    onSubmit: (values) => onSubmit(values),
  });
  return (
    <form className="entity-form" onSubmit={formik.handleSubmit}>
      <Card className="entity-form-card">
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Owner Name"
                name="owner_name"
                type="text"
                value={formik.values.owner_name}
                onChange={formik.handleChange}
                error={formik.errors.owner_name}
                helperText={formik.errors.owner_name}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Owner Balance"
                name="owner_balance"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">RS.</InputAdornment>,
                }}
                value={formik.values.owner_balance}
                onChange={formik.handleChange}
                error={formik.errors.owner_balance}
                helperText={formik.errors.owner_balance}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Business Balance"
                name="business_balance"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">RS.</InputAdornment>,
                }}
                value={formik.values.business_balance}
                onChange={formik.handleChange}
                error={formik.errors.business_balance}
                helperText={formik.errors.business_balance}
              />
            </Grid>
          </Grid>
          <LoadingButton fullWidth={false} size="large" type="submit" variant="contained">
              Save Stats
            </LoadingButton>
        </Stack>
      </Card>
    </form>
  );
}

export default BusinessStatsForm;
