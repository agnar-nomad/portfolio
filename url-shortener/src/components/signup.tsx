import { useState } from 'react';
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
import InputError from './input-error';
import { SignupSchema, SignupSchemaType } from '@/lib/schemas';
import { useSignupUser } from '@/hooks/api-hooks';
import * as v from 'valibot';
import LoaderIndicator from './loader-indicator';

type SignupSchema = typeof SignupSchema
type FormErrorKey = v.IssueDotPath<SignupSchema>

export default function Signup() {
  const [formData, setFormData] = useState<Partial<SignupSchemaType>>({
    email: '',
    password: '',
    name: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<FormErrorKey, string>>>({});

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
  } = useSignupUser()


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
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven&apos;t yet.
        </CardDescription>
        {signupError && <InputError message={signupError.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <Input
          name="name"
          type="text"
          placeholder="Enter name"
          onChange={handleInputChange}
        />
        {formErrors?.name && <InputError message={formErrors.name} />}
        <Input
          name="email"
          type="email"
          placeholder="Enter email"
          onChange={handleInputChange}
        />
        {formErrors?.email && <InputError message={formErrors.email} />}
        <Input
          name="password"
          type="password"
          placeholder="Enter password"
          onChange={handleInputChange}
        />
        {formErrors?.password && (
          <InputError message={formErrors.password} />
        )}
        <Input
          name="profile_img"
          type="file"
          accept="image/*"
          onChange={handleInputChange}
        />
        {formErrors?.profile_img && (
          <InputError message={formErrors.profile_img} />
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {signupLoading ? (
            <LoaderIndicator />
          ) : (
            'Create Account'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}