import { useState, useEffect} from 'react';
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
import { useNavigate, useSearchParams} from 'react-router-dom';
import { useSignupUser } from '@/hooks/api-hooks';
import * as v from 'valibot';

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<Partial<SignupSchemaType>>({
    email: '',
    password: '',
    name: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Omit<SignupSchemaType, "profile_img">> & { profile_img: string }>();

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
    setFormErrors(undefined);

    try {
      // validate form data
      v.parse(SignupSchema, formData)

      // api call
      await signupMutationAsync(formData as SignupSchemaType)
    } catch (error) {
      if (error instanceof v.ValiError && error.issues) {
        const flatIssues = v.flatten<typeof SignupSchema>(error?.issues)
        console.log("flatIssues", flatIssues);
        const newErrors = {};

        Object.entries(flatIssues.nested).forEach(([key, value]) => {
          newErrors[key] = value[0]
        })

        setFormErrors(newErrors);

      } else {
        console.error("Login Error", error?.message, error)
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
