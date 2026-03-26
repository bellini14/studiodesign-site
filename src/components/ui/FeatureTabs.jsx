import React, { useState } from 'react';
import { Sparkles, Palette, Compass, Monitor } from 'lucide-react';
import { SERVICES } from '../../data/content';

const FeatureTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const ICONS = [Sparkles, Palette, Compass, Monitor];

  // Images represent architectural/editorial vibes to match the brand
  const cardsData = [
    {
      cardTitle: "Brand Architecture",
      image: "https://images.unsplash.com/photo-1632085912795-37e28d891fe2?q=80&w=774&auto=format&fit=crop", 
      description: "Comprehensive strategy and positioning to define your core narrative and market presence."
    },
    {
      cardTitle: "Design System",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=774&auto=format&fit=crop",
      description: "Precise, memorable design systems including typography, color palettes, and logo marks."
    },
    {
      cardTitle: "Holistic Vision",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09c15468?q=80&w=774&auto=format&fit=crop",
      description: "Guiding the holistic visual outcome across all touchpoints, from photography to spatial design."
    },
    {
      cardTitle: "Digital Experience",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=774&auto=format&fit=crop",
      description: "Premium digital experiences focused on aesthetic refinement, usability, and strategic goals."
    }
  ];

  const generateCard = (cardData, index) => {
    // Determine translation direction based on previous/next state to ensure a smooth slide instead of abrupt jumping
    const isActive = activeIndex === index;
    const isPast = activeIndex > index;
    
    return (
      <div className="absolute w-full max-w-[340px] md:max-w-md mx-auto pointer-events-auto transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
           style={{
             transform: isActive ? 'translateY(0) scale(1)' : isPast ? 'translateY(-100%) scale(0.95)' : 'translateY(100%) scale(0.95)',
             opacity: isActive ? 1 : 0,
             visibility: isActive ? 'visible' : 'hidden', // Ensures invisible cards don't block hovering/clicking
             zIndex: isActive ? 20 : 0
           }}>
        
        {/* Strictly rendering the card with the beige and orange colors as required by the user */}
        <div className="bg-[#0a0a0a]/95 backdrop-blur-xl rounded-2xl p-1.5 shadow-2xl border border-primary/10 ring-1 ring-black/50">
          <div className="bg-[#111111] rounded-xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-6 tracking-tight drop-shadow-md">
              {cardData.cardTitle}
            </h3>
            <div className="space-y-4">
              <p className="text-sm md:text-base text-[#D6D3D1] leading-relaxed font-medium">
                {cardData.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        {/* Left Side: Buttons and Text */}
        <div className="flex flex-col lg:pr-8 xl:pr-12">
          <div className="mb-8 md:mb-12">
            <span className="text-overline uppercase tracking-widest text-accent mb-6 block font-bold">
              Capabilities
            </span>
            <h2 className="text-h2 md:text-[clamp(2.5rem,4vw,3.5rem)] font-bold leading-[1.1] text-primary tracking-tight mb-8">
              Expertise
            </h2>
            <p className="text-base md:text-lg text-[#D6D3D1] max-w-xl text-balance font-medium">
              A comprehensive suite of design and digital services crafted for visionary founders and institutions seeking aesthetic refinement.
            </p>
          </div>

          <div className="w-full h-px bg-primary/10 mb-8"></div>

          <div className="space-y-4">
            {SERVICES.map((service, index) => {
              const Icon = ICONS[index % ICONS.length];
              const isActive = activeIndex === index;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left flex items-start gap-5 py-5 px-6 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'bg-card border border-primary/10 shadow-lg scale-[1.02]' : 'hover:bg-card/40 bg-transparent border border-transparent scale-100'
                  }`}
                >
                  <Icon
                    className={`shrink-0 w-6 h-6 mt-0.5 transition-all duration-500 ${
                      isActive ? 'text-accent opacity-100' : 'text-stone-300 opacity-40'
                    }`}
                  />
                  <div className="flex flex-col gap-2 w-full">
                    <span
                      className={`text-lg md:text-xl font-bold transition-all duration-300 tracking-tight drop-shadow-sm ${
                        isActive ? 'text-primary' : 'text-stone-300'
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Tab Panels */}
        <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
          <div className="relative w-full aspect-[3/4] md:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#D6D3D1] max-h-[700px] shadow-2xl">
            {/* Dynamic Background Images per tab - High Contrast Grayscale to match reference */}
            {cardsData.map((data, index) => (
              <img
                key={`bg-${index}`}
                alt={data.cardTitle}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] filter grayscale ${
                  activeIndex === index ? 'opacity-40 scale-100' : activeIndex > index ? 'opacity-0 scale-105 blur-sm -translate-y-4' : 'opacity-0 scale-105 blur-sm translate-y-4'
                }`}
                src={data.image}
              />
            ))}
            
            {/* Absolute container that safely stacks all cards ensuring completely solid DOM flow */}
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10 pointer-events-none overflow-hidden">
              {cardsData.map((data, index) => (
                <React.Fragment key={`card-${index}`}>
                  {generateCard(data, index)}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureTabs;
