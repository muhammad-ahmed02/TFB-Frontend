import * as Yup from 'yup';

export const returnCashOrderSchema = Yup.object().shape({
  reason: Yup.string().required('Reason is required'),
  cash_order: Yup.number().required('Cash Order is required'),
  return_amount: Yup.number().nullable(),
});
