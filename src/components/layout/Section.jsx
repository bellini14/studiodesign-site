const Section = ({ 
  children, 
  className = "", 
  containerClass = "max-w-7xl w-full px-6 md:px-12",
  id,
  py = "py-24 md:py-32" // Refined default, but pages will override this for rhythm
}) => {
  return (
    <section id={id} className={`w-full flex justify-center ${py} ${className}`}>
      <div className={containerClass}>
        {children}
      </div>
    </section>
  );
};

export default Section;
