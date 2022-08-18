import * as Yup from 'yup';

export const sellerSchema = Yup.object().shape({
  username: Yup.string().required('User name is required'),
  // convert empty string to 0
  profit: Yup.number().required('Profit is required'),
  seller_share: Yup.number()
    .min(0, "Seller Share can't be negative")
    .max(100, "Seller Share can't exceed 100")
    .required('Seller share is required'),
  business_share: Yup.number()
    .min(0, "Business Share can't be negative")
    .max(100, "Business Share can't exceed 100")
    .required('Business share is required'),
});
