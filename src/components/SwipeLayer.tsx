import { useRef, useState } from 'react';

type SwipeLayerProps = {
  onSwipeUp: () => void;
  onSwipeDown: () => void;
  children: React.ReactNode;
};

export default function SwipeLayer({ onSwipeUp, onSwipeDown, children }: SwipeLayerProps) {
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const SWIPE_THRESHOLD = 50; // Минимальное расстояние для свайпа
  const SWIPE_VELOCITY_THRESHOLD = 0.3; // Минимальная скорость для свайпа

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null || touchStartX.current === null) return;
    
    const currentY = e.touches[0].clientY;
    const currentX = e.touches[0].clientX;
    const deltaY = currentY - touchStartY.current;
    const deltaX = currentX - touchStartX.current;

    // Проверяем, что это вертикальный свайп (вертикальное движение больше горизонтального)
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      e.preventDefault(); // Предотвращаем скролл страницы
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaY = touchEndY - touchStartY.current;
    const deltaX = touchEndX - (touchStartX.current || 0);
    const deltaTime = Date.now() - (e.timeStamp || 0);
    const velocity = Math.abs(deltaY) / deltaTime;

    // Проверяем, что это вертикальный свайп
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > SWIPE_THRESHOLD) {
      if (deltaY < 0 && velocity > SWIPE_VELOCITY_THRESHOLD) {
        // Свайп вверх
        onSwipeUp();
      } else if (deltaY > 0 && velocity > SWIPE_VELOCITY_THRESHOLD) {
        // Свайп вниз
        onSwipeDown();
      }
    }

    touchStartY.current = null;
    touchStartX.current = null;
    setIsSwiping(false);
  };

  return (
    <div
      className="w-full h-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'pan-y' }}
    >
      {children}
    </div>
  );
}

