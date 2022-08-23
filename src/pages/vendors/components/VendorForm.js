import React from 'react';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { vendorSchema } from './vendorSchema';

function VendorForm({
  initialValues = {
    name: '',
  },
  onSubmit,
  validationSchema,
}) {
  // useFormik
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: validationSchema ?? vendorSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <form className="entity-form" onSubmit={formik.handleSubmit}>
      <Card className="entity-form-card">
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <LoadingButton fullWidth size="large" type="submit" variant="contained">
                Save Vendor
              </LoadingButton>
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </form>
  );
}

export default VendorForm;
