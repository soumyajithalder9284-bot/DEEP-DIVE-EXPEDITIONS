import { motion } from 'motion/react';
import { EXPEDITIONS, type Expedition } from '../data/expeditions';
import { FlipHeading } from './FlipHeading';

interface ExpeditionsSectionProps {
  animationKey: number;
  onSelectDossier: (expedition: Expedition) => void;
}

export function ExpeditionsSection({
  animationKey,
  onSelectDossier,
}: ExpeditionsSectionProps) {
  return (
    <section
      id="expeditions"
      className="relative mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32"
    >
      <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
        <div>
          <p className="mb-3 font-mono text-xs tracking-[0.22em] text-[#00E5FF] uppercase sm:tracking-[0.26em]">
            02 · Depth Zone: 100m – 1,000m
          </p>
          <FlipHeading
            key={`exp-heading-${animationKey}`}
            as="h2"
            text="Signature Expeditions"
            className="font-display text-2xl font-light tracking-[0.12em] uppercase [text-wrap:balance] sm:text-4xl sm:tracking-[0.16em] lg:text-5xl"
          />
        </div>
        <p className="max-w-md text-sm leading-relaxed text-white/70">
          Every descent is supported by our private research vessel, onboard hyperbaric doctors, and custom hypoxic trimix blending stations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {EXPEDITIONS.map((exp, index) => {
          const photoAnimClass =
            index === 0
              ? 'photo-animate-7s'
              : index === 1
                ? 'photo-animate-8s'
                : 'photo-animate-6s';
          return (
          <motion.article
            key={`${exp.id}-${animationKey}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{
              duration: 0.65,
              delay: index * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="glass-surface glass-surface-hover group flex flex-col justify-between overflow-hidden rounded-sm transition duration-200"
          >
            <div>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#041226]">
                <img
                  src={exp.image}
                  alt={exp.imageAlt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className={`${photoAnimClass} h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-[#020813]/25 to-transparent" />
              </div>

              <div className="p-5 sm:p-7">
                <div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-xs text-[#E87A48]">
                  <span>{exp.region}</span>
                  <span aria-hidden="true" className="text-white/30">
                    ·
                  </span>
                  <span className="text-[#00E5FF]">Max {exp.maxDepth}</span>
                  <span aria-hidden="true" className="text-white/30">
                    ·
                  </span>
                  <span className="text-white/75">{exp.duration}</span>
                </div>

                <h3 className="mb-3 font-display text-xl tracking-[0.12em] text-white uppercase">
                  {exp.title}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-white/70">
                  {exp.description}
                </p>

                <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 font-mono text-xs">
                  <div>
                    <span className="block text-white/45">Water Temp</span>
                    <span className="tabular-nums text-white">{exp.waterTemp}</span>
                  </div>
                  <div>
                    <span className="block text-white/45">Certification</span>
                    <span className="text-[#00E5FF]">{exp.certification}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 pt-4 pb-5 sm:px-7 sm:pb-7">
              <div>
                <span className="block font-mono text-[11px] text-white/45 uppercase">
                  Private Charter
                </span>
                <span className="font-display text-lg tracking-wider tabular-nums text-white">
                  ${exp.price.toLocaleString()}{' '}
                  <span className="text-xs text-white/50">/ berth</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => onSelectDossier(exp)}
                className="neon-blue-btn min-h-[40px] px-5 py-2 font-display text-xs tracking-[0.18em] whitespace-nowrap uppercase focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
              >
                View Dossier
              </button>
            </div>
          </motion.article>
          );
        })}
      </div>
    </section>
  );
}
