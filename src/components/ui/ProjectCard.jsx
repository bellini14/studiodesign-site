import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

const aspectPatterns = [
  'aspect-[4/5]',  // aspect-small (New Engen)
  'aspect-square', // aspect-medium (Upshop)
  'aspect-[4/3]',  // aspect-large (Stax.ai)
  'aspect-[4/3]',  // aspect-large (Everest ERP)
  'aspect-square', // aspect-medium (Suzy Welch)
  'aspect-[4/5]',  // aspect-small (TechSpeed)
];

const ProjectCard = ({ project, index = 0 }) => {
  const ratioClass = aspectPatterns[index % aspectPatterns.length];
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    if (cardRef.current) observer.observe(cardRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <article 
      ref={cardRef} 
      className={`case-item col-span-1 relative w-full transition-all duration-[1000ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      <Link to={`/work/${project.id || project.slug}`} className="group flex flex-col w-full">
        
        {/* case-item__thumbnail */}
        <div className={`case-item__thumbnail relative w-full ${ratioClass}`}>
          <div className="absolute inset-0 rounded-lg overflow-hidden z-[2]">
            <figure className="media-fill absolute inset-0 m-0">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover opacity-100 transition-transform duration-[850ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
              />
            </figure>
          </div>
        </div>
        
        {/* Text Container */}
        <div className="relative flex flex-col items-start mt-6 transition-colors duration-500 ease-out group-hover:text-[#ff3b00] text-[#F6F4D3]">
          <h3 className="text-xl md:text-[1.75rem] font-medium tracking-tight text-inherit">
            {project.title}
          </h3>
          <div className="text-sm tracking-widest uppercase mt-2 text-inherit font-bold opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            {project.category}
          </div>
        </div>

      </Link>
    </article>
  );
};

export default ProjectCard;
