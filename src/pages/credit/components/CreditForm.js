import { LoadingButton } from '@mui/lab';
import {
  Card,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import ProductStockSelect from '../../../components/selects/ProductStockSelect';
import Iconify from '../../../components/Iconify';
import IMEISelect from '../../../components/selects/ImeiSelect';
import { creditSchema } from './creditSchema';

function CreditForm({
  initialValues = {
    payment_status: '',
    items: [
      {
        product_stock: '',
        imei_or_serial_number: '',
        price: '',
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

  console.log(formik.values);

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
                >
                  <MenuItem value={'PENDING'}>Pending</MenuItem>
                  <MenuItem value={'CLEARED'}>Cleared</MenuItem>
                </Select>
                {formik.errors.payment_status && <FormHelperText error>{formik.errors.payment_status}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>
        </Stack>

        <br />
        <LoadingButton
          size="large"
          type="button"
          variant="contained"
          color="primary"
          onClick={() =>
            formik.setFieldValue('items', [
              ...formik.values.items,
              {
                product_stock: '',
                imei_or_serial_number: '',
                price: 0,
              },
            ])
          }
        >
          <Iconify icon="eva:plus-circle-fill" />
          &nbsp; Add item
        </LoadingButton>

        {formik.values.items.map(({ product_stock, imei_or_serial_number, price }, index) => (
          // <Card key={index} className="mt-1">
          <Stack spacing={3} key={index} className="mt-1">
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <ProductStockSelect
                  value={product_stock}
                  onlyAvailble={initialValues.items[index].product_stock === ''}
                  onSelect={(e, { id }) => formik.setFieldValue(`items[${index}].product_stock`, id)}
                  error={formik.errors?.items && formik.errors?.items[index].product_stock}
                  helperText={formik.errors?.items && formik.errors?.items[index].product_stock}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <IMEISelect
                  productStockId={product_stock}
                  value={imei_or_serial_number}
                  onSelect={(e, { id }) => formik.setFieldValue(`items[${index}].imei_or_serial_number`, id)}
                  error={formik.errors?.items && formik.errors.items[index].imei_or_serial_number}
                  helperText={formik.errors?.items && formik.errors.items[index].imei_or_serial_number}
                />
              </Grid>
              <Grid item xs={12} md={2.5}>
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">PKR</InputAdornment>,
                  }}
                  value={price}
                  // eslint-disable-next-line
                  onChange={(e) => formik.setFieldValue(`items[${index}].price`, parseInt(e.target.value))}
                  error={formik.errors?.items && formik.errors?.items[index].price}
                  helperText={formik.errors?.items && formik.errors?.items[index].price}
                />
              </Grid>
              <Grid item xs={12} md={1.5}>
                <LoadingButton
                  fullWidth
                  size="large"
                  type="button"
                  variant="contained"
                  onClick={() =>
                    formik.setFieldValue(
                      `items`,
                      formik.values.items.filter((_, i) => i !== index)
                    )
                  }
                >
                  <Iconify icon="eva:trash-fill" />
                </LoadingButton>
              </Grid>
            </Grid>
          </Stack>
          // </Card>
        ))}

        <Card className="mt-3">
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={false}>
            Save Credit
          </LoadingButton>
        </Card>
      </Card>
    </form>
  );
}

export default CreditForm;
