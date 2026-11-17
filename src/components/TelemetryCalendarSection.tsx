import { useState } from 'react';
import { CALENDAR_DEPARTURES } from '../data/expeditions';
import { FlipHeading } from './FlipHeading';

interface TelemetryCalendarSectionProps {
  animationKey: number;
  onReserveDeparture: (titleAndDates: string) => void;
}

type CategoryFilter = 'all' | 'submersible' | 'ccr';

export function TelemetryCalendarSection({
  animationKey,
  onReserveDeparture,
}: TelemetryCalendarSectionProps) {
  const [filter, setFilter] = useState<CategoryFilter>('all');

  const visibleDepartures = CALENDAR_DEPARTURES.filter(
    (item) => filter === 'all' || item.category === filter
  );

  return (
    <section
      id="conditions"
      className="border-y border-white/10 bg-[#010409]/85 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.22em] text-[#00E5FF] uppercase sm:tracking-[0.26em]">
              03 · Oceanographic Buoy #DD-09
            </p>
            <FlipHeading
              key={`telemetry-heading-${animationKey}`}
              as="h2"
              text="Telemetry & Dive Calendar"
              className="font-display text-2xl font-light tracking-[0.12em] uppercase [text-wrap:balance] sm:text-4xl sm:tracking-[0.16em] lg:text-5xl"
            />
          </div>
          <p className="font-mono text-xs text-white/60">
            Buoy Link Active · Coral Sea Shelf Station
          </p>
        </div>

        {/* Oceanographic Telemetry Bar */}
        <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          <div className="glass-surface min-w-0 overflow-hidden rounded-sm p-3.5 sm:p-5">
            <span className="mb-1.5 block font-mono text-[10px] leading-snug text-white/50 uppercase sm:text-[11px]">
              Thermocline (40m)
            </span>
            <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-2">
              <span className="font-mono text-xl whitespace-nowrap tabular-nums text-white sm:text-2xl xl:text-3xl">
                16.4°C
              </span>
              <span className="font-mono text-[11px] text-[#00E5FF] sm:text-xs">
                Stable
              </span>
            </div>
          </div>

          <div className="glass-surface min-w-0 overflow-hidden rounded-sm p-3.5 sm:p-5">
            <span className="mb-1.5 block font-mono text-[10px] leading-snug text-white/50 uppercase sm:text-[11px]">
              Vertical Visibility
            </span>
            <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-2">
              <span className="font-mono text-xl whitespace-nowrap tabular-nums text-white sm:text-2xl xl:text-3xl">
                46.0m
              </span>
              <span className="font-mono text-[11px] text-emerald-400 sm:text-xs">
                Optimal
              </span>
            </div>
          </div>

          <div className="glass-surface min-w-0 overflow-hidden rounded-sm p-3.5 sm:p-5">
            <span className="mb-1.5 block font-mono text-[10px] leading-snug text-white/50 uppercase sm:text-[11px]">
              Surface Swell
            </span>
            <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-2">
              <span className="font-mono text-xl whitespace-nowrap tabular-nums text-white sm:text-2xl xl:text-3xl">
                0.4m
              </span>
              <span className="font-mono text-[11px] text-white/55 sm:text-xs">
                11s Period
              </span>
            </div>
          </div>

          <div className="glass-surface min-w-0 overflow-hidden rounded-sm p-3.5 sm:p-5">
            <span className="mb-1.5 block font-mono text-[10px] leading-snug text-white/50 uppercase sm:text-[11px]">
              Benthic Current
            </span>
            <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-2">
              <span className="font-mono text-xl whitespace-nowrap tabular-nums text-white sm:text-2xl xl:text-3xl">
                0.8 kt
              </span>
              <span className="font-mono text-[11px] text-white/55 sm:text-xs">
                NNE Drift
              </span>
            </div>
          </div>

          <div className="glass-surface col-span-2 min-w-0 overflow-hidden rounded-sm p-3.5 sm:col-span-1 sm:p-5">
            <span className="mb-1.5 block font-mono text-[10px] leading-snug text-white/50 uppercase sm:text-[11px]">
              Lunar Biolum Index
            </span>
            <div className="flex flex-row flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
              <span className="font-mono text-xl whitespace-nowrap tabular-nums text-[#E87A48] sm:text-2xl xl:text-3xl">
                94%
              </span>
              <span className="font-mono text-[11px] text-white/60 sm:text-xs">
                New Moon
              </span>
            </div>
          </div>
        </div>

        {/* Filterable Dive Calendar */}
        <div className="glass-surface rounded-sm p-5 sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
            <h3 className="font-display text-base tracking-[0.14em] text-white uppercase sm:text-lg sm:tracking-[0.18em]">
              Upcoming Vessel Departures
            </h3>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter departures by dive tier">
              {(
                [
                  ['all', 'All Tiers'],
                  ['submersible', 'Submersible (1,000m)'],
                  ['ccr', 'CCR Rebreather (100m+)'],
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

          <div className="divide-y divide-white/10">
            {visibleDepartures.map((dep) => (
              <div
                key={dep.id}
                className="flex flex-col justify-between gap-4 py-5 md:flex-row md:items-center"
              >
                <div className="min-w-0 space-y-1">
                  <span className="font-mono text-xs text-[#00E5FF] uppercase">
                    {dep.dates}
                  </span>
                  <h4 className="font-display text-base tracking-wider text-white uppercase">
                    {dep.title}
                  </h4>
                  <p className="text-xs text-white/55">{dep.vesselInfo}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 md:justify-end">
                  <div className="text-left font-mono md:text-right">
                    <span
                      className={`block text-xs tabular-nums ${
                        dep.berthsRemaining === 1
                          ? 'text-amber-300'
                          : 'text-emerald-400'
                      }`}
                    >
                      {dep.berthsRemaining} {dep.berthsRemaining === 1 ? 'Berth' : 'Berths'} Remaining
                    </span>
                    <span className="text-sm tabular-nums text-white">
                      ${dep.pricePerGuest.toLocaleString()} / guest
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onReserveDeparture(`${dep.title} (${dep.dates})`)
                    }
                    className="min-h-[40px] border border-white/70 px-5 py-2 font-display text-xs tracking-[0.18em] whitespace-nowrap text-white uppercase transition duration-200 hover:bg-white hover:text-[#010409] focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
