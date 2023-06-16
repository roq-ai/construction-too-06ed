import * as yup from 'yup';

export const promotionValidationSchema = yup.object().shape({
  name: yup.string().required(),
  discount_percentage: yup.number().integer().required(),
  start_date: yup.date().required(),
  end_date: yup.date().required(),
});
