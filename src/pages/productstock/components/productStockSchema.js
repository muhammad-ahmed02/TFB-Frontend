import * as Yup from 'yup';

export const productStockSchema = Yup.object().shape({
  product: Yup.number().required('Product is required'),
  vendor: Yup.number().required('Vendor is required'),
  purchasing_price: Yup.number().required('Purchase price is required'),
  available_stock: Yup.number().required('Available stock is required'),
  imei_or_serial_number: Yup.array().nullable(),
});
