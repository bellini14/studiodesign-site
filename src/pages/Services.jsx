import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Briefcase,
  Cpu,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Compass,
  Monitor,
  Palette,
  Rocket,
  ShoppingBag,
  Sprout,
  Sparkles,
} from 'lucide-react';
import { SERVICES } from '../data/content';
import { scrollToAnchorTarget } from '../utils/anchorScroll';

const ICONS = [Sparkles, Palette, Compass, Monitor];

const SERVICE_INTENTS = [
  'Clareza para posicionar, diferenciar e conduzir.',
  'Cultura para sustentar a marca na prática.',
  'Identidade para tornar a estratégia reconhecível.',
  'Experiências para conectar marca, utilidade e valor.',
];

const SERVICE_METRICS = [
  ['Diagnóstico', 'Posicionamento', 'Arquitetura'],
  ['Cultura', 'Comportamentos', 'Ativações'],
  ['Identidade verbal', 'Identidade visual', 'Diretrizes'],
  ['Sites', 'UI/UX', 'Interação'],
];

const SPECIALTY_AREAS = [
  {
    title: 'Estratégia de Marca',
    desc: 'Clareza para posicionar, diferenciar e conduzir.',
  },
  {
    title: 'Cultura de Marca',
    desc: 'Cultura para sustentar a marca na prática.',
  },
  {
    title: 'Identidade de Marca',
    desc: 'Identidade para tornar a estratégia reconhecível.',
  },
  {
    title: 'Experiência de Marca',
    desc: 'Experiências para conectar marca, utilidade e valor.',
  },
];


const OPERATING_AREAS = [
  { label: 'Indústria e Manufatura', icon: Factory },
  { label: 'Tecnologia e Software', icon: Cpu },
  { label: 'Consultoria e Serviços B2B', icon: Briefcase },
  { label: 'Saúde e Bem-Estar', icon: HeartPulse },
  { label: 'Varejo e Consumo', icon: ShoppingBag },
  { label: 'Educação', icon: GraduationCap },
  { label: 'Agronegócio', icon: Sprout },
  { label: 'Negócios Familiares', icon: Landmark },
  { label: 'Startups e Scale-ups', icon: Rocket },
];

const OPERATING_AREA_IMAGES = [
  'https://images.unsplash.com/photo-1632085912795-37e28d891fe2?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=900&auto=format&fit=crop',
];

const SERVICES_HERO_TEXT =
  'Trabalhamos com líderes, empresas e organizações para transformar visão em posicionamento, estratégia em marca e identidade em sistemas capazes de sustentar crescimento, diferenciação e valor no longo prazo.';

const ServiceChapter = ({ service, idx, isLast }) => {
  const chapterRef = useRef(null);
  const Icon = ICONS[idx % ICONS.length];
  const isEven = idx % 2 === 0;
  const { scrollYProgress } = useScroll({
    target: chapterRef,
    offset: ['start end', 'end start'],
  });

  const depthOpacity = useTransform(scrollYProgress, [0, 0.42, 0.72, 1], [0, 0.06, 0.24, 0.36]);
  return (
    <section
      ref={chapterRef}
      id={`service-${service.id}`}
      className={`service-chapter relative w-full scroll-mt-24 border-t border-primary/8 bg-base ${isLast ? 'service-chapter--last' : ''}`}
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
          isLast={idx === SERVICES.length - 1}
        />
      ))}

      <section className="operating-areas-section relative w-full overflow-hidden bg-base">
        <div className="site-gutter-menu relative mx-auto w-full py-16 sm:py-20 md:py-24 lg:py-28">
          <div className="operating-areas-section__grid">
            <div className="operating-areas-section__content">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="operating-areas-section__heading"
              >
                <h2>Áreas de Atuação</h2>
              </motion.div>

              <div className="operating-areas-section__list">
                {OPERATING_AREAS.map((area, idx) => {
                  const AreaIcon = area.icon;

                  return (
                    <motion.div
                      key={area.label}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.55, delay: idx * 0.04 }}
                      className="operating-areas-section__item"
                    >
                      <span className="operating-areas-section__icon">
                        <AreaIcon aria-hidden="true" strokeWidth={1.55} />
                      </span>
                      <span>{area.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="operating-areas-section__visual" aria-hidden="true">
              <div className="operating-areas-section__fade operating-areas-section__fade--top" />
              <div className="operating-areas-section__fade operating-areas-section__fade--bottom" />
              <div className="operating-areas-section__column">
                {OPERATING_AREA_IMAGES.map((src, idx) => (
                  <div className="operating-areas-section__tile" key={`left-${src}-${idx}`}>
                    <img src={src} alt="" loading="lazy" />
                  </div>
                ))}
              </div>
              <div className="operating-areas-section__column operating-areas-section__column--offset">
                {[...OPERATING_AREA_IMAGES].reverse().map((src, idx) => (
                  <div className="operating-areas-section__tile" key={`right-${src}-${idx}`}>
                    <img src={src} alt="" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
