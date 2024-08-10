import * as Yup from 'yup';

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
