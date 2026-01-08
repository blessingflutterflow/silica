
import React from 'react';
import { HeartPulse } from 'lucide-react';

const Splash: React.FC = () => {
  return (
    <div className="fixed inset-0 gradient-primary flex items-center justify-center overflow-hidden z-50">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slica-light rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>
      
      <div className="glass p-12 rounded-[40px] flex flex-col items-center gap-6 shadow-2xl relative">
        <div className="w-20 h-20 bg-slica rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 transition-transform hover:rotate-0">
          <HeartPulse className="text-white w-12 h-12" />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Slica</h1>
          <p className="text-slate-500 font-medium">Health Systems</p>
        </div>
      </div>
    </div>
  );
};

export default Splash;
