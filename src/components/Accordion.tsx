import { useState } from 'react';

type Item = { q: string; a: string };
type Props = { items: Item[] };

export default function Accordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-black/10 rounded-xl border border-black/10 bg-card">
      {items.map((it, i) => (
        <div key={i}>
          <button
            className="w-full text-left px-5 py-4 flex items-center justify-between"
            onClick={() => setOpen((o) => (o === i ? null : i))}
          >
            <span className="font-medium">{it.q}</span>
            <span className={`ml-4 transition ${open === i ? 'rotate-180' : ''}`}>⌄</span>
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-muted">
              {it.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


