import { useEffect, useState, type FormEvent } from 'react';
import { FlipHeading } from './FlipHeading';

interface InquiryFooterSectionProps {
  animationKey: number;
  selectedExpedition: string;
  attachedRigNotes: string;
}

const DEFAULT_EXPEDITIONS = [
  'Mariana Bathypelagic Descent (1,000m)',
  'Raja Ampat Nocturnal Fluor-Drift (115m)',
  'Dahab Benthic Sinkhole & Arch (145m)',
  'Tonga Trench Hadal Rim Survey (1,000m)',
  'Bespoke Full-Yacht Charter',
];

export function InquiryFooterSection({
  animationKey,
  selectedExpedition,
  attachedRigNotes,
}: InquiryFooterSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [expedition, setExpedition] = useState(DEFAULT_EXPEDITIONS[0]);
  const [certification, setCertification] = useState(
    'Submersible Passenger (No Cert Required)'
  );
  const [gasMode, setGasMode] = useState('1 ATM Acrylic Submersible');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedExpedition) {
      setExpedition(selectedExpedition);
    }
  }, [selectedExpedition]);

  useEffect(() => {
    if (attachedRigNotes) {
      setNotes((prev) => {
        if (!prev.trim()) return attachedRigNotes;
        if (prev.includes(attachedRigNotes)) return prev;
        return `${prev}\n${attachedRigNotes}`;
      });
    }
  }, [attachedRigNotes]);

  const expeditionOptions = DEFAULT_EXPEDITIONS.includes(expedition)
    ? DEFAULT_EXPEDITIONS
    : [expedition, ...DEFAULT_EXPEDITIONS];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
    setName('');
    setEmail('');
    setNotes('');
  };

  return (
    <>
      <section
        id="inquiries"
        className="border-t border-white/10 bg-[#010409] py-24 sm:py-32"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-8 lg:px-12">
          <div className="mb-12 text-center sm:mb-14">
            <p className="mb-3 font-mono text-xs tracking-[0.24em] text-[#00E5FF] uppercase sm:tracking-[0.3em]">
              07 · Private Charter Desk
            </p>
            <FlipHeading
              key={`inquiry-heading-${animationKey}`}
              as="h2"
              text="Commission Your Descent"
              className="mb-4 justify-center font-display text-2xl font-light tracking-[0.12em] uppercase [text-wrap:balance] sm:text-4xl sm:tracking-[0.16em] lg:text-5xl"
            />
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/65">
              Direct satellite dispatch to our Expedition Director aboard{' '}
              <span className="text-white">M/Y Abyssal Sovereign</span>. All charters include private helicopter or seaplane transfer.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass-surface space-y-6 rounded-sm p-5 sm:p-8 lg:p-12"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="charter-name"
                  className="mb-2 block font-mono text-xs text-white/65 uppercase"
                >
                  Full Name / Callsign *
                </label>
                <input
                  id="charter-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setSubmitted(false);
                  }}
                  placeholder="Commander Elena Vance"
                  className="w-full border border-white/20 bg-[#010409]/90 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#00E5FF] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="charter-email"
                  className="mb-2 block font-mono text-xs text-white/65 uppercase"
                >
                  Encrypted Email / Sat-Mail *
                </label>
                <input
                  id="charter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSubmitted(false);
                  }}
                  placeholder="vance@expedition-desk.org"
                  className="w-full border border-white/20 bg-[#010409]/90 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#00E5FF] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="inquiry-expedition"
                  className="mb-2 block font-mono text-xs text-white/65 uppercase"
                >
                  Target Expedition *
                </label>
                <select
                  id="inquiry-expedition"
                  value={expedition}
                  onChange={(e) => setExpedition(e.target.value)}
                  className="w-full border border-white/20 bg-[#010409]/90 px-4 py-3 text-sm text-white focus:border-[#00E5FF] focus:outline-none"
                >
                  {expeditionOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="inquiry-cert"
                  className="mb-2 block font-mono text-xs text-white/65 uppercase"
                >
                  Certification Level
                </label>
                <select
                  id="inquiry-cert"
                  value={certification}
                  onChange={(e) => setCertification(e.target.value)}
                  className="w-full border border-white/20 bg-[#010409]/90 px-4 py-3 text-sm text-white focus:border-[#00E5FF] focus:outline-none"
                >
                  <option>Submersible Passenger (No Cert Required)</option>
                  <option>GUE Tech 1 / Tech 2</option>
                  <option>TDI Full Cave / Mixed Gas CCR</option>
                  <option>PADI TecRec 100 Trimix</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="inquiry-gas"
                  className="mb-2 block font-mono text-xs text-white/65 uppercase"
                >
                  Preferred Gas / Mode
                </label>
                <select
                  id="inquiry-gas"
                  value={gasMode}
                  onChange={(e) => setGasMode(e.target.value)}
                  className="w-full border border-white/20 bg-[#010409]/90 px-4 py-3 text-sm text-white focus:border-[#00E5FF] focus:outline-none"
                >
                  <option>1 ATM Acrylic Submersible</option>
                  <option>Hypoxic Trimix (10/70) CCR</option>
                  <option>Heliox 14/65 Open-Circuit</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="charter-notes"
                className="mb-2 block font-mono text-xs text-white/65 uppercase"
              >
                Mission Objectives &amp; Decompression Notes
              </label>
              <textarea
                id="charter-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specify party size, preferred charter dates, underwater cinema housing requests, or custom bathymetric targets..."
                className="w-full border border-white/20 bg-[#010409]/90 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#00E5FF] focus:outline-none"
              />
            </div>

            <div className="flex flex-col justify-between gap-4 pt-2 sm:flex-row sm:items-center">
              <span className="font-mono text-xs text-white/50">
                Direct Response SLA: &lt; 4 Hours via Iridium Certus
              </span>
              <button
                type="submit"
                className="neon-blue-btn min-h-[44px] px-10 py-3 font-display text-xs tracking-[0.24em] whitespace-nowrap uppercase focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
              >
                Transmit Dossier
              </button>
            </div>

            {submitted && (
              <div
                role="status"
                className="border border-[#00E5FF]/50 bg-[#00E5FF]/10 p-4 font-mono text-xs text-[#00E5FF]"
              >
                Transmission confirmed: Your expedition dossier has been routed to the bridge of M/Y Abyssal Sovereign.
              </div>
            )}
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#010409] px-6 py-16 sm:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 border-b border-white/10 pb-12 md:flex-row md:items-center">
          <div>
            <span className="mb-2 block h-[2px] w-5 bg-white" />
            <span className="abyssal-heading font-display text-xl tracking-[0.28em] uppercase sm:text-2xl sm:tracking-[0.35em]">
              DeepDive Expeditions
            </span>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/55">
              Ultra-luxury bathypelagic exploration, manned submersible charters, and closed-circuit technical diving expeditions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-white/60">
            <span>PADI TecRec Center #S-9941</span>
            <span aria-hidden="true" className="text-white/25">
              ·
            </span>
            <span>DAN Industry Partner</span>
            <span aria-hidden="true" className="text-white/25">
              ·
            </span>
            <span>DNV-GL Class Submersibles</span>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 pt-8 text-xs text-white/50 sm:flex-row">
          <p>© 2026 DeepDive Expeditions. All Rights Reserved.</p>
          <p className="font-display tracking-[0.2em] text-white/75 uppercase">
            Developed by{' '}
            <span className="signature-name font-medium">Soumyajit Halder</span>
          </p>
        </div>
      </footer>
    </>
  );
}
