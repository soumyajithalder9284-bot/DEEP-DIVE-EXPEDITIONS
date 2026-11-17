import { useMemo, useState } from 'react';
import { RENTAL_EQUIPMENT } from '../data/expeditions';
import { FlipHeading } from './FlipHeading';

interface EquipmentSectionProps {
  animationKey: number;
  onAttachRig: (rigSummary: string) => void;
}

type GearCategory = 'all' | 'rebreather' | 'telemetry' | 'cinema';

export function EquipmentSection({
  animationKey,
  onAttachRig,
}: EquipmentSectionProps) {
  const [filter, setFilter] = useState<GearCategory>('all');
  const [days, setDays] = useState(7);
  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    RENTAL_EQUIPMENT.filter((item) => item.defaultSelected).map((i) => i.id)
  );

  const visibleGear = RENTAL_EQUIPMENT.filter(
    (item) => filter === 'all' || item.category === filter
  );

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedItems = useMemo(
    () => RENTAL_EQUIPMENT.filter((item) => selectedIds.includes(item.id)),
    [selectedIds]
  );

  const totalEstimate = useMemo(
    () =>
      selectedItems.reduce((sum, item) => sum + item.dailyRate * days, 0),
    [selectedItems, days]
  );

  const handleAttach = () => {
    const summary =
      selectedItems.length > 0
        ? `Attached Rental Rig (${days} days · Est. $${totalEstimate.toLocaleString()}): ${selectedItems
            .map((i) => i.name)
            .join(', ')}`
        : `Requested ${days}-day expedition rig consultation.`;
    onAttachRig(summary);
  };

  return (
    <section
      id="equipment"
      className="border-y border-white/10 bg-[#010409]/85 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.22em] text-[#00E5FF] uppercase sm:tracking-[0.26em]">
              05 · Mission Hardware &amp; Armory
            </p>
            <FlipHeading
              key={`equipment-heading-${animationKey}`}
              as="h2"
              text="Deep Tech & Rental Locker"
              className="font-display text-2xl font-light tracking-[0.12em] uppercase [text-wrap:balance] sm:text-4xl sm:tracking-[0.16em] lg:text-5xl"
            />
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter equipment category">
            {(
              [
                ['all', 'All Hardware'],
                ['rebreather', 'Rebreathers'],
                ['telemetry', 'Computers & DPV'],
                ['cinema', 'Abyssal Cinema'],
              ] as const
            ).map(([value, label]) => {
              const isActive = filter === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  className={`min-h-[38px] border px-3 py-1.5 font-mono text-[11px] uppercase transition focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none sm:px-4 sm:text-xs sm:whitespace-nowrap ${
                    isActive
                      ? 'border-[#00E5FF] bg-[#00E5FF]/15 text-[#00E5FF]'
                      : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Equipment Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8">
            {visibleGear.map((item) => {
              const checked = selectedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="glass-surface flex flex-col justify-between rounded-sm p-6"
                >
                  <div>
                    <div className="mb-2 flex items-center justify-between font-mono text-xs text-[#00E5FF]">
                      <span className="uppercase">{item.categoryLabel}</span>
                      <span className="tabular-nums">${item.dailyRate} / day</span>
                    </div>
                    <h3 className="mb-2 font-display text-lg tracking-wider text-white uppercase">
                      {item.name}
                    </h3>
                    <p className="mb-5 text-xs leading-relaxed text-white/70">
                      {item.description}
                    </p>
                  </div>

                  <label className="flex min-h-[40px] cursor-pointer items-center justify-between border-t border-white/10 pt-4 font-mono text-xs select-none">
                    <span className="text-white/85 uppercase">
                      Add to Charter Rig
                    </span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleItem(item.id)}
                      className="h-4 w-4 cursor-pointer accent-[#00E5FF]"
                    />
                  </label>
                </div>
              );
            })}
          </div>

          {/* Live Rental Estimator */}
          <div className="glass-surface rounded-sm p-7 lg:sticky lg:top-8 lg:col-span-4">
            <span className="mb-1 block font-mono text-xs tracking-widest text-[#E87A48] uppercase">
              Custom Rig Configurator
            </span>
            <h3 className="mb-6 font-display text-xl tracking-[0.15em] text-white uppercase">
              Rental Estimator
            </h3>

            <div className="mb-5">
              <label
                htmlFor="rental-days-slider"
                className="mb-2 block font-mono text-xs text-white/65 uppercase"
              >
                Expedition Duration:{' '}
                <span className="tabular-nums text-[#00E5FF]">
                  {days} {days === 1 ? 'Day' : 'Days'}
                </span>
              </label>
              <input
                id="rental-days-slider"
                type="range"
                min={1}
                max={14}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full cursor-pointer accent-[#00E5FF]"
              />
            </div>

            <div className="min-h-[76px] space-y-2 border-y border-white/10 py-4 font-mono text-xs">
              {selectedItems.length > 0 ? (
                selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 text-white/85"
                  >
                    <span className="truncate">{item.name}</span>
                    <span className="shrink-0 tabular-nums text-[#00E5FF]">
                      ${(item.dailyRate * days).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-white/45">
                  Select hardware cards on the left to calculate your custom charter kit.
                </p>
              )}
            </div>

            <div className="flex items-baseline justify-between pt-5">
              <span className="font-mono text-xs text-white/55 uppercase">
                Estimated Rig Total
              </span>
              <span className="font-display text-3xl tabular-nums text-white">
                ${totalEstimate.toLocaleString()}
              </span>
            </div>

            <p className="mt-2 mb-6 text-xs leading-relaxed text-white/50">
              Includes unlimited Sofnolime 797 scrubber fills, helium top-offs, and technician bench prep.
            </p>

            <button
              type="button"
              onClick={handleAttach}
              className="neon-blue-btn min-h-[44px] w-full px-6 py-3 font-display text-xs tracking-[0.22em] whitespace-nowrap uppercase focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
            >
              Attach Rig to Inquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
