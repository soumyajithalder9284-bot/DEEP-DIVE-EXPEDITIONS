import { useState } from 'react';
import { motion } from 'motion/react';
import { LOGBOOK_ENTRIES, type LogbookEntry } from '../data/expeditions';
import { FlipHeading } from './FlipHeading';

interface LogbookSectionProps {
  animationKey: number;
  onInspectLog: (entry: LogbookEntry) => void;
}

export function LogbookSection({
  animationKey,
  onInspectLog,
}: LogbookSectionProps) {
  const [maxDepth, setMaxDepth] = useState(1000);

  const filteredEntries = LOGBOOK_ENTRIES.filter(
    (entry) => entry.depthMeters <= maxDepth
  );

  return (
    <section
      id="logbook"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32"
    >
      <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="mb-3 font-mono text-xs tracking-[0.22em] text-[#00E5FF] uppercase sm:tracking-[0.26em]">
            06 · Verified Visual Telemetry
          </p>
          <FlipHeading
            key={`logbook-heading-${animationKey}`}
            as="h2"
            text="The Abyssal Logbook"
            className="font-display text-2xl font-light tracking-[0.12em] uppercase [text-wrap:balance] sm:text-4xl sm:tracking-[0.16em] lg:text-5xl"
          />
        </div>

        {/* Depth Zone Scrubber */}
        <div className="glass-surface w-full rounded-sm px-6 py-4 lg:w-96">
          <div className="mb-2 flex justify-between font-mono text-xs">
            <label htmlFor="depth-scrubber" className="text-white/65 uppercase">
              Filter by Depth Zone
            </label>
            <span className="tabular-nums text-[#00E5FF]">
              {maxDepth === 1000 ? 'All (0m – 1,000m)' : `0m – ${maxDepth}m Max`}
            </span>
          </div>
          <input
            id="depth-scrubber"
            type="range"
            min={50}
            max={1000}
            step={50}
            value={maxDepth}
            onChange={(e) => setMaxDepth(Number(e.target.value))}
            className="w-full cursor-pointer accent-[#00E5FF]"
          />
          <div className="mt-1 flex justify-between font-mono text-[10px] text-white/40">
            <span>50m Reef</span>
            <span>200m Mesopelagic</span>
            <span>1000m Midnight</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredEntries.map((entry, idx) => {
          const isFeaturedSpan = filteredEntries.length % 2 === 1 && idx === 0;
          const animVariants = ['photo-animate-7s', 'photo-animate-8s', 'photo-animate-6s', 'photo-animate-9s'];
          const photoAnimClass = animVariants[idx % animVariants.length];
          return (
            <motion.button
              key={`${entry.id}-${animationKey}`}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{
                duration: 0.6,
                delay: Math.min(idx * 0.08, 0.25),
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => onInspectLog(entry)}
              className={`group relative w-full overflow-hidden rounded-sm border border-white/10 bg-[#041226] text-left transition duration-200 hover:border-[#00E5FF] focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none ${
                isFeaturedSpan
                  ? 'aspect-[16/10] md:col-span-2 md:aspect-[21/9]'
                  : 'aspect-[16/10]'
              }`}
            >
            <img
              src={entry.image}
              alt={entry.imageAlt}
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              className={`${photoAnimClass} h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#010409] via-[#010409]/35 to-transparent" />
            <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-3 sm:right-6 sm:bottom-5 sm:left-6 sm:gap-4">
              <div className="min-w-0">
                <span
                  className={`block font-mono text-xs tabular-nums ${
                    entry.accentColor === 'jelly'
                      ? 'text-[#E87A48]'
                      : 'text-[#00E5FF]'
                  }`}
                >
                  {entry.logNumber} · -{entry.depthMeters}m
                </span>
                <h3 className="mt-1 font-display text-base tracking-wider text-white uppercase sm:text-lg">
                  {entry.title}
                </h3>
              </div>
              <span className="shrink-0 border border-white/35 px-3 py-1.5 font-mono text-[11px] whitespace-nowrap text-white uppercase transition group-hover:bg-white group-hover:text-[#010409]">
                Inspect
              </span>
            </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
