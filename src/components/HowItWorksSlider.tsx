import React, { useEffect, useRef, useState } from 'react';

type Card = {
  title: string;
  content: React.ReactNode;
};

type Props = {
  cards: Card[];
};

export default function HowItWorksSlider({ cards }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (timelineRef.current) observer.observe(timelineRef.current);

    return () => {
      if (timelineRef.current) observer.unobserve(timelineRef.current);
    };
  }, []);

  return (
    <div ref={timelineRef} className="relative ml-10 md:ml-16 pl-6 md:pl-8">
      {/* Vertical timeline */}
      <div
        className={`absolute left-0 top-0 w-0.5 bg-primary transition-all duration-1000 ease-out ${
          isVisible ? 'h-full visible' : 'h-0 invisible'
        }`}
        style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
      />

      {/* Steps */}
      <div className="space-y-10 md:space-y-14">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative flex gap-4 md:gap-6 group"
            style={{
              animation: isVisible
                ? `fadeInUp 0.6s ease-out ${i * 0.12}s both`
                : 'none',
            }}
          >
            {/* Dot + connector */}
            <div className="flex-shrink-0 relative z-10">
              <div className="absolute left-0 top-6 w-4 md:w-6 h-0.5 bg-secondary/60" />

              <button
                onClick={() => setActiveIdx(i)}
                className={`relative w-4 h-4 md:w-5 md:h-5 rounded-full border-2 transition-all duration-300 ${
                  activeIdx >= i
                    ? 'bg-primary border-primary scale-110 shadow-lg shadow-primary/20'
                    : 'bg-white border-secondary/70 hover:border-primary'
                }`}
                aria-label={`Шаг ${i + 1}: ${card.title}`}
              >
                {activeIdx >= i && (
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                )}
              </button>
            </div>

            {/* Card */}
            <div
              className={`flex-1 card p-5 md:p-6 border transition-all duration-300 ${
                activeIdx === i
                  ? 'bg-white border-primary/30 shadow-md'
                  : 'bg-white border-secondary/40 shadow-soft hover:border-primary/30'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs md:text-sm font-medium text-primary">
                  Шаг {i + 1}
                </span>
                <span className="text-xs text-gray-700">
                  из {cards.length}
                </span>
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-heading mb-3">
                {card.title}
              </h3>

              {/* 📌 Главное изменение: ЧЕРНЫЙ ЧИТАЕМЫЙ ТЕКСТ */}
              <div className="text-ink text-sm md:text-base leading-relaxed">
                {card.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
