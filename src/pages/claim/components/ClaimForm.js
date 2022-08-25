import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import VendorSelect from '../../../components/selects/VendorSelect';
import IMEISelect from '../../../components/selects/ImeiSelect';
import ProductSelect from '../../../components/selects/ProductSelect';
import { claimSchema } from './claimSchema';

function ClaimForm({
  initialValues = {
    product: 0,
    vendor: 0,
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
    onSubmit: (values) => console.log(values),
  });

  return (
    <form className="entity-form" onSubmit={formik.handleSubmit}>
      <Card className="entity-form-card">
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <ProductSelect
                value={formik.values.product}
                name="product"
                onSelect={(e, { id }) => formik.setFieldValue(`product`, id)}
                error={!!formik.errors.product}
                helperText={formik.errors.product}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <VendorSelect
                value={formik.values.vendor}
                name="vendor"
                onSelect={(e, { id }) => formik.setFieldValue(`vendor`, id)}
                error={!!formik.errors.vendor}
                helperText={formik.errors.vendor}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <IMEISelect
                value={formik.values.imei_or_serial_number}
                name="imei_or_serial_number"
                onSelect={(e, { label }) => formik.setFieldValue(`imei_or_serial_number`, label)}
                error={!!formik.errors.imei_or_serial_number}
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
                onChange={formik.handleChange}
                error={!!formik.errors.reason}
                helperText={formik.errors.reason}
              />
            </Grid>

            <Grid item xs={12}>
              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={false}>
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
