import * as Yup from 'yup';

export const creditSchema = Yup.object().shape({
  payment_status: Yup.string().required('Payment Status is required'),
  items: Yup.array().of(
    Yup.object().shape({
      product_stock: Yup.number().required('Product is required'),
      imei_or_serial_number: Yup.string().required('IMEI is required'),
      price: Yup.number().required('Price is required'),
    })
  ),
});
