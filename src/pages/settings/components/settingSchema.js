import * as Yup from 'yup';

export const settingSchema = Yup.object().shape({
  owner_share: Yup.number()
    .min(0, "Owner Share can't be negative")
    .max(100, "Owner Share can't exceed 100")
    .required('Owner Share is required'),
  business_share: Yup.number()
    .min(0, "Bussiness Share can't be negative")
    .max(100, "Bussiness Share can't exceed 100")
    .required('Bussiness Share is required'),
  seller_share: Yup.number()
    .min(0, "Seller Share can't be negative")
    .max(100, "Seller Share can't exceed 100")
    .required('Seller Share is required'),
  expense_share: Yup.number()
    .min(0, "Expense Share can't be negative")
    .max(100, "Expense Share can't exceed 100")
    .required('Expense Share is required'),
});
