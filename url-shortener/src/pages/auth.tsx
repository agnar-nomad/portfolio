import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Login from '@/components/login';
import Signup from '@/components/signup';
import { useEffect } from 'react';
import { useUser } from '@/hooks/api-hooks';
import { useUtilHelpers } from '@/hooks/helper-hooks';

export default function AuthPage() {

  const { isLoading, isAuthenticated } = useUser();
  const { createNewUrlSearchParam, navigate } = useUtilHelpers()

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate(`/dashboard?${createNewUrlSearchParam ? `createNew=${createNewUrlSearchParam}` : ''}`);
    }

  }, [isLoading, isAuthenticated, navigate, createNewUrlSearchParam]);

  return (
    <div className="mt-20 flex flex-col items-center gap-10">
      <h2 className="text-5xl font-extrabold">
        {createNewUrlSearchParam ? (
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
