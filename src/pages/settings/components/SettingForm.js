import React from 'react';
import { useFormik } from 'formik';
import { Card, FormHelperText, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { settingSchema } from './settingSchema';

function SettingForm({
  initialValues = {
    seller_share: 0,
    owner_share: 0,
    business_share: 0,
    expense_share: 0,
  },
  onSubmit,
  validationSchema,
}) {
  // useFormik
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: validationSchema ?? settingSchema,
    onSubmit: (values) => onSubmit(values),
  });
  return (
    <form className="entity-form" onSubmit={formik.handleSubmit}>
      <Card className="entity-form-card">
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Owner Share"
                name="owner_share"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                value={formik.values.owner_share === 0 ? '' : formik.values.owner_share}
                onChange={formik.handleChange}
                error={formik.errors.owner_share}
                helperText={formik.errors.owner_share}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Business Share"
                name="business_share"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                value={formik.values.business_share === 0 ? '' : formik.values.business_share}
                onChange={formik.handleChange}
                error={formik.errors.business_share}
                helperText={formik.errors.business_share}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Seller Share"
                name="seller_share"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                value={formik.values.seller_share === 0 ? '' : formik.values.seller_share}
                onChange={formik.handleChange}
                error={formik.errors.seller_share}
                helperText={formik.errors.seller_share}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Expense Share"
                name="expense_share"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                value={formik.values.expense_share === 0 ? '' : formik.values.expense_share}
                onChange={formik.handleChange}
                error={formik.errors.expense_share}
                helperText={formik.errors.expense_share}
              />
            </Grid>
          </Grid>
          {formik.values.owner_share +
            formik.values.business_share +
            formik.values.seller_share +
            formik.values.expense_share ===
          100 ? (
            <LoadingButton fullWidth={false} size="large" type="submit" variant="contained">
              Save Settings
            </LoadingButton>
          ) : (
            <FormHelperText error>
              <b>Note:</b> The sum of all should be equal to 100.
            </FormHelperText>
          )}
        </Stack>
      </Card>
    </form>
  );
}

export default SettingForm;
