import { LoadingButton } from '@mui/lab';
import { Card, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import ProductStockSelect from '../../../components/selects/ProductStockSelect';
import IMEISelect from '../../../components/selects/ImeiSelect';
import { claimSchema } from './claimSchema';

function ClaimForm({
  initialValues = {
    status: '',
    product_stock: '',
    imei_or_serial_number: '',
    reason: '',
  },
  onSubmit,
  validationSchema,
}) {
  // useFormik
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: validationSchema ?? claimSchema,
    onSubmit: (values) => onSubmit(values),
  });

  console.log(formik.errors);

  return (
    <form className="entity-form" onSubmit={formik.handleSubmit}>
      <Card className="entity-form-card">
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  labelId="status"
                  name="status"
                  id="status"
                  label="Status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  error={!!formik.errors.status}
                >
                  <MenuItem value={'PENDING'}>Pending</MenuItem>
                  <MenuItem value={'CLEARED'}>Cleared</MenuItem>
                </Select>
                {formik.errors.status && <FormHelperText error>{formik.errors.status}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <ProductStockSelect
                value={formik.values.product_stock}
                onSelect={(e, { id }) => formik.setFieldValue(`product_stock`, id)}
                error={formik.errors?.product_stock}
                helperText={formik.errors?.product_stock}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <IMEISelect
                productStockId={formik.values.product_stock}
                value={formik.values.imei_or_serial_number}
                name="imei_or_serial_number"
                onSelect={(e, { label }) => formik.setFieldValue(`imei_or_serial_number`, label)}
                error={formik.errors.imei_or_serial_number}
                helperText={formik.errors.imei_or_serial_number}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                label="Reason"
                name="reason"
                type="text"
                fullWidth
                value={formik.values.reason}
                onChange={(e) => formik.setFieldValue(`reason`, e.target.value)}
                error={!!formik.errors.reason}
                helperText={formik.errors.reason}
              />
            </Grid>

            <Grid item xs={12}>
              <LoadingButton fullWidth size="large" type="submit" variant="contained">
                Save Claim
              </LoadingButton>
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </form>
  );
}

export default ClaimForm;
