import * as Yup from 'yup';
import * as v from 'valibot';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email required'),
  password: Yup.string()
    .min(6, 'Pasword must be at least 6 characters')
    .required('Password required'),
});

export const signupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid Email').required('Email required'),
  password: Yup.string()
    .min(6, 'Pasword must be at least 6 characters')
    .required('Password required'),
  profile_img: Yup.mixed().required('Profile image is required'),
});

export const createNewLinkSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  longUrl: Yup.string()
    .url('Must be a valid URL')
    .required('Long URL is required'),
  customUrl: Yup.string(),
});

export const LoginSchema2 = v.object({
  // email: Yup.string().email('Invalid Email').required('Email required'),
  email: v.pipe(
    v.string(),
    v.nonEmpty('Please enter your email.'),
    v.email('Invalid email format.')
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty('Password required'),
    v.minLength(6, 'Pasword must be at least 6 characters')
  ),

  // password: Yup.string()
  //   .min(6, 'Pasword must be at least 6 characters')
  //   .required('Password required'),
});

export const SignupSchema2 = v.object({
  // name: Yup.string().required('Name is required'),
  // email: Yup.string().email('Invalid Email').required('Email required'),
  // password: Yup.string()
  //   .min(6, 'Pasword must be at least 6 characters')
  //   .required('Password required'),
  // profile_img: Yup.mixed().required('Profile image is required'),
  name: v.pipe(v.string(), v.nonEmpty('Name is required')),
  email: v.pipe(
    v.string(),
    v.nonEmpty('Please enter your email.'),
    v.email('Invalid email format.')
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty('Password required'),
    v.minLength(6, 'Pasword must be at least 6 characters')
  ),
  profile_img: v.nonOptional(v.optional(v.file()), 'Profile image is required'),
});

export const NewLinkSchema2 = v.object({
  // title: Yup.string().required('Title is required'),
  // longUrl: Yup.string()
  //   .url('Must be a valid URL')
  //   .required('Long URL is required'),
  // customUrl: Yup.string(),
  title: v.pipe(v.string(), v.nonEmpty('Title is required')),
  longUrl: v.pipe(
    v.string(),
    v.url('Must be a valid URL'),
    v.nonEmpty('Long URL is required')
  ),
  customUrl: v.optional(v.string()),
});

export type LoginSchemaType = v.InferOutput<typeof LoginSchema2>;
export type SignupSchemaType = v.InferOutput<typeof SignupSchema2>;
export type NewLinkSchemaType = v.InferOutput<typeof NewLinkSchema2>;
