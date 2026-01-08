
import React from 'react';
import { HeartPulse } from 'lucide-react';

const Splash: React.FC = () => {
  return (
    <div className="fixed inset-0 gradient-primary flex items-center justify-center overflow-hidden z-50">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-silica-gold rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>
      
      <div className="glass p-12 rounded-[40px] flex flex-col items-center gap-6 shadow-2xl relative border-white/50">
        <div className="w-20 h-20 bg-silica rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 transition-transform hover:rotate-0 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-silica-deep to-silica-gold opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <HeartPulse className="text-white w-12 h-12 relative z-10" />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Silica</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">Next-Gen Health</p>
        </div>
      </div>
    </div>
  );
};

export default Splash;
