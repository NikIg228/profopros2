type Option = { value: string; label: string };
type Props = {
  question: string;
  options: Option[];
  value?: string;
  onChange: (val: string) => void;
};

export default function QuestionCard({ question, options, value, onChange }: Props) {
  return (
    <div className="card p-6 animate-fadeInUp">
      <h3 className="text-lg font-semibold mb-4">{question}</h3>
      <div className="grid gap-3">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            className={`w-full text-left px-4 py-3 rounded-xl border transition shadow-soft hover:shadow-hover ${
              value === o.value ? 'border-primary bg-primary/5' : 'border-secondary/60 bg-card'
            }`}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}


