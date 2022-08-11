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
    imei_or_serial_number: '',
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
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {/* <div className="form-img-continer">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const fileReader = new FileReader();
                  fileReader.onload = () => {
                    if (typeof fileReader.result === 'string') {
                      formik.setFieldValue('image', fileReader.result);
                    }
                  };
                  fileReader.readAsDataURL(e.target.files[0]);
                }}
              />
              <Box
                className="form-img"
                component="img"
                alt="Product image"
                src={
                  formik.values?.image && formik.values?.image !== ''
                    ? formik.values?.image
                    : 'https://source.unsplash.com/random/300x300'
                }
                onClick={() => {
                  const fileInput = document.getElementById('image');
                  fileInput.click();
                }}
              />
              <p>Uplod Image</p>
            </div> */}
            <Grid container rowSpacing={2}>
              <Grid item xs={6} md={4}>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={!!formik.errors.name}
                  helperText={formik.errors.name}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
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
              <Grid item xs={6} md={4}>
                <TextField
                  label="Available quantity"
                  name="available_stock"
                  type="number"
                  value={formik.values.available_stock}
                  onChange={formik.handleChange}
                  error={!!formik.errors.available_stock}
                  helperText={formik.errors.available_stock}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="IMEI OR Serial Number"
                  name="imei_or_serial_number"
                  type="number"
                  fullWidth
                  value={formik.values.imei_or_serial_number}
                  onChange={formik.handleChange}
                  error={formik.errors.imei_or_serial_number}
                  helperText={formik.errors.imei_or_serial_number}
                />
              </Grid>
            </Grid>
          </Stack>

          <LoadingButton fullWidth={false} size="large" type="submit" variant="contained" loading={false}>
            Add Product
          </LoadingButton>
        </Stack>
      </Card>
    </form>
  );
}

export default ProductForm;
