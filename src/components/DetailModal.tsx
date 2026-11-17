import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { ModalDetail } from '../data/expeditions';

interface DetailModalProps {
  detail: ModalDetail | null;
  onClose: () => void;
}

export function DetailModal({ detail, onClose }: DetailModalProps) {
  useEffect(() => {
    if (!detail) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [detail, onClose]);

  if (!detail) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#010409]/85 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-surface relative w-full max-w-xl rounded-sm border-[#00E5FF]/40 p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close telemetry modal"
          className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center text-white/60 transition hover:text-white focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
        >
          <X className="h-5 w-5" />
        </button>

        <span className="mb-1 block font-mono text-xs tracking-widest text-[#00E5FF] uppercase">
          {detail.tag}
        </span>
        <h3
          id="modal-heading"
          className="mb-4 pr-8 font-display text-2xl tracking-[0.14em] text-white uppercase"
        >
          {detail.title}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-white/80">
          {detail.body}
        </p>

        <div className="mb-6 grid grid-cols-2 gap-4 border-y border-white/10 py-4 font-mono text-xs">
          {detail.meta.map(([label, value]) => (
            <div key={label}>
              <span className="block text-white/45 uppercase">{label}</span>
              <span className="tabular-nums text-white">{value}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="min-h-[44px] w-full border border-white px-6 py-3 font-display text-xs tracking-[0.24em] text-white uppercase transition hover:bg-white hover:text-[#010409] focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
        >
          Close Telemetry File
        </button>
      </div>
    </div>
  );
}
