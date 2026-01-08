
import React, { useState } from 'react';
import { UserRole } from '../types';
import { User, Lock, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.DOCTOR);

  return (
    <div className="min-h-screen gradient-soft flex items-center justify-center p-4 md:p-6 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-silica-subtle rounded-full blur-[100px] md:blur-[150px] opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-silica-goldSubtle rounded-full blur-[100px] md:blur-[150px] opacity-40"></div>

      <div className="glass max-w-md w-full rounded-3xl md:rounded-5xl p-6 md:p-10 shadow-2xl relative z-10 border-white/60">
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex w-12 h-12 md:w-14 md:h-14 bg-silica rounded-2xl items-center justify-center mb-4 md:mb-6 shadow-lg shadow-silica/20">
            <span className="text-white font-black text-xl md:text-2xl">S</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">Welcome back</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Silica Secure Access</p>
        </div>

        <div className="space-y-5 md:space-y-6">
          <div className="space-y-3 md:space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1">Access Tier</label>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {Object.values(UserRole).map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`py-3 md:py-3.5 rounded-xl md:rounded-2xl border-2 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
                    selectedRole === role 
                      ? 'border-silica bg-silica-subtle text-silica-deep shadow-sm' 
                      : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div className="relative group">
              <User className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-silica transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="Institutional Email"
                className="w-full pl-12 md:pl-14 pr-4 py-3.5 md:py-4 bg-white border-2 border-slate-100 rounded-xl md:rounded-[24px] focus:outline-none focus:ring-4 focus:ring-silica-subtle focus:border-silica transition-all font-medium placeholder:text-slate-300 text-sm md:text-base"
              />
            </div>
            
            <div className="relative group">
              <Lock className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-silica-gold transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="Secure Password"
                className="w-full pl-12 md:pl-14 pr-4 py-3.5 md:py-4 bg-white border-2 border-slate-100 rounded-xl md:rounded-[24px] focus:outline-none focus:ring-4 focus:ring-silica-goldSubtle focus:border-silica-gold transition-all font-medium placeholder:text-slate-300 text-sm md:text-base"
              />
            </div>
          </div>

          <button 
            onClick={() => onLogin(selectedRole)}
            className="w-full py-4 md:py-5 bg-silica-deep text-white rounded-xl md:rounded-[24px] font-black uppercase tracking-widest text-[10px] md:text-sm flex items-center justify-center gap-2 hover:bg-slate-900 shadow-xl shadow-silica-deep/20 active:scale-[0.98] transition-all mt-4 md:mt-6"
          >
            Authenticate
            <ArrowRight size={18} />
          </button>
          
          <div className="flex items-center justify-center gap-2 pt-4 md:pt-6">
            <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <p className="text-center text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Biometric Check Ready
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
