
import React, { useState } from 'react';
import { ChevronRight, ShieldCheck, Zap, Heart, Layout } from 'lucide-react';

const SLIDES = [
  {
    title: "Smarter Care. Simpler Clinics.",
    description: "Experience the next generation of patient care management designed for Silica medical practices.",
    icon: <Zap className="w-16 h-16 text-silica" />,
    color: "from-silica-deep to-silica"
  },
  {
    title: "Designed for Providers",
    description: "Every interaction is optimized with Silica's ergonomic interface to reduce visual fatigue and cognitive load.",
    icon: <Layout className="w-16 h-16 text-silica-gold" />,
    color: "from-silica to-silica-gold"
  },
  {
    title: "Gold Standard Security",
    description: "Medical-grade security with a trust-focused interface that prioritizes patient data integrity.",
    icon: <ShieldCheck className="w-16 h-16 text-emerald-500" />,
    color: "from-silica-gold to-emerald-600"
  },
  {
    title: "Your Clinic. One Calm System.",
    description: "Ready to transform your practice? Let's get started with your clinical workspace on Silica.",
    icon: <Heart className="w-16 h-16 text-rose-500" />,
    color: "from-emerald-600 to-silica-deep"
  }
];

interface OnboardingProps {
  onFinish: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < SLIDES.length - 1) {
      setCurrent(current + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className={`fixed inset-0 transition-all duration-1000 bg-gradient-to-br ${SLIDES[current].color} flex flex-col items-center justify-center p-6`}>
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[4px]"></div>
      
      <div className="glass max-w-lg w-full rounded-[40px] p-10 md:p-14 shadow-2xl relative z-10 flex flex-col items-center text-center border-white/40">
        <div className="mb-10 p-6 bg-white/60 rounded-[32px] shadow-inner animate-bounce">
          {SLIDES[current].icon}
        </div>
        
        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          {SLIDES[current].title}
        </h2>
        
        <p className="text-slate-600 text-lg mb-12 leading-relaxed font-medium">
          {SLIDES[current].description}
        </p>
        
        <div className="flex gap-2 mb-12">
          {SLIDES.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 rounded-full transition-all duration-500 ${idx === current ? 'w-10 bg-silica' : 'w-2 bg-slate-200'}`}
            />
          ))}
        </div>

        <button 
          onClick={next}
          className="w-full py-5 px-8 bg-slate-900 text-white rounded-3xl font-black flex items-center justify-center gap-3 hover:bg-slate-800 transform active:scale-[0.97] transition-all shadow-xl"
        >
          {current === SLIDES.length - 1 ? "Begin Practice" : "Explore Silica"}
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
