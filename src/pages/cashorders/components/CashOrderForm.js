import { LoadingButton } from '@mui/lab';
import { Autocomplete, Card, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { CashOrderSchema } from './CashOrderSchema';

function CashOrderForm({
  initialValues = {
    customer_name: '',
    product: '',
    sale_by: '',
    sale_price: '',
    warranty: '',
  },
  onSubmit,
  validationSchema,
  products,
}) {
  const productOptions = products.map((product) => {
    const newPropsObj = {
      ...product,
      label: product.name,
    };

    return Object.assign(product, newPropsObj);
  });

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
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Grid container rowSpacing={2}>
              <Grid item xs={6} md={4}>
                <TextField
                  label="Customer name"
                  name="customer_name"
                  variant="outlined"
                  value={formik.values.customer_name}
                  onChange={formik.handleChange}
                  error={!!formik.errors.name}
                  helperText={formik.errors.customer_name}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <Autocomplete
                  disablePortal
                  id="products"
                  options={productOptions}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Products" />}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
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
              <Grid item xs={6} md={4}>
                <TextField
                  label="Warranty"
                  name="warranty"
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Days</InputAdornment>,
                  }}
                  value={formik.values.warranty}
                  onChange={formik.handleChange}
                  error={formik.errors.warranty}
                  helperText={formik.errors.warranty}
                />
              </Grid>
            </Grid>
          </Stack>

          <LoadingButton fullWidth={false} size="large" type="submit" variant="contained" loading={false}>
            Save Cash Order
          </LoadingButton>
        </Stack>
      </Card>
    </form>
  );
}

export default CashOrderForm;
