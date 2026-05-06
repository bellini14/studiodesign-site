import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import BorderGlow from '../components/ui/BorderGlow';

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

const MANIFESTO_BLOCKS = [
  {
    label: 'O que nos move',
    title: 'Marcas relevantes não são ornamentos do negócio.',
    copy:
      'São estruturas de valor que orientam decisões, fortalecem cultura, ampliam reconhecimento e sustentam crescimento no longo prazo.',
  },
  {
    label: 'Como atuamos',
    title: 'Da ambição à direção. Da direção ao sistema.',
    copy:
      'Trabalhamos ao lado de líderes, fundadores e organizações para traduzir ambição em direção estratégica e direção estratégica em sistemas de marca aplicáveis ao mundo real.',
  },
  {
    label: 'Nosso diferencial',
    title: 'Não oferecemos apenas execução criativa.',
    copy:
      'Entregamos repertório, método e continuidade, combinando a solidez de um legado com a energia necessária para construir o próximo ciclo do seu negócio.',
  },
];

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
  hidden: { opacity: 0, y: 44, scale: 0.92, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.68, ease: revealEase },
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
  const [activeNodes, setActiveNodes] = useState([]);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: timelineProgress } = useScroll({
    target: trackRef,
    offset: ['start 58%', 'end 58%'],
  });
  const yearY = useTransform(scrollYProgress, [0, 0.32], prefersReducedMotion ? ['0%', '0%'] : ['0%', '-18%']);
  const yearScale = useTransform(scrollYProgress, [0, 0.28], prefersReducedMotion ? [1, 1] : [1, 0.92]);
  const timelineScale = useTransform(timelineProgress, (value) => (prefersReducedMotion ? 1 : value));

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
            <span>Três gerações</span>
            <span>construindo marcas.</span>
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
      </section>

      <section className="about-timeline site-gutter-menu" aria-label="Linha do tempo StudioDesign">
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

          {TIMELINE_ENTRIES.map((entry, index) => (
            <motion.article
              className={`about-timeline__entry about-timeline__entry--${index % 2 === 0 ? 'left' : 'right'}`}
              key={entry.label}
            >
              <motion.div
                className="about-timeline__node"
                ref={(node) => {
                  nodeRefs.current[index] = node;
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={
                  activeNodes.includes(index)
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
              <motion.div
                className="about-timeline__body"
                initial="hidden"
                animate={activeNodes.includes(index) ? 'visible' : 'hidden'}
                variants={timelineCard}
              >
                <BorderGlow
                  className="about-timeline__glow-card"
                  edgeSensitivity={14}
                  glowColor="14 100 64"
                  backgroundColor="rgba(238, 233, 223, 0.92)"
                  borderRadius={8}
                  glowRadius={48}
                  glowIntensity={1.55}
                  coneSpread={28}
                  animated={index === 0}
                  colors={['#ff3b00', '#ff8a3d', '#ffd2b8']}
                  fillOpacity={0.34}
                >
                  <div className="about-timeline__meta">
                    <span>0{index + 1}</span>
                    <strong>{entry.year}</strong>
                  </div>
                  <div className="about-timeline__copy">
                    <p>{entry.label}</p>
                    <h3>{entry.title}</h3>
                    <p>{entry.copy}</p>
                  </div>
                </BorderGlow>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="about-manifest__blocks site-gutter-menu">
        {MANIFESTO_BLOCKS.map((block, index) => (
          <motion.article
            className="about-manifest__block"
            key={block.label}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.span variants={reveal}>0{index + 1}</motion.span>
            <motion.div variants={reveal}>
              <p>{block.label}</p>
              <h2>{block.title}</h2>
            </motion.div>
            <motion.p variants={reveal}>{block.copy}</motion.p>
          </motion.article>
        ))}
      </section>

      <section className="about-manifest__closing site-gutter-menu">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.38 }}
          variants={stagger}
        >
          <motion.p variants={reveal}>Da estratégia ao design, da percepção à experiência.</motion.p>
          <motion.h2 variants={reveal}>
            Criamos marcas preparadas para evoluir com o tempo.
          </motion.h2>
          <motion.div variants={reveal}>
            <Link className="about-manifest__link" to="/contact">
              Começar o próximo ciclo
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
