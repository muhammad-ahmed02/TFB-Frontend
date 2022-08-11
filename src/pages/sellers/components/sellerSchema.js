import * as Yup from 'yup';

export const sellerSchema = Yup.object().shape({
  username: Yup.string().required('User name is required'),
  // convert empty string to 0
  profit: Yup.number().required('Profit is required'),
});
