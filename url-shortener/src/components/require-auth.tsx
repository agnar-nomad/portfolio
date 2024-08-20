import { ReactNode, useEffect } from 'react';
import { BarLoader } from 'react-spinners';
import { useUser } from '@/hooks/api-hooks';
import { useUtilHelpers } from '@/hooks/helper-hooks';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { navigate } = useUtilHelpers();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && isLoading === false) navigate('/auth');
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <BarLoader width={'100%'} color="#36d7b7" />;

  if (isAuthenticated) return children;
}
