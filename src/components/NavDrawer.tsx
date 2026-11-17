import { useEffect } from 'react';
import { X } from 'lucide-react';

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { href: '#hero', label: '01. Surface / Hero', depth: '0m' },
  { href: '#expeditions', label: '02. Signature Expeditions', depth: '-120m' },
  { href: '#conditions', label: '03. Telemetry & Calendar', depth: '-250m' },
  { href: '#safety-fleet', label: '04. Safety & Fleet', depth: '-500m' },
  { href: '#equipment', label: '05. Deep Tech & Rental', depth: '-750m' },
  { href: '#logbook', label: '06. The Abyssal Logbook', depth: '-900m' },
  { href: '#inquiries', label: '07. Direct Charter Inquiry', depth: '-1000m' },
];

export function NavDrawer({ isOpen, onClose }: NavDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#010409]/80 backdrop-blur-md"
      />
      <aside
        className={`relative z-10 flex h-full w-full max-w-md flex-col justify-between border-r border-white/15 bg-[#020813] p-8 transition-transform duration-500 ease-out sm:p-12 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-8">
            <div>
              <span className="mb-2 block h-[2px] w-5 bg-white" />
              <span className="font-display text-xs tracking-[0.3em] text-[#00E5FF] uppercase">
                DeepDive Expeditions
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation drawer"
              className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-10 space-y-5 font-display text-sm tracking-[0.22em] uppercase">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between py-2 text-white/80 transition hover:text-[#00E5FF] focus-visible:text-[#00E5FF] focus-visible:outline-none"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs tabular-nums text-white/40">
                  {item.depth}
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div className="space-y-2 border-t border-white/10 pt-6 text-xs text-white/50">
          <p className="font-mono text-[#00E5FF]">SAT-COMM CH: 16 · Iridium 8816-410</p>
          <p>Private Submersible &amp; Closed-Circuit Expeditions</p>
          <p className="pt-1 text-white/40">23.44° S, 151.91° E · Coral Sea &amp; Pacific Rim</p>
        </div>
      </aside>
    </div>
  );
}
