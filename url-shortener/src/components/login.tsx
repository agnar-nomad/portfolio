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
import { LoginSchema, LoginSchemaType } from '@/lib/schemas';
import { useLoginUser } from '@/hooks/api-hooks';
import * as v from 'valibot';
import LoaderIndicator from './loader-indicator';

type LoginSchema = typeof LoginSchema
type FormErrorKey = v.IssueDotPath<LoginSchema>

export default function Login() {
  const [formData, setFormData] = useState<LoginSchemaType>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<FormErrorKey, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const {
    mutateAsync: loginMutationAsync,
    isPending: loginLoading,
    error: loginError,
  } = useLoginUser()

  const handleLogin = async () => {
    setFormErrors({});
    try {
      // validate form data
      v.parse(LoginSchema, formData)

      // api call
      await loginMutationAsync(formData)
    } catch (error) {
      if (v.isValiError<LoginSchema>(error)) {
        // specific error handling from Valibot
        const flatIssues = v.flatten<LoginSchema>(error.issues)
        const newErrors: Partial<Record<FormErrorKey, string>> = {};

        for (const key in flatIssues.nested) {
          newErrors[key as FormErrorKey] =
            flatIssues.nested[key as FormErrorKey]![0];
        }

        setFormErrors(newErrors);

      } else {
        console.error("Login Error", error)
        throw error
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Log in to your account if you already have one
        </CardDescription>
        {loginError && <InputError message={loginError.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
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
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>
          {loginLoading ? <LoaderIndicator /> : 'Login'}
        </Button>
      </CardFooter>
    </Card>
  );
}
