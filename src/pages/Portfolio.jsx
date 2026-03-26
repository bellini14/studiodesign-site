import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import ProjectCard from '../components/ui/ProjectCard';
import SplitText from '../components/ui/SplitText';

const Portfolio = () => {
  const total = PORTFOLIO_PROJECTS.length;



  return (
    <div className="bg-[#181616] min-h-screen text-[#f6f4d3]">
      {/* Header - Alinhado à mesma métrica de padding do menu (px-8) */}
      <section className="pt-40 pb-20 w-full flex justify-center">
        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center">
          <span className="text-[#ff3b00] text-[0.75rem] font-semibold tracking-[0.2em] uppercase block mb-6">
            Portfólio • {total} projetos
          </span>
          <SplitText
            text="Our Work"
            textAlign="center"
            className="text-[clamp(3.5rem,8vw,7.5rem)] font-semibold tracking-[-0.03em] m-0 leading-none text-[#f6f4d3]"
            delay={20}
            duration={1.2}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
          />
        </div>
      </section>

      {/* Galeria Editorial em Grid Plano
          A ausência do "grid horizontal" antigo libera as colunas para o comportamento em escada puro. */}
      <section className="w-full pb-40 flex justify-center">
        <div className="max-w-7xl w-full px-6 md:px-12">
          <div className="relative mt-12 grid grid-cols-1 md:grid-cols-3 gap-x-[35px] gap-y-[50px] md:gap-y-[115px] w-full">
            {PORTFOLIO_PROJECTS.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
