import { ReactNode, useEffect } from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  hideScrollbar?: boolean;
};

export default function Modal({ open, onClose, children, hideScrollbar = false }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

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
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/30 animate-fadeInUp overflow-y-auto scrollbar-hide" onClick={onClose}>
      <div className={`card w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto my-auto ${hideScrollbar ? 'scrollbar-hide' : ''}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}


