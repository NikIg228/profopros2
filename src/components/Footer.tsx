import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 bg-base">
      <div className="container-balanced py-10 grid gap-6 sm:flex sm:items-center sm:justify-between">
        <div className="text-sm text-muted">
          © 2025 ProfiTest. Все права защищены.
        </div>
        <nav className="grid gap-2 sm:grid-cols-3 sm:gap-4 text-sm">
          <Link className="hover:underline" to="/privacy">Политика конфиденциальности</Link>
          <Link className="hover:underline" to="/terms">Пользовательское соглашение</Link>
          <Link className="hover:underline" to="/contacts">Контакты</Link>
        </nav>
      </div>
    </footer>
  );
}


