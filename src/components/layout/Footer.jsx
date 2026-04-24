import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../../data/content';
import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import Mosaic from '../backgrounds/Mosaic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '../../lib/utils';

const AnimatedLetter = ({ letter, index, scrollYProgress }) => {
  const y = useTransform(scrollYProgress, [0, 1], [150 + (index * 40), 0]);

  return (
    <motion.span style={{ y }} className="inline-block">
      {letter}
    </motion.span>
  );
};

const SocialIcon = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className="group relative"
  >
    <div className="w-11 h-11 rounded-full border border-borderline/60 flex items-center justify-center transition-all duration-400 ease-out group-hover:border-accent group-hover:bg-accent/10 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,106,0,0.15)]">
      <Icon className="w-[18px] h-[18px] text-muted transition-colors duration-300 group-hover:text-accent" strokeWidth={1.5} />
    </div>
  </a>
);

const Footer = ({ className = '', revealTargetRef }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: revealTargetRef || containerRef,
    offset: ["start end", "end end"]
  });
  const revealY = useTransform(scrollYProgress, [0, 1], ['22vh', '0vh']);

  return (
    <motion.footer
      ref={containerRef}
      style={{ y: revealY }}
      className={cn(
        'site-gutter-menu relative flex h-screen min-h-screen w-full flex-col overflow-hidden border-t border-borderline/50 bg-surface py-6 text-primary will-change-transform lg:py-12',
        className
      )}
    >
      <Mosaic className="z-0" />

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between flex-1 pointer-events-none">
        
        {/* Top Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center w-full pointer-events-auto"
        >
          {/* CTA - Start a project */}
          <div className="w-full md:w-auto">
            <Link to="/contact" className="group inline-flex min-h-[2.75rem] items-center gap-4">
              <span className="text-3xl md:text-4xl lg:text-5xl font-light leading-none tracking-tight text-primary group-hover:text-accent transition-colors duration-500">
                Start a project
              </span>
              <div className="w-11 h-11 rounded-full border border-borderline/50 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-white group-hover:rotate-45 transition-all duration-500" strokeWidth={1.5} />
              </div>
            </Link>
          </div>
          
          <div className="hidden md:block" aria-hidden="true" />
        </motion.div>

        {/* Center Huge Text */}
        <div className="absolute inset-0 pointer-events-none w-full h-full flex justify-center items-center z-0">
          <h2 
            className="text-[12vw] leading-none text-[#FF3B00] whitespace-nowrap drop-shadow-md menu-logo-text flex"
            style={{ letterSpacing: '-0.02em' }}
          >
            {"studiodesign".split("").map((letter, index) => (
              <AnimatedLetter 
                key={index} 
                letter={letter} 
                index={index} 
                scrollYProgress={scrollYProgress} 
              />
            ))}
          </h2>
        </div>

        {/* Bottom Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-end w-full gap-10 md:gap-0 mt-48 md:mt-0 pointer-events-auto"
        >
          
          {/* Bottom Left — Copyright + Contact */}
          <div className="flex flex-col gap-6">
            {/* Contact Details */}
            <div className="flex flex-col gap-2">
              <a href={`mailto:${CONTACT_INFO.email}`} className="group inline-flex items-center gap-2 text-secondary hover:text-accent text-sm font-medium transition-colors duration-300 w-fit">
                <Mail className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors" strokeWidth={1.5} />
                {CONTACT_INFO.email}
              </a>
              <span className="inline-flex items-center gap-2 text-secondary text-sm">
                <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                {CONTACT_INFO.address}
              </span>
            </div>
            {/* Copyright */}
            <div className="flex items-center gap-3 text-muted text-xs tracking-wide">
              <span>© {new Date().getFullYear()} Studio Design</span>
              <span className="w-1 h-1 rounded-full bg-muted/40"></span>
              <span>Built with precision</span>
            </div>
          </div>
          
          {/* Bottom Right — Social Icons */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <span className="text-xs font-semibold text-muted uppercase tracking-[0.2em]">
              Follow us
            </span>
            <div className="flex items-center gap-3">
              <SocialIcon 
                href={CONTACT_INFO.instagram_url || "https://instagram.com"} 
                icon={Instagram} 
                label="Instagram" 
              />
              <SocialIcon 
                href={CONTACT_INFO.linkedin_url || "https://linkedin.com"} 
                icon={Linkedin} 
                label="LinkedIn" 
              />
            </div>
          </div>

        </motion.div>
        
      </div>
    </motion.footer>
  );
};

export default Footer;
