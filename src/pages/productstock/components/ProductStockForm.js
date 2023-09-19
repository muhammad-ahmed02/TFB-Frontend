import { LoadingButton } from '@mui/lab';
import { Card, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import Iconify from '../../../components/Iconify';
import ProductSelect from '../../../components/selects/ProductSelect';
import VendorSelect from '../../../components/selects/VendorSelect';
import { productStockSchema } from './productStockSchema';

function ProductStockForm({
  initialValues = {
    product: '',
    vendor: '',
    purchasing_price: '',
    available_stock: '',
    imei_or_serial_number: [''],
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

  useEffect(() => {
    formik.setFieldValue('available_stock', formik.values.imei_or_serial_number.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.imei_or_serial_number.length]);

  return (
    <form className="entity-form" onSubmit={formik.handleSubmit}>
      <Card className="entity-form-card">
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <ProductSelect
                value={formik.values.product}
                onSelect={(e, { id }) => formik.setFieldValue('product', id)}
                error={!!formik.errors.product}
                helperText={formik.errors.product}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <VendorSelect
                value={formik.values.vendor}
                onSelect={(e, { id }) => formik.setFieldValue('vendor', id)}
                error={!!formik.errors.vendor}
                helperText={formik.errors.vendor}
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
          </Grid>
        </Stack>
        <br />
        <LoadingButton
          size="large"
          type="button"
          variant="contained"
          color="primary"
          onClick={() => formik.setFieldValue('imei_or_serial_number', [...formik.values.imei_or_serial_number, ''])}
        >
          <Iconify icon="eva:plus-circle-fill" />
          &nbsp; Add IMEI
        </LoadingButton>
        <Stack spacing={3} className="mt-1">
          {formik.values.imei_or_serial_number.map((imei_or_serial_number, index) => (
            <Stack direction="row" spacing={3} justifyContent="space-between" key={index}>
              <TextField
                fullWidth
                label={`IMEI OR Serial Number ${index + 1}`}
                name={`imei_or_serial_number[${index}]`}
                type="text"
                value={imei_or_serial_number}
                onChange={(e) => formik.setFieldValue(`imei_or_serial_number[${index}]`, e.target.value)}
                error={formik.errors?.imei_or_serial_number && formik.errors?.imei_or_serial_number[index]}
                helperText={formik.errors?.imei_or_serial_number && formik.errors?.imei_or_serial_number[index]}
              />
              <LoadingButton
                size="large"
                type="button"
                variant="contained"
                color="error"
                onClick={() =>
                  formik.setFieldValue(
                    `imei_or_serial_number`,
                    formik.values.imei_or_serial_number.filter((_, i) => i !== index)
                  )
                }
              >
                <Iconify icon="eva:trash-fill" />
              </LoadingButton>
            </Stack>
          ))}
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={false}>
            Save Stock
          </LoadingButton>
        </Stack>
      </Card>
    </form>
  );
}

export default ProductStockForm;
