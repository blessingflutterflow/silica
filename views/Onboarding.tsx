
import React, { useState } from 'react';
import { ChevronRight, ShieldCheck, Zap, Heart, Layout } from 'lucide-react';

const SLIDES = [
  {
    title: "Smarter Care. Simpler Clinics.",
    description: "Experience the next generation of patient care management designed for modern medical practices.",
    icon: <Zap className="w-16 h-16 text-slica" />,
    color: "from-slica-dark to-slica"
  },
  {
    title: "Designed for Providers",
    description: "Every interaction is optimized to reduce visual fatigue and cognitive load, letting you focus on patients.",
    icon: <Layout className="w-16 h-16 text-slica-light" />,
    color: "from-slica to-cyan-600"
  },
  {
    title: "Secure. Structured. Human.",
    description: "Medical-grade security with a human-centric interface that feels natural and trustworthy.",
    icon: <ShieldCheck className="w-16 h-16 text-emerald-500" />,
    color: "from-cyan-600 to-emerald-600"
  },
  {
    title: "Your Clinic. One Calm System.",
    description: "Ready to transform your practice? Let's get started with your clinical workspace.",
    icon: <Heart className="w-16 h-16 text-rose-500" />,
    color: "from-emerald-600 to-slica"
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
      <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px]"></div>
      
      <div className="glass max-w-lg w-full rounded-[32px] p-10 md:p-14 shadow-2xl relative z-10 flex flex-col items-center text-center">
        <div className="mb-10 p-6 bg-white/50 rounded-3xl shadow-inner animate-bounce">
          {SLIDES[current].icon}
        </div>
        
        <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">
          {SLIDES[current].title}
        </h2>
        
        <p className="text-slate-600 text-lg mb-12 leading-relaxed">
          {SLIDES[current].description}
        </p>
        
        <div className="flex gap-2 mb-12">
          {SLIDES.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-slica' : 'w-2 bg-slate-300'}`}
            />
          ))}
        </div>

        <button 
          onClick={next}
          className="w-full py-4 px-6 bg-slate-900 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transform active:scale-[0.98] transition-all"
        >
          {current === SLIDES.length - 1 ? "Start Practicing" : "Continue"}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
