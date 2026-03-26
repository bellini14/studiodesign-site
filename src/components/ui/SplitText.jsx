import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const SplitText = ({
  text,
  className = "",
  delay = 30,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "left",
  onLetterAnimationComplete,
  showCallback,
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: rootMargin, amount: threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible").then(() => {
        if (showCallback && onLetterAnimationComplete) {
          onLetterAnimationComplete();
        }
      });
    }
  }, [isInView, controls, showCallback, onLetterAnimationComplete]);

  // Handle strings like "power3.out" with equivalent framer-motion bezier array
  const springEase = ease === "power3.out" ? [0.215, 0.61, 0.355, 1] : ease;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000, // delay is passed in ms, convert to seconds
      },
    },
  };

  const childVariants = {
    hidden: from,
    visible: { ...to, transition: { duration, ease: springEase } },
  };

  const items = splitType === "words" ? text.split(" ") : text.split("");

  return (
    <motion.div
      ref={containerRef}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      style={{ textAlign, display: "inline-block", width: "100%" }}
    >
      {items.map((item, index) => (
        <motion.span
          key={`${item}-${index}`}
          variants={childVariants}
          style={{
            display: "inline-block",
            whiteSpace: splitType === "words" ? "normal" : "pre",
            marginRight: splitType === "words" && index < items.length - 1 ? "0.3em" : "0",
          }}
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default SplitText;
