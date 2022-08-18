import { LoadingButton } from '@mui/lab';
import { Card, CircularProgress, FormHelperText, InputAdornment, Stack, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React from 'react';
import { getSettings } from '../../../service/api';
import { sellerSchema } from './sellerSchema';

function SellerForm({
  initialValues = {
    username: '',
    profit: 0,
    seller_share: 0,
    business_share: 0,
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
  const { data, isLoading } = useQuery(['settings', 1], () => getSettings(1));

  return (
    <form className="entity-form" onSubmit={formik.handleSubmit}>
      <Card className="entity-form-card">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Stack spacing={3}>
            <Stack
              spacing={4}
              justifyContent="space-evenly"
              alignItems="center"
              direction={{ xs: 'column', sm: 'row' }}
            >
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
                value={formik.values.profit === 0 ? '' : formik.values.profit}
                onChange={formik.handleChange}
                error={!!formik.errors.profit}
                helperText={formik.errors.profit}
              />

              <TextField
                fullWidth
                label="Seller Share"
                name="seller_share"
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                value={formik.values.seller_share}
                onChange={formik.handleChange}
                error={!!formik.errors.seller_share}
                helperText={formik.errors.seller_share}
              />

              <TextField
                fullWidth
                label="Business Share"
                name="business_share"
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                value={formik.values.business_share}
                onChange={formik.handleChange}
                error={!!formik.errors.business_share}
                helperText={formik.errors.business_share}
              />
            </Stack>
            {data.owner_share +
              formik.values.business_share +
              formik.values.seller_share +
              data.expense_share ===
            100 ? (
              <LoadingButton fullWidth={false} size="large" type="submit" variant="contained">
                Save Seller
              </LoadingButton>
            ) : (
              <FormHelperText error>
                <b>Note:</b> Owner share: {data.owner_share}%, expense share: {data.expense_share}%. Make 100 with the sum of all shares.
              </FormHelperText>
            )}
          </Stack>
        )}
      </Card>
    </form>
  );
}

export default SellerForm;
