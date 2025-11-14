import { ChevronLeft, ChevronRight } from 'lucide-react';

type VideoNavigationProps = {
  onPrev: () => void;
  onNext: () => void;
  showControls: boolean;
  isMobile?: boolean;
};

export default function VideoNavigation({ onPrev, onNext, showControls, isMobile = false }: VideoNavigationProps) {
  const buttonClass = `absolute top-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all duration-300 text-white ${
    showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
  } hover:scale-110`;

  if (isMobile) {
    // На мобилке стрелки внутри видео
    return (
      <>
        <button
          onClick={onPrev}
          className={`${buttonClass} left-2`}
          aria-label="Предыдущее видео"
        >
          <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
        </button>
        <button
          onClick={onNext}
          className={`${buttonClass} right-2`}
          aria-label="Следующее видео"
        >
          <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
        </button>
      </>
    );
  }

  // На десктопе стрелки по краям экрана
  return (
    <>
      <button
        onClick={onPrev}
        className={`${buttonClass} left-4`}
        aria-label="Предыдущее видео"
        style={{ minWidth: '120px', minHeight: '120px' }}
      >
        <ChevronLeft className="w-12 h-12" />
      </button>
      <button
        onClick={onNext}
        className={`${buttonClass} right-4`}
        aria-label="Следующее видео"
        style={{ minWidth: '120px', minHeight: '120px' }}
      >
        <ChevronRight className="w-12 h-12" />
      </button>
    </>
  );
}

