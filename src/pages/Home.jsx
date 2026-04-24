import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import Section from '../components/layout/Section';
import { HERO_CONTENT, ABOUT_CONTENT, SERVICES } from '../data/content';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import TextPressure from '../components/ui/TextPressure';
import ScrollRevealText from '../components/ui/ScrollRevealText';
import ProjectCard from '../components/ui/ProjectCard';
import ImageTrail from '../components/ui/ImageTrail';
import FeatureTabs from '../components/ui/FeatureTabs';
import ScrollVelocity from '../components/ui/ScrollVelocity';
import ColorBends from '../components/ColorBends';
import { MagneticButton } from '../components/ui/magnetic-button';

const PHILOSOPHY_TRAIL_ITEMS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583847268964-b28ce8f25e65?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687920-4e2a09c15468?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753086-00f18efc22e3?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600&auto=format&fit=crop',
];

const Home = () => {
  const lastTwoRows = PORTFOLIO_PROJECTS.slice(-6);
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const bg = root.querySelector('[data-home-intro="bg"]');
      const overlay = root.querySelector('[data-home-intro="overlay"]');
      const title = root.querySelector('[data-home-intro="title"]');
      const support = root.querySelector('[data-home-intro="support"]');
      const targets = [bg, overlay, title, support].filter(Boolean);

      if (reduceMotion) {
        gsap.set(targets, { clearProps: 'all' });
        return;
      }

      if (!targets.length) {
        return;
      }

      if (bg) {
        gsap.set(bg, {
          autoAlpha: 0,
          scale: 1.035,
          filter: 'blur(18px)',
        });
      }
      if (overlay) {
        gsap.set(overlay, { autoAlpha: 0 });
      }
      if (title) {
        gsap.set(title, {
          autoAlpha: 0,
          y: 34,
          scale: 0.985,
          filter: 'blur(12px)',
        });
      }
      if (support) {
        gsap.set(support, {
          autoAlpha: 0,
          y: 22,
          filter: 'blur(8px)',
        });
      }

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      if (bg) {
        tl.to(bg, {
          autoAlpha: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
        });
      }

      if (overlay) {
        tl.to(
          overlay,
          {
            autoAlpha: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.75'
        );
      }

      if (title) {
        tl.to(
          title,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.85,
          },
          '-=0.58'
        );
      }

      if (support) {
        tl.to(
          support,
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.62,
          },
          '-=0.42'
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="bg-base">
      {/* ──────────────── HERO SECTION ──────────────── */}
      <section
        style={{
          background: '#FFFAF3',
          height: '100vh',
          minHeight: '600px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          data-home-intro="bg"
          style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}
        >
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <ColorBends
              rotation={90}
              speed={0.2}
              colors={['#ffe2cf', '#ff8b68', '#bfecc0']}
              transparent={true}
              autoRotate={0}
              scale={1}
              frequency={1}
              warpStrength={1}
              mouseInfluence={1}
              parallax={0.5}
              noise={0.15}
              iterations={1}
              intensity={1.4}
              bandWidth={14}
            />
          </div>
        </div>

        {/* Overlay for contrast */}
        <div
          data-home-intro="overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(255,250,243,0.1) 0%, rgba(255,250,243,0.42) 58%, rgba(255,250,243,0.88) 100%)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Center zone: Title */}
        <div
          data-home-intro="title"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <div style={{ width: '100%', maxWidth: '1200px', padding: '0 32px', pointerEvents: 'auto' }}>
            <TextPressure
              text={HERO_CONTENT.headline}
              flex={true}
              alpha={false}
              stroke={false}
              width={false}
              weight={true}
              italic={false}
              textColor="#14110f"
              strokeColor="#ff3b00"
              minFontSize={36}
              fontFamily={'"mokoko-variable", sans-serif'}
              scale={false}
              uppercase={false}
              lineGap={0.18}
              fontScale={1.12}
            />
          </div>
        </div>

        {/* Bottom zone: support text + projetos button */}
        <div
          data-home-intro="support"
          style={{
            position: 'absolute',
            bottom: '60px',
            left: 'var(--site-gutter-menu)',
            right: 'var(--site-gutter-menu)',
            display: 'flex',
            alignItems: 'flex-end',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <div
            style={{
              maxWidth: '250px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              pointerEvents: 'auto',
            }}
          >
            <p
              style={{
                color: '#14110f',
                fontSize: '1.3rem',
                lineHeight: 1.6,
                margin: 0,
                letterSpacing: '0.01em',
              }}
            >
              Um{' '}
              <strong style={{ color: '#14110f', fontWeight: 600 }}>
                estúdio de design
              </strong>{' '}
              contemporâneo dedicado à estratégia e à criação de{' '}
              <strong style={{ color: '#14110f', fontWeight: 600 }}>
                identidades de marca.
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* CTA / Philosophy Section */}
      <section
        className="relative w-full min-h-[450px] flex items-center justify-center overflow-hidden bg-surface border-y border-borderline/50 py-20 md:py-24"
        style={{ backgroundColor: '#fffaf3', color: '#14110f' }}
      >
        <div className="absolute inset-0 z-0 bg-surface" aria-hidden="true" />
        
        {/* Background Trail Effect */}
        <div className="absolute inset-0 z-[1] pointer-events-auto">
          <ImageTrail
            key="philosophy-image-trail"
            items={PHILOSOPHY_TRAIL_ITEMS}
            variant={1}
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-[200] flex flex-col items-center justify-center text-center px-6 pointer-events-none w-full max-w-5xl mx-auto">
          <h2 className="text-overline uppercase tracking-widest text-[#ff3b00] mb-8">
            Philosophy
          </h2>
          
          <div className="mb-14 w-full">
            <ScrollRevealText
              text={ABOUT_CONTENT.philosophy}
              className="text-[clamp(1.25rem,3vw,2.25rem)] md:text-[clamp(1.5rem,4vw,3.25rem)] leading-tight font-medium text-balance text-primary inline-block text-center"
            />
          </div>

          <MagneticButton distance={0.35}>
            <Link
              to="/contact"
              className="philosophy-cta pointer-events-auto relative z-[210] inline-flex overflow-hidden rounded-full whitespace-nowrap shrink-0 border border-[#ff3b00] bg-[#ff3b00] shadow-[0_14px_34px_rgba(255,59,0,0.20)]"
            >
              <div className="philosophy-cta__shell relative h-[60px] md:h-[70px] w-[240px] md:w-[280px]">
                <div className="philosophy-cta__face philosophy-cta__face--base">
                  <span className="philosophy-cta__label philosophy-cta__label--base font-semibold text-sm md:text-base tracking-widest uppercase leading-none text-white">
                    Vamos Criar Agora
                  </span>
                </div>
                <div className="philosophy-cta__face philosophy-cta__face--hover" aria-hidden="true">
                  <span className="philosophy-cta__label philosophy-cta__label--hover font-semibold text-sm md:text-base tracking-widest uppercase leading-none text-[#ff3b00]">
                    Vamos Criar Agora
                  </span>
                </div>
              </div>
            </Link>
          </MagneticButton>
        </div>
      </section>

      {/* ──────────────── PROJETOS / PORTFOLIO PREVIEW ──────────────── */}
      <section className="scroll-velocity-home-section relative flex min-h-[158px] w-full items-center overflow-hidden bg-[#f7f3ec] pt-10 pb-3 md:min-h-[180px] md:pt-12 md:pb-4">
        <ScrollVelocity
          texts={['cases']}
          velocity={68}
          numCopies={8}
          className="text-pressure-title scroll-velocity-home-copy uppercase text-[#C9BEB0]"
          parallaxClassName="w-full"
          scrollerClassName="scroll-velocity-home-scroller uppercase leading-none text-[clamp(2.35rem,7vw,5.4rem)] md:leading-none"
        />
      </section>

      <section
        style={{
          background: '#f7f3ec',
          padding: '56px 0 120px',
        }}
        className="flex justify-center"
      >
        <div className="site-gutter-menu w-full">
          {/* Galeria Editorial em Grid Plano */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-x-[35px] gap-y-[50px] md:gap-y-[115px] w-full">
            {lastTwoRows.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              to="/portfolio"
              className="relative inline-flex overflow-hidden rounded-lg whitespace-nowrap shrink-0 group"
            >
              <div className="relative h-[48px] md:h-[60px] flex flex-col">
                <div className="flex items-center justify-center h-full px-8 md:px-10 bg-[#ff3b00] text-white transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
                  <span className="font-semibold text-sm md:text-base tracking-widest uppercase leading-none">View All Work</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center h-full px-8 md:px-10 bg-primary text-[#ff3b00] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-full group-hover:translate-y-0" aria-hidden="true">
                  <span className="font-semibold text-sm md:text-base tracking-widest uppercase leading-none">View All Work</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Capabilities Section */}
      <section className="bg-surface border-t border-borderline/50">
        <FeatureTabs />
      </section>

    </div>
  );
};

export default Home;
