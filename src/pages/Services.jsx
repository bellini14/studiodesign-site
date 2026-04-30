import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Compass,
  Layers,
  Monitor,
  Palette,
  Rocket,
  Search,
  Sparkles,
} from 'lucide-react';
import { SERVICES } from '../data/content';
import { scrollToAnchorTarget } from '../utils/anchorScroll';

const ICONS = [Sparkles, Palette, Compass, Monitor];

const SERVICE_INTENTS = [
  'Clarificar o lugar que a marca ocupa e a conversa que ela lidera.',
  'Construir uma linguagem visual reconhecível, consistente e fácil de aplicar.',
  'Definir a expressão criativa para campanhas, conteúdos e experiências.',
  'Converter estratégia em interfaces digitais claras, desejáveis e escaláveis.',
];

const SERVICE_METRICS = [
  ['Norte estratégico', 'Sistema verbal', 'Arquitetura'],
  ['Marca gráfica', 'Kit visual', 'Guidelines'],
  ['Direção de arte', 'Biblioteca visual', 'Ritmo editorial'],
  ['UX/UI', 'Protótipos', 'Design system'],
];

const SPECIALTY_AREAS = [
  {
    title: 'Estratégia',
    desc: 'Posicionamento, arquitetura de marca e definição de categoria.',
  },
  {
    title: 'Identidade',
    desc: 'Design visual, narrativas, tom de voz e sistemas tipográficos.',
  },
  {
    title: 'Experiência',
    desc: 'Produtos digitais, interfaces, websites e interações de marca.',
  },
  {
    title: 'Estruturas',
    desc: 'Design systems, guidelines corporativos e cultura interna.',
  },
];

const PROCESS_STEPS = [
  {
    icon: Search,
    number: '01',
    title: 'Imersão & Estratégia',
    desc: 'Entendemos contexto, público, ambição e território competitivo antes de desenhar qualquer expressão.',
  },
  {
    icon: Palette,
    number: '02',
    title: 'Direção de Marca',
    desc: 'Traduzimos posicionamento em linguagem visual, verbal e sensorial com critério de aplicação real.',
  },
  {
    icon: Layers,
    number: '03',
    title: 'Sistema & Aplicações',
    desc: 'Expandimos a marca em componentes, regras e materiais que mantêm consistência sem engessar o uso.',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Entrega & Ativacao',
    desc: 'Organizamos arquivos, guias e direcionamentos para a equipe operar a marca com autonomia.',
  },
];

const SERVICES_HERO_TEXT =
  'Trabalhamos com líderes, empresas e organizações para transformar visão em posicionamento, estratégia em marca e identidade em sistemas capazes de sustentar crescimento, diferenciação e valor no longo prazo.';

const ServiceChapter = ({ service, idx }) => {
  const chapterRef = useRef(null);
  const Icon = ICONS[idx % ICONS.length];
  const isEven = idx % 2 === 0;
  const { scrollYProgress } = useScroll({
    target: chapterRef,
    offset: ['start end', 'end start'],
  });

  const depthOpacity = useTransform(scrollYProgress, [0, 0.42, 0.72, 1], [0, 0.06, 0.24, 0.36]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={chapterRef}
      id={`service-${service.id}`}
      className="service-chapter relative w-full scroll-mt-24 border-t border-primary/8 bg-base"
      style={{ '--chapter-index': idx }}
    >
      <motion.div className="service-chapter__panel site-gutter-menu relative w-full">
        <div className="service-chapter__stack">
          <div className="service-chapter__title-card">
            <h3>{service.title}</h3>
            <span>0{idx + 1}</span>
          </div>

          <div className="service-chapter__content-card">
            <div className="service-chapter__copy-card">
              <p>{service.description}</p>

              <div className="service-chapter__details">
                <div className="service-chapter__capabilities">
                  {service.capabilities.map((cap) => (
                    <span key={cap}>{cap}</span>
                  ))}
                </div>
                <span className="service-chapter__cta">Inquire now</span>
              </div>
            </div>

            <div className="service-chapter__visual-card">
              <motion.img
                src={service.bgImage}
                alt={service.title}
                loading="lazy"
                style={{ y: imageY }}
              />
            </div>
          </div>
        </div>
        <motion.div className="grid gap-10 lg:grid-cols-[0.36fr_1.18fr_0.7fr] lg:gap-12">
          <aside
            className="service-chapter__rail order-1 flex flex-row gap-4 lg:flex-col lg:justify-between"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#ff3b00]/20 bg-[#ff3b00]/8">
              <Icon className="h-5 w-5 text-[#ff3b00]" strokeWidth={1.5} />
            </div>
            <div className="lg:mt-auto">
              <span className="block text-[clamp(4.2rem,8vw,7.8rem)] font-bold leading-[0.9] tracking-tighter text-primary/15">
                0{idx + 1}
              </span>
              <p className="mt-3 max-w-[18rem] text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {SERVICE_INTENTS[idx]}
              </p>
            </div>
          </aside>

          <motion.div
            className={`service-chapter__image group relative order-2 overflow-hidden ${isEven ? '' : 'lg:order-3'}`}
          >
            <div className="relative aspect-[4/3] min-h-[360px] w-full overflow-hidden rounded-[1.4rem] bg-primary/5 md:aspect-[5/4]">
              <motion.img
                src={service.bgImage}
                alt={service.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)]"
                loading="lazy"
                style={{ y: imageY }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,15,0)_0%,rgba(20,17,15,0.22)_48%,rgba(20,17,15,0.76)_100%)]" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4">
                <span className="max-w-[12rem] text-xs font-semibold uppercase tracking-[0.22em] text-white/74">
                  {service.capabilities[0]}
                </span>
                <span className="rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-md">
                  Chapter 0{idx + 1}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`order-3 flex flex-col justify-center ${isEven ? '' : 'lg:order-2'}`}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#ff3b00]" />
              <span className="text-xs font-semibold uppercase tracking-[0.26em] text-[#ff3b00]">
                Serviço 0{idx + 1}
              </span>
            </div>

            <h3 className="mb-6 text-[clamp(2.15rem,4.4vw,4.1rem)] font-semibold leading-[0.95] tracking-tight text-primary">
              {service.title}
            </h3>

            <p className="mb-8 max-w-xl text-[clamp(0.96rem,1vw,1.08rem)] leading-[1.76] text-secondary">
              {service.description}
            </p>

            <div className="mb-8 grid gap-2">
              {service.capabilities.map((cap) => (
                <div
                  key={cap}
                  className="group flex items-center gap-3 border-t border-primary/8 py-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors group-hover:bg-[#ff3b00]">
                    <Check className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <span className="text-sm font-medium tracking-tight text-primary">{cap}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {SERVICE_METRICS[idx].map((metric) => (
                <div
                  key={metric}
                  className="service-token border border-primary/10 bg-white/30 px-3 py-3 text-center backdrop-blur-sm"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {metric}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="service-chapter__depth-overlay"
          style={{ opacity: depthOpacity }}
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
};

const Services = () => {
  const { hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hash) {
      return;
    }

    const target = document.getElementById(hash.slice(1));

    if (!target) {
      return;
    }

    scrollToAnchorTarget(target);
  }, [hash]);

  const handleSpecialtyAnchorClick = (event, serviceId) => {
    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    scrollToAnchorTarget(document.getElementById(`service-${serviceId}`));
    navigate(`#service-${serviceId}`);
  };

  return (
    <div className="services-page bg-base">
      <section className="services-hero relative w-full bg-base">
        <div className="site-gutter-menu mx-auto flex min-h-screen w-full flex-col items-start justify-start pb-12 pt-24 sm:pt-24 md:pb-20 md:pt-24">
          <div className="flex min-h-[calc(100svh-9rem)] w-full max-w-[68rem] flex-col items-start justify-between text-left md:min-h-[calc(100svh-11rem)]">
            <motion.h1
              className="services-hero-title text-[#ff3b00]"
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              SERVIÇOS
            </motion.h1>

            <motion.p
              className="services-hero-copy max-w-[56rem]"
              initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.19, 1, 0.22, 1] }}
            >
              {SERVICES_HERO_TEXT}
            </motion.p>

            <motion.div
              className="services-hero-ctas flex w-full flex-col items-start justify-start gap-6 sm:w-auto sm:flex-row sm:gap-14"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26, ease: [0.19, 1, 0.22, 1] }}
            >
              <Link
                to="/contact"
                className="services-hero-cta services-hero-cta--primary"
              >
                Entre em contato
              </Link>
              <Link
                to="/portfolio"
                className="services-hero-cta services-hero-cta--secondary"
              >
                Trabalhos
              </Link>
            </motion.div>
          </div>
        </div>

      </section>

      <section id="services-overview" className="services-overview relative w-full overflow-hidden bg-base">
        <div className="site-gutter-menu relative w-full pb-6 pt-28 md:pb-8 md:pt-24">
          <div className="services-overview__inner">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="services-overview__heading"
            >
              <p className="services-overview__kicker">
                O que fazemos
              </p>
              <h2 className="services-overview__headline">
                Construímos estratégia de marca, identidade e experiência como um sistema integrado orientado ao crescimento.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="services-overview__body"
            >
              <p>
                Atuamos da definição de posicionamento e da construção de categorias até a criação de narrativas, identidades visuais, experiências digitais e estruturas de marca que as equipes utilizam no dia a dia. Nosso trabalho une pensamento estratégico e aplicação real para que a marca opere com consistência em produtos, comunicação, marketing e cultura organizacional. O objetivo é simples: criar marcas sólidas, úteis e evolutivas, preparadas para crescer, adaptar-se e permanecer relevantes ao longo do tempo.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-base text-primary">
        <div className="services-index-band site-gutter-menu pb-20">
          <p className="services-index-band__label">
            Áreas de especialização
          </p>
          <div className="services-index-band__grid">
            {SPECIALTY_AREAS.map((area, idx) => {
              const Icon = ICONS[idx % ICONS.length];

              return (
                <a
                  key={area.title}
                  href={`#service-${SERVICES[idx].id}`}
                  onClick={(event) => handleSpecialtyAnchorClick(event, SERVICES[idx].id)}
                  className="services-specialty-card group"
                >
                  <Icon className="services-specialty-card__icon" strokeWidth={1.55} />
                  <span className="services-specialty-card__desc">
                    {area.desc.split(' ').map((word, wordIdx) => (
                      <span
                        key={`${area.title}-${word}-${wordIdx}`}
                        style={{ '--word-index': wordIdx }}
                      >
                        {word}{' '}
                      </span>
                    ))}
                  </span>
                  <span className="services-specialty-card__footer">
                    <span className="services-specialty-card__title">
                      {area.title}
                    </span>
                    <span className="services-specialty-card__arrow" aria-hidden="true">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {SERVICES.map((service, idx) => (
        <ServiceChapter
          key={service.id}
          service={service}
          idx={idx}
        />
      ))}

      <section className="relative w-full overflow-hidden bg-[#14110f]">
        <div className="services-process__field absolute inset-0 pointer-events-none" />
        <div className="site-gutter-menu relative w-full py-28 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-20 grid gap-8 md:mb-24 md:grid-cols-[0.55fr_1fr]"
          >
            <div className="mb-2 flex items-start gap-4">
              <span className="mt-2 h-px w-10 bg-[#ff3b00]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ff8b68]">
                Processo
              </span>
            </div>
            <h2 className="max-w-[17ch] text-[clamp(2.2rem,4.8vw,4.2rem)] font-semibold leading-[1.02] tracking-tight text-white">
              Um método para transformar visão em marca operável.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, idx) => {
              const StepIcon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="group relative min-h-[320px] bg-[#14110f]/92 p-7 transition-colors duration-500 hover:bg-[#1d1815]"
                >
                  <span className="mb-10 block text-[clamp(3rem,6vw,4.6rem)] font-semibold leading-none tracking-tight text-white/8 transition-colors duration-500 group-hover:text-[#ff3b00]/24">
                    {step.number}
                  </span>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-400 group-hover:border-[#ff3b00]/30 group-hover:bg-[#ff3b00]/10">
                    <StepIcon className="h-5 w-5 text-white/60 transition-colors duration-400 group-hover:text-[#ff8b68]" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-4 text-lg font-medium tracking-tight text-white">{step.title}</h3>
                  <p className="max-w-[28ch] text-sm leading-relaxed text-white/50">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-base">
        <div className="services-cta__grid absolute inset-0 pointer-events-none" />
        <div className="relative grid w-full items-center gap-12 site-gutter-menu py-28 md:grid-cols-[0.7fr_1fr] md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75 }}
          >
            <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.25em] text-[#ff3b00]">
              Pronto para começar?
            </span>
            <h2 className="max-w-[13ch] text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[0.98] tracking-tight text-primary">
              Vamos criar uma marca que sabe para onde vai.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-start gap-8 md:items-end md:text-right"
          >
            <p className="max-w-[31rem] text-[clamp(1rem,1.15vw,1.18rem)] leading-[1.72] text-secondary">
              Se a marca precisa amadurecer, reposicionar ou ganhar uma linguagem mais consistente, o primeiro passo é organizar o sistema.
            </p>
            <Link
              to="/contact"
              className="group relative inline-flex shrink-0 overflow-hidden rounded-full border border-[#ff3b00] bg-surface whitespace-nowrap shadow-[0_18px_46px_rgba(255,59,0,0.16)]"
            >
              <div className="relative flex h-[60px] w-[240px] flex-col md:h-[70px] md:w-[280px]">
                <div className="flex h-full w-full items-center justify-center bg-transparent transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
                  <span className="text-sm font-semibold uppercase leading-none tracking-widest text-primary md:text-base">
                    Vamos Criar Agora
                  </span>
                </div>
                <div className="absolute inset-0 flex h-full w-full translate-y-full items-center justify-center bg-[#ff3b00] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0" aria-hidden="true">
                  <span className="text-sm font-semibold uppercase leading-none tracking-widest text-white md:text-base">
                    Vamos Criar Agora
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
