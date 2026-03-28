import { Link } from 'react-router-dom';
import { CONTACT_INFO, NAV_LINKS } from '../../data/content';
import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, ChevronDown } from 'lucide-react';
import Mosaic from '../backgrounds/Mosaic';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

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

const Footer = () => {
  const containerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  return (
    <footer ref={containerRef} className="relative w-full min-h-[600px] md:min-h-[800px] min-h-screen bg-surface text-primary border-t border-borderline/50 overflow-hidden flex flex-col p-6 md:p-12">
      <Mosaic className="z-0" />

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between flex-1 pointer-events-none">
        
        {/* Top Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start w-full pointer-events-auto"
        >
          {/* CTA - Start a project */}
          <div className="w-full md:w-auto">
            <Link to="/contact" className="group inline-flex items-center gap-5">
              <span className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-primary group-hover:text-accent transition-colors duration-500">
                Start a project
              </span>
              <div className="w-11 h-11 md:w-14 md:h-14 rounded-full border border-borderline/50 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-surface group-hover:rotate-45 transition-all duration-500" strokeWidth={1.5} />
              </div>
            </Link>
          </div>
          
          {/* Interactive Navigation Menu */}
          <div className="mt-10 md:mt-0">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <span className="text-xs font-semibold text-muted uppercase tracking-[0.2em] group-hover:text-primary transition-colors duration-300">
                Menu
              </span>
              <motion.div 
                animate={{ rotate: isMenuOpen ? 180 : 0 }} 
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ChevronDown className="w-4 h-4 text-accent" strokeWidth={2} />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {isMenuOpen && (
                <motion.nav 
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden mt-5"
                >
                  <div className="flex flex-col gap-1 pl-1 border-l border-borderline/40">
                    {NAV_LINKS.map((link, i) => (
                      <motion.div 
                        key={link.name}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ delay: i * 0.06, duration: 0.3 }}
                      >
                        <Link 
                          to={link.path} 
                          className="block pl-4 py-[6px] text-secondary hover:text-accent text-sm font-medium transition-all duration-300 hover:pl-6 relative group"
                        >
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-[1px] bg-accent group-hover:w-3 transition-all duration-300"></span>
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Center Huge Text */}
        <div className="absolute inset-0 pointer-events-none w-full h-full flex justify-center items-center z-0">
          <h2 
            className="text-[12vw] leading-none text-[#FF3B00] whitespace-nowrap opacity-90 drop-shadow-md menu-logo-text flex"
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
              <span className="inline-flex items-center gap-2 text-muted text-sm">
                <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                {CONTACT_INFO.address}
              </span>
            </div>
            {/* Copyright */}
            <div className="flex items-center gap-3 text-muted/60 text-xs tracking-wide">
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
    </footer>
  );
};

export default Footer;
