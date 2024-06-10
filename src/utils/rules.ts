import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
type Rules = {
  [key in
    | 'email'
    | 'password'
    | 'date_of_birth'
    | 'user_name'
    | 'phone_number']?: RegisterOptions
}
export const getRulesLogin = (getValues?: UseFormGetValues<any>): Rules => {
  return {
    email: {
      required: 'This field is required',
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: 'Invalid email'
      }
    },
    password: {
      required: 'This field is required',
      minLength: {
        value: 6,
        message: 'Password must be at least 6 characters'
      }
    },
    date_of_birth: {
      required: 'This field is required',
      validate: (value) => {
        const date = new Date(value)
        const now = new Date()
        if (date > now) {
          return 'Date of birth must be less than current date'
        }
        return true
      }
    },
    user_name: {
      required: 'This field is required'
    },
    phone_number: {
      required: 'This field is required',
      pattern: {
        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        message: 'Invalid phone number'
      }
    }
  }
}

export const LoginSchemaYup = yup.object().shape({
  email: yup.string().email('Invalid email').required('This field is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('This field is required')
})

export type LoginSchema = yup.InferType<typeof LoginSchemaYup>

export const CreateEventOperatorSchemaYup = yup.object().shape({
  user_name: yup.string().required('This field is required'),
  email: yup.string().email('Invalid email').required('This field is required'),
  phone_number: yup
    .string()
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Invalid phone number')
    .required('This field is required'),
  date_of_birth: yup
    .date()
    .required('This field is required')
    .max(new Date(), 'Date of birth must be less than current date')
})

export type CreateEventOperatorSchema = yup.InferType<
  typeof CreateEventOperatorSchemaYup
>

export const RegisterEventSchemaYup = yup.object().shape({
  full_name: yup.string().required('This field is required'),
  phone_number: yup
    .string()
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Invalid phone number')
    .required('This field is required'),
  mssv: yup
    .string()
    .matches(/[A-Z]{2}\d{6}/, 'Invalid MSSV')
    .required('This field is required')
})
export type RegisterEventSchema = yup.InferType<typeof RegisterEventSchemaYup>
