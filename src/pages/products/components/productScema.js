import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  purchasing_price: Yup.number().required('Purchase price is required'),
  available_stock: Yup.number().required('Available stock is required'),
  imei_or_serial_number: Yup.string().nullable(),
  image: Yup.string().nullable(),
});
