import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AppLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <main className="flex-1 pt-20">{/* отступ под фиксированный header */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


