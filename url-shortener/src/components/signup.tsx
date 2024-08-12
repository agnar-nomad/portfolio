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
import useFetch from '@/hooks/use-fetch';
import { signup } from '@/db/api-auth';
import { useEffect } from 'react';
import { signupSchema } from '@/lib/schemas';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    profile_img: null,
  });
  const [formErrors, setFormErrors] = useState([]);

  const longLink = searchParams.get('createNew');

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const {
    data: signupData,
    error: signupError,
    loading: signupLoading,
    fn: signupFunc,
  } = useFetch(signup, formData);

  useEffect(() => {
    if (signupError == null && signupData) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`);
      // fetchUser();
    }
  }, [signupData, signupError, signupLoading]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setFormErrors([]);

    try {
      // validate form data with yup
      await signupSchema.validate(formData, { abortEarly: false });

      // api call
      await signupFunc();
    } catch (error) {
      const newErrors = {};

      // from yup
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setFormErrors(newErrors);
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
            {formErrors.name && <InputError message={formErrors.name} />}
          </div>
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={handleInputChange}
            />
            {formErrors.email && <InputError message={formErrors.email} />}
          </div>
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleInputChange}
            />
            {formErrors.password && (
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
            {formErrors.profile_img && (
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
