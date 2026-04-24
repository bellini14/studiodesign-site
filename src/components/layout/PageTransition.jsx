import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const DEFAULT_COLORS = ['#f6cdb6', '#ff8b68', '#ff3b00'];

export const PAGE_PANEL_DELAY = 0.22;
export const PAGE_PANEL_DURATION = 0.62;

export default function PageTransition({
  colors = DEFAULT_COLORS,
  direction = 'right',
  onComplete,
}) {
  const rootRef = useRef(null);
  const layerRefs = useRef([]);
  const timelineRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const layers = layerRefs.current.filter(Boolean);

    if (!root || !layers.length) {
      return undefined;
    }

    gsap.set(root, { autoAlpha: 1 });
    gsap.set(layers, { xPercent: direction === 'left' ? -104 : 104 });

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      },
    });

    tl.to(layers, {
      xPercent: 0,
      duration: 0.58,
      ease: 'expo.inOut',
      stagger: 0.055,
    }).to(
      root,
      {
        autoAlpha: 0,
        duration: 0.18,
        ease: 'power2.out',
      },
      '-=0.04'
    );

    timelineRef.current = tl;

    return () => {
      timelineRef.current?.kill();
    };
  }, [direction, onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[2000] overflow-hidden pointer-events-auto"
      aria-hidden="true"
    >
      {colors.map((color, index) => (
        <div
          key={`${color}-${index}`}
          ref={(element) => {
            layerRefs.current[index] = element;
          }}
          className="absolute inset-0 will-change-transform"
          style={{ background: color }}
        />
      ))}
    </div>
  );
}
