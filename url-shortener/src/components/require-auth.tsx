import { ReactNode, useEffect } from 'react';
import { useUser } from '@/hooks/api-hooks';
import { useUtilHelpers } from '@/hooks/helper-hooks';
import ProgressIndicator from './progress-indicator';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { navigate } = useUtilHelpers();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && isLoading === false) navigate('/auth');
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <ProgressIndicator />;

  if (isAuthenticated) return children;
}
