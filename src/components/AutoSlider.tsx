import { useEffect, useRef, useState } from 'react';

type Slide = { name: string; text: string };
type Props = { slides: Slide[] };

export default function AutoSlider({ slides }: Props) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<number | null>(null);
  const touch = useRef<{x:number| null}>({ x: null });

  useEffect(() => {
    timer.current && window.clearInterval(timer.current);
    timer.current = window.setInterval(() => setIdx((i) => (i + 1) % slides.length), 3500);
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [slides.length]);

  const onPrev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);
  const onNext = () => setIdx((i) => (i + 1) % slides.length);

  return (
    <div className="relative overflow-hidden rounded-xl border border-black/10 bg-card"
         onTouchStart={(e) => { touch.current.x = e.touches[0].clientX; }}
         onTouchEnd={(e) => {
           const start = touch.current.x; if (start == null) return; const end = e.changedTouches[0].clientX; const dx = end - start;
           if (Math.abs(dx) > 40) { dx < 0 ? onNext() : onPrev(); }
           touch.current.x = null;
         }}>
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {slides.map((s, i) => (
          <div key={i} className="min-w-full p-6">
            <div className="text-sm text-muted">{s.name}</div>
            <p className="mt-2 leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button className="m-2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-ink" onClick={onPrev} aria-label="prev">‹</button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button className="m-2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-ink" onClick={onNext} aria-label="next">›</button>
      </div>
    </div>
  );
}


