import { useEffect, useRef, useState } from 'react';
import { HERO_REEF_IMAGE } from '../data/expeditions';
import { FlipHeading } from './FlipHeading';

interface HeroSectionProps {
  animationKey: number;
  onOpenDrawer: () => void;
}

export function HeroSection({ animationKey, onOpenDrawer }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isHeroVisibleRef = useRef(true);
  const floodlightOnRef = useRef(false);
  const lastManualAtRef = useRef<number>(0);
  const manualTargetRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.46 });
  const currentBeamRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.46 });
  const [floodlightOn, setFloodlightOn] = useState(false);

  useEffect(() => {
    floodlightOnRef.current = floodlightOn;
  }, [floodlightOn]);

  // Subtle floating marine snow particles + automatic/interactive flashlight sweep
  useEffect(() => {
    const canvas = canvasRef.current;
    const heroEl = heroRef.current;
    if (!canvas || !heroEl) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let animationId = 0;
    let lastTime = performance.now();
    let autoPhase = 0;

    const resizeCanvas = () => {
      canvas.width = heroEl.clientWidth || window.innerWidth;
      canvas.height = heroEl.clientHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const particleCount = window.innerWidth < 768 ? 22 : 46;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      vy: Math.random() * 0.32 + 0.08,
      vx: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // 1. Marine snow particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.y -= p.vy;
          p.x += p.vx;
          if (p.y < 0) p.y = canvas.height;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(185, 242, 255, ${p.alpha})`;
        ctx.fill();
      }

      // 2. Flashlight beam: auto-sweeps side-to-side continuously, yields smoothly to pointer/touch
      if (!floodlightOnRef.current && !prefersReducedMotion) {
        const isManualActive = now - lastManualAtRef.current < 1600;
        let targetX: number;
        let targetY: number;

        if (isManualActive) {
          targetX = manualTargetRef.current.x;
          targetY = manualTargetRef.current.y;
        } else {
          autoPhase += dt * 0.85;
          targetX = 0.5 + Math.sin(autoPhase) * 0.34;
          targetY = 0.44 + Math.sin(autoPhase * 1.5) * 0.14;
        }

        const followSpeed = isManualActive ? 0.32 : 0.08;
        currentBeamRef.current.x += (targetX - currentBeamRef.current.x) * followSpeed;
        currentBeamRef.current.y += (targetY - currentBeamRef.current.y) * followSpeed;

        const xPct = `${(currentBeamRef.current.x * 100).toFixed(2)}%`;
        const yPct = `${(currentBeamRef.current.y * 100).toFixed(2)}%`;

        if (maskRef.current) {
          maskRef.current.style.setProperty('--beam-x', xPct);
          maskRef.current.style.setProperty('--beam-y', yPct);
        }
        if (ringRef.current) {
          ringRef.current.style.left = xPct;
          ringRef.current.style.top = yPct;
        }
      }

      if (
        !prefersReducedMotion &&
        isHeroVisibleRef.current &&
        document.visibilityState === 'visible'
      ) {
        animationId = requestAnimationFrame(tick);
      } else {
        animationId = 0;
      }
    };

    const startLoop = () => {
      if (!animationId) {
        lastTime = performance.now();
        animationId = requestAnimationFrame(tick);
      }
    };

    const stopLoop = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = 0;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisibleRef.current = entry.isIntersecting;
        if (
          isHeroVisibleRef.current &&
          !prefersReducedMotion &&
          document.visibilityState === 'visible'
        ) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(heroEl);

    const handleVisibility = () => {
      if (
        document.visibilityState === 'visible' &&
        isHeroVisibleRef.current &&
        !prefersReducedMotion
      ) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    animationId = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', resizeCanvas);
      stopLoop();
    };
  }, []);

  const updateManualBeam = (clientX: number, clientY: number) => {
    if (floodlightOnRef.current || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const xRatio = Math.max(0.05, Math.min(0.95, (clientX - rect.left) / rect.width));
    const yRatio = Math.max(0.08, Math.min(0.92, (clientY - rect.top) / rect.height));
    manualTargetRef.current = { x: xRatio, y: yRatio };
    lastManualAtRef.current = performance.now();
  };

  return (
    <header
      id="hero"
      ref={heroRef}
      onPointerMove={(e) => {
        if (e.pointerType === 'mouse') {
          updateManualBeam(e.clientX, e.clientY);
        }
      }}
      onTouchStart={(e) => {
        if (e.touches.length === 1) {
          updateManualBeam(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
      onTouchMove={(e) => {
        if (e.touches.length === 1) {
          updateManualBeam(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
      className="relative flex h-[100svh] min-h-[600px] w-full touch-pan-y flex-col justify-between overflow-hidden bg-[#010409] select-none"
    >
      {/* Layer 1: High-resolution reef photograph (background preserved with gentle 8s ocean motion) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          key={`hero-img-${animationKey}`}
          src={HERO_REEF_IMAGE}
          alt="Sunlit Australian coral reef and distant technical diver"
          referrerPolicy="no-referrer"
          decoding="async"
          fetchPriority="high"
          className="photo-animate-8s h-full w-full object-cover object-center contrast-105 saturate-115"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020c1b]/35 via-[#03152d]/20 to-[#010409]/85" />
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      </div>

      {/* Layer 2: Auto-sweeping + interactive dark abyssal flashlight mask */}
      <div
        ref={maskRef}
        className="pointer-events-none absolute inset-0 z-10 will-change-[opacity] transition-opacity duration-300"
        style={{
          ['--beam-x' as string]: '50%',
          ['--beam-y' as string]: '46%',
          opacity: floodlightOn ? 0.08 : 1,
          background:
            'radial-gradient(circle clamp(210px, 34vw, 430px) at var(--beam-x) var(--beam-y), rgba(1, 4, 9, 0.02) 0%, rgba(2, 8, 19, 0.56) 52%, rgba(1, 4, 9, 0.97) 96%)',
        }}
      />

      {/* Layer 3: Subtle beam ring (desktop pointer only) */}
      <div
        ref={ringRef}
        className={`pointer-events-none absolute z-10 hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00E5FF]/15 shadow-[0_0_90px_rgba(0,229,255,0.12)] transition-opacity duration-300 lg:block ${
          floodlightOn ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ left: '50%', top: '46%' }}
      />

      {/* Top Bar: Minimal Explore Trigger + Floodlight Toggle */}
      <div
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        className="relative z-20 mx-auto flex w-full max-w-7xl items-start justify-between gap-3 px-4 pt-6 sm:px-10 sm:pt-10 lg:px-12"
      >
        <button
          type="button"
          onClick={onOpenDrawer}
          aria-label="Open Explore Menu"
          className="group min-h-[44px] text-left focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
        >
          <span className="mb-2 block h-[1.5px] w-4 bg-white transition-all duration-300 group-hover:w-8 group-hover:bg-[#00E5FF]" />
          <span className="font-sans text-xs tracking-[0.2em] text-white/95 transition group-hover:text-[#00E5FF] sm:text-sm">
            Explore
          </span>
        </button>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden font-mono text-[11px] tracking-[0.18em] text-white/60 uppercase sm:inline">
            {floodlightOn ? 'Full Reef Illumination' : 'Auto-Sweep Active · Move to Guide'}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setFloodlightOn((prev) => !prev);
            }}
            className="min-h-[40px] touch-manipulation border border-white/35 bg-[#020813]/85 px-3 py-2 font-mono text-[10px] tracking-[0.14em] whitespace-nowrap text-white/95 uppercase transition-colors hover:border-[#00E5FF] hover:text-[#00E5FF] focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none sm:px-4 sm:text-[11px] sm:tracking-[0.18em]"
          >
            {floodlightOn ? 'Floodlight: ON' : 'Floodlight: OFF'}
          </button>
        </div>
      </div>

      {/* Centerpiece Typography matching reference wave & Cinzel serif styling */}
      <div className="relative z-20 my-auto flex w-full flex-col items-center px-4 text-center">
        <p className="mb-3 font-mono text-[10px] font-light tracking-[0.28em] text-[#7dd3fc]/90 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] sm:mb-4 sm:text-xs sm:tracking-[0.34em]">
          EXPLORE THE UNKNOWN
        </p>

        {/* Dual-Ribbon Luminous Ocean Wave Emblem */}
        <svg
          viewBox="0 0 420 76"
          fill="none"
          aria-hidden="true"
          className="mb-2 h-9 w-[230px] drop-shadow-[0_0_16px_rgba(0,229,255,0.68)] sm:mb-3 sm:h-12 sm:w-[320px] md:h-14 md:w-[380px]"
        >
          <defs>
            <linearGradient id="waveRibbonTop" x1="12" y1="62" x2="395" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
              <stop offset="28%" stopColor="#38BDF8" stopOpacity="0.95" />
              <stop offset="56%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="78%" stopColor="#38BDF8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="waveRibbonBottom" x1="40" y1="66" x2="380" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0" />
              <stop offset="32%" stopColor="#00E5FF" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#BAE6FD" stopOpacity="0.95" />
              <stop offset="85%" stopColor="#00E5FF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Upper cresting wave ribbon */}
          <path
            d="M14 58 C 96 66, 154 12, 224 14 C 266 15, 290 36, 314 48 C 282 28, 250 22, 218 24 C 158 28, 102 68, 14 58 Z"
            fill="url(#waveRibbonTop)"
          />
          {/* Lower flowing wave ribbon */}
          <path
            d="M36 62 C 120 72, 184 32, 252 30 C 296 28, 336 56, 404 42 C 344 64, 296 42, 250 40 C 186 38, 122 76, 36 62 Z"
            fill="url(#waveRibbonBottom)"
          />
        </svg>

        <div className="relative flex w-full max-w-4xl flex-col items-center">
          <FlipHeading
            key={`hero-deep-${animationKey}`}
            as="h1"
            text="DEEP DIVE"
            trigger="mount"
            stagger={0.07}
            delayOffset={0.05}
            letterClassName="mx-[0.04em] sm:mx-[0.08em]"
            className="cinzel-title justify-center font-cinematic text-[2.15rem] leading-none font-medium tracking-[0.06em] uppercase sm:text-6xl md:text-[5.25rem] lg:text-[6.5rem]"
          />
        </div>

        {/* Flanked EXPEDITIONS Sub-title */}
        <div className="mt-3 flex w-full max-w-md items-center justify-center gap-3 px-2 sm:mt-4 sm:gap-5">
          <span className="h-[1px] max-w-[78px] flex-1 bg-gradient-to-r from-transparent to-white/75" />
          <FlipHeading
            key={`hero-dive-${animationKey}`}
            as="p"
            text="EXPEDITIONS"
            trigger="mount"
            stagger={0.04}
            delayOffset={0.28}
            letterClassName="mx-[0.12em] sm:mx-[0.2em]"
            className="justify-center font-sans text-[11px] font-light uppercase sm:text-sm md:text-base"
          />
          <span className="h-[1px] max-w-[78px] flex-1 bg-gradient-to-l from-transparent to-white/75" />
        </div>

        <FlipHeading
          key={`hero-tagline-${animationKey}`}
          as="p"
          text="GO BEYOND THE SURFACE."
          trigger="mount"
          stagger={0.025}
          delayOffset={0.48}
          className="mt-6 justify-center font-display text-[11px] font-medium tracking-[0.22em] uppercase sm:mt-7 sm:text-sm sm:tracking-[0.32em]"
        />

        <p className="mt-3 flex flex-wrap items-center justify-center gap-2 font-display text-[11px] font-light tracking-[0.16em] text-white/75 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:mt-4 sm:gap-3 sm:text-sm sm:tracking-[0.26em]">
          <span className="hidden h-px w-6 bg-gradient-to-r from-transparent to-[#00E5FF]/60 sm:inline-block" />
          <span>
            Developed by{' '}
            <span className="signature-name font-medium tracking-[0.18em] sm:tracking-[0.28em]">
              Soumyajit Halder
            </span>
          </span>
          <span className="hidden h-px w-6 bg-gradient-to-l from-transparent to-[#00E5FF]/60 sm:inline-block" />
        </p>
      </div>

      {/* Bottom Center CTA */}
      <div className="relative z-20 flex w-full flex-col items-center gap-3 pb-10 sm:pb-14">
        <a
          href="#expeditions"
          className="neon-blue-btn inline-flex min-h-[48px] w-56 items-center justify-center px-9 py-3.5 font-display text-xs tracking-[0.26em] whitespace-nowrap uppercase focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none sm:w-60"
        >
          EXPLORE DIVES
        </a>
        <span className="font-mono text-[10px] tracking-[0.28em] text-white/50 uppercase">
          SCROLL TO DESCEND
        </span>
      </div>
    </header>
  );
}
