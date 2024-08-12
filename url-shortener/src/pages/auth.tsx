import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Login from '@/components/login';
import Signup from '@/components/signup';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '@/lib/apiHooks';

export default function AuthPage() {
  const [searchParams] = useSearchParams();

  const longLink = searchParams.get('createNew');
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`);
    }

    return () => { };
  }, [isLoading, isAuthenticated]);

  return (
    <div className="mt-20 flex flex-col items-center gap-10">
      <h2 className="text-5xl font-extrabold">
        {longLink ? (
          <span>Hold on. Let&apos;s log in first...</span>
        ) : (
          <span>Login / Signup</span>
        )}
      </h2>

      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
}
