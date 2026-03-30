import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

const dist = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Smoothstep interpolation
const getAttr = (distance, maxDist, minVal, maxVal) => {
  if (distance >= maxDist) return minVal;
  const t = 1 - Math.abs(distance / maxDist);
  const ease = t * t * (3 - 2 * t);
  return minVal + (maxVal - minVal) * ease;
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const TextPressure = ({
  text = 'Compressa',
  fontFamily = '"mokoko-variable", sans-serif',
  width = false,
  weight = true,
  italic = false,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#FFFFFF',
  strokeColor = '#ff3b00',
  strokeWidth = 2,
  className = '',
  minFontSize = 24,
  uppercase = false,
  center = true,
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split('');

  useEffect(() => {
    const handleMouseMove = e => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = e => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    const debouncedSetSize = debounce(setSize, 100);
    debouncedSetSize();
    window.addEventListener('resize', debouncedSetSize);
    return () => window.removeEventListener('resize', debouncedSetSize);
  }, [setSize]);

  useEffect(() => {
    let rafId;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        // READ phase
        const spanRects = spansRef.current.map(span => {
          if (!span) return null;
          return span.getBoundingClientRect();
        });

        // WRITE phase
        spansRef.current.forEach((span, i) => {
          if (!span || !spanRects[i]) return;

          const rect = spanRects[i];
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
          };

          const d = dist(mouseRef.current, charCenter);

          // For Mokoko, we use ONLY the "wght" axis properly configured
          // Idle is 100, High pressure is 900
          const wghtVal = weight ? Math.round(getAttr(d, maxDist, 100, 900)) : 100;

          let settings = [];
          if (weight) settings.push(`"wght" ${wghtVal}`);

          const newFontVariationSettings = settings.length > 0 ? settings.join(", ") : "normal";

          if (span.style.fontVariationSettings !== newFontVariationSettings) {
             span.style.fontVariationSettings = newFontVariationSettings;
          }
          // Set CSS fontWeight alongside variable settings for backwards fallback compatibility
          if (weight && span.style.fontWeight !== String(wghtVal)) {
            span.style.fontWeight = wghtVal;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha]);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-transparent overflow-visible">
      {stroke && (
        <style>{`
          .text-pressure-title .stroke span {
            position: relative;
            color: ${textColor};
          }
          .text-pressure-title .stroke span::after {
            content: attr(data-char);
            position: absolute;
            left: 0;
            top: 0;
            color: transparent;
            z-index: -1;
            -webkit-text-stroke-width: ${strokeWidth}px;
            -webkit-text-stroke-color: ${strokeColor};
          }
        `}</style>
      )}
      <h1
        ref={titleRef}
        className={`text-pressure-title ${className} ${flex ? 'flex flex-wrap justify-center' : ''
          } ${stroke ? 'stroke' : ''} ${uppercase ? 'uppercase' : ''} ${center ? 'text-center' : ''}`}
        style={{
          fontFamily,
          fontSize: fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center top',
          margin: 2,
          fontWeight: 900, // Idle weight is 100
          letterSpacing: '-0.0em',
          color: stroke ? undefined : textColor
        }}
      >
        {(() => {
          const words = text.split(' ');
          let charIndex = 0;
          return words.map((word, wIdx) => (
            <span
              key={wIdx}
              className="inline-flex"
              style={{ whiteSpace: 'nowrap', marginRight: wIdx < words.length - 1 ? '0.25em' : 0 }}
            >
              {word.split('').map((char, cIdx) => {
                const idx = charIndex++;
                return (
                  <span
                    key={idx}
                    ref={el => { spansRef.current[idx] = el; }}
                    data-char={char}
                    className="inline-block"
                  >
                    {char}
                  </span>
                );
              })}
              {wIdx < words.length - 1 && (() => { charIndex++; return null; })()}
            </span>
          ));
        })()}
      </h1>
    </div>
  );
};

export default TextPressure;
