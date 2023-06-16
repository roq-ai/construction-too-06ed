import * as yup from 'yup';

export const reservationValidationSchema = yup.object().shape({
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  price: yup.number().integer().required(),
  customer_id: yup.string().nullable().required(),
  tool_id: yup.string().nullable().required(),
  promotion_id: yup.string().nullable(),
});
