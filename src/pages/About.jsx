import Section from '../components/layout/Section';
import { ABOUT_CONTENT } from '../data/content';

const About = () => {
  return (
    <div className="pt-24">
      
      <Section py="py-32 md:py-48">
        <h1 className="text-display md:text-display-lg font-medium tracking-tight mb-24 max-w-5xl text-balance">
          We strip complexity to reveal essential truth.
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mt-32 pt-16 border-t border-borderline/50">
          <div className="md:col-span-4 flex items-start">
            <h2 className="text-overline uppercase tracking-widest text-accent mt-2 font-medium">Philosophy</h2>
          </div>
          <div className="md:col-span-8 lg:col-span-8 flex flex-col gap-16 text-h3 md:text-h2 leading-snug font-medium text-primary">
            <p>{ABOUT_CONTENT.philosophy}</p>
            <p className="text-secondary">{ABOUT_CONTENT.focus}</p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface border-y border-borderline/50" py="py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          <div className="md:col-span-12 lg:col-span-12 mb-16 md:mb-24 flex flex-col gap-4">
             <span className="text-overline uppercase tracking-widest text-accent font-medium">Methodology</span>
            <h2 className="text-h2 md:text-h1 font-medium tracking-tight">Our Approach</h2>
          </div>
          
          <div className="md:col-span-4 border-t border-borderline/50 pt-8 mt-4 group hover:-translate-y-2 transition-transform duration-500">
            <span className="text-overline font-mono text-accent/70 tracking-widest block mb-6">01</span>
            <h3 className="text-xl font-medium mb-4 group-hover:text-primary text-secondary transition-colors duration-300">Research & Strategy</h3>
            <p className="text-body text-muted leading-relaxed">We immerse ourselves in your context, challenging assumptions to find the precise problem you need to solve.</p>
          </div>
          
          <div className="md:col-span-4 border-t border-borderline/50 pt-8 mt-4 group hover:-translate-y-2 transition-transform duration-500">
            <span className="text-overline font-mono text-accent/70 tracking-widest block mb-6">02</span>
            <h3 className="text-xl font-medium mb-4 group-hover:text-primary text-secondary transition-colors duration-300">Design Logic</h3>
            <p className="text-body text-muted leading-relaxed">We build systematic visual languages grounded in typography, scale, and proportion rather than trends.</p>
          </div>
          
          <div className="md:col-span-4 border-t border-borderline/50 pt-8 mt-4 group hover:-translate-y-2 transition-transform duration-500">
            <span className="text-overline font-mono text-accent/70 tracking-widest block mb-6">03</span>
            <h3 className="text-xl font-medium mb-4 group-hover:text-primary text-secondary transition-colors duration-300">Execution</h3>
            <p className="text-body text-muted leading-relaxed">We deliver high-fidelity artifacts crafted with absolute precision for immediate impact and longevity.</p>
          </div>
        </div>
      </Section>

    </div>
  );
};

export default About;
