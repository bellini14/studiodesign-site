import React, { useEffect, useRef } from 'react';

const Mosaic = ({ className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const mouse = { x: -1000, y: -1000 };

    // Set tile size slightly larger for a premium mosaic feel
    const tileSize = 60;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      
      // Update canvas internal dimensions to match CSS, adjusting for high DPI if needed
      // but keeping it simple 1:1 for performance here.
      canvas.width = width;
      canvas.height = height;
      
      initTiles();
    };

    const initTiles = () => {
      particles = [];
      const cols = Math.ceil(width / tileSize);
      const rows = Math.ceil(height / tileSize);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          particles.push({
            x: i * tileSize,
            y: j * tileSize,
            baseOpacity: 0.0,
            targetOpacity: 0.0,
            opacity: 0.0,
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        // Distance to mouse
        const dx = mouse.x - (p.x + tileSize / 2);
        const dy = mouse.y - (p.y + tileSize / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Hover effect radius
        const radius = 250;
        
        if (dist < radius) {
          // Closer = more opaque
          p.targetOpacity = 0.15 * (1 - dist / radius);
        } else {
          p.targetOpacity = 0.0;
        }

        // Smooth easing towards target opacity
        p.opacity += (p.targetOpacity - p.opacity) * 0.1;

        if (p.opacity > 0.001) {
          ctx.fillStyle = `rgba(150, 150, 150, ${p.opacity})`; // Neutral gray, works on light/dark
          // Add a slight margin so it looks like individual tiles
          ctx.fillRect(p.x + 1, p.y + 1, tileSize - 2, tileSize - 2);
        }
      });

      requestAnimationFrame(draw);
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      // Move mouse far away
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseLeave);

    resize();
    const animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-auto ${className}`} style={{ zIndex: 0 }}>
      {/* 
        This is the intricate CSS grid background the user requested. 
        It draws a precise dotted/dashed border grid using multiple gradients and masks.
      */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #FF3B00 1px, transparent 1px),
            linear-gradient(to bottom, #FF3B00 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px', /* Matches canvas tile size */
          backgroundPosition: 'left top',
          maskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), 
            repeating-linear-gradient(black 0px, black 3px, transparent 3px, transparent 8px)
          `,
          maskComposite: 'source-in',
          WebkitMaskComposite: 'source-in',
          opacity: 0.4
        }}
      ></div>
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default Mosaic;
