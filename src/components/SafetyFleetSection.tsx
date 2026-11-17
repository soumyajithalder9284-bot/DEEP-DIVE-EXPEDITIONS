import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Radio, Users } from 'lucide-react';
import { FLEET_VESSELS } from '../data/expeditions';
import { FlipHeading } from './FlipHeading';

const SAFETY_PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Multi-Lock Hyperbaric',
    description:
      'Onboard ASME PVHO-1 certified twin-lock recompression chamber staffed 24/7 by a specialized dive medicine physician.',
  },
  {
    icon: Cpu,
    title: 'Dual CCR Redundancy',
    description:
      'Every mixed-gas diver descends with dual independent oxygen controllers, HUD PPO2 monitors, and full bailout rebreather blocks.',
  },
  {
    icon: Radio,
    title: 'Optical & USBL Tracking',
    description:
      "Real-time Ultra-Short Baseline (USBL) acoustic positioning tracks every diver's depth, heart rate, and tank pressure from the bridge.",
  },
  {
    icon: Users,
    title: '1:1 Expedition Ratio',
    description:
      'Each guest is paired 1-on-1 with a GUE Tech 2 or PADI TecRec Instructor Trainer holding over 1,500 logged deep trimix hours.',
  },
];

interface SafetyFleetSectionProps {
  animationKey: number;
}

export function SafetyFleetSection({ animationKey }: SafetyFleetSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const vessel = FLEET_VESSELS[activeTab];

  return (
    <section
      id="safety-fleet"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32"
    >
      <div className="mb-12 sm:mb-14">
        <p className="mb-3 font-mono text-xs tracking-[0.22em] text-[#00E5FF] uppercase sm:tracking-[0.26em]">
          04 · Redundancy &amp; Engineering
        </p>
        <FlipHeading
          key={`safety-heading-${animationKey}`}
          as="h2"
          text="Safety Standards & Fleet"
          className="font-display text-2xl font-light tracking-[0.12em] uppercase [text-wrap:balance] sm:text-4xl sm:tracking-[0.16em] lg:text-5xl"
        />
      </div>

      {/* 4 Safety Pillars */}
      <div className="mb-14 grid grid-cols-1 gap-5 sm:mb-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {SAFETY_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div key={pillar.title} className="glass-surface rounded-sm p-5 sm:p-6">
              <Icon className="mb-4 h-7 w-7 text-[#00E5FF]" />
              <h3 className="mb-2 font-display text-sm tracking-[0.14em] text-white uppercase">
                {pillar.title}
              </h3>
              <p className="text-xs leading-relaxed text-white/70">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Interactive Fleet Showcase */}
      <div className="glass-surface overflow-hidden rounded-sm">
        <div className="flex flex-col border-b border-white/15 md:flex-row">
          {FLEET_VESSELS.map((item, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`min-w-0 flex-1 border-b-2 px-4 py-4 text-left font-display text-xs leading-snug tracking-[0.1em] whitespace-normal break-words uppercase transition sm:px-6 sm:py-5 md:text-center md:text-sm md:tracking-[0.16em] ${
                  isSelected
                    ? 'border-[#00E5FF] bg-[#00E5FF]/15 text-[#00E5FF]'
                    : 'border-transparent text-white/65 hover:text-white'
                } focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none`}
              >
                {item.tabLabel}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
          <motion.div
            key={`${vessel.id}-${animationKey}`}
            initial={{ opacity: 0.35, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[16/10] w-full overflow-hidden bg-[#041226] lg:col-span-7 lg:aspect-auto lg:min-h-[400px]"
          >
            <img
              src={vessel.image}
              alt={vessel.imageAlt}
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              className="photo-animate-7s h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent to-[#020813]/85 lg:block" />
          </motion.div>

          <div className="flex flex-col justify-center space-y-5 p-5 sm:space-y-6 sm:p-8 lg:col-span-5 lg:p-10">
            <div>
              <span className="font-mono text-xs tracking-wider text-[#E87A48] uppercase sm:tracking-widest">
                {vessel.badge}
              </span>
              <h3 className="mt-1.5 font-display text-xl tracking-[0.12em] text-white uppercase sm:text-2xl lg:text-3xl">
                {vessel.title}
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-white/75">
              {vessel.description}
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5 font-mono text-xs">
              {vessel.specs.map(([label, value], i) => (
                <div key={label} className="min-w-0">
                  <span className="block text-[11px] text-white/45 uppercase">
                    {label}
                  </span>
                  <span
                    className={`text-xs tabular-nums sm:text-sm ${
                      i === 2 ? 'text-[#00E5FF]' : 'text-white'
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
