import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 bg-base">
      <div className="container-balanced py-10 grid gap-6 md:grid-cols-[minmax(0,1fr),auto] md:items-start md:gap-10">
        <div className="text-sm text-muted space-y-4">
          <div className="space-y-1">
            <div>Товарищество с ограниченной ответственностью «ProfiLevelUp»</div>
            <div>📍 Казахстан, Алматы</div>
            <div>БИН 251140010905</div>
          </div>
          <div className="flex flex-wrap gap-3">
          <a
            href="https://www.tiktok.com/@profilevelup"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
            aria-label="TikTok"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
              <path d="M14.9 3a4.3 4.3 0 0 0 .1 1.1 4.3 4.3 0 0 0 3 3 4.3 4.3 0 0 0 1 .1v2.9a7.3 7.3 0 0 1-3.3-.9v5c0 3-2.4 5.4-5.4 5.4S5 17.2 5 14.2 7.4 8.8 10.4 8.8c.3 0 .6 0 .9.1v3a2.3 2.3 0 1 0 0 4.5 2.3 2.3 0 0 0 2.3-2.3V3h1.3z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/profilevelup"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
              <path
                d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="17.3" cy="6.7" r="1" fill="currentColor" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@profilevelup"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
            aria-label="YouTube"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
              <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10.5 15.1V8.9l4.7 3.1-4.7 3.1Z" />
            </svg>
          </a>
          <a
            href="https://t.me/profilevelup"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
            aria-label="Telegram-канал"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
              <path d="M21 3 3 10.4c-.9.4-.9 1 0 1.3l4 1.3 1.6 5.1c.2.5.4.5.8.2l2.3-2 4.1 3.1c.4.3.9.1 1-.4L22 4c.2-.8-.2-1.2-1-.9Zm-11 11 7.3-4.9c.3-.2.6 0 .3.2l-6.3 5.7c-.1.1-.3.4-.2.7l.3 1.5c.1.3-.1.4-.3.1l-1.2-2.6c-.1-.4 0-.5.1-.7Z" />
            </svg>
          </a>
        </div>
        </div>
        <nav className="grid gap-3 text-sm text-muted md:text-right">
          <Link className="hover:underline" to="/privacy">Политика конфиденциальности</Link>
          <Link className="hover:underline" to="/terms">Пользовательское соглашение</Link>
        </nav>
        <div className="text-center text-sm text-muted pt-4 border-t border-black/5 md:col-span-2">
          © 2025 «ProfiLevelUp». Все права защищены.
        </div>
      </div>
    </footer>
  );
}


