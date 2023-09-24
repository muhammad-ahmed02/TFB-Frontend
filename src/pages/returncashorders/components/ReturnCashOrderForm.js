import { LoadingButton } from '@mui/lab';
import { Card, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import CashOrderSelect from './CashOrderSelect';
import { returnCashOrderSchema } from './returnCashOrderSchema';

function ReturnCashOrderForm({
  initialValues = {
    reason: '',
    return_amount: 0,
    cash_order: '',
    reason_description: '',
  },
  onSubmit,
  validationSchema,
}) {
  // useFormik
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: validationSchema ?? returnCashOrderSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <form className="entity-form" onSubmit={formik.handleSubmit}>
      <Card className="entity-form-card">
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <CashOrderSelect
                value={formik.values.cash_order}
                onSelect={(e, { id }) => formik.setFieldValue('cash_order', id)}
                error={!!formik.errors.cash_order}
                helperText={formik.errors.cash_order}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="reason">Reason</InputLabel>
                <Select
                  labelId="reason"
                  id="reason"
                  value={formik.values.reason}
                  name="reason"
                  label="Reason"
                  onChange={formik.handleChange}
                >
                  <MenuItem value={'NOT_INTERESTED'}>Not Interested</MenuItem>
                  <MenuItem value={'ISSUE'}>Issue</MenuItem>
                  <MenuItem value={'CUSTOM'}>Custom</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Return Amount"
                name="return_amount"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
                }}
                value={formik.values.return_amount}
                onChange={formik.handleChange}
                error={formik.errors.return_amount}
                helperText={formik.errors.return_amount}
                disabled={formik.values.reason !== 'CUSTOM'}
                fullWidth
              />
            </Grid>
            {formik.values.reason === 'CUSTOM' && (
              <Grid item xs={12} md={12}>
                <TextField
                  label="Reason Description"
                  name="reason_description"
                  type="text"
                  value={formik.values.reason_description}
                  onChange={formik.handleChange}
                  error={formik.errors.reason_description}
                  helperText={formik.errors.reason_description}
                  disabled={formik.values.reason !== 'CUSTOM'}
                  fullWidth
                />
              </Grid>
            )}
          </Grid>

          <LoadingButton fullWidth={false} size="large" type="submit" variant="contained" loading={false}>
            Save Return Cash Order
          </LoadingButton>
        </Stack>
      </Card>
    </form>
  );
}

export default ReturnCashOrderForm;
