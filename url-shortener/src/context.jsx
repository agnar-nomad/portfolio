import { createContext, useEffect } from 'react';
import useFetch from './hooks/use-fetch';
import { getCurrentUser } from './db/api-auth';
import { useContext } from 'react';

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const {
    data: user,
    loading,
    error,
    fn: fetchUser,
  } = useFetch(getCurrentUser);

  const isAuthenticated = user?.role === 'authenticated';

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;