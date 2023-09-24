import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { cashOrderSchema } from './cashOrderSchema';
import ProductStockSelect from '../../../components/selects/ProductStockSelect';
import IMEISelect from '../../../components/selects/ImeiSelect';
import SellerSelect from './SellerSelect';
import Iconify from '../../../components/Iconify';
import { checkValidIMEI } from '../../../service/api';
import { useToast } from '../../../hooks/useToast';

function CashOrderForm({
  initialValues = {
    customer_name: '',
    sale_by: '',
    warranty: 0,
    items: [
      {
        product_stock: '',
        imei_or_serial_number: '',
        price: 0,
      },
    ],
  },
  onSubmit,
  validationSchema,
  update = false,
}) {
  console.log(update);
  // useFormik
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: validationSchema ?? cashOrderSchema,
    onSubmit: (values) => onSubmit(values),
  });

  const [validImei, setValidImei] = useState(false);
  const { showToast } = useToast();

  const checkImei = (imei) => {
    checkValidIMEI(imei).then((res) => {
      if (res === 'True') {
        setValidImei(true);
      } else {
        setValidImei(false);
        showToast('IMEI already used, please select another IMEI');
      }
    });
  };

  return (
    <form className="entity-form" onSubmit={formik.handleSubmit}>
      <Card className="entity-form-card">
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Customer name"
                name="customer_name"
                variant="outlined"
                value={formik.values.customer_name}
                onChange={formik.handleChange}
                error={!!formik.errors.name}
                helperText={formik.errors.customer_name}
                disabled={update}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <SellerSelect
                value={formik.values.sale_by}
                onSelect={(e, { id }) => formik.setFieldValue('sale_by', id)}
                error={!!formik.errors.sale_by}
                helperText={formik.errors.sale_by}
                disabled={update}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Warranty"
                name="warranty"
                type="number"
                fullWidth
                InputProps={{
                  endAdornment: <InputAdornment position="start">Days</InputAdornment>,
                }}
                value={formik.values.warranty}
                onChange={formik.handleChange}
                error={formik.errors.warranty}
                helperText={formik.errors.warranty}
                disabled={update}
              />
            </Grid>
          </Grid>
        </Stack>

        <br />
        {!update && (
          <LoadingButton
            size="large"
            type="button"
            variant="contained"
            color="primary"
            disabled={update}
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
        )}
        
        {formik.values.items.map(({ product_stock, imei_or_serial_number, price }, index) => (
          <Stack spacing={3} key={index} className="mt-1">
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <ProductStockSelect
                  value={product_stock}
                  onSelect={(e, { id }) => formik.setFieldValue(`items[${index}].product_stock`, id)}
                  error={formik.errors?.items && formik.errors?.items[index].product_stock}
                  helperText={formik.errors?.items && formik.errors?.items[index].product_stock}
                  onlyAvailble={false}
                  disabled={update}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <IMEISelect
                  productStockId={product_stock}
                  value={imei_or_serial_number}
                  onSelect={(e, { id }) => {
                    checkImei(id);
                    formik.setFieldValue(`items[${index}].imei_or_serial_number`, id);
                  }}
                  error={formik.errors?.items && formik.errors.items[index].imei_or_serial_number}
                  helperText={formik.errors?.items && formik.errors.items[index].imei_or_serial_number}
                  disabled={update}
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
                  onChange={(e) => formik.setFieldValue(`items[${index}].price`, parseInt(e.target.value, 10))}
                  error={formik.errors?.items && formik.errors?.items[index].price}
                  helperText={formik.errors?.items && formik.errors?.items[index].price}
                  disabled={update}
                />
              </Grid>
              <Grid item xs={12} md={1.5}>
                <LoadingButton
                  fullWidth
                  size="large"
                  type="button"
                  color="error"
                  variant="contained"
                  onClick={() =>
                    formik.setFieldValue(
                      `items`,
                      formik.values.items.filter((_, i) => i !== index)
                    )
                  }
                  disabled={update}
                >
                  <Iconify icon="eva:trash-fill" />
                </LoadingButton>
              </Grid>
            </Grid>
          </Stack>
        ))}
        {!update && (
          <Card className="mt-3">
            <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={!validImei}>
              Save Cash Order
            </LoadingButton>
          </Card>
        )}
      </Card>
    </form>
  );
}

export default CashOrderForm;
