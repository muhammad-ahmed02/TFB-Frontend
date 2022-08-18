import * as Yup from 'yup';

export const businessStatsSchema = Yup.object().shape({
  owner_name: Yup.string().required('Owner name is required'),
  owner_balance: Yup.number().required('Owner balance is required'),
  business_balance: Yup.number().required('Business Balance is required'),
});
