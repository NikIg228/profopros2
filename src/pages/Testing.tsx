import { useEffect, useMemo, useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';

type Q = { id: string; text: string; options: { value: string; label: string }[] };

const FREE_QUESTIONS: Q[] = [
  { id: 'q1', text: 'Что приносит вам больше удовольствия?', options: [
    { value: 'people', label: 'Помогать людям и общаться' },
    { value: 'tech', label: 'Разбираться в технологиях' },
    { value: 'create', label: 'Создавать что-то новое' },
  ]},
  { id: 'q2', text: 'Какой формат задач вам ближе?', options: [
    { value: 'structured', label: 'Чёткие инструкции и правила' },
    { value: 'mixed', label: 'Смешанный формат' },
    { value: 'open', label: 'Творческие и открытые задачи' },
  ]},
  { id: 'q3', text: 'Какая среда вам комфортнее?', options: [
    { value: 'team', label: 'Командная работа' },
    { value: 'solo', label: 'Индивидуальная работа' },
    { value: 'flex', label: 'Гибридный формат' },
  ]},
  { id: 'q4', text: 'Как относитесь к анализу данных?', options: [
    { value: 'love', label: 'Нравится' },
    { value: 'neutral', label: 'Нейтрально' },
    { value: 'avoid', label: 'Избегаю' },
  ]},
  { id: 'q5', text: 'Что вас мотивирует?', options: [
    { value: 'impact', label: 'Польза и влияние' },
    { value: 'growth', label: 'Развитие и новые навыки' },
    { value: 'stability', label: 'Стабильность' },
  ]},
];

export default function TestingPage() {
  const user = useMemo(() => {
    const raw = sessionStorage.getItem('profi.user');
    return raw ? JSON.parse(raw) as { plan: 'free'|'pro' } : { plan: 'free' as const };
  }, []);

  const total = user.plan === 'pro' ? 12 : FREE_QUESTIONS.length; // укороченный pro для макета
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const currentQuestion = FREE_QUESTIONS[step - 1];

  useEffect(() => {
    if (step > total) setDone(true);
  }, [step, total]);

  const onSelect = (val: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }));
  };

  if (done) {
    const summary = Object.values(answers);
    const votes = {
      people: summary.filter(v => v === 'people').length,
      tech: summary.filter(v => v === 'tech' || v === 'structured' || v === 'love').length,
      create: summary.filter(v => v === 'create' || v === 'open').length,
    };
    const top = Object.entries(votes).sort((a,b) => b[1]-a[1])[0]?.[0] ?? 'mixed';
    const brief = top === 'people' ? 'Коммуникации и сервис' : top === 'tech' ? 'Технологии и аналитика' : 'Креативные индустрии';

    return (
      <section className="container-balanced mt-10">
        <div className="card p-6">
          <h1 className="text-2xl font-semibold">Результат</h1>
          <p className="mt-2 text-muted">Возможное направление: <span className="font-medium text-ink">{brief}</span></p>
          {user.plan === 'free' ? (
            <div className="mt-6 grid gap-3">
              <p className="text-muted">Это краткий результат на основе упрощённого теста.</p>
              <p className="text-muted">Хотите получить полный отчёт с персональными рекомендациями?</p>
              <a href="/" className="btn btn-primary w-fit px-5 py-3">Перейти к расширенной версии</a>
            </div>
          ) : (
            <div className="mt-6 grid gap-3">
              <p className="text-muted">Мы отправим вам полный отчёт на email, указанный при старте теста.</p>
              <button className="btn btn-primary w-fit px-5 py-3">Получить полный отчёт</button>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="container-balanced mt-10">
      <h1 className="text-2xl font-semibold">Пройди тест и узнай, какая профессия тебе подходит</h1>
      <div className="mt-6">
        <ProgressBar current={step} total={total} />
      </div>
      {currentQuestion && (
        <div className="mt-6">
          <QuestionCard
            question={currentQuestion.text}
            options={currentQuestion.options}
            value={answers[currentQuestion.id]}
            onChange={onSelect}
          />
        </div>
      )}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          className="btn px-5 py-3 w-full"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
        >Назад</button>
        <button
          className="btn btn-primary px-5 py-3 w-full"
          onClick={() => setStep((s) => s + 1)}
          disabled={!currentQuestion || !answers[currentQuestion.id]}
        >Далее</button>
      </div>
    </section>
  );
}


