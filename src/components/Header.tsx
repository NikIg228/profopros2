import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-primary text-white' : 'text-ink hover:bg-secondary/40'
    }`;

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-base/80 backdrop-blur border-b border-black/5">
      <div className="container-balanced h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary/90 shadow-soft border border-secondary/50" />
          <span className="text-lg font-heading text-heading font-semibold">ProfiTest</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navLinkClass}>Главная</NavLink>
          <NavLink to="/reviews" className={navLinkClass}>Отзывы</NavLink>
          <NavLink to="/about" className={navLinkClass}>О нас</NavLink>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl hover:bg-secondary/40 text-ink"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/5 bg-base">
          <div className="container-balanced py-2 grid gap-2">
            <NavLink to="/" onClick={() => setOpen(false)} className={navLinkClass}>Главная</NavLink>
            <NavLink to="/reviews" onClick={() => setOpen(false)} className={navLinkClass}>Отзывы</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)} className={navLinkClass}>О нас</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}


