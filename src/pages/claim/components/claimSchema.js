import * as Yup from 'yup';

export const claimSchema = Yup.object().shape({
  product_stock: Yup.number().required('Product Stock is required'),
  imei_or_serial_number: Yup.string().required('IMEI number is required'),
  reason: Yup.string().required('Reason is required'),
});
