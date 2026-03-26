import { Link } from 'react-router-dom';
import { CONTACT_INFO, NAV_LINKS } from '../../data/content';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-surface text-primary pt-32 pb-16 flex justify-center items-center border-t border-borderline/50">
      <div className="max-w-7xl w-full px-6 md:px-12 flex flex-col gap-24">
        
        {/* Top Huge CTA */}
        <div className="flex flex-col gap-6 items-start">
          <p className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">Start a project</p>
          <Link to="/contact" className="group flex items-center gap-6 text-6xl md:text-8xl font-bold tracking-tighter hover:text-accent transition-colors duration-500">
            Let's talk <ArrowUpRight className="group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-500 w-16 h-16 md:w-20 md:h-20" strokeWidth={1.5} />
          </Link>
        </div>

        {/* Grid links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-borderline pt-16">
          
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-semibold text-muted uppercase tracking-[0.2em]">Navigation</h4>
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link key={link.name} to={link.path} className="text-secondary hover:text-accent transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-semibold text-muted uppercase tracking-[0.2em]">Social</h4>
            <div className="flex flex-col gap-3 text-secondary">
              <a href="#" className="hover:text-accent transition-colors">{CONTACT_INFO.instagram}</a>
              <a href="#" className="hover:text-accent transition-colors">{CONTACT_INFO.linkedin}</a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-semibold text-muted uppercase tracking-[0.2em]">Contact</h4>
            <div className="flex flex-col gap-3 text-secondary">
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-accent transition-colors">{CONTACT_INFO.email}</a>
              <p className="text-muted">{CONTACT_INFO.address}</p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex justify-between items-center text-sm text-muted pt-8 border-t border-borderline">
          <p>© {new Date().getFullYear()} Studio Design. All rights reserved.</p>
          <p>Built with precision.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
