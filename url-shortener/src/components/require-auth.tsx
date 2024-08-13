
import { useNavigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { BarLoader } from 'react-spinners';
import { useUser } from '@/hooks/api-hooks';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && isLoading === false) navigate('/auth');
  }, [isAuthenticated, isLoading]);

  if (isLoading) return <BarLoader width={'100%'} color="#36d7b7" />;

  if (isAuthenticated) return children;
}
