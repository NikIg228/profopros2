import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AppLayout() {
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


