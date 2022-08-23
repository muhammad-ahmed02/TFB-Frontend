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
  // Adjusting initial values to match the form schema
  initialValues.vendor = typeof initialValues.vendor === 'object' ? initialValues.vendor.id : initialValues.vendor;
  // useFormik
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: validationSchema ?? productStockSchema,
    onSubmit: (values) => onSubmit(values),
  });

  console.log('formik', formik);

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
                onChange={(e) => {
                  // eslint-disable-next-line
                  formik.setFieldValue('available_stock', parseInt(e.target.value));
                  formik.setFieldValue(
                    'imei_or_serial_number',
                    [...formik.values.imei_or_serial_number, ''].slice(0, e.target.value)
                  );
                }}
                error={!!formik.errors.available_stock}
                helperText={formik.errors.available_stock}
              />
            </Grid>
            {formik.values.imei_or_serial_number.map((imei_or_serial_number, index) => (
              <Grid item xs={12} md={6} key={index}>
                <TextField
                  label={`IMEI OR Serial Number ${index + 1}`}
                  name={`imei_or_serial_number[${index}]`}
                  type="text"
                  fullWidth
                  value={imei_or_serial_number}
                  onChange={(e) => formik.setFieldValue(`imei_or_serial_number[${index}]`, e.target.value)}
                  error={formik.errors.imei_or_serial_number && formik.errors.imei_or_serial_number[index]}
                  helperText={formik.errors.imei_or_serial_number && formik.errors.imei_or_serial_number[index]}
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
