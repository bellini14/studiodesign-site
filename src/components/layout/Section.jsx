const Section = ({ 
  children, 
  className = "", 
  containerClass = "site-shell",
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
