import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface FlipHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  trigger?: 'view' | 'mount';
  stagger?: number;
  delayOffset?: number;
  letterClassName?: string;
}

export function FlipHeading({
  text,
  as = 'h2',
  className = '',
  trigger = 'view',
  stagger = 0.035,
  delayOffset = 0,
  letterClassName = '',
}: FlipHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.08 });
  const shouldAnimate = trigger === 'mount' || isInView;

  const words = text.split(' ');
  const Tag = as;

  let runningCharIndex = 0;

  return (
    <div ref={containerRef} className="inline-block max-w-full">
      <Tag
        aria-label={text}
        className={`flip-title items-center ${className}`}
      >
        {words.map((word, wordIdx) => (
          <span
            key={`${word}-${wordIdx}`}
            aria-hidden="true"
            className={`inline-flex whitespace-nowrap ${
              wordIdx < words.length - 1 ? 'mr-[0.34em]' : ''
            }`}
          >
            {word.split('').map((char, charIdx) => {
              const currentIndex = runningCharIndex++;
              return (
                <motion.span
                  key={`${wordIdx}-${charIdx}`}
                  className={`flip-letter inline-block ${letterClassName}`}
                  style={{ transformOrigin: '50% 100%' }}
                  initial={{ rotateX: 85, y: 12, opacity: 0 }}
                  animate={
                    shouldAnimate
                      ? { rotateX: 0, y: 0, opacity: 1 }
                      : { rotateX: 85, y: 12, opacity: 0 }
                  }
                  transition={{
                    duration: 0.58,
                    delay: delayOffset + Math.min(currentIndex * stagger, 0.55),
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </Tag>
    </div>
  );
}
