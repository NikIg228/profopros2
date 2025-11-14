import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, FileText, HelpCircle, CheckSquare, Users, Star, GraduationCap, Briefcase } from 'lucide-react';
import Modal from '../components/Modal';
import AutoSlider from '../components/AutoSlider';
import Select from '../components/Select';
import HowItWorksSection from '../components/HowItWorksSection';
import CountUp from '../components/CountUp';
import CircularGallery from '../components/CircularGallery';
import VideoPlayer from '../components/VideoPlayer';
import type { VideoItem } from '../hooks/useVideoController';

type FormErrorKey = 'name' | 'age' | 'gender' | 'testType' | 'email' | 'emailConfirm' | 'consent';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [plan, setPlan] = useState<'free'|'pro'|null>(null);
  const [form, setForm] = useState({ name: '', age: '', gender: '', testType: '', email: '', emailConfirm: '', consent: false });
  const [errors, setErrors] = useState<Partial<Record<FormErrorKey, string>>>({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const navigate = useNavigate();

  const videoItems: VideoItem[] = [
    { id: '1', src: '/video_otzyvy/1Аиша.mov', title: 'Аиша' },
    { id: '2', src: '/video_otzyvy/2Инкар.mov', title: 'Инкар' },
    { id: '3', src: '/video_otzyvy/3Дима.mp4', title: 'Дима' },
    { id: '4', src: '/video_otzyvy/4Индира.mp4', title: 'Индира' },
    { id: '5', src: '/video_otzyvy/5Альбина.mov', title: 'Альбина' },
    { id: '6', src: '/video_otzyvy/6ноунейм.mp4', title: 'Отзыв' },
    { id: '7', src: '/video_otzyvy/7ноунейм.mp4', title: 'Отзыв' },
  ];

  const handleVideoClick = (index: number) => {
    setCurrentVideoIndex(index);
    setVideoModalOpen(true);
  };

  const trimmedEmail = form.email.trim();
  const trimmedEmailConfirm = form.emailConfirm.trim();
  const emailsMatch = trimmedEmail && trimmedEmailConfirm && trimmedEmail === trimmedEmailConfirm;
  const isFormComplete = Boolean(
    form.name.trim() &&
    form.age.trim() &&
    form.gender &&
    form.testType &&
    trimmedEmail &&
    trimmedEmailConfirm &&
    emailsMatch &&
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

  const openFor = (p: 'free'|'pro', testTypeValue?: string) => {
    setPlan(p);
    if (testTypeValue) {
      setForm((prev) => ({ ...prev, testType: testTypeValue }));
    }
    setModalOpen(true);
  };
  const startTest = () => {
    const emailValue = form.email.trim();
    const emailConfirmValue = form.emailConfirm.trim();
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
    if (!emailConfirmValue) {
      newErrors.emailConfirm = 'Повторите email';
    } else if (emailConfirmValue !== emailValue) {
      newErrors.emailConfirm = 'Email не совпадает';
    }
    if (!form.consent) newErrors.consent = 'Необходимо подтвердить согласие';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const { emailConfirm, ...formWithoutConfirm } = form;
    sessionStorage.setItem('profi.user', JSON.stringify({ ...formWithoutConfirm, email: emailValue, plan }));
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
              <Link to="/details" className="btn btn-ghost px-5 py-3 w-full sm:w-auto">Подробнее</Link>
            </div>
          </div>
          <div className="lg:hidden fade-section">
            <div className="rounded-2xl overflow-visible bg-base aspect-[3/2] mb-6 sm:mb-0">
              <img src="/ogog2.png" alt="Иллюстрация профориентации" className="w-full h-full object-contain" loading="lazy" />
            </div>
          </div>
          <div className="hidden lg:block fade-section">
            <div className="rounded-2xl overflow-visible bg-base aspect-[3/2]">
              <img src="/ogog2.png" alt="Иллюстрация профориентации" className="w-full h-full object-contain" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section id="formats" className="container-balanced mt-14 lg:mt-20">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card p-6 flex flex-col border border-secondary/40 shadow-md bg-white order-1">
            <div>
              <h3 className="text-xl font-semibold text-primary">Базовый тест</h3>
              <div className="mt-2 text-lg font-semibold text-primary">USD 0,00</div>
            </div>
            <ul className="mt-6 text-sm text-muted space-y-2 list-disc list-inside flex-grow">
              <li>Короткий тест (9 вопросов)</li>
              <li>Предварительное определение типа личности</li>
              <li>Краткое описание вашего стиля мышления и поведения</li>
              <li>Отлично подходит, чтобы познакомиться с методикой</li>
            </ul>
            <button
              className="btn mt-5 px-5 py-3 bg-primary text-white hover:bg-[#C67C48] transition"
              onClick={() => openFor('free', 'Базовый тест')}
            >
              Начать
            </button>
          </div>

          <div className="card p-6 flex flex-col border border-secondary/40 shadow-md bg-white order-2">
            <div>
              <h3 className="text-xl font-semibold text-primary">Расширенный тест</h3>
              <div className="mt-2 text-lg font-semibold text-primary">USD 9,99 (разовый отчёт)</div>
            </div>
            <ul className="mt-6 text-sm text-muted space-y-2 list-disc list-inside flex-grow">
              <li>40+ продуманных вопросов</li>
              <li>Детальный психологический профиль</li>
              <li>Персонализированный VIP-отчёт в PDF</li>
              <li>Сильные и уязвимые стороны</li>
              <li>Подходящие профессии и естественная рабочая среда</li>
              <li>Рекомендации по развитию и взаимодействию с другими</li>
            </ul>
            <button
              className="btn mt-5 px-5 py-3 bg-primary text-white hover:bg-[#C67C48] transition"
              onClick={() => openFor('pro', 'Расширенный тест')}
            >
              Начать
            </button>
          </div>

          <div className="card p-6 flex flex-col border-2 border-primary bg-[#ECE9E0] shadow-lg order-3">
            <div>
              <div className="inline-block rounded-full bg-primary text-white text-xs px-3 py-1 mb-3">Рекомендуем</div>
              <h3 className="text-xl font-semibold text-primary">Premium для родителей</h3>
              <div className="mt-2 text-lg font-semibold text-primary">USD 19,99 (разовый отчёт)</div>
            </div>
            <ul className="mt-6 text-sm text-muted space-y-2 list-disc list-inside flex-grow">
              <li>Все из расширенного теста +</li>
              <li>Подробное описание личности ребёнка</li>
              <li>Руководство для родителей: как понимать, поддерживать и мотивировать</li>
              <li>Советы, как строить доверие и улучшать общение в семье</li>
              <li>Подходит родителям подростков 13-18 лет</li>
            </ul>
            <button
              className="btn mt-5 px-5 py-3 bg-primary text-white hover:bg-[#C67C48] transition"
              onClick={() => openFor('pro', 'Premium для родителей')}
            >
              Начать
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <HowItWorksSection
        steps={[
          {
            title: 'Вы проходите Базовый тест',
            content: (
              <div className="space-y-2">
                <p className="text-gray-900">Ответы основаны на простых жизненных ситуациях.</p>
                <p className="text-gray-900">Они не требуют "знаний" — важно выбрать то, что ближе и естественнее.</p>
              </div>
            ),
          },
          {
            title: 'Алгоритм анализирует ваш естественный тип мышления',
            content: (
              <p className="text-gray-900">
                Ответы сопоставляются с ключевыми дихотомиями и паттернами поведения, используемыми в международных типологиях MBTI и RIASEC (Холланд).
              </p>
            ),
          },
          {
            title: 'Вы получаете персональный результат',
            content: (
              <div className="space-y-3">
                <p className="text-gray-900">
                  Базовый тест — это первый шаг к пониманию себя. Вы получите предварительное определение вашего типа личности — краткое описание, которое отражает ваши естественные реакции, стиль мышления и подход к жизни.
                </p>
                <div className="bg-secondary p-4 rounded-lg border border-secondary">
                  <div className="font-semibold text-heading mb-2">Тест покажет:</div>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-900">
                    <li>как вы обычно действуете и принимаете решения;</li>
                    <li>как вы видите мир — больше через чувства или через логику;</li>
                    <li>почему некоторые ситуации вам даются легко, а другие вызывают усталость или раздражение.</li>
                  </ul>
                </div>
              </div>
            ),
          },
          {
            title: 'Хотите глубже?',
            content: (
              <div className="space-y-3">
                <p className="text-gray-900">
                   Получите расширенный отчёт — там подробно о вашем типе мышления, сильных сторонах и сферах, где вы чувствуете себя естественно и уверенно.
                </p>
                <p className="text-gray-900">
                  Вы узнаете, что помогает вам расти, а что, наоборот, мешает, поймёте свои реакции в отношениях и узнаете, как использовать особенности своей личности в работе, общении и жизни.
                </p>
              </div>
            ),
          },
          {
            title: 'Понимание, которое остаётся',
            content: (
              <div className="space-y-2">
                <p className="text-gray-900">Это не тест "на оценку".</p>
                <p className="text-gray-900">
                  Это инструмент, который помогает понять себя и других — и принять решения без хаоса и сомнений.
                </p>
              </div>
            ),
          },
        ]}
      />

      {/* Social proof */}
      <section className="container-balanced mt-16">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="card p-5 md:p-6 border border-secondary/40 flex items-start gap-3">
            <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" strokeWidth={2.5} />
            <div className="text-lg md:text-xl font-semibold text-heading">
              <CountUp
                from={0}
                to={8200}
                separator=" "
                direction="up"
                duration={2}
                className="inline text-ink"
              />+ человек прошли тест
            </div>
          </div>
          <div className="card p-5 md:p-6 border border-secondary/40 flex items-start gap-3">
            <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" strokeWidth={2.5} />
            <div className="text-lg md:text-xl font-semibold text-heading">
              <CountUp
                from={0}
                to={92}
                separator=""
                direction="up"
                duration={2}
                className="inline text-ink"
              /><span className="text-ink">%</span> говорят: "Я понял(а) себя лучше"
            </div>
          </div>
          <div className="card p-5 md:p-6 border border-secondary/40 flex items-start gap-3">
            <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" strokeWidth={2.5} />
            <div className="text-lg md:text-xl font-semibold text-heading">
              <CountUp
                from={0}
                to={78}
                separator=""
                direction="up"
                duration={2}
                className="inline text-ink"
              /><span className="text-ink">%</span> родителей отмечают, что ребёнок стал увереннее
            </div>
          </div>
        </div>
      </section>

      {/* Who for */}
      <section className="container-balanced mt-16">
        <h2 className="text-2xl font-semibold">Кому подойдёт</h2>
        <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch">
          <div className="card p-5 border border-secondary/40 space-y-3 h-full flex flex-col">
            <div className="flex items-center gap-2 text-xl">
              <GraduationCap className="w-6 h-6 text-primary flex-shrink-0" />
              <span>Ученикам старших классов</span>
            </div>
            <ul className="text-sm text-muted list-disc list-inside space-y-1 flex-1">
              <li>понять своё направление перед выбором вуза;</li>
              <li>сверить интересы с реальными склонностями;</li>
              <li>выбрать среду, где учёба и работа будут естественными, а не из-под палки;</li>
              <li>избежать случайного выбора "по совету".</li>
            </ul>
          </div>
          <div className="card p-5 border border-secondary/40 space-y-3 h-full flex flex-col">
            <div className="flex items-center gap-2 text-xl">
              <GraduationCap className="w-6 h-6 text-primary flex-shrink-0" />
              <span>Студентам</span>
            </div>
            <ul className="text-sm text-muted list-disc list-inside space-y-1 flex-1">
              <li>уточнить специализацию и карьерный трек, который действительно откликается;</li>
              <li>понять, в какой практике/формате вы раскроетесь лучше (наука, корпорация, стартап, фриланс);</li>
              <li>скорректировать учебную траекторию, чтобы не терять время на неподходящие курсы;</li>
              <li>повысить мотивацию и эффективность, опираясь на свои сильные стороны.</li>
            </ul>
          </div>
          <div className="card p-5 border border-secondary/40 space-y-3 h-full flex flex-col">
            <div className="flex items-center gap-2 text-xl">
              <Users className="w-6 h-6 text-primary flex-shrink-0" />
              <span>Родителям подростков (13-18 лет)</span>
            </div>
            <ul className="text-sm text-muted list-disc list-inside space-y-1 flex-1">
              <li>глубже понять характер и мышление ребёнка;</li>
              <li>увидеть, как с ним говорить и как мотивировать без давления;</li>
              <li>найти баланс между поддержкой и свободой;</li>
              <li>помочь ребёнку выбрать путь, не навязывая свой сценарий.</li>
            </ul>
          </div>
          <div className="card p-5 border border-secondary/40 space-y-3 h-full flex flex-col">
            <div className="flex items-center gap-2 text-xl">
              <Briefcase className="w-6 h-6 text-primary flex-shrink-0" />
              <span>Взрослым</span>
            </div>
            <ul className="text-sm text-muted list-disc list-inside space-y-1 flex-1">
              <li>переосмыслить профессию, если ощущение "я не на своём месте";</li>
              <li>понять, где комфортнее реализовывать себя — в команде, на своём деле или в другой сфере;</li>
              <li>увидеть свои сильные стороны и использовать их осознанно;</li>
              <li>восстановить ясность в том, чего вы хотите от работы и жизни.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Reviews slider */}
      <section className="container-balanced mt-16">
        <h2 className="text-2xl font-semibold mb-4">Отзывы</h2>
        <div style={{ height: '600px', position: 'relative', backgroundColor: 'transparent' }}>
          <CircularGallery
            items={videoItems.map(v => ({ image: v.src, text: v.title }))}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
            onVideoClick={handleVideoClick}
          />
        </div>
      </section>

      {/* Video Player */}
      {videoModalOpen && (
        <VideoPlayer
          videos={videoItems}
          startIndex={currentVideoIndex}
          onClose={() => setVideoModalOpen(false)}
          onIndexChange={setCurrentVideoIndex}
        />
      )}

      {/* anchors удалены по просьбе пользователя */}

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setForm((prev) => ({ ...prev, testType: '' }));
        }}
        hideScrollbar={Object.keys(errors).length === 0}
      >
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
            <input
              type="email"
              className={`w-full px-4 py-3 rounded-xl border border-black/10 shadow-sm transition focus:outline-none focus:ring-1 focus:ring-primary/40 ${errors.emailConfirm ? 'border-red-500' : ''}`}
              placeholder="Подтвердите email"
              value={form.emailConfirm}
              onChange={(e) => {
                setForm({ ...form, emailConfirm: e.target.value });
                clearError('emailConfirm');
              }}
              aria-invalid={Boolean(errors.emailConfirm)}
            />
            {errors.emailConfirm && <p className="text-xs text-red-500">{errors.emailConfirm}</p>}
          </div>
          {!form.testType && (
            <div className="space-y-1">
              <Select
                value={form.testType}
                onChange={(v) => {
                  setForm({ ...form, testType: v });
                  clearError('testType');
                }}
                placeholder="Вид теста"
                options={[
                  { value: 'Базовый тест', label: 'Базовый' },
                  { value: 'Расширенный тест', label: 'Расширенный' },
                  { value: 'Premium для родителей', label: 'Premium для родителей' },
                ]}
                error={Boolean(errors.testType)}
              />
              {errors.testType && <p className="text-xs text-red-500">{errors.testType}</p>}
            </div>
          )}
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
                Настоящим Вы соглашаетесь с{' '}
                <Link to="/privacy" className="text-blue-500 hover:underline">
                  Политикой конфиденциальности
                </Link>
                ,{' '}
                <Link to="/terms" className="text-blue-500 hover:underline">
                  Пользовательским соглашением
                </Link>{' '}
                и получением рассылок.<br />
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
            Начать тестирование
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



function FormIcon() {
  return <FileText className="w-7 h-7 text-secondary" strokeWidth={1.5} />;
}
function QuestionsIcon() {
  return <HelpCircle className="w-7 h-7 text-secondary" strokeWidth={1.5} />;
}
function ResultIcon() {
  return <CheckSquare className="w-7 h-7 text-secondary" strokeWidth={1.5} />;
}
function UsersIcon() {
  return <Users className="w-7 h-7 text-secondary" strokeWidth={1.5} />;
}
function StarIcon() {
  return <Star className="w-7 h-7 text-secondary" strokeWidth={1.5} />;
}
