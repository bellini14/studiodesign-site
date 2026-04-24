import React, { useState } from 'react';
import { Sparkles, Palette, Compass, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { SERVICES } from '../../data/content';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const visualVariants = {
  hidden: {
    opacity: 0,
    y: 44,
    scale: 0.975,
    clipPath: 'inset(14% 0 0 0 round 28px)',
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    clipPath: 'inset(0% 0 0 0 round 28px)',
    filter: 'blur(0px)',
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
  },
};

const FeatureTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const ICONS = [Sparkles, Palette, Compass, Monitor];

  // Images represent architectural/editorial vibes to match the brand
  const cardsData = [
    {
      cardTitle: "Brand Architecture",
      image: "https://images.unsplash.com/photo-1632085912795-37e28d891fe2?q=80&w=774&auto=format&fit=crop", 
      description: "Comprehensive strategy and positioning to define your core narrative and market presence."
    },
    {
      cardTitle: "Design System",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=774&auto=format&fit=crop",
      description: "Precise, memorable design systems including typography, color palettes, and logo marks."
    },
    {
      cardTitle: "Holistic Vision",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=774&auto=format&fit=crop",
      description: "Guiding the holistic visual outcome across all touchpoints, from photography to spatial design."
    },
    {
      cardTitle: "Digital Experience",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=774&auto=format&fit=crop",
      description: "Premium digital experiences focused on aesthetic refinement, usability, and strategic goals."
    }
  ];

  const generateCard = (cardData, index) => {
    // Determine translation direction based on previous/next state to ensure a smooth slide instead of abrupt jumping
    const isActive = activeIndex === index;
    const isPast = activeIndex > index;
    
    return (
      <div className="absolute w-[min(82%,420px)] mx-auto pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
           style={{
             transform: isActive ? 'translateY(0) scale(1)' : isPast ? 'translateY(-28px) scale(0.98)' : 'translateY(28px) scale(0.98)',
             opacity: isActive ? 1 : 0,
             visibility: isActive ? 'visible' : 'hidden',
             zIndex: isActive ? 20 : 0
           }}>
        
        <div className="rounded-[18px] border border-[#d9d0c3] bg-[#fffaf3] p-6 md:p-8 shadow-[0_20px_60px_rgba(20,17,15,0.12)]">
            <h3 className="text-xl md:text-2xl font-semibold !text-[#14110f] mb-5 tracking-normal leading-tight">
              {cardData.cardTitle}
            </h3>
            <div>
              <p className="text-sm md:text-base leading-relaxed font-normal !text-[#4f4942]">
                {cardData.description}
              </p>
            </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="feature-tabs-copy site-gutter-menu w-full py-24 md:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      variants={sectionVariants}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20 items-center">
        {/* Left Side: Buttons and Text */}
        <div className="flex flex-col lg:pr-8 xl:pr-12">
          <motion.div variants={itemVariants} className="mb-8 md:mb-11">
            <span className="text-xs uppercase tracking-[0.18em] text-accent mb-5 block font-semibold">
              Capabilities
            </span>
            <h2 className="text-[clamp(2.65rem,4.5vw,4.2rem)] font-semibold leading-[0.98] text-primary tracking-normal mb-7">
              Expertise
            </h2>
            <p className="text-base md:text-lg text-secondary max-w-[56ch] leading-relaxed font-normal">
              A comprehensive suite of design and digital services crafted for visionary founders and institutions seeking aesthetic refinement.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full h-px bg-borderline mb-4"></motion.div>

          <motion.div variants={sectionVariants} className="divide-y divide-borderline/70">
            {SERVICES.map((service, index) => {
              const Icon = ICONS[index % ICONS.length];
              const isActive = activeIndex === index;
              return (
                <motion.button
                  key={service.id}
                  variants={itemVariants}
                  onClick={() => setActiveIndex(index)}
                  className={`group w-full text-left grid grid-cols-[2.25rem_1fr_auto] items-center gap-4 py-5 transition-all duration-300 ease-out ${
                    isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                  }`}
                >
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 ${
                    isActive ? 'bg-accent text-white' : 'bg-transparent text-muted group-hover:text-accent'
                  }`}>
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-lg md:text-xl font-semibold leading-tight tracking-normal whitespace-normal break-words">
                      {service.title}
                    </span>
                  </span>
                  <span className={`h-px w-8 transition-all duration-300 ${
                    isActive ? 'bg-accent' : 'bg-borderline group-hover:bg-accent/60'
                  }`} />
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Right Side: Tab Panels */}
        <motion.div variants={visualVariants} className="relative w-full h-full min-h-[440px] md:min-h-[560px] flex items-center justify-center">
          <div className="relative w-full aspect-[4/5] md:aspect-[16/13] lg:aspect-[4/5] rounded-[28px] overflow-hidden bg-hover max-h-[720px] shadow-[0_24px_80px_rgba(20,17,15,0.12)]">
            {/* Dynamic background images kept light to match the site theme */}
            {cardsData.map((data, index) => (
              <img
                key={`bg-${index}`}
                alt={data.cardTitle}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] grayscale brightness-[1.05] contrast-[0.94] saturate-[0.75] ${
                  activeIndex === index ? 'opacity-100 scale-100' : activeIndex > index ? 'opacity-0 scale-[1.03] blur-md -translate-y-5' : 'opacity-0 scale-[1.03] blur-md translate-y-5'
                }`}
                src={data.image}
              />
            ))}
            <div className="absolute inset-0 bg-[#14110f]/10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14110f]/18 via-transparent to-[#fffaf3]/15 pointer-events-none" />
            
            {/* Absolute container that safely stacks all cards ensuring completely solid DOM flow */}
            <div className="absolute inset-0 flex items-center justify-center p-5 md:p-10 pointer-events-none overflow-hidden">
              {cardsData.map((data, index) => (
                <React.Fragment key={`card-${index}`}>
                  {generateCard(data, index)}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeatureTabs;
