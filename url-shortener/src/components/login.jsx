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
import { login } from '@/db/api-auth';
import { useEffect } from 'react';
import { loginSchema } from '@/lib/schemas';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { UrlState } from '@/context';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState([]);

  const longLink = searchParams.get('createNew');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const {
    data: loginData,
    error: loginError,
    loading: loginLoading,
    fn: loginFunc,
  } = useFetch(login, formData);

  const { fetchUser } = UrlState();

  useEffect(() => {
    if (loginError == null && loginData) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`);
      fetchUser();
    }
  }, [loginData, loginError]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormErrors([]);

    try {
      // validate form data with yup
      await loginSchema.validate(formData, { abortEarly: false });

      // api call
      await loginFunc();
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
