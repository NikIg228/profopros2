import { useEffect, useRef, useState } from 'react';

type Option = { value: string; label: string };
type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  options: Option[];
  error?: boolean;
};

export default function Select({ value, onChange, placeholder = 'Выберите', options, error = false }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const selected = options.find(o => o.value === value)?.label || '';

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        className={`w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-left text-ink flex items-center justify-between transition shadow-sm focus:outline-none focus:ring-1 focus:ring-primary/40 ${error ? 'border-red-500' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={error}
      >
        <span className={selected ? '' : 'text-muted'}>{selected || placeholder}</span>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute z-10 mt-1 left-0 right-0 rounded-xl border border-black/10 bg-white shadow-soft overflow-hidden"
        >
          {options.map((o) => (
            <button
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`w-full text-left px-4 py-2 transition ${o.value === value ? 'bg-primary/10 text-ink' : 'hover:bg-black/5'}`}
              onClick={() => { onChange(o.value); setOpen(false); }}
              type="button"
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


