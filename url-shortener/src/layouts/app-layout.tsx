import Header from '@/components/header';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="container">
      <header>
        <Header />
      </header>
      <main className="min-h-screen">
        {/* Body */}
        <Outlet />
      </main>

      <footer className="p-10 text-center bg-gray-800 mt-10">
        Made with LOVE by Author
      </footer>
    </div>
  );
}
