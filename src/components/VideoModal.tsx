import { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

type VideoModalProps = {
  open: boolean;
  onClose: () => void;
  videos: Array<{ image: string; text?: string }>;
  currentIndex: number;
  onIndexChange: (index: number) => void;
};

export default function VideoModal({ open, onClose, videos, currentIndex, onIndexChange }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);

  const currentVideo = videos[currentIndex];

  useEffect(() => {
    if (!open) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setIsLoading(true);
    }
  }, [open]);

  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.load();
      setIsLoading(true);
      setIsPlaying(false);
      setShowPlayButton(true);
      // Очищаем таймер при смене видео
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    }
  }, [open, currentIndex]);
  
  useEffect(() => {
    // Очищаем таймер при размонтировании
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  // Убираем этот useEffect, так как логика теперь в onPlay/onPause

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % videos.length;
    onIndexChange(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
    onIndexChange(prevIndex);
  };

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        handlePlayPause();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, currentIndex]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onClick={onClose}
    >
      {/* Кнопка закрытия */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition"
        aria-label="Закрыть"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Стрелка влево */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-4 z-10 w-14 h-14 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition"
        aria-label="Предыдущее видео"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* Стрелка вправо */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 z-10 w-14 h-14 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition"
        aria-label="Следующее видео"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Видео контейнер */}
      <div 
        className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            src={currentVideo?.image}
            className="max-w-full max-h-full object-contain"
            onLoadedData={handleVideoLoaded}
            onEnded={handleVideoEnded}
            onPlay={() => {
              setIsPlaying(true);
              // Очищаем предыдущий таймер, если есть
              if (hideTimerRef.current) {
                clearTimeout(hideTimerRef.current);
              }
              // Скрываем кнопку через 1 секунду после начала воспроизведения
              hideTimerRef.current = setTimeout(() => {
                setShowPlayButton(false);
                hideTimerRef.current = null;
              }, 1000);
            }}
            onPause={() => {
              setIsPlaying(false);
              // Очищаем таймер при паузе
              if (hideTimerRef.current) {
                clearTimeout(hideTimerRef.current);
                hideTimerRef.current = null;
              }
              setShowPlayButton(true);
            }}
            controls={false}
            loop={false}
          />

          {/* Кнопка Play/Pause - показывается только если showPlayButton = true */}
          {!isLoading && showPlayButton && (
            <button
              onClick={handlePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition"
              aria-label={isPlaying ? 'Пауза' : 'Воспроизведение'}
              onMouseEnter={() => setShowPlayButton(true)}
            >
              <div className="w-20 h-20 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition">
                {isPlaying ? (
                  <Pause className="w-10 h-10" fill="currentColor" />
                ) : (
                  <Play className="w-10 h-10 ml-1" fill="currentColor" />
                )}
              </div>
            </button>
          )}
          
          {/* Показываем кнопку при наведении на видео */}
          {!isLoading && !showPlayButton && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              onMouseEnter={() => setShowPlayButton(true)}
              onMouseLeave={() => {
                if (isPlaying) {
                  setTimeout(() => setShowPlayButton(false), 2000);
                }
              }}
            >
              <button
                onClick={handlePlayPause}
                className="w-20 h-20 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition opacity-0 hover:opacity-100"
                aria-label={isPlaying ? 'Пауза' : 'Воспроизведение'}
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10" fill="currentColor" />
                ) : (
                  <Play className="w-10 h-10 ml-1" fill="currentColor" />
                )}
              </button>
            </div>
          )}

          {/* Индикатор загрузки */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

