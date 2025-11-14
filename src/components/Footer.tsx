import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 bg-base">
      <div className="container-balanced py-10 grid gap-6 md:grid-cols-[minmax(0,1fr),auto] md:items-start md:gap-10">
        <div className="text-sm text-muted space-y-4">
          <div className="space-y-1">
            <div>Товарищество с ограниченной ответственностью «ProfiLevelUp»</div>
            <div>БИН 251140010905</div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Казахстан, Алматы</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
          <a
            href="https://www.tiktok.com/@profilevelup"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
            aria-label="TikTok"
          >
            <img src="/soc_seti/tiktok.svg" alt="" className="w-8 h-8" aria-hidden="true" />
          </a>
          <a
            href="https://www.instagram.com/profilevelup"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
            aria-label="Instagram"
          >
            <img src="/soc_seti/instagram.svg" alt="" className="w-8 h-8" aria-hidden="true" />
          </a>
          <a
            href="https://www.youtube.com/@profilevelup"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
            aria-label="YouTube"
          >
            <img src="/soc_seti/youtube.svg" alt="" className="w-8 h-8" aria-hidden="true" />
          </a>
          <a
            href="https://t.me/profilevelup"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
            aria-label="Telegram-канал"
          >
            <img src="/soc_seti/telegram.svg" alt="" className="w-8 h-8" aria-hidden="true" />
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


