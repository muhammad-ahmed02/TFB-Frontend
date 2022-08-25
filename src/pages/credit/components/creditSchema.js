import * as Yup from 'yup';

export const creditSchema = Yup.object().shape({
  payment_status: Yup.string().nullable,
  items: Yup.array().of(Yup.object().shape({
    price: Yup.number().required("Price is required"),
    product: Yup.number().required("Product is required"),
    imei_or_serial_number: Yup.string().required("IMEI is required"),
  })),
});
