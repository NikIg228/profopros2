import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, FileText, HelpCircle, CheckSquare, Users, Star, GraduationCap, Briefcase, Target, Lightbulb, Heart, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import Modal from '../components/Modal';
import AutoSlider from '../components/AutoSlider';
import Select from '../components/Select';
import CountUp from '../components/CountUp';
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
          {/* Базовый тест */}
          <div className="card p-8 flex flex-col shadow-md bg-white order-1 h-full">
            <div className="flex flex-col h-full justify-between">
              <div>
                {/* Иллюстрация */}
                <div className="flex justify-center mb-4">
                  <img
                    src="/komu/undraw_mobile-testing_sm2l.svg"
                    alt=""
                    className="h-[70px] opacity-90 object-contain"
                    loading="lazy"
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-primary">Базовый тест</h3>
                <ul className="mt-6 text-sm text-muted space-y-2 list-disc list-inside">
                  <li>Короткий тест (5 вопросов)</li>
                  <li>Предварительное определение типа личности</li>
                  <li>Краткое описание вашего стиля мышления и поведения</li>
                  <li>Отлично подходит, чтобы познакомиться с методикой</li>
                </ul>
              </div>
              <button
                className="btn mt-6 px-5 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold transition-all duration-300 rounded-xl"
                onClick={() => openFor('free', 'Базовый тест')}
              >
                Бесплатно
              </button>
            </div>
          </div>

          {/* Расширенный тест */}
          <div className="card p-8 flex flex-col border border-green-100 rounded-2xl shadow-md bg-gradient-to-b from-[#F6FAF8] to-white order-2 h-full min-h-[440px] relative">
            {/* Маленький бейдж */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-50 text-blue-700 shadow-sm rounded-full px-3 py-1 text-xs z-10">
              🔍 Оптимальный выбор
            </div>
            
            <div className="flex flex-col h-full justify-between">
              <div>
                {/* Иллюстрация */}
                <div className="flex justify-center mb-4">
                  <img
                    src="/komu/undraw_usability-testing_w7dd.svg"
                    alt=""
                    className="h-[70px] opacity-90 object-contain"
                    loading="lazy"
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-primary">Расширенный тест</h3>
                <div className="mt-6 text-sm text-muted space-y-2 border-l-2 border-green-100 pl-4">
                  <p>40+ продуманных вопросов</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Детальный психологический профиль</li>
                    <li>Персонализированный VIP-отчёт в PDF</li>
                    <li>Сильные и уязвимые стороны</li>
                    <li>Подходящие профессии и естественная рабочая среда</li>
                    <li>Рекомендации по развитию и взаимодействию с другими</li>
                  </ul>
                </div>
              </div>
              <button
                className="btn mt-6 px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md rounded-xl transition-all duration-300"
                onClick={() => openFor('pro', 'Расширенный тест')}
              >
                USD 9,99
              </button>
            </div>
          </div>

          {/* Premium для родителей */}
          <div className="card p-8 flex flex-col rounded-2xl shadow-xl bg-gradient-to-b from-[#F7FDF9] to-white order-3 h-full relative transition-all duration-300 lg:scale-105" style={{ border: '2px solid transparent', backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, rgba(74, 222, 128, 0.4), rgba(21, 128, 61, 0.4))', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box' }}>
            {/* Плавающий бейдж */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-100 text-amber-700 rounded-full px-3 py-1 text-sm shadow z-10 whitespace-nowrap">
              ⭐ Рекомендуем родителям
            </div>
            
            <div className="flex flex-col h-full justify-between">
              <div>
                {/* Иллюстрация */}
                <div className="flex justify-center mb-4">
                  <img
                    src="/komu/undraw_shared-goals_jn0a.svg"
                    alt=""
                    className="h-[70px] opacity-90 object-contain"
                    loading="lazy"
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-primary">Premium для родителей</h3>
                <ul className="mt-6 text-sm text-muted space-y-2 list-disc list-inside">
                  <li className="list-none">Все из Расширенного теста +</li>
                  <li>Подробное описание личности ребёнка</li>
                  <li>Руководство для родителей: как понимать, поддерживать и мотивировать</li>
                  <li>Советы, как строить доверие и улучшать общение в семье</li>
                  <li>Подходит родителям подростков 13-18 лет</li>
                </ul>
              </div>
              <button
                className="btn mt-6 px-5 py-3 bg-green-700/95 hover:bg-green-800 text-white font-semibold shadow-lg rounded-xl scale-[102%] transition-all duration-300"
                onClick={() => openFor('pro', 'Premium для родителей')}
              >
                USD 19,99
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-balanced mt-14 lg:mt-20">
        <h2 className="text-2xl font-semibold mb-8">Как это работает</h2>
        <div className="relative pl-8 md:pl-12">
          {/* Декоративная линия слева */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/30"></div>
          
          <div className="space-y-6">
            <div className="card p-6 border border-secondary/40 relative">
              <div className="absolute -left-[2.25rem] md:-left-[3.25rem] top-6 w-3 h-3 rounded-full bg-primary border-2 border-base"></div>
              <div className="mb-4">
                <span className="text-xs md:text-sm font-semibold text-primary">Шаг 1</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-heading mb-4">Вы проходите Базовый тест</h3>
              <div className="space-y-2">
                <p className="text-gray-900">Ответы основаны на простых жизненных ситуациях.</p>
                <p className="text-gray-900">Они не требуют "знаний" — важно выбрать то, что ближе и естественнее.</p>
              </div>
            </div>

            <div className="card p-6 border border-secondary/40 relative">
              <div className="absolute -left-[2.25rem] md:-left-[3.25rem] top-6 w-3 h-3 rounded-full bg-primary border-2 border-base"></div>
              <div className="mb-4">
                <span className="text-xs md:text-sm font-semibold text-primary">Шаг 2</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-heading mb-4">Алгоритм анализирует ваш естественный тип мышления</h3>
              <p className="text-gray-900">
                Ответы сопоставляются с ключевыми дихотомиями и паттернами поведения, используемыми в международных типологиях MBTI и RIASEC (Холланд).
              </p>
            </div>

            <div className="card p-6 border border-secondary/40 relative">
              <div className="absolute -left-[2.25rem] md:-left-[3.25rem] top-6 w-3 h-3 rounded-full bg-primary border-2 border-base"></div>
              <div className="mb-4">
                <span className="text-xs md:text-sm font-semibold text-primary">Шаг 3</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-heading mb-4">Вы получаете персональный результат</h3>
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
            </div>

            <div className="card p-6 border border-secondary/40 relative">
              <div className="absolute -left-[2.25rem] md:-left-[3.25rem] top-6 w-3 h-3 rounded-full bg-primary border-2 border-base"></div>
              <div className="mb-4">
                <span className="text-xs md:text-sm font-semibold text-primary">Шаг 4</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-heading mb-4">Хотите глубже?</h3>
              <div className="space-y-3">
                <p className="text-gray-900">
                  Получите расширенный отчёт — там подробно о вашем типе мышления, сильных сторонах и сферах, где вы чувствуете себя естественно и уверенно.
                </p>
                <p className="text-gray-900">
                  Вы узнаете, что помогает вам расти, а что, наоборот, мешает, поймёте свои реакции в отношениях и узнаете, как использовать особенности своей личности в работе, общении и жизни.
                </p>
              </div>
            </div>

            <div className="card p-6 border border-secondary/40 relative">
              <div className="absolute -left-[2.25rem] md:-left-[3.25rem] top-6 w-3 h-3 rounded-full bg-primary border-2 border-base"></div>
              <div className="mb-4">
                <span className="text-xs md:text-sm font-semibold text-primary">Шаг 5</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-heading mb-4">Понимание, которое остаётся</h3>
              <div className="space-y-2">
                <p className="text-gray-900">Это не тест "на оценку".</p>
                <p className="text-gray-900">
                  Это инструмент, который помогает понять себя и других — и принять решения без хаоса и сомнений.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
        <WhoForCards />
      </section>

      {/* Reviews slider */}
      <section className="container-balanced mt-16">
        <h2 className="text-2xl font-semibold mb-4">Отзывы</h2>
        <div className="relative overflow-hidden py-8">
          <div className="flex animate-scroll gap-4">
            {/* Дублируем видео для бесшовной прокрутки */}
            {[...videoItems, ...videoItems].map((video, index) => {
              const actualIndex = index % videoItems.length;
              return (
                <div
                  key={`${video.id}-${index}`}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] cursor-pointer group"
                  onClick={() => handleVideoClick(actualIndex)}
                >
                  <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-black/10 border border-secondary/20 group-hover:border-primary/40 transition-colors">
                    <video
                      src={video.src}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLVideoElement;
                        target.play();
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLVideoElement;
                        target.pause();
                        target.currentTime = 0;
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-sm font-medium">{video.title}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 7s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
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



function WhoForCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
      {/* 1. Ученикам старших классов */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card pt-4 px-4 pb-4 sm:pt-6 sm:px-6 sm:pb-6 bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/40 rounded-xl sm:rounded-2xl overflow-hidden relative flex flex-col"
      >
        {/* Иллюстрация */}
        <div className="flex items-start justify-center h-[120px] sm:h-[160px] mb-3 sm:mb-4 relative">
          <img
            src="/komu/undraw_true-friends_1h3v.svg"
            alt=""
            className="max-h-[100px] sm:max-h-[140px] w-auto object-contain object-top"
            loading="lazy"
          />
          {/* Элементы роста */}
          <Sparkles className="absolute top-1 right-1 sm:top-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 text-blue-400/60" />
          <Sparkles className="absolute top-2 left-1 sm:top-4 sm:left-2 w-3 h-3 sm:w-4 sm:h-4 text-blue-300/50" />
        </div>
        
        <h3 className="text-lg sm:text-xl font-semibold text-heading mb-2 sm:mb-3">Ученикам старших классов</h3>
        
        <p className="text-xs sm:text-sm text-muted leading-relaxed mb-3 sm:mb-4">
          Когда ты стоишь на пороге выбора — важно увидеть себя не через оценки, а через склонности.
          <br className="hidden sm:block" />
          <br className="hidden sm:block" />
          Здесь ты находишь направление, в котором чувствуешь себя естественно.
        </p>
        
        <ul className="text-xs sm:text-sm text-muted space-y-1.5 sm:space-y-2">
          <li className="flex items-start gap-2">
            <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>понять своё направление перед выбором вуза</span>
          </li>
          <li className="flex items-start gap-2">
            <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>сверить интересы с реальными склонностями</span>
          </li>
          <li className="flex items-start gap-2">
            <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>выбрать среду, где учёба будет естественной</span>
          </li>
        </ul>
      </motion.div>

      {/* 2. Студентам */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card pt-4 px-4 pb-4 sm:pt-6 sm:px-6 sm:pb-6 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/40 rounded-xl sm:rounded-2xl overflow-hidden relative flex flex-col"
      >
        {/* Иллюстрация */}
        <div className="flex items-start justify-center h-[120px] sm:h-[160px] mb-3 sm:mb-4 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-emerald-200/30 blur-xl rounded-full w-24 h-24 sm:w-32 sm:h-32 transform translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2"></div>
          </div>
          <img
            src="/komu/undraw_continuous-learning_a1ld.svg"
            alt=""
            className="max-h-[100px] sm:max-h-[140px] w-auto object-contain object-top relative z-10"
            loading="lazy"
          />
          {/* Элементы роста */}
          <Sparkles className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-3 h-3 sm:w-4 sm:h-4 text-emerald-400/50 z-10" />
        </div>
        
        <h3 className="text-lg sm:text-xl font-semibold text-heading mb-2 sm:mb-3">Студентам</h3>
        
        <p className="text-xs sm:text-sm text-muted leading-relaxed mb-3 sm:mb-4">
          В университете нет "правильного пути" — есть твой формат, твой темп роста.
          <br className="hidden sm:block" />
          <br className="hidden sm:block" />
          Наш профиль показывает, как раскрыться в реальной практике.
        </p>
        
        <ul className="text-xs sm:text-sm text-muted space-y-1.5 sm:space-y-2">
          <li className="flex items-start gap-2">
            <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>уточнить специализацию и карьерный трек</span>
          </li>
          <li className="flex items-start gap-2">
            <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>понять, в какой практике вы раскроетесь лучше</span>
          </li>
          <li className="flex items-start gap-2">
            <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>скорректировать учебную траекторию</span>
          </li>
        </ul>
      </motion.div>

      {/* 3. Родителям подростков */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card pt-4 px-4 pb-4 sm:pt-6 sm:px-6 sm:pb-6 bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/40 rounded-xl sm:rounded-2xl overflow-hidden relative flex flex-col"
      >
        {/* Иллюстрация */}
        <div className="flex items-start justify-center h-[120px] sm:h-[160px] mb-3 sm:mb-4 relative">
          <img
            src="/komu/undraw_together_s27q.svg"
            alt=""
            className="max-h-[100px] sm:max-h-[140px] w-auto object-contain object-top"
            loading="lazy"
          />
          {/* Элементы роста */}
          <Sparkles className="absolute top-1 left-1 sm:top-2 sm:left-2 w-3 h-3 sm:w-4 sm:h-4 text-amber-400/50" />
        </div>
        
        <h3 className="text-lg sm:text-xl font-semibold text-heading mb-2 sm:mb-3">Родителям подростков (13–18)</h3>
        
        <p className="text-xs sm:text-sm text-muted leading-relaxed mb-3 sm:mb-4">
          Подростковый возраст — это поиск своего голоса.
          <br className="hidden sm:block" />
          <br className="hidden sm:block" />
          Профиль помогает родителям увидеть сильные стороны ребёнка и говорить с ним на одном языке.
        </p>
        
        <ul className="text-xs sm:text-sm text-muted space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          <li className="flex items-start gap-2">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>глубже понять характер и мышление ребёнка</span>
          </li>
          <li className="flex items-start gap-2">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>увидеть, как с ним говорить и мотивировать</span>
          </li>
          <li className="flex items-start gap-2">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>найти баланс между поддержкой и свободой</span>
          </li>
        </ul>
        
        {/* Плашка снизу */}
        <div className="mt-auto pt-3 sm:pt-4 border-t border-amber-200/40">
          <p className="text-[10px] sm:text-xs text-amber-700/70 font-medium text-center">Поддержка семьи — основа роста</p>
        </div>
      </motion.div>

      {/* 4. Взрослым */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card pt-4 px-4 pb-4 sm:pt-6 sm:px-6 sm:pb-6 bg-gradient-to-br from-green-50 via-primary/5 to-primary/10 border border-primary/20 rounded-xl sm:rounded-2xl overflow-hidden relative flex flex-col"
      >
        {/* Иллюстрация */}
        <div className="flex items-start justify-center h-[120px] sm:h-[160px] mb-3 sm:mb-4 relative">
          <img
            src="/komu/undraw_bussiness.svg"
            alt=""
            className="max-h-[100px] sm:max-h-[140px] w-auto object-contain object-top"
            loading="lazy"
          />
          {/* Элементы роста */}
          <Sparkles className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 text-primary/40" />
          <Sparkles className="absolute top-1 left-1 sm:top-2 sm:left-2 w-3 h-3 sm:w-4 sm:h-4 text-primary/30" />
        </div>
        
        <h3 className="text-lg sm:text-xl font-semibold text-heading mb-2 sm:mb-3 text-center">Взрослым</h3>
        
        <p className="text-xs sm:text-sm text-muted leading-relaxed mb-3 sm:mb-4 text-center">
          Порой мы оказываемся "не на своём месте" не потому, что ошиблись,
          а потому что пришло время обновиться.
          <br className="hidden sm:block" />
          <br className="hidden sm:block" />
          Профиль помогает взрослому увидеть, где его энергия естественна.
        </p>
        
        <ul className="text-xs sm:text-sm text-muted space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          <li className="flex items-start gap-2">
            <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>переосмыслить профессию, если "не на своём месте"</span>
          </li>
          <li className="flex items-start gap-2">
            <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>понять, где комфортнее реализовывать себя</span>
          </li>
          <li className="flex items-start gap-2">
            <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>восстановить ясность в том, чего вы хотите</span>
          </li>
        </ul>
        
        {/* Круглая "эмоциональная" цитата */}
        <div className="mt-auto pt-3 sm:pt-4 border-t border-primary/20">
          <div className="bg-primary/5 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-center">
            <p className="text-[10px] sm:text-xs text-primary/80 font-medium italic">"Обновление — это не отказ от прошлого, а возврат к себе"</p>
          </div>
        </div>
      </motion.div>
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
