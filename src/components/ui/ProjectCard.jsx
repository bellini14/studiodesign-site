import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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

  return (
    <motion.article
      className="case-item col-span-1 relative w-full"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
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
        <div className="relative flex flex-col items-start mt-6 transition-colors duration-500 ease-out group-hover:text-[#ff3b00] text-primary">
          <h3 className="text-xl md:text-[1.75rem] font-medium tracking-tight text-inherit">
            {project.title}
          </h3>
          <div className="text-sm tracking-widest uppercase mt-2 text-inherit font-bold transition-opacity duration-300">
            {project.category}
          </div>
        </div>

      </Link>
    </motion.article>
  );
};

export default ProjectCard;
