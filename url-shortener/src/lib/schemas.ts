import * as v from 'valibot';

export const LoginSchema = v.object({
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
});

export const SignupSchema = v.object({
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

export const NewLinkSchema = v.object({
  title: v.pipe(v.string(), v.nonEmpty('Title is required')),
  longUrl: v.pipe(
    v.string(),
    v.url('Must be a valid URL'),
    v.nonEmpty('Long URL is required')
  ),
  customUrl: v.optional(v.string()),
});

export type LoginSchemaType = v.InferOutput<typeof LoginSchema>;
export type SignupSchemaType = v.InferOutput<typeof SignupSchema>;
export type NewLinkSchemaType = v.InferOutput<typeof NewLinkSchema>;
