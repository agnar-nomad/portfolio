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
import { BeatLoader } from 'react-spinners';
import InputError from './input-error';
import { useEffect } from 'react';
import { LoginSchema, LoginSchemaType } from '@/lib/schemas';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useLoginUser } from '@/hooks/api-hooks';
import * as v from 'valibot';

type LoginSchema = typeof LoginSchema
type FormErrorKey = v.IssueDotPath<LoginSchema>

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<LoginSchemaType>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<FormErrorKey, string>>>({});

  const longLink = searchParams.get('createNew');

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
    data: loginData,
  } = useLoginUser()

  useEffect(() => {
    if (loginError == null && loginData) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`);
    }
  }, [loginData, loginError]);

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
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Log in to your account if you already have one
          </CardDescription>
          {loginError && <InputError message={loginError.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
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
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin}>
            {loginLoading ? <BeatLoader size={10} color="#36d7b7" /> : 'Login'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
