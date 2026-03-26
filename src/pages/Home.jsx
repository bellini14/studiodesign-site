import { Link } from 'react-router-dom';
import Section from '../components/layout/Section';
import { HERO_CONTENT, ABOUT_CONTENT, SERVICES } from '../data/content';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import TextPressure from '../components/ui/TextPressure';
import SplitText from '../components/ui/SplitText';
import ProjectCard from '../components/ui/ProjectCard';
import ColorBends from '../components/ColorBends';
import ImageTrail from '../components/ui/ImageTrail';
import FeatureTabs from '../components/ui/FeatureTabs';

const Home = () => {
  const lastTwoRows = PORTFOLIO_PROJECTS.slice(-6);

  return (
    <div style={{ background: '#181616' }}>
      {/* ──────────────── HERO SECTION ──────────────── */}
      <section
        style={{
          background: '#181616',
          height: '100vh',
          minHeight: '600px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ColorBends Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <ColorBends rotation={45} speed={0.2} colors={["#f6cdb6","#f5e0c2","#fb4d13"]} transparent autoRotate={0} scale={1} frequency={1} warpStrength={1} mouseInfluence={0} parallax={0} noise={0.1} />
          </div>
        </div>

        {/* Overlay for contrast */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#171515', opacity: 0.5, zIndex: 0, pointerEvents: 'none' }} />

        {/* Center zone: Title */}
        <div
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
              textColor="#f6f4d3"
              strokeColor="#ff3b00"
              minFontSize={36}
              fontFamily={'"mokoko-variable", sans-serif'}
              scale={false}
              uppercase={false}
            />
          </div>
        </div>

        {/* Bottom zone: support text + projetos button */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '32px',
            right: '32px',
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
                color: '#D6D3D1',
                fontSize: '1.3rem',
                lineHeight: 1.6,
                margin: 0,
                letterSpacing: '0.01em',
              }}
            >
              Um{' '}
              <strong style={{ color: '#f6f4d3', fontWeight: 600 }}>
                estúdio de design
              </strong>{' '}
              contemporâneo dedicado à estratégia e à criação de{' '}
              <strong style={{ color: '#f6f4d3', fontWeight: 600 }}>
                identidades de marca.
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* CTA / Philosophy Section */}
      <section className="relative w-full min-h-[450px] flex items-center justify-center overflow-hidden bg-surface border-y border-borderline/50 py-20 md:py-24">
        
        {/* Background Trail Effect */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <ImageTrail
             items={[
              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1583847268964-b28ce8f25e65?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1600607687920-4e2a09c15468?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1600566753086-00f18efc22e3?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600&auto=format&fit=crop'
             ]}
             variant={1}
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none w-full max-w-5xl mx-auto">
          <h2 className="text-overline uppercase tracking-widest text-[#ff3b00] mb-8">
            Philosophy
          </h2>
          
          <div className="mb-14 w-full">
            <SplitText
              text={ABOUT_CONTENT.philosophy}
              className="text-[clamp(1.25rem,3vw,2.25rem)] md:text-[clamp(1.5rem,4vw,3.25rem)] leading-tight font-medium text-balance text-[#D6D3D1] inline-block text-center"
              delay={35}
              duration={1.2}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </div>

          <Link
            to="/contact"
            className="pointer-events-auto relative inline-flex overflow-hidden rounded-full whitespace-nowrap shrink-0 group border border-[#ff3b00] bg-surface"
          >
            <div className="relative h-[60px] md:h-[70px] flex flex-col w-[240px] md:w-[280px]">
              <div className="flex items-center justify-center h-full w-full bg-transparent transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
                <span className="font-semibold text-sm md:text-base tracking-widest uppercase leading-none text-primary" style={{ color: '#F6F4D3' }}>Vamos Criar Agora</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center h-full w-full bg-[#ff3b00] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-full group-hover:translate-y-0" aria-hidden="true">
                <span className="font-semibold text-sm md:text-base tracking-widest uppercase leading-none text-background" style={{ color: '#181616' }}>Vamos Criar Agora</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ──────────────── PROJETOS / PORTFOLIO PREVIEW ──────────────── */}
      <section
        style={{
          background: '#181616',
          padding: '120px 0 120px',
        }}
        className="flex justify-center"
      >
        <div className="max-w-7xl w-full px-6 md:px-12">
          {/* Section header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '48px',
              width: '100%'
            }}
          >
            <div>
              <span
                style={{
                  color: '#ff3b00',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                Projetos
              </span>
              <h2
                style={{
                  color: '#f6f4d3',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Selected Work
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="relative inline-flex overflow-hidden rounded-lg whitespace-nowrap shrink-0 mt-6 md:mt-0 group"
            >
              <div className="relative h-[48px] md:h-[60px] flex flex-col">
                <div className="flex items-center justify-center h-full px-8 md:px-10 bg-[#ff3b00] text-[#f6f4d3] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
                  <span className="font-semibold text-sm md:text-base tracking-widest uppercase leading-none">View All Work</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center h-full px-8 md:px-10 bg-[#f6f4d3] text-[#ff3b00] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-full group-hover:translate-y-0" aria-hidden="true">
                  <span className="font-semibold text-sm md:text-base tracking-widest uppercase leading-none">View All Work</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Galeria Editorial em Grid Plano */}
          <div className="relative mt-12 grid grid-cols-1 md:grid-cols-3 gap-x-[35px] gap-y-[50px] md:gap-y-[115px] w-full">
            {lastTwoRows.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
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

