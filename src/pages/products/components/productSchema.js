import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});
