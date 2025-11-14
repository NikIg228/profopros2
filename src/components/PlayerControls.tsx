import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';

type PlayerControlsProps = {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  onPlayPause: () => void;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
  onClose: () => void;
  showControls: boolean;
  isVideoHovered?: boolean;
};

export default function PlayerControls({
  isPlaying,
  isMuted,
  volume,
  onPlayPause,
  onToggleMute,
  onVolumeChange,
  onClose,
  showControls,
  isVideoHovered = false
}: PlayerControlsProps) {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const volumeRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLDivElement>(null);

  // Обработка перетаскивания volume slider
  useEffect(() => {
    if (isDraggingVolume && volumeSliderRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!volumeSliderRef.current) return;
        const rect = volumeSliderRef.current.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const percentage = 1 - (y / rect.height);
        const newVolume = Math.max(0, Math.min(1, percentage));
        onVolumeChange(newVolume);
      };

      const handleMouseUp = () => {
        setIsDraggingVolume(false);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingVolume, onVolumeChange]);

  // Закрываем volume slider при клике вне его
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (volumeRef.current && !volumeRef.current.contains(e.target as Node) && !isDraggingVolume) {
        setShowVolumeSlider(false);
      }
    };

    if (showVolumeSlider) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showVolumeSlider, isDraggingVolume]);

  return (
    <>
      {/* Кнопка закрытия */}
      <button
        onClick={onClose}
        className={`absolute top-4 right-4 z-20 w-8 h-8 text-white transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Закрыть"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Центральная кнопка Play/Pause - показывается только при наведении на видео или если видео на паузе */}
      <button
        onClick={onPlayPause}
        className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 ${
          showControls && (isVideoHovered || !isPlaying) ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label={isPlaying ? 'Пауза' : 'Воспроизведение'}
      >
        <div className="w-20 h-20 rounded-full bg-black/40 hover:bg-black/50 flex items-center justify-center transition-transform duration-200 hover:scale-110">
          {isPlaying ? (
            <Pause className="w-10 h-10 text-white" fill="currentColor" />
          ) : (
            <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
          )}
        </div>
      </button>

      {/* Кнопка громкости */}
      <div
        ref={volumeRef}
        className={`absolute bottom-4 right-4 z-20 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <button
          onClick={onToggleMute}
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/50 flex items-center justify-center transition-transform duration-200 hover:scale-110"
          aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Вертикальный слайдер громкости */}
        {showVolumeSlider && (
          <div 
            className="absolute bottom-12 right-0 w-10 h-32 bg-black/60 backdrop-blur-sm rounded-lg p-2 flex items-center justify-center"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <div 
              ref={volumeSliderRef}
              className="relative w-1 h-full bg-gray-600/50 rounded-full cursor-pointer"
              onMouseDown={(e) => {
                e.stopPropagation();
                setIsDraggingVolume(true);
                const rect = e.currentTarget.getBoundingClientRect();
                const y = e.clientY - rect.top;
                const percentage = 1 - (y / rect.height);
                const newVolume = Math.max(0, Math.min(1, percentage));
                onVolumeChange(newVolume);
              }}
            >
              <div
                className="absolute bottom-0 left-0 right-0 bg-white rounded-full transition-all duration-100"
                style={{ height: `${volume * 100}%` }}
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  e.stopPropagation();
                  onVolumeChange(parseFloat(e.target.value));
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onMouseEnter={() => setShowVolumeSlider(true)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ 
                  writingMode: 'bt-lr',
                  WebkitAppearance: 'slider-vertical',
                  appearance: 'slider-vertical'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

