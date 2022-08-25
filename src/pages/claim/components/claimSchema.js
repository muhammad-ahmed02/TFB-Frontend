import * as Yup from 'yup';

export const claimSchema = Yup.object().shape({
  product: Yup.number().required("Product is required"),
  vendor: Yup.number().required('Vendor is required'),
  imei_number: Yup.string().required('IMEI number is required'),
  reason: Yup.string().required('Reason is required'),
});
