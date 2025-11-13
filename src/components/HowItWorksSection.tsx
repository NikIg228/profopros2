import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

type Step = {
  title: string;
  content: React.ReactNode;
};

type Props = {
  steps: Step[];
};

const AnimatedStep = ({ 
  children, 
  delay = 0, 
  index, 
  onMouseEnter, 
  onClick,
  isSelected 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  index: number; 
  onMouseEnter: () => void; 
  onClick: () => void;
  isSelected: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={inView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.9, opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

export default function HowItWorksSection({ steps }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.min(prev + 1, steps.length - 1));
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < steps.length) {
          e.preventDefault();
          setSelectedIndex(selectedIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [steps.length, selectedIndex]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;

    const container = listRef.current;
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
    
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;

      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth'
        });
      }
    }

    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  return (
    <section ref={sectionRef} className="container-balanced mt-16">
      <h2 className="text-2xl font-semibold text-heading mb-8">Как это работает</h2>
      
      <div className="relative ml-6 md:ml-10 pl-4 md:pl-6">
        {/* Vertical timeline line */}
        <div
          className={`absolute left-0 top-0 w-0.5 bg-primary transition-all duration-1000 ease-out ${
            isVisible ? 'h-full visible' : 'h-0 invisible'
          }`}
          style={{
            transitionDelay: isVisible ? '200ms' : '0ms',
          }}
        />

        {/* Timeline steps with scroll */}
        <div className="relative">
          <div 
            ref={listRef} 
            className="max-h-[600px] overflow-y-auto pr-4 py-4 space-y-8 md:space-y-12 scroll-smooth"
            onScroll={handleScroll}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#DAD7CD transparent',
            }}
          >
            {steps.map((step, i) => (
              <AnimatedStep
                key={i}
                delay={i * 0.1}
                index={i}
                onMouseEnter={() => setSelectedIndex(i)}
                onClick={() => setSelectedIndex(i)}
                isSelected={selectedIndex === i}
              >
                <div className="px-4 py-2">
                  <div
                    className={`flex-1 bg-white rounded-xl border-2 px-8 py-6 md:px-10 md:py-8 transition-all duration-300 cursor-pointer ${
                      selectedIndex === i
                        ? 'border-primary shadow-md scale-[1.02]'
                        : 'border-secondary shadow-soft hover:border-primary'
                    }`}
                  >
                  <div className="mb-4">
                    <span className="text-xs md:text-sm font-semibold text-primary">
                      Шаг {i + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-heading mb-4">
                    {step.title}
                  </h3>
                  
                  <div className="text-gray-900 text-sm md:text-base leading-relaxed [&_p]:text-gray-900 [&_p]:mb-2 [&_li]:text-gray-900 [&_div]:mb-2">
                    {step.content}
                  </div>
                  </div>
                </div>
              </AnimatedStep>
            ))}
          </div>

          {/* Gradients */}
          <div 
            className="absolute top-0 left-0 right-4 h-20 bg-gradient-to-b from-base to-transparent pointer-events-none transition-opacity duration-300"
            style={{ opacity: topGradientOpacity }}
          />
          <div 
            className="absolute bottom-0 left-0 right-4 h-20 bg-gradient-to-t from-base to-transparent pointer-events-none transition-opacity duration-300"
            style={{ opacity: bottomGradientOpacity }}
          />
        </div>
      </div>

      <style>{`
        .scroll-smooth::-webkit-scrollbar {
          width: 8px;
        }
        .scroll-smooth::-webkit-scrollbar-track {
          background: transparent;
        }
        .scroll-smooth::-webkit-scrollbar-thumb {
          background: #DAD7CD;
          border-radius: 4px;
        }
        .scroll-smooth::-webkit-scrollbar-thumb:hover {
          background: #6B9080;
        }
      `}</style>
    </section>
  );
}

