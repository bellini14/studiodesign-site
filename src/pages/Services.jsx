import Section from '../components/layout/Section';
import { SERVICES } from '../data/content';

const Services = () => {
  return (
    <div className="pt-24">

      <Section py="py-32 md:py-48 border-b border-borderline/50">
        <h1 className="text-display md:text-display-lg font-medium tracking-tight max-w-4xl text-balance">
          Services
        </h1>
        <p className="text-h3 text-secondary max-w-3xl text-balance mt-8 leading-relaxed font-normal">
          End-to-end design intelligence focused on brand, digital, and creative direction.
        </p>
      </Section>

      <Section py="py-0">
        <div className="flex flex-col">
          {SERVICES.map((service, idx) => (
            <div key={service.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 py-20 md:py-28 border-b border-borderline/50 hover:bg-surface transition-colors group px-6 md:px-12 -mx-6 md:-mx-12 cursor-default">
              
              <div className="md:col-span-1 flex items-start group-hover:translate-x-2 transition-transform duration-500 mt-2">
                <span className="text-overline font-mono tracking-widest text-accent/70 group-hover:text-accent transition-colors">0{idx + 1}</span>
              </div>
              
              <div className="md:col-span-5 md:pr-12">
                <h2 className="text-h2 md:text-h1 font-medium tracking-tight mb-4 group-hover:text-primary text-secondary transition-colors duration-300">{service.title}</h2>
              </div>
              
              <div className="md:col-span-6 flex items-center">
                <p className="text-body-lg text-muted leading-relaxed font-normal">{service.description}</p>
              </div>

            </div>
          ))}
        </div>
      </Section>

    </div>
  );
};

export default Services;
