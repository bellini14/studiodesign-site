import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Palette, Compass, Monitor, Search, Layers, Rocket, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data/content';

const ICONS = [Sparkles, Palette, Compass, Monitor];
const HERO_CARD_HEIGHTS = [
  'h-[300px] sm:h-[320px]',
  'h-[340px] sm:h-[360px]',
  'h-[320px] sm:h-[340px]',
  'h-[280px] sm:h-[300px]',
];
const HERO_CARD_BACKGROUNDS = [
  'bg-rose-200',
  'bg-lime-200',
  'bg-blue-200',
  'bg-neutral-200',
];

const PROCESS_STEPS = [
  {
    icon: Search,
    number: '01',
    title: 'Imersão & Estratégia',
    desc: 'Entendemos profundamente o contexto, público e objetivos para criar a base estratégica estrutural.',
  },
  {
    icon: Palette,
    number: '02',
    title: 'Design de Identidade',
    desc: 'Exploramos conceitos visuais até encontrar a expressão perfeita e autêntica da sua marca no mercado.',
  },
  {
    icon: Layers,
    number: '03',
    title: 'Sistemas & Aplicações',
    desc: 'Expandimos a identidade para um sistema versátil, pronto para os mais variados pontos de contato.',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Entrega & Direcionamento',
    desc: 'Refinamos e entregamos o projeto finalizado com precisão para viver no mundo real.',
  },
];

const getServiceAnchorTop = (index, total) => {
  const segmentSize = 1 / (total + 1);
  const start = index === 0 ? segmentSize * 0.4 : (index + 1) * segmentSize;
  return `${start * 100}%`;
};

const ServiceOverlay = ({ service, index, total, scrollYProgress }) => {
  const Icon = ICONS[index % ICONS.length];
  const segmentSize = 1 / (total + 1);
  const start = index === 0 ? segmentSize * 0.4 : (index + 1) * segmentSize;
  const growEnd = start + segmentSize * 0.7;

  const scale = useTransform(scrollYProgress, [start, growEnd], [0.25, 1]);
  const borderRadius = useTransform(scrollYProgress, [start, growEnd], [32, 0]);
  const opacity = useTransform(
    scrollYProgress,
    [start - segmentSize * 0.02, start + segmentSize * 0.08],
    [0, 1]
  );
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
    <motion.div style={{ opacity, zIndex: index + 1 }} className="absolute inset-0">
      <motion.div
        style={{ scale, borderRadius }}
        className="absolute inset-0 origin-center overflow-hidden bg-base"
      >
        <img
          src={service.bgImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-55 saturate-[0.7] brightness-[1.15]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#f7f3ec]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f3ec]/35 via-transparent to-[#f7f3ec]/70" />
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY, zIndex: 2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="mx-auto flex w-[90%] max-w-2xl flex-col items-center rounded-3xl px-10 py-12 text-center md:w-auto md:px-16 md:py-16"
          style={{
            background: 'rgba(255, 250, 243, 0.82)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(20, 17, 15, 0.12)',
          }}
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#ff3b00] md:text-sm">
              Serviço
            </span>
            <span className="text-xs font-mono tracking-[0.3em] text-[#ff3b00] md:text-sm">
              Nº.0{index + 1}
            </span>
          </div>

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#ff3b00]/15 bg-[#ff3b00]/5">
            <Icon className="h-7 w-7 text-[#ff3b00]" strokeWidth={1.5} />
          </div>

          <h2 className="mb-6 text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-primary">
            {service.title}
          </h2>

          <p className="mb-10 max-w-xl text-sm leading-relaxed text-secondary md:text-base">
            {service.description}
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2.5">
            {service.capabilities.map((cap) => (
              <div key={cap} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff3b00]" />
                <span className="text-xs font-medium tracking-tight text-primary md:text-sm">
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

const InfiniteServicesGallery = ({ services }) => {
  const trackRef = useRef(null);
  const frameRef = useRef(0);
  const segmentWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const hasInitializedOffsetRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const movedRef = useRef(false);
  const lastTimeRef = useRef(0);
  const loopedServices = [...services, ...services, ...services, ...services, ...services];

  useEffect(() => {
    const preloadedImages = [];

    services.forEach((service) => {
      [service.image, service.bgImage].forEach((src) => {
        if (!src) {
          return;
        }

        const image = new window.Image();
        image.decoding = 'async';
        image.fetchPriority = 'high';
        image.src = src;
        preloadedImages.push(image);
      });
    });

    return () => {
      preloadedImages.length = 0;
    };
  }, [services]);

  useLayoutEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return undefined;
    }

    const normalizeOffset = () => {
      const segmentWidth = segmentWidthRef.current;

      if (!segmentWidth) {
        return;
      }

      while (offsetRef.current <= -segmentWidth * 3) {
        offsetRef.current += segmentWidth;
      }

      while (offsetRef.current > -segmentWidth) {
        offsetRef.current -= segmentWidth;
      }
    };

    const updateMetrics = () => {
      segmentWidthRef.current = track.scrollWidth / 5;

      if (!hasInitializedOffsetRef.current && segmentWidthRef.current) {
        offsetRef.current = -segmentWidthRef.current * 2;
        hasInitializedOffsetRef.current = true;
      }

      normalizeOffset();
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    };

    const animate = (time) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!isDraggingRef.current) {
        offsetRef.current -= delta * 0.028;
        normalizeOffset();
        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    updateMetrics();

    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(track);

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  const handlePointerDown = (event) => {
    isDraggingRef.current = true;
    movedRef.current = false;
    dragStartXRef.current = event.clientX;
    dragOffsetRef.current = offsetRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDraggingRef.current) {
      return;
    }

    const deltaX = event.clientX - dragStartXRef.current;

    if (Math.abs(deltaX) > 6) {
      movedRef.current = true;
    }

    offsetRef.current = dragOffsetRef.current + deltaX;

    const segmentWidth = segmentWidthRef.current;

    if (segmentWidth) {
      while (offsetRef.current <= -segmentWidth * 3) {
        offsetRef.current += segmentWidth;
      }

      while (offsetRef.current > -segmentWidth) {
        offsetRef.current -= segmentWidth;
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }
  };

  const handlePointerUp = (event) => {
    isDraggingRef.current = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleClickCapture = (event) => {
    if (movedRef.current) {
      event.preventDefault();
      event.stopPropagation();
      movedRef.current = false;
    }
  };

  return (
    <div className="relative -mx-4 overflow-hidden pt-10 sm:-mx-6 lg:-mx-8">
      <div
        className="relative w-full overflow-visible"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={handleClickCapture}
        style={{ touchAction: 'pan-y' }}
      >
        <div
          ref={trackRef}
          className="flex min-w-max items-end gap-6 cursor-grab select-none active:cursor-grabbing"
          draggable={false}
        >
          {loopedServices.map((service, index) => (
            <motion.div
              key={`${service.id}-${index}`}
              whileHover={{ y: -25, scale: 1.05, rotateX: -15, zIndex: 50 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className={`group relative h-auto w-[280px] shrink-0 pointer-events-auto select-none sm:w-[320px] ${HERO_CARD_HEIGHTS[index % HERO_CARD_HEIGHTS.length]}`}
              style={{
                opacity: 1,
                transformStyle: 'preserve-3d',
                transformPerspective: 1000,
                transformOrigin: 'center center',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                zIndex: 1,
                willChange: 'transform',
              }}
            >
              <div
                className={`relative h-full w-full overflow-hidden rounded-2xl ${HERO_CARD_BACKGROUNDS[index % HERO_CARD_BACKGROUNDS.length]}`}
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover object-top pointer-events-none transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="eager"
                  fetchPriority={index >= services.length && index < services.length * 2 ? 'high' : 'auto'}
                  decoding="async"
                  draggable={false}
                />

                <a
                  href={`#service-${service.id}`}
                  className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 backdrop-blur-md transition-colors duration-200 hover:bg-black/35"
                >
                  <span className="text-[10px] uppercase tracking-[0.28em] text-white/92">
                    Serviço {String((index % services.length) + 1).padStart(2, '0')}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/92" strokeWidth={1.8} />
                </a>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-white/70">
                    {service.capabilities[0]}
                  </p>
                  <h2 className="text-2xl leading-none tracking-tight text-white sm:text-[2rem]">
                    {service.title}
                  </h2>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MarqueeColumn = ({ images, reverse = false }) => {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden pt-4">
      <motion.div
        className="flex w-full flex-col gap-4"
        animate={{ y: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
      >
        {[...images, ...images].map((src, i) => (
          <div
            key={i}
            className="relative w-full shrink-0 overflow-hidden rounded-xl border border-[#ff3b00]/10 bg-card pt-[100%]"
          >
            <img
              alt="Process detail"
              className="absolute inset-0 h-full w-full object-cover grayscale opacity-60 transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              src={src}
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const ServicesSectionTitle = ({ scrollYProgress, total }) => {
  const segmentSize = 1 / (total + 1);
  const opacity = useTransform(
    scrollYProgress,
    [0, segmentSize * 0.1, segmentSize * 0.3, segmentSize * 0.5],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [0, segmentSize * 0.1], [40, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 z-0 flex items-center justify-center"
    >
      <div className="px-6 text-center">
        <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-[#ff3b00]">
          O que fazemos
        </span>
        <h2 className="text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-tight text-primary">
          Áreas de Expertise
        </h2>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const heroRef = useRef(null);
  const sectionRef = useRef(null);
  const total = SERVICES.length;

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const { scrollYProgress: servicesProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.97]);

  return (
    <div className="bg-base">
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen w-full overflow-hidden bg-base"
      >
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,154,106,0.18),transparent_30%),radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.9),transparent_18%),linear-gradient(180deg,#f4ede5_0%,#f7f3ec_52%,#f7f3ec_100%)]" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] items-center justify-center px-4 pt-20 sm:px-6 md:pt-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex w-full max-w-[1120px] -translate-y-12 flex-col items-center pb-[21rem] text-center sm:-translate-y-14 sm:pb-[22rem] md:-translate-y-[4.5rem] md:pb-[23rem] lg:-translate-y-20 lg:pb-[24rem]"
          >
            <div className="flex flex-col items-center gap-6 sm:gap-7 md:gap-8">
              <h1 className="max-w-[13.4ch] text-[clamp(2.45rem,4.15vw,4rem)] leading-[0.97] tracking-[-0.035em] text-primary md:max-w-none">
                <span className="md:block">Design estratégico</span>
                <span className="md:block">para marcas que desejam</span>
                <span className="md:block">ser memoráveis.</span>
              </h1>
              <p className="max-w-[43rem] text-[15px] leading-[1.68] text-secondary sm:text-[1.02rem] md:text-[1.08rem]">
                Trabalhamos com líderes, empresas e organizações para transformar visão em posicionamento, estratégia em marca e identidade em sistemas capazes de sustentar crescimento, diferenciação e valor no longo prazo.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3 }}
          className="absolute inset-x-0 bottom-8 z-10 h-[320px] overflow-visible sm:bottom-10 sm:h-[360px] md:bottom-14 md:h-[380px]"
        >
          <InfiniteServicesGallery services={SERVICES} />
        </motion.div>
      </motion.section>

      <div
        ref={sectionRef}
        style={{ height: `${(total + 1) * 150}vh` }}
        className="relative"
      >
        <div id="services-overview" className="absolute top-0 h-px w-full scroll-mt-24" />
        {SERVICES.map((service, idx) => (
          <div
            key={`anchor-${service.id}`}
            id={`service-${service.id}`}
            className="absolute left-0 right-0 h-px -translate-y-24 scroll-mt-24"
            style={{ top: getServiceAnchorTop(idx, total) }}
          />
        ))}

        <div className="sticky top-0 h-screen w-full overflow-hidden bg-base">
          <ServicesSectionTitle scrollYProgress={servicesProgress} total={total} />

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

      <section className="w-full overflow-hidden border-y border-borderline/50 bg-base">
        <div className="site-gutter-menu w-full py-24 md:py-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-3 lg:gap-16">
            <div className="flex flex-col lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-12 md:mb-16"
              >
                <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-[#ff3b00]">
                  Processo
                </span>
                <h2 className="mb-6 text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-tight text-primary">
                  Como transformamos visão em marca
                </h2>
                <p className="max-w-2xl text-base text-secondary sm:text-lg">
                  Mergulhamos na essência do seu negócio para criar identidades autênticas, combinando estratégia profunda e design impecável em cada etapa do nosso método.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
                {PROCESS_STEPS.map((step, idx) => {
                  const Icon = step.icon;

                  return (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#ff3b00]/15 bg-[#ff3b00]/5 shadow-lg">
                        <Icon className="h-6 w-6 text-[#ff3b00]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="mb-2 text-sm font-medium tracking-tight text-primary sm:text-lg">
                          {step.title}
                        </h3>
                        <p className="max-w-[30ch] text-sm leading-relaxed text-muted">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="relative mt-10 h-[400px] lg:col-span-1 lg:mt-0 lg:h-[700px] xl:ml-8">
              <div className="relative grid h-full grid-cols-2 gap-4 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 z-10 block pointer-events-none">
                  <div className="absolute left-0 right-0 top-0 h-24 bg-gradient-to-b from-[#f7f3ec] to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f7f3ec] to-transparent" />
                </div>

                <MarqueeColumn
                  images={[
                    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2000&auto=format&fit=crop',
                  ]}
                />
                <MarqueeColumn
                  images={[
                    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
                  ]}
                  reverse={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col items-center justify-center px-6 py-32 md:py-44">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <span className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff3b00]">
            Pronto para começar?
          </span>
          <h2 className="mb-12 max-w-2xl text-[clamp(1.5rem,3.5vw,3rem)] leading-[1.15] tracking-tight text-primary text-balance">
            Vamos criar uma marca que o mundo vai lembrar.
          </h2>

          <Link
            to="/contact"
            className="group relative inline-flex shrink-0 overflow-hidden rounded-full border border-[#ff3b00] bg-surface whitespace-nowrap"
          >
            <div className="relative flex h-[60px] w-[240px] flex-col md:h-[70px] md:w-[280px]">
              <div className="flex h-full w-full items-center justify-center bg-transparent transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
                <span className="text-sm font-semibold uppercase leading-none tracking-widest text-primary md:text-base">
                  Vamos Criar Agora
                </span>
              </div>
              <div
                className="absolute inset-0 flex h-full w-full translate-y-full items-center justify-center bg-[#ff3b00] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0"
                aria-hidden="true"
              >
                <span className="text-sm font-semibold uppercase leading-none tracking-widest text-white md:text-base">
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

export default Services;
