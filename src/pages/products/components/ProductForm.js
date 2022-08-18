import { LoadingButton } from '@mui/lab';
import { Card, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { productSchema } from './productSchema';

function ProductForm({
  initialValues = {
    name: '',
    purchasing_price: '',
    available_stock: '',
    imei_or_serial_number: [],
    image: null,
  },
  onSubmit,
  validationSchema,
}) {
  // useFormik
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: validationSchema ?? productSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <form className="entity-form" onSubmit={formik.handleSubmit}>
      <Card className="entity-form-card">
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={!!formik.errors.name}
                helperText={formik.errors.name}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Available quantity"
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
            Save Product
          </LoadingButton>
        </Stack>
      </Card>
    </form>
  );
}

export default ProductForm;
