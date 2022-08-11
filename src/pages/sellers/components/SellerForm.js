import { LoadingButton } from '@mui/lab';
import { Card, InputAdornment, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { sellerSchema } from './sellerSchema';

function SellerForm({
  initialValues = {
    username: '',
    profit: 0,
  },
  onSubmit,
  validationSchema,
}) {
  // useFormik
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: validationSchema ?? sellerSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <form className="entity-form" onSubmit={formik.handleSubmit}>
      <Card className="entity-form-card">
        <Stack spacing={4} justifyContent="space-evenly" alignItems="center" direction={{ xs: 'column', sm: 'row' }}>
          <TextField
            fullWidth
            label="Seller Name"
            name="username"
            variant="outlined"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={!!formik.errors.username}
            helperText={formik.errors.username}
          />
          <TextField
            fullWidth
            label="Profit"
            name="profit"
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">RS</InputAdornment>,
            }}
            value={formik.values.profit}
            onChange={formik.handleChange}
            error={!!formik.errors.profit}
            helperText={formik.errors.profit}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained">
            Add Seller
          </LoadingButton>
        </Stack>
      </Card>
    </form>
  );
}

export default SellerForm;
