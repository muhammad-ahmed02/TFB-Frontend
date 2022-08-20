import { LoadingButton } from '@mui/lab';
import { Card, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import ProductSelect from './ProductSelect';
import { productStockSchema } from './productStockSchema';
import VendorSelect from './VendorSelect';

function ProductStockForm({
  initialValues = {
    product: '',
    vendor: '',
    purchasing_price: '',
    available_stock: '',
    imei_or_serial_number: [],
  },
  onSubmit,
  validationSchema,
}) {
  // useFormik
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: validationSchema ?? productStockSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <form className="entity-form" onSubmit={formik.handleSubmit}>
      <Card className="entity-form-card">
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
              <VendorSelect
                value={formik.values.vendor}
                onSelect={(e, { id }) => formik.setFieldValue('vendor', id)}
                error={!!formik.errors.vendor}
                helperText={formik.errors.vendor}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Purchase price"
                name="purchasing_price"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">RS</InputAdornment>,
                }}
                value={formik.values.purchasing_price}
                onChange={formik.handleChange}
                error={!!formik.errors.purchasing_price}
                helperText={formik.errors.purchasing_price}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Quantity"
                name="available_stock"
                type="number"
                value={formik.values.available_stock}
                onChange={formik.handleChange}
                error={!!formik.errors.available_stock}
                helperText={formik.errors.available_stock}
              />
            </Grid>
            {Array.from(Array(formik.values.available_stock), (e, i) => (
              <Grid item xs={12} md={6} key={i}>
                <TextField
                  label={`IMEI OR Serial Number ${i + 1}`}
                  name={`imei_or_serial_number[${i}]`}
                  type="text"
                  fullWidth
                  value={formik.values.imei_or_serial_number[i]}
                  onChange={formik.handleChange}
                  error={formik.errors.imei_or_serial_number}
                  helperText={formik.errors.imei_or_serial_number}
                />
              </Grid>
            ))}
          </Grid>

          <LoadingButton fullWidth={false} size="large" type="submit" variant="contained" loading={false}>
            Save Stock
          </LoadingButton>
        </Stack>
      </Card>
    </form>
  );
}

export default ProductStockForm;
