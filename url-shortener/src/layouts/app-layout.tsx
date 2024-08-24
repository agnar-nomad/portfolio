import Header from '@/components/header';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="container">
      <header>
        <Header />
      </header>
      <main className="min-h-screen mb-16">
        {/* Body */}
        <Outlet />
      </main>
    </div>
  );
}
