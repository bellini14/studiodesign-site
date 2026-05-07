import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { VerticalCutReveal } from '../components/ui/vertical-cut-reveal';
import { MagneticButton } from '../components/ui/magnetic-button';

const METHOD_STEPS = [
  {
    number: '01',
    title: 'Diagnosticar',
    description:
      'Compreendemos o contexto atual da empresa, seus desafios, ambições e oportunidades de mercado. Investigamos percepção, concorrência, cultura, proposta de valor e pontos de fricção que limitam crescimento e diferenciação.',
    deliverables: [
      'Diagnóstico Estratégico',
      'Análise de Marca e Mercado',
      'Mapeamento Competitivo',
      'Leitura Cultural',
      'Oportunidades de Crescimento',
    ],
  },
  {
    number: '02',
    title: 'Definir',
    description:
      'Transformamos descobertas em direção estratégica. Estruturamos posicionamento, narrativa central, diferenciais competitivos e o espaço que a marca deve ocupar na mente do mercado.',
    deliverables: [
      'Posicionamento de Marca',
      'Plataforma de Marca',
      'Proposta de Valor',
      'Definição de Categoria',
      'Arquitetura de Mensagem',
    ],
  },
  {
    number: '03',
    title: 'Projetar',
    description:
      'Damos forma à estratégia por meio de identidade verbal, visual e sistemas de expressão consistentes. Criamos uma marca preparada para operar em múltiplos canais e evoluir com coerência.',
    deliverables: [
      'Naming',
      'Identidade Visual',
      'Sistema de Marca',
      'Direção de Arte',
      'Guidelines',
    ],
  },
  {
    number: '04',
    title: 'Implementar',
    description:
      'Levamos a marca para a prática. Aplicamos a nova direção em canais, experiências e materiais que tornam a mudança tangível para equipes, clientes e mercado.',
    deliverables: [
      'Website',
      'Experiência Digital',
      'Comunicação Institucional',
      'Materiais Comerciais',
      'Lançamento de Marca',
    ],
  },
  {
    number: '05',
    title: 'Evoluir',
    description:
      'Marca não é entrega final. É ativo vivo. Acompanhamos ajustes, expansão e novos ciclos estratégicos para manter relevância ao longo do tempo.',
    deliverables: [
      'Novos Desdobramentos',
      'Growth Branding',
      'Revisões Estratégicas',
      'Cultura de Marca',
      'Expansão e Reposicionamento',
    ],
  },
];

const PRINCIPLE_LINES = [
  {
    text: 'Não criamos marcas para parecer novas.',
    modifier: '',
  },
  {
    text: 'Criamos marcas para gerar direção, valor e permanência.',
    modifier: 'method-principle__line--accent',
  },
];

const PRINCIPLE_WORD_COUNT = PRINCIPLE_LINES.reduce(
  (total, line) => total + line.text.split(' ').length,
  0
);

const METHOD_CTA_LINES = [
  'Criamos identidades e sistemas visuais que',
  'conectam pensamento estratégico, design',
  'contemporâneo e construção de marca.',
];

const revealViewport = { once: true, amount: 0.22 };
const revealEase = [0.19, 1, 0.22, 1];

const reveal = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: revealEase },
  },
};

const methodStepTitleReveal = {
  rest: {
    opacity: 0.2,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.86, delay: 0.04, ease: revealEase },
  },
};

const methodStepDeliverablesReveal = {
  rest: {
    opacity: 0.24,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.94,
      delay: 0.18,
      ease: revealEase,
    },
  },
};

const methodStepSummaryReveal = {
  rest: {
    opacity: 0.22,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.02, delay: 0.36, ease: revealEase },
  },
};

const ctaLineReveal = {
  hidden: {
    y: '112%',
    opacity: 0,
    filter: 'blur(10px)',
  },
  visible: {
    y: '0%',
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.92,
      ease: revealEase,
    },
  },
};

const Method = () => {
  const stepsRef = useRef(null);
  const principleTextRef = useRef(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [revealedStepIndexes, setRevealedStepIndexes] = useState([0]);
  const [principleProgress, setPrincipleProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const stepIndexMotion = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ['start start', 'end end'],
  });
  const { scrollYProgress: principleScrollYProgress } = useScroll({
    target: principleTextRef,
    offset: ['start 64%', 'end 72%'],
  });

  const updateActiveStep = () => {
    const stepElements = stepsRef.current?.querySelectorAll('.method-step');

    if (!stepElements?.length) return;

    const readingLine = window.innerHeight * 0.5;
    let nextStep = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    stepElements.forEach((stepElement, index) => {
      const stepRect = stepElement.getBoundingClientRect();
      const stepCenter = stepRect.top + stepRect.height / 2;
      const distanceToNumber = Math.abs(stepCenter - readingLine);

      if (distanceToNumber < closestDistance) {
        closestDistance = distanceToNumber;
        nextStep = index;
      }
    });

    setActiveStepIndex((currentStep) => (currentStep === nextStep ? currentStep : nextStep));
  };

  useMotionValueEvent(scrollYProgress, 'change', updateActiveStep);
  useMotionValueEvent(principleScrollYProgress, 'change', (latest) => {
    setPrincipleProgress(Math.min(Math.max(latest, 0), 1));
  });

  useEffect(() => {
    updateActiveStep();
    window.addEventListener('resize', updateActiveStep);

    return () => window.removeEventListener('resize', updateActiveStep);
  }, []);

  useEffect(() => {
    stepIndexMotion.set(activeStepIndex);
    setRevealedStepIndexes((currentIndexes) => (
      currentIndexes.includes(activeStepIndex)
        ? currentIndexes
        : [...currentIndexes, activeStepIndex]
    ));
  }, [activeStepIndex, stepIndexMotion]);

  const activeStepNumber = METHOD_STEPS[activeStepIndex].number;
  const activeStepDigit = activeStepNumber.slice(1);
  const smoothStepIndex = useSpring(stepIndexMotion, prefersReducedMotion
    ? { stiffness: 1000, damping: 120, mass: 0.2 }
    : { stiffness: 165, damping: 16.5, mass: 1.18 }
  );
  const digitReelOffset = useTransform(smoothStepIndex, (latest) => `-${latest}em`);
  let principleWordIndex = 0;

  return (
    <div className="method-page bg-base text-primary">
      <section className="method-hero">
        <div className="method-hero__inner site-gutter-menu">
          <motion.h1
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: revealEase }}
          >
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
              Método StudioDesign
            </VerticalCutReveal>
          </motion.h1>

          <motion.div
            className="method-hero__copy"
            initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.86, delay: 0.1, ease: revealEase }}
          >
            <p className="method-hero__lead">
              Clareza estratégica para construir marcas que crescem, evoluem e permanecem relevantes.
            </p>
            <p>
              Grandes marcas não surgem por acaso. Elas são resultado de visão, método e decisões consistentes ao longo do tempo. Nosso método organiza esse processo em etapas integradas que conectam negócio, percepção e execução.
            </p>
            <p>
              Trabalhamos para transformar complexidade em direção clara, traduzindo estratégia em sistemas de marca aplicáveis à realidade da organização.
            </p>
          </motion.div>
        </div>

        <a className="method-scroll-cue" href="#method-steps" aria-label="Role para ver mais">
          <span className="method-scroll-cue__arrow" aria-hidden="true" />
        </a>
      </section>

      <section id="method-steps" className="method-steps" ref={stepsRef}>
        <div className="method-steps__inner site-gutter-menu">
          <div className="method-scroll-number" aria-hidden="true">
            <span className="method-scroll-number__zero">0</span>
            <span className="method-scroll-number__digit-window">
              <motion.span
                className="method-scroll-number__value method-scroll-number__reel"
                style={{ y: digitReelOffset }}
              >
                {METHOD_STEPS.map((step) => (
                  <span key={step.number}>{step.number.slice(1)}</span>
                ))}
              </motion.span>
            </span>
          </div>
          <div className="method-steps__list">
          {METHOD_STEPS.map((step, index) => {
            const stepRevealState = revealedStepIndexes.includes(index) ? 'visible' : 'rest';

            return (
            <motion.article
              key={step.number}
              className="method-step"
              data-active={index === activeStepIndex ? 'true' : 'false'}
              initial={false}
              animate={stepRevealState}
            >
              <div className="method-step__content">
                <motion.h2 variants={methodStepTitleReveal}>{step.title}</motion.h2>
                <motion.div
                  className="method-step__deliverables"
                  variants={methodStepDeliverablesReveal}
                >
                <h3>Entregas possíveis:</h3>
                <ul>
                  {step.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
                </motion.div>
              </div>
              <motion.aside className="method-step__summary" variants={methodStepSummaryReveal}>
                <p>{step.description}</p>
              </motion.aside>
            </motion.article>
            );
          })}
          </div>
          <span className="sr-only" aria-live="polite">
            Etapa atual {activeStepNumber}
          </span>
        </div>
      </section>

      <section className="method-principle">
        <motion.div
          className="method-principle__inner site-gutter-menu"
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={reveal}
        >
          <p className="method-principle__label">Princípio central</p>
          <blockquote ref={principleTextRef}>
            {PRINCIPLE_LINES.map((line) => (
              <span
                key={line.text}
                className={`method-principle__line ${line.modifier}`.trim()}
              >
                {line.text.split(' ').map((word) => {
                  const wordIndex = principleWordIndex;
                  principleWordIndex += 1;
                  const revealStart = wordIndex / PRINCIPLE_WORD_COUNT;
                  const revealDuration = 1 / PRINCIPLE_WORD_COUNT;
                  const revealAmount = Math.min(
                    Math.max((principleProgress - revealStart) / revealDuration, 0),
                    1
                  );
                  const opacity = 0.08 + revealAmount * 0.92;

                  return (
                    <span
                      key={`${line.text}-${wordIndex}`}
                      className="method-principle__word"
                      style={{ opacity }}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            ))}
          </blockquote>
        </motion.div>
      </section>

      <section className="method-philosophy-cta" aria-labelledby="method-philosophy-title">
        <div className="method-philosophy-cta__inner">
          <h2 id="method-philosophy-title" className="method-philosophy-cta__label">
            Philosophy
          </h2>

          <div className="method-philosophy-cta__copy">
            <motion.p
              className="method-philosophy-cta__text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.58 }}
              transition={{ staggerChildren: 0.12, delayChildren: 0.08 }}
            >
              {METHOD_CTA_LINES.map((line) => (
                <span key={line} className="method-philosophy-cta__line">
                  <motion.span variants={ctaLineReveal}>{line}</motion.span>
                </span>
              ))}
            </motion.p>
          </div>

          <MagneticButton distance={0.35}>
            <Link
              to="/contact"
              className="philosophy-cta method-philosophy-cta__button"
            >
              <div className="philosophy-cta__shell method-philosophy-cta__button-shell">
                <div className="philosophy-cta__face philosophy-cta__face--base">
                  <span className="philosophy-cta__label philosophy-cta__label--base method-philosophy-cta__button-label method-philosophy-cta__button-label--base">
                    Vamos Criar Agora
                  </span>
                </div>
                <div className="philosophy-cta__face philosophy-cta__face--hover" aria-hidden="true">
                  <span className="philosophy-cta__label philosophy-cta__label--hover method-philosophy-cta__button-label method-philosophy-cta__button-label--hover">
                    Vamos Criar Agora
                  </span>
                </div>
              </div>
            </Link>
          </MagneticButton>
        </div>
      </section>
    </div>
  );
};

export default Method;
