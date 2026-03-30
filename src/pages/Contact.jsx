import Section from '../components/layout/Section';
import { CONTACT_INFO } from '../data/content';
import { Button } from '../components/ui/Button';

const Contact = () => {
  return (
    <div className="pt-24">

      <Section py="py-32 md:py-48">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          <div className="md:col-span-12 lg:col-span-6 flex flex-col gap-24">
            <h1 className="text-display md:text-display-lg font-medium tracking-tight text-balance">
              Let's talk.
            </h1>
            
            <div className="flex flex-col gap-12 text-xl font-medium">
              <div>
                <p className="text-overline font-medium text-accent uppercase tracking-widest mb-4">New Business</p>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-h3 hover:text-accent transition-colors inline-block border-b border-primary/20 hover:border-accent pb-1">
                  {CONTACT_INFO.email}
                </a>
              </div>
              
              <div>
                <p className="text-overline font-medium text-accent uppercase tracking-widest mb-4">Address</p>
                <p className="text-body-lg text-white font-normal">{CONTACT_INFO.address}</p>
              </div>

              <div>
                <p className="text-overline font-medium text-accent uppercase tracking-widest mb-4">Social</p>
                <div className="flex gap-8 text-body-lg text-white font-normal">
                  <a href="#" className="hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1">{CONTACT_INFO.instagram}</a>
                  <a href="#" className="hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1">{CONTACT_INFO.linkedin}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-12 lg:col-span-1 border-l border-borderline/50 hidden lg:block"></div>

          <div className="md:col-span-12 lg:col-span-5 pt-8 lg:pt-0">
            <form className="flex flex-col gap-10 bg-surface p-8 md:p-12 lg:p-16 rounded shadow-lg border border-borderline/30" onSubmit={(e) => e.preventDefault()}>
              <h3 className="text-2xl font-medium tracking-tight mb-4">Send a message</h3>
              
              <div className="flex flex-col gap-2 group">
                <label htmlFor="name" className="text-overline font-medium text-white group-focus-within:text-accent uppercase tracking-widest transition-colors">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="bg-transparent border-b border-borderline focus:border-accent focus:outline-none py-3 transition-colors text-lg placeholder-muted/50 text-primary font-normal"
                  placeholder="Jane Doe"
                />
              </div>
              
              <div className="flex flex-col gap-2 group">
                <label htmlFor="email" className="text-overline font-medium text-white group-focus-within:text-accent uppercase tracking-widest transition-colors">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="bg-transparent border-b border-borderline focus:border-accent focus:outline-none py-3 transition-colors text-lg placeholder-muted/50 text-primary font-normal"
                  placeholder="jane@example.com"
                />
              </div>

              <div className="flex flex-col gap-2 group">
                <label htmlFor="message" className="text-overline font-medium text-white group-focus-within:text-accent uppercase tracking-widest transition-colors">Message</label>
                <textarea 
                  id="message" 
                  rows="4"
                  className="bg-transparent border-b border-borderline focus:border-accent focus:outline-none py-3 transition-colors text-lg placeholder-muted/50 text-primary resize-none font-normal"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button type="submit" className="w-full mt-8">Submit message</Button>
            </form>
          </div>

        </div>
      </Section>

    </div>
  );
};

export default Contact;
