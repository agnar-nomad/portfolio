import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/app-layout';
import LandingPage from './pages/landing';
import DashboardPage from './pages/dashboard';
import AuthPage from './pages/auth';
import LinkPage from './pages/link';
import RedirectLinkPage from './pages/redirect-link';
import { RouterProvider } from 'react-router-dom';
import UrlProvider from './context';
import RequireAuth from './components/require-auth';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
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
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}
