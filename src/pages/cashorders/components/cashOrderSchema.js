import * as Yup from 'yup';

export const cashOrderSchema = Yup.object().shape({
  customer_name: Yup.string().nullable(),
  sale_by: Yup.number().required('Sale by is required'),
  warranty: Yup.number().min(0, "Warranty can't be negative").nullable(),
  items: Yup.array().of(
    Yup.object().shape({
      product_stock: Yup.number().required('Product stock is required'),
      imei_or_serial_number: Yup.string().required('IMEI or serial number is required'),
      price: Yup.number().required('Price is required'),
    })
  ),
});
