import * as Yup from 'yup';

export const vendorSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});
