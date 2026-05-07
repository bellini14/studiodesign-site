import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import TiltedCard from '../components/ui/TiltedCard';
import { VerticalCutReveal } from '../components/ui/vertical-cut-reveal';

const TIMELINE_ENTRIES = [
  {
    year: '1975',
    label: 'Legado em movimento',
    title: 'A origem de uma trajetória dedicada ao valor das marcas.',
    copy:
      'A StudioDesign nasce da continuidade de um legado iniciado em 1975, atravessando mercado, cultura e tecnologia sem perder o essencial: clareza, consistência e significado.',
  },
  {
    year: '03',
    label: 'Três gerações',
    title: 'Visão transformada em identidade, percepção e valor.',
    copy:
      'Somos a terceira geração de profissionais que transformam visão em identidade, posicionamento em percepção e negócios em ativos de marca duradouros.',
  },
  {
    year: 'Hoje',
    label: 'Pensamento contemporâneo',
    title: 'Experiência acumulada aplicada aos próximos ciclos.',
    copy:
      'Apoiamos empresas em momentos decisivos de crescimento, reposicionamento, transformação e futuro, unindo repertório, método e continuidade.',
  },
];

const MANIFEST_SLIDES = [
  {
    label: 'O que nos move',
    copy: [
      'Acreditamos que marcas relevantes não são ornamentos do negócio. São estruturas de valor que orientam decisões, fortalecem cultura, ampliam reconhecimento e sustentam crescimento no longo prazo.',
    ],
  },
  {
    label: 'Como atuamos',
    copy: [
      'Trabalhamos ao lado de líderes, fundadores e organizações para traduzir ambição em direção estratégica e direção estratégica em sistemas de marca aplicáveis ao mundo real.',
      'Da estratégia ao design, da percepção à experiência, criamos marcas preparadas para evoluir com o tempo.',
    ],
  },
  {
    label: 'Nosso diferencial',
    copy: [
      'Não oferecemos apenas execução criativa. Entregamos repertório, método e continuidade — combinando a solidez de um legado com a energia necessária para construir o próximo ciclo do seu negócio.',
    ],
  },
];

const manifestBackgroundImage = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop';
const manifestSlideDuration = 5200;
const revealEase = [0.19, 1, 0.22, 1];
const viewport = { once: true, amount: 0.24 };

const reveal = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.78, ease: revealEase },
  },
};

const timelineCard = {
  hidden: (side) => ({
    opacity: 0,
    x: side === 'left' ? 18 : -18,
    filter: 'blur(6px)',
  }),
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.16,
      duration: 0.52,
      ease: revealEase,
      opacity: { delay: 0.16, duration: 0.12, ease: 'easeOut' },
      filter: { delay: 0.18, duration: 0.34, ease: revealEase },
    },
  },
};

const stagger = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const About = () => {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef(null);
  const nodeRefs = useRef([]);
  const reachedNodes = useRef(new Set());
  const manifestTimerRef = useRef(null);
  const manifestTimerStartedAt = useRef(0);
  const manifestTimerRemaining = useRef(manifestSlideDuration);
  const [activeNodes, setActiveNodes] = useState([]);
  const [activeManifestIndex, setActiveManifestIndex] = useState(0);
  const [isManifestPaused, setIsManifestPaused] = useState(false);
  const activeManifestSlide = MANIFEST_SLIDES[activeManifestIndex];
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: timelineProgress } = useScroll({
    target: trackRef,
    offset: ['start 58%', 'end 58%'],
  });
  const yearY = useTransform(scrollYProgress, [0, 0.32], prefersReducedMotion ? ['0%', '0%'] : ['0%', '-18%']);
  const yearScale = useTransform(scrollYProgress, [0, 0.28], prefersReducedMotion ? [1, 1] : [1, 0.92]);
  const timelineScale = useTransform(timelineProgress, (value) => (prefersReducedMotion ? 1 : value));

  useEffect(() => {
    if (!prefersReducedMotion) return;

    const allNodeIndexes = TIMELINE_ENTRIES.map((_, index) => index);
    reachedNodes.current = new Set(allNodeIndexes);
    setActiveNodes(allNodeIndexes);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || isManifestPaused) return undefined;

    const duration = manifestTimerRemaining.current;
    manifestTimerStartedAt.current = window.performance.now();
    manifestTimerRef.current = window.setTimeout(() => {
      manifestTimerRemaining.current = manifestSlideDuration;
      setActiveManifestIndex((currentIndex) => (currentIndex + 1) % MANIFEST_SLIDES.length);
    }, duration);

    return () => {
      if (manifestTimerRef.current) {
        window.clearTimeout(manifestTimerRef.current);
      }
    };
  }, [activeManifestIndex, isManifestPaused, prefersReducedMotion]);

  const pauseManifestCarousel = () => {
    if (prefersReducedMotion || isManifestPaused) return;

    if (manifestTimerRef.current) {
      window.clearTimeout(manifestTimerRef.current);
    }

    const elapsed = window.performance.now() - manifestTimerStartedAt.current;
    manifestTimerRemaining.current = Math.max(240, manifestTimerRemaining.current - elapsed);
    setIsManifestPaused(true);
  };

  const resumeManifestCarousel = () => {
    if (prefersReducedMotion || !isManifestPaused) return;

    setIsManifestPaused(false);
  };

  const selectManifestSlide = (index) => {
    manifestTimerRemaining.current = manifestSlideDuration;
    setActiveManifestIndex(index);
  };

  useMotionValueEvent(timelineScale, 'change', (latest) => {
    if (prefersReducedMotion || !trackRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const fillBottom = trackRect.top + trackRect.height * latest;
    const nextActiveNodes = [];

    nodeRefs.current.forEach((node, index) => {
      if (!node || reachedNodes.current.has(index)) return;

      const nodeRect = node.getBoundingClientRect();
      const nodeCenter = nodeRect.top + nodeRect.height / 2;

      if (fillBottom >= nodeCenter) {
        reachedNodes.current.add(index);
        nextActiveNodes.push(index);
      }
    });

    if (nextActiveNodes.length > 0) {
      setActiveNodes((current) => [...current, ...nextActiveNodes]);
    }
  });

  return (
    <div className="about-page about-manifest bg-base text-primary">
      <section className="about-manifest__hero site-gutter-menu">
        <motion.div
          className="about-manifest__hero-copy"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1 variants={reveal}>
            <span className="about-manifest__title-line">
              <VerticalCutReveal
                splitBy="characters"
                staggerDuration={0.025}
                staggerFrom="first"
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 21,
                }}
                containerClassName="method-title-reveal"
                wordLevelClassName="method-title-reveal__word"
                elementLevelClassName="method-title-reveal__char"
              >
                Três gerações
              </VerticalCutReveal>
            </span>
            <span className="about-manifest__title-line">
              <VerticalCutReveal
                splitBy="characters"
                staggerDuration={0.025}
                staggerFrom="first"
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 21,
                  delay: 0.32,
                }}
                containerClassName="method-title-reveal"
                wordLevelClassName="method-title-reveal__word"
                elementLevelClassName="method-title-reveal__char"
              >
                construindo marcas.
              </VerticalCutReveal>
            </span>
          </motion.h1>
        </motion.div>

        <motion.div
          className="about-manifest__year"
          style={{ y: yearY, scale: yearScale }}
          aria-hidden="true"
          initial={{ opacity: 0, filter: 'blur(16px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: revealEase }}
        >
          1975
        </motion.div>

        <motion.div
          className="about-manifest__statement"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p variants={reveal}>
            Desde 1975, transformamos visão em identidade, posicionamento em percepção e negócios em ativos de marca duradouros.
          </motion.p>
        </motion.div>

        <a className="about-scroll-cue" href="#about-timeline" aria-label="Role para ver mais">
          <span className="about-scroll-cue__arrow" aria-hidden="true" />
        </a>
      </section>

      <section id="about-timeline" className="about-timeline site-gutter-menu" aria-label="Linha do tempo StudioDesign">
        <motion.div
          className="about-timeline__intro"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          <motion.p variants={reveal}>Legado em movimento</motion.p>
          <motion.h2 variants={reveal}>
            Acompanhamos mudanças sem abrir mão do que constrói permanência.
          </motion.h2>
        </motion.div>

        <div className="about-timeline__entries">
          <div className="about-timeline__track" aria-hidden="true" ref={trackRef}>
            <motion.span className="about-timeline__track-fill" style={{ scaleY: timelineScale }} />
          </div>

          {TIMELINE_ENTRIES.map((entry, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';
            const isActive = activeNodes.includes(index);

            return (
              <motion.article
                className={`about-timeline__entry about-timeline__entry--${side}`}
                key={entry.label}
              >
                <motion.div
                  className="about-timeline__node"
                  ref={(node) => {
                    nodeRefs.current[index] = node;
                  }}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={
                    isActive
                      ? {
                          scale: [1, 1.28, 1],
                          boxShadow: [
                            '0 0 0 0.35rem rgba(255, 59, 0, 0.08), 0 0 0 1px rgba(247, 243, 236, 0.9)',
                            '0 0 0 0.8rem rgba(255, 59, 0, 0.22), 0 0 0 1px rgba(247, 243, 236, 0.9)',
                            '0 0 0 0.35rem rgba(255, 59, 0, 0.08), 0 0 0 1px rgba(247, 243, 236, 0.9)',
                          ],
                        }
                      : undefined
                  }
                  transition={{ duration: 0.46, ease: revealEase }}
                />
                <div className={`about-timeline__body${isActive ? ' about-timeline__body--active' : ''}`}>
                  <motion.div
                    className={`about-timeline__card-shell about-timeline__card-shell--${side}`}
                    custom={side}
                    initial="hidden"
                    animate={isActive ? 'visible' : 'hidden'}
                    variants={timelineCard}
                  >
                    <TiltedCard
                      containerHeight="auto"
                      containerWidth="100%"
                      imageHeight="auto"
                      imageWidth="100%"
                      rotateAmplitude={7}
                      scaleOnHover={1}
                      showMobileWarning={false}
                      showTooltip={false}
                      figureClassName="about-timeline__tilted-card"
                      cardClassName="about-timeline__glow-card"
                      imageClassName="about-timeline__tilted-base"
                      contentClassName="about-timeline__tilted-content"
                    >
                      <span className="about-timeline__year-mask" aria-hidden="true">
                        {entry.year}
                      </span>
                      <div className="about-timeline__card-content">
                        <div className="about-timeline__meta">
                          <span>0{index + 1}</span>
                        </div>
                        <div className="about-timeline__copy">
                          <p>{entry.label}</p>
                          <h3>{entry.title}</h3>
                          <p>{entry.copy}</p>
                        </div>
                      </div>
                    </TiltedCard>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="about-manifest__essay site-gutter-menu">
        <motion.div
          className="about-manifest__essay-shell"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          <motion.div
            className={`about-manifest__metrics${isManifestPaused ? ' about-manifest__metrics--paused' : ''}`}
            variants={reveal}
          >
            <div className="about-manifest__metrics-copy">
              <p>Manifesto</p>
              <h2>
                <span>{activeManifestSlide.label}</span>
              </h2>
              <Link className="about-manifest__metrics-cta" to="/about#manifesto">
                Saiba mais
              </Link>
            </div>

            <div className="about-manifest__metrics-progress" role="tablist" aria-label="Conteúdos do manifesto">
              {MANIFEST_SLIDES.map((slide, index) => (
                <button
                  key={slide.label}
                  type="button"
                  className={index === activeManifestIndex ? 'about-manifest__metrics-step about-manifest__metrics-step--active' : 'about-manifest__metrics-step'}
                  aria-label={`Ver ${slide.label}`}
                  aria-selected={index === activeManifestIndex}
                  role="tab"
                  onClick={() => selectManifestSlide(index)}
                  style={{ '--manifest-timer-duration': `${manifestSlideDuration}ms` }}
                >
                  <i />
                </button>
              ))}
            </div>

            <div
              className="about-manifest__metrics-visual"
              onPointerEnter={pauseManifestCarousel}
              onPointerLeave={resumeManifestCarousel}
            >
              <div className="about-manifest__metrics-glow" aria-hidden="true" />
              <div
                className="about-manifest__metrics-panel"
                style={{ backgroundImage: `linear-gradient(180deg, rgba(20, 17, 15, 0.68), rgba(20, 17, 15, 0.94)), url(${manifestBackgroundImage})` }}
              >
                {MANIFEST_SLIDES.map((slide, index) => (
                  <article
                    key={slide.label}
                    className={index === activeManifestIndex ? 'about-manifest__metrics-slide about-manifest__metrics-slide--active' : 'about-manifest__metrics-slide'}
                    aria-hidden={index === activeManifestIndex ? 'false' : 'true'}
                    role="tabpanel"
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div className="about-manifest__metrics-slide-copy">
                      {slide.copy.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="about-manifest__metrics-progress about-manifest__metrics-progress--mobile" role="tablist" aria-label="Conteúdos do manifesto no mobile">
              {MANIFEST_SLIDES.map((slide, index) => (
                <button
                  key={`${slide.label}-mobile`}
                  type="button"
                  className={index === activeManifestIndex ? 'about-manifest__metrics-step about-manifest__metrics-step--active' : 'about-manifest__metrics-step'}
                  aria-label={`Ver ${slide.label}`}
                  aria-selected={index === activeManifestIndex}
                  role="tab"
                  onClick={() => selectManifestSlide(index)}
                  style={{ '--manifest-timer-duration': `${manifestSlideDuration}ms` }}
                >
                  <i />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
