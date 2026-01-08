
import React, { useState, useEffect } from 'react';
import { AppStatus, UserRole } from './types';
import Splash from './views/Splash';
import Onboarding from './views/Onboarding';
import Login from './views/Login';
import Dashboard from './views/Dashboard';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.SPLASH);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.DOCTOR);

  useEffect(() => {
    // Basic progression for demo purposes
    if (status === AppStatus.SPLASH) {
      const timer = setTimeout(() => setStatus(AppStatus.ONBOARDING), 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleFinishOnboarding = () => setStatus(AppStatus.LOGIN);
  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setStatus(AppStatus.DASHBOARD);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {status === AppStatus.SPLASH && <Splash />}
      {status === AppStatus.ONBOARDING && <Onboarding onFinish={handleFinishOnboarding} />}
      {status === AppStatus.LOGIN && <Login onLogin={handleLogin} />}
      {status === AppStatus.DASHBOARD && <Dashboard role={userRole} onLogout={() => setStatus(AppStatus.LOGIN)} />}
    </div>
  );
};

export default App;
