import * as Yup from 'yup';

export const CashOrderSchema = Yup.object().shape({
  customer_name: Yup.string().nullable(),
  product: Yup.number().required('Product is required'),
  sale_by: Yup.number().required('Sale by is required'),
  sale_price: Yup.number().required('Sale price is required'),
  warranty: Yup.number().nullable(),
});