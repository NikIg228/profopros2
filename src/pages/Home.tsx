import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import AutoSlider from '../components/AutoSlider';
import Select from '../components/Select';

type FormErrorKey = 'name' | 'age' | 'gender' | 'testType' | 'email' | 'consent';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [plan, setPlan] = useState<'free'|'pro'|null>(null);
  const [form, setForm] = useState({ name: '', age: '', gender: '', testType: '', email: '', consent: false });
  const [errors, setErrors] = useState<Partial<Record<FormErrorKey, string>>>({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const navigate = useNavigate();

  const trimmedEmail = form.email.trim();
  const isFormComplete = Boolean(
    form.name.trim() &&
    form.age.trim() &&
    form.gender &&
    form.testType &&
    trimmedEmail &&
    form.consent
  );

  const clearError = (field: FormErrorKey) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const openFor = (p: 'free'|'pro') => { setPlan(p); setModalOpen(true); };
  const startTest = () => {
    const emailValue = form.email.trim();
    const newErrors: Partial<Record<FormErrorKey, string>> = {};

    if (!form.name.trim()) newErrors.name = 'Укажите имя';
    if (!form.age.trim()) newErrors.age = 'Укажите возраст';
    if (!form.gender) newErrors.gender = 'Выберите пол';
    if (!form.testType) newErrors.testType = 'Выберите вид теста';
    if (!emailValue) {
      newErrors.email = 'Укажите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      newErrors.email = 'Введите корректный email';
    }
    if (!form.consent) newErrors.consent = 'Необходимо подтвердить согласие';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    sessionStorage.setItem('profi.user', JSON.stringify({ ...form, email: emailValue, plan }));
    navigate('/test');
  };

  return (
    <div>
      {/* Hero */}
      <section className="container-balanced mt-10 sm:mt-16">
        <div className="grid lg:grid-cols-2 items-center gap-8">
          <div className="fade-section">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Твоя профессия - твой путь.
              <span className="block">Выбери его осознанно</span>
            </h1>
            <p className="mt-4 text-muted text-lg">
             Авторский тест, созданный на основе мировых методик: RIASEC (Холланд) и MBTI
            </p>
            <div className="mt-6 flex gap-3 flex-col sm:flex-row">
              <button className="btn btn-primary px-5 py-3 w-full sm:w-auto" onClick={() => openFor('free')}>Начать тестирование</button>
              <a href="#formats" className="btn btn-ghost px-5 py-3 w-full sm:w-auto">Подробнее</a>
            </div>
          </div>
          <div className="lg:hidden fade-section">
            <div className="rounded-2xl overflow-hidden bg-base aspect-[4/3] mb-6 sm:mb-0">
              <img src="/maainpic.jpg" alt="Иллюстрация профориентации" className="w-full h-full object-contain scale-[1.15]" loading="lazy" />
            </div>
          </div>
          <div className="hidden lg:block fade-section">
            <div className="rounded-2xl overflow-hidden bg-base aspect-[4/3]">
              <img src="/maainpic.jpg" alt="Иллюстрация профориентации" className="w-full h-full object-contain scale-[1.15]" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section id="formats" className="container-balanced mt-14 lg:mt-20">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="card p-5 md:p-6 hover:shadow-hover transition">
            <h3 className="text-xl font-semibold">Бесплатный тест</h3>
            <p className="mt-2 text-muted">10–15 вопросов, базовые рекомендации</p>
            <button className="btn btn-primary mt-5 px-5 py-3 w-full sm:w-auto" onClick={() => openFor('free')}>Пройти бесплатный тест</button>
          </div>
          <div className="card p-5 md:p-6 hover:shadow-hover transition">
            <h3 className="text-xl font-semibold">Расширенный тест</h3>
            <p className="mt-2 text-muted">30+ вопросов, персонализированные рекомендации</p>
            <button className="btn btn-primary mt-5 px-5 py-3 w-full sm:w-auto" onClick={() => openFor('pro')}>Пройти платный тест</button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-balanced mt-16">
        <h2 className="text-2xl font-semibold">Как это работает</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="card p-4 md:p-5 flex items-start gap-3 border border-secondary/40">
            <FormIcon />
            <div>
              <div className="font-medium">Заполняете короткую форму</div>
              <div className="text-muted">Имя и email — чтобы сформировать и при желании отправить результат.</div>
            </div>
          </div>
          <div className="card p-4 md:p-5 flex items-start gap-3 border border-secondary/40">
            <QuestionsIcon />
            <div>
              <div className="font-medium">Отвечаете на вопросы</div>
              <div className="text-muted">От 10–15 (free) до 30+ (pro) вопросов — это займёт 5–12 минут.</div>
            </div>
          </div>
          <div className="card p-4 md:p-5 flex items-start gap-3 border border-secondary/40">
            <ResultIcon />
            <div>
              <div className="font-medium">Получаете результат</div>
              <div className="text-muted">Краткий вывод или расширенный отчёт с рекомендациями и шагами.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="container-balanced mt-16">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="card p-5 md:p-6 flex items-center gap-3 border border-secondary/40">
            <UsersIcon />
            <div>
              <div className="text-2xl font-semibold">12 400+</div>
              <div className="text-muted">прошли тест</div>
            </div>
          </div>
          <div className="card p-5 md:p-6 flex items-center gap-3 border border-secondary/40">
            <StarIcon />
            <div>
              <div className="text-2xl font-semibold">4.8/5</div>
              <div className="text-muted">средняя оценка</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews slider */}
      <section className="container-balanced mt-16">
        <h2 className="text-2xl font-semibold mb-4">Отзывы</h2>
        <AutoSlider
          slides={[
            { name: 'Айгерим Садыкова', text: 'Понятные рекомендации, теперь знаю, что пробовать сначала.' },
            { name: 'Ерлан Каскенов', text: 'Совпало с тем, что нравилось — технологии и аналитика.' },
            { name: 'Дана Абишева', text: 'Хорошая структура, мотивация двигаться дальше.' },
            { name: 'Алтынай Жумабек', text: 'Краткий результат уже полезен, но расширенный — супер.' },
          ]}
        />
      </section>

      {/* Who for */}
      <section className="container-balanced mt-16">
        <h2 className="text-2xl font-semibold">Кому подойдёт</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="card p-4 md:p-5 border border-secondary/40">
            <div className="font-medium">11 класс / абитуриент</div>
            <ul className="mt-2 text-sm text-muted list-disc list-inside">
              <li>Понять направление перед выбором вуза</li>
              <li>Сверить ожидания с реальными задачами</li>
            </ul>
          </div>
          <div className="card p-4 md:p-5 border border-secondary/40">
            <div className="font-medium">Студент 1–2 курса</div>
            <ul className="mt-2 text-sm text-muted list-disc list-inside">
              <li>Выбрать специализацию и проекты</li>
              <li>Наметить учебные треки</li>
            </ul>
          </div>
          <div className="card p-4 md:p-5 border border-secondary/40">
            <div className="font-medium">Смена направления</div>
            <ul className="mt-2 text-sm text-muted list-disc list-inside">
              <li>Определить переносимые навыки</li>
              <li>Получить план первых шагов</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Compare table */}
      <section className="container-balanced mt-16">
        <h2 className="text-2xl font-semibold">Сравнение форматов</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="card p-4 md:p-5 border border-secondary/40">
            <div className="font-semibold">Free</div>
            <ul className="mt-3 text-sm text-muted list-disc list-inside">
              <li>10–15 вопросов</li>
              <li>Краткий вывод</li>
              <li>Базовые рекомендации</li>
            </ul>
          </div>
          <div className="card p-4 md:p-5 border-2 border-primary bg-primary/5">
            <div className="font-semibold">Pro</div>
            <ul className="mt-3 text-sm text-muted list-disc list-inside">
              <li>30+ вопросов</li>
              <li>Персональные рекомендации</li>
              <li>Пример профессий и план первых шагов</li>
              <li>Email-отчёт</li>
            </ul>
            <button className="btn btn-primary mt-5 px-5 py-3 w-full sm:w-auto" onClick={() => openFor('pro')}>Перейти на Pro</button>
          </div>
        </div>
      </section>

      {/* anchors удалены по просьбе пользователя */}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 className="text-xl font-semibold mb-4">Перед началом — немного о Вас</h3>
        <div className="grid gap-3">
          <div className="space-y-1">
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-xl border border-black/10 shadow-sm transition focus:outline-none focus:ring-1 focus:ring-primary/40 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Имя"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                clearError('name');
              }}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>
          <div className="space-y-1">
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-xl border border-black/10 shadow-sm transition focus:outline-none focus:ring-1 focus:ring-primary/40 ${errors.age ? 'border-red-500' : ''}`}
              placeholder="Возраст"
              inputMode="numeric"
              value={form.age}
              onChange={(e) => {
                setForm({ ...form, age: e.target.value });
                clearError('age');
              }}
              aria-invalid={Boolean(errors.age)}
            />
            {errors.age && <p className="text-xs text-red-500">{errors.age}</p>}
          </div>
          <div className="space-y-1">
            <Select
              value={form.gender}
              onChange={(v) => {
                setForm({ ...form, gender: v });
                clearError('gender');
              }}
              placeholder="Ваш пол"
              options={[
                { value: 'Мужской', label: 'Мужской' },
                { value: 'Женский', label: 'Женский' },
              ]}
              error={Boolean(errors.gender)}
            />
            {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
          </div>
          <div className="space-y-1">
            <input
              type="email"
              className={`w-full px-4 py-3 rounded-xl border border-black/10 shadow-sm transition focus:outline-none focus:ring-1 focus:ring-primary/40 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Email (обязательно)"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                clearError('email');
              }}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>
          <div className="space-y-1">
            <Select
              value={form.testType}
              onChange={(v) => {
                setForm({ ...form, testType: v });
                clearError('testType');
              }}
              placeholder="Вид теста"
              options={[
                { value: 'Базовый тест', label: 'Базовый тест' },
                { value: 'Расширенный тест', label: 'Расширенный тест' },
                { value: 'Premium для родителей', label: 'Premium для родителей' },
              ]}
              error={Boolean(errors.testType)}
            />
            {errors.testType && <p className="text-xs text-red-500">{errors.testType}</p>}
          </div>
          <div className="space-y-1 text-xs text-muted">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => {
                  setForm({ ...form, consent: e.target.checked });
                  clearError('consent');
                }}
                className={`mt-0.5 h-4 w-4 rounded border border-black/20 transition focus:outline-none focus:ring-2 focus:ring-primary/40 ${errors.consent ? 'border-red-500' : ''}`}
                aria-invalid={Boolean(errors.consent)}
              />
              <span>
                Поставив галочку, Вы соглашаетесь с{' '}
                <Link to="/privacy" className="text-blue-500 hover:underline">
                  Политикой конфиденциальности
                </Link>
                ,{' '}
                <Link to="/terms" className="text-blue-500 hover:underline">
                  Пользовательским соглашением
                </Link>{' '}
                и получением рассылок.<br />
                Не поставив галочку во флажке, тест не начнется.
              </span>
            </label>
            {errors.consent && <p className="text-xs text-red-500">{errors.consent}</p>}
          </div>
          <button
            type="button"
            className={`btn btn-primary px-5 py-3 transition ${
              isFormComplete ? '' : 'opacity-60 cursor-not-allowed'
            }`}
            onClick={startTest}
          >
            Начать тест
          </button>
        </div>
      </Modal>

      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
        <h3 className="text-xl font-semibold mb-4">Пример расширенного отчёта</h3>
        <div className="grid gap-3">
          <div className="card p-4 border border-secondary/40"><div className="text-sm text-muted">Сферы</div><div className="mt-2 font-medium">Технологии и аналитика • Коммуникации</div></div>
          <div className="card p-4 border border-secondary/40"><div className="text-sm text-muted">Сильные стороны</div><div className="mt-2 font-medium">Системное мышление, усидчивость, эмпатия</div></div>
          <div className="card p-4 border border-secondary/40"><div className="text-sm text-muted">Первые шаги</div><div className="mt-2 font-medium">Мини-проект по данным • Введение в UX • Волонтёрство</div></div>
        </div>
      </Modal>
    </div>
  );
}



function Check() {
  return (
    <svg className="mt-0.5 flex-none" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" className="stroke-primary" strokeWidth="1.5" fill="none" />
      <path d="M6 10.5l2.5 2.5L14 8" stroke="#5B8DEF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FormIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-secondary">
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 8h10M7 12h6M7 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function QuestionsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-secondary">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9.5 9.5a2.5 2.5 0 1 1 4.4 1.6c-.6.7-1.6 1-1.9 1.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="16.2" r="0.8" fill="currentColor"/>
    </svg>
  );
}
function ResultIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-secondary">
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 14l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-secondary">
      <circle cx="9" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2.5 19c.8-2.6 3.2-4.5 6.5-4.5S14.7 16.4 15.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="17" cy="8.5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-secondary">
      <path d="M12 3l2.9 5.9 6.5.9-4.7 4.5 1.1 6.4L12 18.6 6.2 20.7 7.3 14.3 2.6 9.8l6.5-.9L12 3z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}
