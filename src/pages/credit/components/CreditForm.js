import { LoadingButton } from '@mui/lab';
import { Card, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { FieldArray, useFormik } from 'formik';
import React from 'react';
import IMEISelect from '../../../components/selects/ImeiSelect';
import ProductSelect from '../../../components/selects/ProductSelect';
import { creditSchema } from './creditSchema';

function CreditForm({
  initialValues = {
    payment_status: '',
    items: [
      {
        price: 0,
        product: '',
        imei_or_serial_number: '',
      },
    ],
  },
  onSubmit,
  validationSchema,
}) {
  // useFormik
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: validationSchema ?? creditSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <form className="entity-form" onSubmit={formik.handleSubmit}>
      <Card className="entity-form-card">
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="payment_status">Payment Status</InputLabel>
                <Select
                  labelId="payment_status"
                  name="payment_status"
                  id="payment_status"
                  label="Payment Status"
                  value={formik.values.payment_status}
                  onChange={formik.handleChange}
                  error={!!formik.errors.payment_status}
                  helperText={formik.errors.payment_status}
                >
                  <MenuItem value={'PENDING'}>Pending</MenuItem>
                  <MenuItem value={'CLEARED'}>Cleared</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={0} md={8} />

            <Grid item xs={12} md={12}>
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <Grid container>
                    {formik.values.items.map((item, index) => (
                      <Grid key={index} container spacing={3}>
                        {/** both these conventions do the same */}
                        <Grid item xs={12} md={3}>
                          <TextField
                            fullWidth
                            label="Purchase price"
                            name={`items[${index}].price`}
                            type="number"
                            InputProps={{
                              startAdornment: <InputAdornment position="start">RS</InputAdornment>,
                            }}
                            value={item.price}
                            onChange={formik.handleChange}
                            // error={!!formik.errors.purchasing_price}
                            // helperText={formik.errors.purchasing_price}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <ProductSelect
                            value={item.product}
                            name={`items[${index}].product`}
                            onSelect={(e, { id }) => formik.setFieldValue(`items[${index}].product`, id)}
                            // error={!!formik.errors.vendor}
                            // helperText={formik.errors.vendor}
                          />
                        </Grid>
                        {console.log(item)}
                        <Grid item xs={12} md={3}>
                          <IMEISelect
                            product={item.product_name !== '' ? item.product_name : item.product}
                            value={item.imei_or_serial_number}
                            name={`items[${index}].imei_or_serial_number`}
                            onSelect={(e, { label }) =>
                              formik.setFieldValue(`items[${index}].imei_or_serial_number`, label)
                            }
                            // error={!!formik.errors.imei_number}
                            // helperText={formik.errors.imei_number}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <LoadingButton
                            fullWidth
                            type="button"
                            size="large"
                            variant="contained"
                            loading={false}
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            REMOVE
                          </LoadingButton>
                        </Grid>
                      </Grid>
                    ))}
                    <Grid item xs={12} md={2}>
                      <LoadingButton
                        fullWidth={false}
                        size="large"
                        type="button"
                        variant="contained"
                        loading={false}
                        onClick={() => formik.values.items.push({ price: 0, product: '', imei_or_serial_number: '' })}
                      >
                        ADD
                      </LoadingButton>
                    </Grid>
                  </Grid>
                )}
              />
            </Grid>
          </Grid>

          <LoadingButton fullWidth={false} size="large" type="submit" variant="contained" loading={false}>
            Save Credit
          </LoadingButton>
        </Stack>
      </Card>
    </form>
  );
}

export default CreditForm;
