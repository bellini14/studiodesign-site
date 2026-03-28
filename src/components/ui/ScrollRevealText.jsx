import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  // We use string mapping for filter
  const blurValue = useTransform(progress, range, [10, 0]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <motion.span
      style={{
        opacity,
        filter,
        display: "inline-block",
        marginRight: "0.25em",
        willChange: "opacity, filter",
      }}
    >
      {children}
    </motion.span>
  );
};

const ScrollRevealText = ({ text, className }) => {
  const containerRef = useRef(null);
  
  // The animation starts slightly earlier (95%)
  // and finishes much sooner (when bottom hits 80% of viewport)
  // this makes it feel considerably faster and requires less scrolling.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "end 80%"],
  });

  const words = text.split(" ");

  return (
    <div 
      ref={containerRef} 
      className={className} 
      style={{ display: "inline-block", width: "100%" }}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        // slightly overlapping ranges to make it smoother
        const end = Math.min((i + 2) / words.length, 1);
        
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
};

export default ScrollRevealText;
