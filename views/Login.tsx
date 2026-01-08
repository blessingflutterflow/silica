
import React, { useState } from 'react';
import { UserRole } from '../types';
import { User, Lock, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.DOCTOR);

  return (
    <div className="min-h-screen gradient-soft flex items-center justify-center p-6">
      <div className="glass max-w-md w-full rounded-[24px] p-8 shadow-xl">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h1>
          <p className="text-slate-500">Secure access to Slica Health</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium text-slate-600 block px-1">Access Role</label>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(UserRole).map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                    selectedRole === role 
                      ? 'border-slica bg-slica-subtle text-slica-dark shadow-sm' 
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slica transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="Clinic Email"
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slica-subtle focus:border-slica-light transition-all placeholder:text-slate-400"
              />
            </div>
            
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slica transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="Security Password"
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slica-subtle focus:border-slica-light transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <button 
            onClick={() => onLogin(selectedRole)}
            className="w-full py-4 bg-slica text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-slica-dark shadow-lg shadow-slica-subtle active:scale-[0.98] transition-all mt-4"
          >
            Start Shift
            <ArrowRight size={18} />
          </button>
          
          <p className="text-center text-xs text-slate-400 pt-4">
            Protected by medical-grade encryption (AES-256)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
