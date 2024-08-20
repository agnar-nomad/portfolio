import { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/app-layout';
import LandingPage from './pages/landing';
import DashboardPage from './pages/dashboard';
import AuthPage from './pages/auth';
import LinkPage from './pages/link';
import RedirectLinkPage from './pages/redirect-link';
import { RouterProvider } from 'react-router-dom';
import RequireAuth from './components/require-auth';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    // errorElement: <ErrorPage />,
    // TODO add error boundary
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/dashboard',
        // protected route
        element: (
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        ),
      },
      {
        path: '/auth',
        element: <AuthPage />,
      },
      {
        path: '/link/:id',
        // protected route
        element: (
          <RequireAuth>
            <LinkPage />
          </RequireAuth>
        ),
      },
      {
        path: '/:id',
        element: <RedirectLinkPage />,
      },
    ],
  },
]);

export default function App() {

  const queryClient = useMemo(() => new QueryClient({}), [])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="bottom-right"
          toastOptions={{ className: "bg-background text-primary border" }}
          containerStyle={{ bottom: 50, right: 50, }} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
