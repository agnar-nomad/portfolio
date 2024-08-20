import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { BeatLoader } from 'react-spinners';
import InputError from './input-error';
import { SignupSchema, SignupSchemaType } from '@/lib/schemas';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSignupUser } from '@/hooks/api-hooks';
import * as v from 'valibot';

type SignupSchema = typeof SignupSchema
type FormErrorKey = v.IssueDotPath<SignupSchema>

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<Partial<SignupSchemaType>>({
    email: '',
    password: '',
    name: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<FormErrorKey, string>>>({});

  const longLink = searchParams.get('createNew');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const {
    mutateAsync: signupMutationAsync,
    isPending: signupLoading,
    error: signupError,
    data: signupData,
  } = useSignupUser()

  useEffect(() => {
    if (signupError == null && signupData) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`);
    }
  }, [signupData, signupError, signupLoading]);

  const handleSignup = async () => {
    setFormErrors({});

    try {
      // validate form data
      v.parse(SignupSchema, formData)

      // api call
      await signupMutationAsync(formData as SignupSchemaType)
    } catch (error) {
      if (v.isValiError<SignupSchema>(error)) {
        // specific error handling from Valibot
        const flatIssues = v.flatten<SignupSchema>(error.issues)
        const newErrors: Partial<Record<FormErrorKey, string>> = {};

        for (const key in flatIssues.nested) {
          newErrors[key as FormErrorKey] =
            flatIssues.nested[key as FormErrorKey]![0];
        }

        setFormErrors(newErrors);

      } else {
        console.error("Signup Error", error)
        throw error
      }
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>
            Create a new account if you have&apos;nt yet.
          </CardDescription>
          {signupError && <InputError message={signupError.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              name="name"
              type="text"
              placeholder="Enter name"
              onChange={handleInputChange}
            />
            {formErrors?.name && <InputError message={formErrors.name} />}
          </div>
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={handleInputChange}
            />
            {formErrors?.email && <InputError message={formErrors.email} />}
          </div>
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleInputChange}
            />
            {formErrors?.password && (
              <InputError message={formErrors.password} />
            )}
          </div>
          <div className="space-y-1">
            <Input
              name="profile_img"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
            />
            {formErrors?.profile_img && (
              <InputError message={formErrors.profile_img} />
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignup}>
            {signupLoading ? (
              <BeatLoader size={10} color="#36d7b7" />
            ) : (
              'Create Account'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
