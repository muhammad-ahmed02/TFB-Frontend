import * as Yup from 'yup';

export const cashOrderSchema = Yup.object().shape({
  customer_name: Yup.string().nullable(),
  product_stock: Yup.number().required('Product is required'),
  sale_by: Yup.number().required('Sale by is required'),
  imei_number: Yup.string().required('IMEI number is required'),
  sale_price: Yup.number().required('Sale price is required'),
  warranty: Yup.number().min(0, "Warranty can't be negative").nullable(),
  quantity: Yup.number().min(1, "Quantity can't be less than 1").nullable(),
});
