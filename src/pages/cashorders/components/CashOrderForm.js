import { LoadingButton } from '@mui/lab';
import { Card, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { CashOrderSchema } from './cashOrderSchema';
import ProductSelect from './ProductSelect';
import SellerSelect from './SellerSelect';

function CashOrderForm({
  initialValues = {
    customer_name: '',
    product: '',
    sale_by: '',
    sale_price: '',
    warranty: 0,
  },
  onSubmit,
  validationSchema,
}) {
  // useFormik
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: validationSchema ?? CashOrderSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <form className="entity-form" onSubmit={formik.handleSubmit}>
      <Card className="entity-form-card">
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Customer name"
                name="customer_name"
                variant="outlined"
                value={formik.values.customer_name}
                onChange={formik.handleChange}
                error={!!formik.errors.name}
                helperText={formik.errors.customer_name}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <ProductSelect
                value={formik.values.product}
                onSelect={(e, { id }) => formik.setFieldValue('product', id)}
                error={!!formik.errors.product}
                helperText={formik.errors.product}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <SellerSelect
                value={formik.values.sale_by}
                onSelect={(e, { id }) => formik.setFieldValue('sale_by', id)}
                error={!!formik.errors.sale_by}
                helperText={formik.errors.sale_by}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Sale price"
                name="sale_price"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">RS</InputAdornment>,
                }}
                value={formik.values.sale_price}
                onChange={formik.handleChange}
                error={formik.errors.sale_price}
                helperText={formik.errors.sale_price}
              />
            </Grid>
          </Grid>

          <TextField
            label="Warranty"
            name="warranty"
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">Days</InputAdornment>,
            }}
            value={formik.values.warranty === 0 ? '' : formik.values.warranty}
            onChange={formik.handleChange}
            error={formik.errors.warranty}
            helperText={formik.errors.warranty}
          />

          <LoadingButton fullWidth={false} size="large" type="submit" variant="contained" loading={false}>
            Save Cash Order
          </LoadingButton>
        </Stack>
      </Card>
    </form>
  );
}

export default CashOrderForm;
