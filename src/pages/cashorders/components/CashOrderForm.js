import { LoadingButton } from '@mui/lab';
import { Card, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { cashOrderSchema } from './cashOrderSchema';
import IMEISelect from './ImeiSelect';
import ProductSelect from './ProductSelect';
import SellerSelect from './SellerSelect';

function CashOrderForm({
  initialValues = {
    customer_name: '',
    product_stock: '',
    sale_by: '',
    sale_price: '',
    warranty: 0,
    imei_or_serial_number: '',
    quantity: 1,
  },
  onSubmit,
  validationSchema,
}) {
  // useFormik
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: validationSchema ?? cashOrderSchema,
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
                label="Customer name"
                name="customer_name"
                variant="outlined"
                value={formik.values.customer_name}
                onChange={formik.handleChange}
                error={!!formik.errors.name}
                helperText={formik.errors.customer_name}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <SellerSelect
                value={formik.values.sale_by}
                onSelect={(e, { id }) => formik.setFieldValue('sale_by', id)}
                error={!!formik.errors.sale_by}
                helperText={formik.errors.sale_by}
              />
            </Grid>

            {/* <Grid item xs={12} md={3}>
              <TextField
                label="Sale price"
                name="sale_price"
                type="number"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">RS</InputAdornment>,
                }}
                value={formik.values.sale_price}
                onChange={formik.handleChange}
                error={formik.errors.sale_price}
                helperText={formik.errors.sale_price}
              />
            </Grid> */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Warranty"
                name="warranty"
                type="number"
                fullWidth
                InputProps={{
                  endAdornment: <InputAdornment position="start">Days</InputAdornment>,
                }}
                value={formik.values.warranty}
                onChange={formik.handleChange}
                error={formik.errors.warranty}
                helperText={formik.errors.warranty}
              />
            </Grid>
          </Grid>
        </Stack>
      </Card>

      <Card className="entity-form-card mt-1">
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <ProductSelect
                value={formik.values.product}
                onSelect={(e, { id }) => formik.setFieldValue('product', id)}
                error={!!formik.errors.product}
                helperText={formik.errors.product}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <IMEISelect
                product={formik.values.product !== '' && formik.values.product}
                value={formik.values.imei_number}
                onSelect={(e, { label }) => formik.setFieldValue('imei_or_serial_number', label)}
                error={!!formik.errors.imei_number}
                helperText={formik.errors.imei_number}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Price"
                name="price"
                type="number"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">PKR</InputAdornment>,
                }}
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.errors.price}
                helperText={formik.errors.price}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <LoadingButton fullWidth size="large" type="button" variant="contained" loading={false}>
                Add Product
              </LoadingButton>
            </Grid>
          </Grid>
        </Stack>
      </Card>
      <Card className="mt-3">
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={false}>
          Save Cash Order
        </LoadingButton>
      </Card>
    </form>
  );
}

export default CashOrderForm;
