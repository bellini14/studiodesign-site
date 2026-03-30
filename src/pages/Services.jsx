import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Palette, Compass, Monitor, Search, Layers, Rocket } from 'lucide-react';
import { SERVICES } from '../data/content';
import ScrollRevealText from '../components/ui/ScrollRevealText';
import LightRays from '../components/LightRays';

const ICONS = [Sparkles, Palette, Compass, Monitor];

const PROCESS_STEPS = [
  {
    icon: Search,
    number: "01",
    title: "Imersão",
    desc: "Entendemos profundamente o contexto, público e objetivos para criar a base estratégica do projeto."
  },
  {
    icon: Layers,
    number: "02",
    title: "Criação",
    desc: "Traduzimos estratégia em linguagem visual — explorando conceitos até encontrar a expressão ideal da marca."
  },
  {
    icon: Rocket,
    number: "03",
    title: "Entrega",
    desc: "Refinamos cada detalhe e entregamos um sistema visual completo, pronto para viver em todos os pontos de contato."
  },
];

/* ─────────────────────────────────────────────────
   Single overlay layer for one service.
   All overlays are absolutely positioned in the
   SAME sticky viewport. Each is driven by a slice
   of the parent's overall scroll progress, growing
   from scale 0 in the CENTER to scale 1 (full screen).
───────────────────────────────────────────────── */
const ServiceOverlay = ({ service, index, total, scrollYProgress }) => {
  const Icon = ICONS[index % ICONS.length];

  // Each service gets an equal slice of total scroll progress
  const segmentSize = 1 / (total + 1);
  const start = (index + 1) * segmentSize;
  // Slower, more gradual growth: takes ~70% of the segment to fully expand → ~5% per scroll tick
  const growEnd = start + segmentSize * 0.7;

  // Scale: from small centered card to full screen (gradual)
  const scale = useTransform(
    scrollYProgress,
    [start, growEnd],
    [0.25, 1]
  );

  // Border radius: rounded → square (follows scale)
  const borderRadius = useTransform(
    scrollYProgress,
    [start, growEnd],
    [32, 0]
  );

  // Block visibility: gentle fade in, stays visible
  const opacity = useTransform(
    scrollYProgress,
    [start - segmentSize * 0.02, start + segmentSize * 0.08],
    [0, 1]
  );

  // Content appears after block has mostly expanded (~80%)
  const contentOpacity = useTransform(
    scrollYProgress,
    [start + segmentSize * 0.5, start + segmentSize * 0.72],
    [0, 1]
  );
  const contentY = useTransform(
    scrollYProgress,
    [start + segmentSize * 0.5, start + segmentSize * 0.72],
    [20, 0]
  );

  return (
    <motion.div
      style={{ opacity, zIndex: index + 1 }}
      className="absolute inset-0"
    >
      {/* The growing element — scales from center */}
      <motion.div
        style={{ scale, borderRadius }}
        className="absolute inset-0 overflow-hidden origin-center"
      >
        {/* Background image — clean, no filters */}
        <img
          src={service.bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Text content — frosted glass container for contrast */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY, zIndex: 2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="max-w-2xl w-[90%] md:w-auto mx-auto px-10 md:px-16 py-12 md:py-16 rounded-3xl flex flex-col items-center text-center"
          style={{
            background: 'rgba(10, 10, 10, 0.65)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Service number */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-[#ff3b00] uppercase">
              Serviço
            </span>
            <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-[#ff3b00]">
              Nº.0{index + 1}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-medium tracking-tight text-[#FFFFFF] leading-[0.95] mb-6">
            {service.title}
          </h2>

          {/* Description */}
          <p className="text-sm md:text-base text-[#FFFFFF] leading-relaxed max-w-xl mb-10">
            {service.description}
          </p>

          {/* Capabilities row */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2.5">
            {service.capabilities.map((cap) => (
              <div key={cap} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b00]" />
                <span className="text-xs md:text-sm text-[#FFFFFF] font-medium tracking-tight">
                  {cap}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Process Step ─── */
const ProcessStep = ({ step, index }) => {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-start group"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#ff3b00]/8 border border-[#ff3b00]/15 flex items-center justify-center group-hover:bg-[#ff3b00]/15 group-hover:border-[#ff3b00]/30 transition-all duration-500">
          <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#ff3b00]" strokeWidth={1.5} />
        </div>
        <span className="text-xs font-mono tracking-widest text-[#ff3b00]/50">{step.number}</span>
      </div>
      <h3 className="text-xl md:text-2xl font-medium text-[#FFFFFF] tracking-tight mb-3">
        {step.title}
      </h3>
      <p className="text-sm md:text-base text-muted leading-relaxed max-w-xs">
        {step.desc}
      </p>
    </motion.div>
  );
};

/* ─── Main Page ─── */
const Services = () => {
  const heroRef = useRef(null);
  const sectionRef = useRef(null);
  const total = SERVICES.length;

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.95]);

  // Overall scroll progress for the services section
  const { scrollYProgress: servicesProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  return (
    <div style={{ background: '#0a0a0a' }}>
      {/* ──────────── HERO SECTION ──────────── */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="w-full h-full relative">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={1}
              lightSpread={1}
              rayLength={2}
              pulsating={false}
              fadeDistance={1}
              saturation={1}
              followMouse
              mouseInfluence={0.1}
              noiseAmount={0}
              distortion={0}
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-[#0a0a0a]/60 z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs md:text-sm uppercase tracking-[0.25em] text-[#ff3b00] font-semibold mb-8 md:mb-10"
          >
            Serviços
          </motion.span>

          <div className="mb-8 md:mb-12 w-full">
            <ScrollRevealText
              text="Design estratégico para marcas que desejam ser memoráveis."
              className="text-[clamp(1.5rem,4vw,3.25rem)] md:text-[clamp(1.75rem,4.5vw,4rem)] leading-[1.1] font-medium text-balance text-[#FFFFFF] inline-block text-center"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg text-[#FFFFFF] max-w-2xl leading-relaxed"
          >
            Da estratégia à identidade visual, da direção criativa ao digital — cada serviço 
            é projetado para construir marcas consistentes, relevantes e duradouras.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-6 bg-gradient-to-b from-[#ff3b00]/60 to-transparent"
          />
        </motion.div>
      </motion.section>

      {/* ──────────── SERVICES — CENTER GROWING (SINGLE STICKY VIEWPORT) ──────────── */}
      {/*
        One tall container ((total+1) × 100vh) with one sticky viewport.
        All service overlays are absolutely positioned inside the viewport
        and grow from the CENTER based on the overall scroll progress.
      */}
      <div
        ref={sectionRef}
        style={{ height: `${(total + 1) * 150}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Section title — visible before any service block grows */}
          <ServicesSectionTitle scrollYProgress={servicesProgress} total={total} />

          {/* Service overlays */}
          {SERVICES.map((service, idx) => (
            <ServiceOverlay
              key={service.id}
              service={service}
              index={idx}
              total={total}
              scrollYProgress={servicesProgress}
            />
          ))}
        </div>
      </div>

      {/* ──────────── PROCESS SECTION ──────────── */}
      <section className="w-full bg-surface border-y border-borderline/50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 md:mb-20"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#ff3b00] font-semibold block mb-4">
              Processo
            </span>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-medium text-[#FFFFFF] tracking-tight leading-[1.1] max-w-xl">
              Como transformamos visão em marca
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {PROCESS_STEPS.map((step, idx) => (
              <ProcessStep key={step.number} step={step} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── CTA SECTION ──────────── */}
      <section className="w-full flex flex-col items-center justify-center py-32 md:py-44 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#ff3b00] font-semibold mb-6">
            Pronto para começar?
          </span>
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-medium text-[#FFFFFF] tracking-tight mb-12 max-w-2xl leading-[1.15] text-balance">
            Vamos criar uma marca que o mundo vai lembrar.
          </h2>

          <Link
            to="/contact"
            className="relative inline-flex overflow-hidden rounded-full whitespace-nowrap shrink-0 group border border-[#ff3b00] bg-surface"
          >
            <div className="relative h-[60px] md:h-[70px] flex flex-col w-[240px] md:w-[280px]">
              <div className="flex items-center justify-center h-full w-full bg-transparent transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
                <span className="font-semibold text-sm md:text-base tracking-widest uppercase leading-none text-[#FFFFFF]">
                  Vamos Criar Agora
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center h-full w-full bg-[#ff3b00] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-full group-hover:translate-y-0" aria-hidden="true">
                <span className="font-semibold text-sm md:text-base tracking-widest uppercase leading-none text-[#0a0a0a]">
                  Vamos Criar Agora
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

/* ─── Section Title (visible before first card grows) ─── */
const ServicesSectionTitle = ({ scrollYProgress, total }) => {
  const segmentSize = 1 / (total + 1);

  // Visible in the first segment, fades when first card starts growing
  const opacity = useTransform(
    scrollYProgress,
    [0, segmentSize * 0.1, segmentSize * 0.7, segmentSize * 0.95],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0, segmentSize * 0.1],
    [40, 0]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 z-0 flex items-center justify-center"
    >
      <div className="text-center px-6">
        <span className="text-xs uppercase tracking-[0.2em] text-[#ff3b00] font-semibold block mb-4">
          O que fazemos
        </span>
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium text-[#FFFFFF] tracking-tight leading-[1.1]">
          Áreas de Expertise
        </h2>
      </div>
    </motion.div>
  );
};

export default Services;
