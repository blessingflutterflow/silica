
import React, { useState } from 'react';
import { UserRole, Patient, Appointment } from '../types';
import { NAV_ITEMS, MOCK_PATIENTS, MOCK_APPOINTMENTS } from '../constants';
import { 
  Bell, Search, LogOut, MoreVertical, Plus, UserCircle, 
  Clock, Video as VideoIcon, Activity, Calendar, 
  DollarSign, Users, ClipboardCheck, TrendingUp,
  ChevronRight, ArrowUpRight, CheckCircle2, ShieldCheck,
  Menu, X, AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, BarChart, Bar, Cell 
} from 'recharts';

interface DashboardProps {
  role: UserRole;
  onLogout: () => void;
}

const TRAFFIC_DATA = [
  { name: '08:00', count: 4 },
  { name: '10:00', count: 12 },
  { name: '12:00', count: 8 },
  { name: '14:00', count: 15 },
  { name: '16:00', count: 9 },
  { name: '18:00', count: 3 },
];

const REVENUE_DATA = [
  { name: 'Mon', revenue: 4200 },
  { name: 'Tue', revenue: 3800 },
  { name: 'Wed', revenue: 5100 },
  { name: 'Thu', revenue: 4800 },
  { name: 'Fri', revenue: 6200 },
];

const Dashboard: React.FC<DashboardProps> = ({ role, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (role) {
      case UserRole.ADMIN:
        return <AdminView />;
      case UserRole.NURSE:
        return <NurseView />;
      case UserRole.RECEPTIONIST:
        return <ReceptionistView />;
      case UserRole.DOCTOR:
      default:
        return <DoctorView />;
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-3 py-6 md:py-8 mb-4 md:mb-6">
        <div className="w-10 h-10 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/20 shadow-inner relative group cursor-pointer">
          <div className="absolute inset-0 bg-silica-gold opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl"></div>
          <span className="text-white font-black text-lg">S</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-black tracking-tight text-xl leading-none text-nowrap">Silica</span>
          <span className="text-silica-gold text-[9px] font-black uppercase tracking-[0.2em] mt-1.5 opacity-80">Premium Care</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 md:py-3.5 rounded-2xl transition-all duration-300 group ${
              activeTab === item.id 
                ? 'bg-silica text-white shadow-lg shadow-black/20 border-r-4 border-silica-gold' 
                : 'text-silica-light/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className={`transition-transform duration-300 group-hover:scale-110 ${activeTab === item.id ? 'text-white' : 'opacity-70 group-hover:text-silica-gold'}`}>
              {item.icon}
            </div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="px-3 py-4 flex items-center gap-3 bg-white/5 rounded-3xl border border-white/5 group hover:border-silica-gold/20 transition-colors overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-silica-gold/10 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
             <UserCircle className="text-silica-gold opacity-60" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-black text-white truncate group-hover:text-silica-gold transition-colors">Julian Smith</p>
            <p className="text-[8px] uppercase tracking-widest text-silica-light font-black opacity-60">{role}</p>
          </div>
          <button onClick={onLogout} className="p-2 text-white/30 hover:text-rose-400 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 relative">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-40 lg:hidden transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 bg-silica-deep flex-col p-4 shrink-0 shadow-2xl z-30">
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile Slide-in */}
      <aside className={`fixed inset-y-0 left-0 w-[280px] bg-silica-deep flex flex-col p-6 z-50 transform transition-transform duration-500 ease-out lg:hidden shadow-[20px_0_60px_rgba(0,0,0,0.5)] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-white/40 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
        <SidebarContent />
      </aside>

      {/* Main Canvas */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 md:h-20 lg:h-24 bg-white/90 backdrop-blur-xl border-b border-silica-border px-4 md:px-10 flex items-center justify-between sticky top-0 z-20 shrink-0 shadow-sm gap-3">
          <div className="flex items-center gap-3 md:gap-4 flex-1">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors active:scale-90"
            >
              <Menu size={20} />
            </button>
            <div className="relative max-w-xl w-full group">
              <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-silica transition-colors" size={16} md:size={18} />
              <input 
                type="text" 
                placeholder="Search..."
                className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-xl md:rounded-[28px] pl-10 md:pl-14 pr-4 py-2 md:py-3.5 text-xs md:text-sm font-medium focus:outline-none focus:ring-4 focus:ring-silica-subtle focus:border-silica transition-all placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6 lg:gap-8">
            <div className="hidden xl:flex flex-col items-end shrink-0">
               <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Clinic Pulse</span>
               <span className="text-xs font-black text-silica-gold flex items-center gap-2">
                 <ShieldCheck size={14} />
                 Encrypted
               </span>
            </div>
            <div className="hidden md:block h-8 lg:h-10 w-px bg-slate-100 rounded-full"></div>
            <button className="relative p-2 md:p-3 text-slate-400 hover:text-silica-gold hover:bg-silica-goldSubtle rounded-xl lg:rounded-2xl transition-all shrink-0">
              <Bell size={18} className="lg:w-6 lg:h-6" />
              <span className="absolute top-2 right-2 lg:top-3 lg:right-3 w-2 h-2 bg-silica-gold rounded-full border-2 border-white"></span>
            </button>
            <button className="flex items-center gap-2 bg-slate-900 text-white p-2.5 md:px-6 lg:px-8 lg:py-4 rounded-xl lg:rounded-[24px] text-[10px] lg:text-xs font-black uppercase tracking-widest hover:bg-silica-deep transition-all shadow-lg active:scale-95 group shrink-0">
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-500 text-silica-gold" />
              <span className="hidden sm:inline">New Entry</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 space-y-6 md:space-y-10 scroll-smooth bg-gradient-soft custom-scrollbar">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

/* --- Role Views --- */

const DoctorView = () => (
  <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-black text-slate-900 tracking-tight lg:tracking-tighter leading-none">Doctor's Lounge</h1>
        <p className="text-slate-400 font-bold uppercase tracking-[0.15em] text-[9px] md:text-xs flex items-center gap-2">
          <Activity size={12} md:size={14} className="text-silica" /> Clinical Stream Active
        </p>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 sm:flex-none px-4 md:px-6 py-3 bg-white border-2 border-slate-100 rounded-xl md:rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:border-silica transition-all">Archive</button>
        <button className="flex-1 sm:flex-none px-4 md:px-6 py-3 bg-silica-gold text-white rounded-xl md:rounded-2xl text-[9px] font-black uppercase tracking-widest hover:shadow-xl transition-all flex items-center justify-center gap-2">
          <CheckCircle2 size={14} md:size={16} /> Sign-Off
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
      <StatCard label="Wait Time" value="12m" subtext="Optimal Flow" color="silica" icon={<Clock size={18}/>} />
      <StatCard label="Criticals" value="02" subtext="Requires Action" color="gold" icon={<AlertCircle size={18}/>} />
      <StatCard label="Remote Visits" value="03" subtext="Silica Connect" color="emerald" icon={<VideoIcon size={18}/>} />
      <StatCard label="Efficiency" value="98%" subtext="Daily Target" color="indigo" icon={<TrendingUp size={18}/>} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
      <div className="lg:col-span-2 space-y-6 md:space-y-10">
        <AppointmentList title="Patient Pipeline" appointments={MOCK_APPOINTMENTS} />
        <TrafficChart />
      </div>
      <div className="space-y-6 md:space-y-10">
        <TelehealthCard />
        <DemographicsCard />
      </div>
    </div>
  </div>
);

const NurseView = () => (
  <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tight md:tracking-tighter">Clinical Intake</h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] md:text-xs mt-1 md:mt-2">Station Alpha 01</p>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
      <StatCard label="Vitals Queue" value="06" subtext="Pending Entry" color="silica" icon={<Activity size={18}/>} />
      <StatCard label="Urgent Screening" value="01" subtext="Priority Room 3" color="gold" icon={<AlertCircle size={18}/>} />
      <StatCard label="Prep Ready" value="09" subtext="Clinic Ready" color="emerald" icon={<CheckCircle2 size={18}/>} />
    </div>

    <div className="bg-white rounded-2xl md:rounded-[48px] border-2 border-slate-100 shadow-sm overflow-hidden p-1 group hover:border-silica-gold/10 transition-all">
      <div className="bg-silica-subtle/30 rounded-2xl md:rounded-[40px] p-4 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-3">
          <h3 className="text-lg md:text-2xl font-black text-slate-900 flex items-center gap-3">
            <ClipboardCheck className="text-silica-gold" size={24} md:size={28} />
            Intake Priority
          </h3>
          <span className="self-start sm:self-center text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-silica-gold bg-silica-goldSubtle px-3 py-1 rounded-full border border-silica-gold/20">LIVE DATA</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          {MOCK_PATIENTS.map(p => (
            <div key={p.id} className="p-4 md:p-6 border-2 border-white bg-white/70 backdrop-blur-md rounded-xl md:rounded-[32px] flex items-center justify-between group/card hover:scale-[1.02] transition-all cursor-pointer shadow-sm hover:shadow-xl">
              <div className="flex items-center gap-3 md:gap-5">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-silica-goldSubtle rounded-lg md:rounded-2xl flex items-center justify-center font-black text-silica-gold text-base md:text-xl shrink-0">{p.name[0]}</div>
                <div className="overflow-hidden">
                  <p className="font-black text-sm md:text-lg text-slate-900 truncate tracking-tight">{p.name}</p>
                  <p className="text-[8px] md:text-[9px] text-slate-400 font-bold uppercase tracking-widest truncate">{p.status}</p>
                </div>
              </div>
              <ChevronRight className="text-slate-200 group-hover/card:text-silica-gold group-hover/card:translate-x-1 transition-all shrink-0" size={18} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ReceptionistView = () => (
  <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tight md:tracking-tighter">Concierge</h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] md:text-xs mt-1 md:mt-2">Silica Front End Terminal</p>
      </div>
      <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-silica-gold text-white px-6 md:px-10 py-3 md:py-5 rounded-xl md:rounded-[28px] text-[9px] md:text-sm font-black uppercase tracking-widest shadow-xl hover:-translate-y-1 transition-all">
        <Calendar size={16}/> New Booking
      </button>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
      <StatCard label="Arrivals" value="12" subtext="Checked In" color="silica" icon={<Users size={18}/>} />
      <StatCard label="Current Wait" value="03" subtext="In Lobby" color="gold" icon={<Clock size={18}/>} />
      <StatCard label="Collections" value="$2k" subtext="Daily Revenue" color="emerald" icon={<DollarSign size={18}/>} />
      <StatCard label="Portal pings" value="08" subtext="New Requests" color="indigo" icon={<Bell size={18}/>} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
      <div className="lg:col-span-2 bg-white rounded-2xl md:rounded-[48px] border-2 border-slate-100 p-5 md:p-10 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 md:w-2 h-full bg-silica-gold transition-all"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-10 gap-3">
          <h3 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight">Patient Manifest</h3>
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 self-start sm:self-center">
            <button className="px-4 py-2 bg-white rounded-lg shadow-sm text-[8px] md:text-[9px] font-black uppercase tracking-widest text-silica-gold">Active</button>
            <button className="px-4 py-2 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400">Archives</button>
          </div>
        </div>
        <div className="space-y-3 md:space-y-6">
          {MOCK_APPOINTMENTS.map(app => (
            <div key={app.id} className="flex items-center justify-between p-4 md:p-6 bg-slate-50/50 border border-slate-100 rounded-xl md:rounded-[32px] group/item hover:bg-white hover:border-silica-gold/20 transition-all hover:shadow-lg">
              <div className="flex items-center gap-3 md:gap-6 overflow-hidden">
                <div className="hidden sm:flex w-16 md:w-20 flex-col items-center justify-center border-r border-slate-100 pr-4 md:pr-6 shrink-0">
                  <span className="text-sm md:text-lg font-black text-slate-900 group-hover/item:text-silica-gold transition-colors">{app.time}</span>
                  <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest">Std.</span>
                </div>
                <div className="overflow-hidden">
                  <p className="font-black text-sm md:text-xl text-slate-900 tracking-tight truncate">{app.patientName}</p>
                  <p className="text-[8px] md:text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 md:mt-1 truncate">
                    {app.doctor} • <span className="sm:hidden">{app.time}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-6 shrink-0 ml-2">
                <div className="hidden md:block"><StatusBadge status={app.status} /></div>
                <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center bg-white border border-slate-100 rounded-lg md:rounded-2xl hover:bg-slate-50 shadow-sm">
                  <MoreVertical size={16} md:size={20} className="text-slate-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-silica-deep rounded-2xl md:rounded-[48px] p-6 md:p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-xl border-2 md:border-4 border-white/5">
        <div className="absolute -top-20 -right-20 w-48 h-48 md:w-80 md:h-80 bg-silica-gold rounded-full blur-[80px] md:blur-[120px] opacity-20"></div>
        <div>
          <h3 className="text-xl md:text-3xl font-black mb-1 md:mb-2 leading-tight tracking-tighter">Financials</h3>
          <p className="text-silica-gold text-[8px] md:text-[9px] font-black uppercase tracking-widest opacity-60">Cycle Update: Mar 24</p>
        </div>
        
        <div className="my-6 md:my-10 space-y-4 md:space-y-8">
          <div className="flex justify-between items-end">
             <div>
               <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-silica-gold opacity-50 mb-1">Revenue</p>
               <p className="text-2xl md:text-5xl font-black tracking-tighter leading-none">$2,480</p>
             </div>
             <div className="text-right">
               <span className="text-[7px] md:text-[9px] font-black bg-silica-gold/20 text-silica-gold px-2 py-1 rounded-md border border-silica-gold/30 uppercase tracking-widest">+22%</span>
             </div>
          </div>
          <div className="h-px bg-white/5 rounded-full"></div>
          <div>
            <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-silica-gold opacity-50 mb-1">Audits</p>
            <p className="text-2xl md:text-5xl font-black text-silica-light tracking-tighter leading-none">$14.2k</p>
          </div>
        </div>
        
        <button className="w-full py-3.5 md:py-5 bg-white text-silica-deep rounded-xl md:rounded-[24px] font-black uppercase tracking-[0.2em] text-[9px] md:text-xs hover:bg-silica-gold hover:text-white transition-all shadow-xl group/btn flex items-center justify-center gap-2">
          Concierge Portal
          <ArrowUpRight size={16} md:size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
        </button>
      </div>
    </div>
  </div>
);

const AdminView = () => (
  <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex items-end justify-between">
      <div>
        <h1 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tight md:tracking-tighter leading-none">Intelligence</h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] md:text-xs mt-1 md:mt-2">Architecture Terminal</p>
      </div>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
      <StatCard label="Market Rev" value="$4.2M" subtext="Growth Curve" color="gold" icon={<DollarSign size={18}/>} />
      <StatCard label="Operational" value="94.2" subtext="Benchmark KPI" color="silica" icon={<TrendingUp size={18}/>} />
      <StatCard label="NPS" value="4.9" subtext="Feedback Index" color="indigo" icon={<Users size={18}/>} />
      <StatCard label="Resilience" value="Elite" subtext="Network Health" color="emerald" icon={<Activity size={18}/>} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
      <div className="bg-white rounded-2xl md:rounded-[48px] border-2 border-slate-100 p-5 md:p-10 shadow-sm relative group overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-silica-goldSubtle rounded-full blur-[60px] md:blur-[80px] opacity-40"></div>
        <h3 className="text-lg md:text-2xl font-black text-slate-900 mb-6 md:mb-10 tracking-tight">Growth Velocity</h3>
        <div className="h-48 md:h-80 w-full overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#94a3b8', fontWeight: 900}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#94a3b8', fontWeight: 900}} />
              <Tooltip cursor={{fill: '#fdf8e6'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 50px -10px rgb(0 0 0 / 0.1)', fontWeight: 900, fontSize: '9px' }} />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                {REVENUE_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 4 ? '#c9a537' : index % 2 === 0 ? '#2596be' : '#e2e8f0'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl md:rounded-[48px] border-2 border-slate-100 p-5 md:p-10 shadow-sm">
        <h3 className="text-lg md:text-2xl font-black text-slate-900 mb-6 md:mb-10 tracking-tight">Efficiency Hub</h3>
        <div className="space-y-3 md:space-y-8">
          <EfficiencyItem name="Dr. Julian Smith" score={94} patients={32} />
          <EfficiencyItem name="Dr. Elena Rodriguez" score={88} patients={28} />
          <EfficiencyItem name="Dr. Marcus Chen" score={91} patients={30} />
          <EfficiencyItem name="Dr. Sarah Jenkins" score={97} patients={35} />
        </div>
      </div>
    </div>
  </div>
);

/* --- Shared Components --- */

const StatCard = ({ label, value, subtext, color, icon }: any) => {
  const colorMap: Record<string, string> = {
    silica: 'text-silica bg-silica-subtle border-silica/20',
    gold: 'text-silica-gold bg-silica-goldSubtle border-silica-gold/20',
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-[40px] p-4 md:p-8 border-2 border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
      <div className="flex justify-between items-start mb-4 md:mb-8">
        <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 truncate pr-2">{label}</p>
        <div className={`p-2 md:p-4 rounded-lg md:rounded-2xl ${colorMap[color]} shadow-inner shrink-0`}>{icon}</div>
      </div>
      <h4 className="text-xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-1 md:mb-2 tracking-tighter leading-none">{value}</h4>
      <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest truncate group-hover:text-silica-gold transition-colors">{subtext}</p>
    </div>
  );
};

const AppointmentList = ({ title, appointments }: any) => (
  <div className="bg-white rounded-2xl md:rounded-[48px] border-2 border-slate-100 shadow-sm overflow-hidden group">
    <div className="px-5 md:px-10 py-4 md:py-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
      <h3 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
      <button className="text-[8px] md:text-[10px] text-silica-gold font-black uppercase tracking-widest px-3 md:px-6 py-2 md:py-3 bg-white border border-slate-200 rounded-lg md:rounded-2xl hover:bg-silica-goldSubtle transition-all">Export</button>
    </div>
    <div className="divide-y divide-slate-50">
      {appointments.map((app: Appointment) => (
        <div key={app.id} className="px-5 md:px-10 py-4 md:py-7 flex items-center justify-between hover:bg-silica-goldSubtle/20 transition-all group/item cursor-pointer">
          <div className="flex items-center gap-3 md:gap-6 overflow-hidden">
            <div className="hidden sm:flex w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-[24px] bg-white border-2 border-slate-100 items-center justify-center text-silica font-black text-xl md:text-2xl shadow-sm shrink-0">
              {app.patientName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="overflow-hidden">
              <p className="font-black text-sm md:text-2xl text-slate-900 group-hover/item:text-silica-deep transition-colors tracking-tight truncate leading-tight">{app.patientName}</p>
              <div className="flex items-center gap-2 md:gap-4 text-[8px] md:text-[10px] text-slate-400 font-black uppercase tracking-[0.15em] mt-0.5 md:mt-1.5">
                <span className="flex items-center gap-1 text-silica-gold text-nowrap"><Clock size={10} md:size={12}/> {app.time}</span>
                <span className="hidden sm:block w-1 h-1 bg-slate-200 rounded-full"></span>
                <span className="truncate">{app.type}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-6 shrink-0 ml-2">
             <div className="hidden sm:block"><StatusBadge status={app.status} /></div>
             <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center bg-white border border-slate-100 rounded-lg md:rounded-2xl hover:bg-slate-50 shadow-md">
               <MoreVertical size={16} md:size={20} className="text-slate-400" />
             </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TrafficChart = () => (
  <div className="bg-white rounded-2xl md:rounded-[48px] border-2 border-slate-100 p-5 md:p-10 shadow-sm group hover:border-silica-gold/10 transition-all overflow-hidden">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-12 gap-3">
       <h3 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight">Throughput</h3>
       <div className="flex gap-2 bg-slate-50 p-1 rounded-xl self-start sm:self-center">
         {['D', 'W', 'M'].map(p => (
           <button key={p} className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl text-[8px] md:text-[9px] font-black ${p === 'D' ? 'bg-silica-gold text-white shadow-sm' : 'bg-transparent text-slate-400 hover:bg-white transition-all'}`}>{p}</button>
         ))}
       </div>
    </div>
    <div className="h-48 md:h-80 w-full">
       <ResponsiveContainer width="100%" height="100%">
         <AreaChart data={TRAFFIC_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
           <defs>
             <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
               <stop offset="5%" stopColor="#2596be" stopOpacity={0.2}/>
               <stop offset="95%" stopColor="#c9a537" stopOpacity={0}/>
             </linearGradient>
           </defs>
           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
           <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 8, fill: '#94a3b8', fontWeight: 900}} dy={10} />
           <YAxis axisLine={false} tickLine={false} tick={{fontSize: 8, fill: '#94a3b8', fontWeight: 900}} />
           <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.15)', fontWeight: 900, fontSize: '9px' }} />
           <Area type="monotone" dataKey="count" stroke="#c9a537" strokeWidth={3} md:strokeWidth={4} fillOpacity={1} fill="url(#colorTraffic)" />
         </AreaChart>
       </ResponsiveContainer>
    </div>
  </div>
);

const TelehealthCard = () => (
  <div className="bg-silica-deep rounded-2xl md:rounded-[48px] p-6 md:p-10 text-white relative overflow-hidden group shadow-xl border-2 md:border-4 border-white/5">
    <div className="absolute top-0 right-0 w-32 h-32 md:w-56 md:h-56 bg-silica-gold rounded-full blur-[60px] md:blur-[100px] opacity-20"></div>
    <div className="relative z-10 space-y-5 md:space-y-8">
       <div className="w-10 h-10 md:w-16 md:h-16 bg-white/10 backdrop-blur-2xl rounded-xl md:rounded-[24px] flex items-center justify-center border border-white/20 shadow-inner">
         <VideoIcon size={20} className="text-silica-gold md:w-8 md:h-8" />
       </div>
       <div>
         <h4 className="text-xl md:text-3xl font-black leading-tight mb-2 md:mb-3 tracking-tighter">Silica Connect</h4>
         <p className="text-silica-light/70 font-medium leading-relaxed uppercase tracking-widest text-[8px] md:text-[11px]">3 Remote sessions waiting. Encryption Active.</p>
       </div>
       <button className="w-full py-3.5 md:py-5 bg-white text-silica-deep rounded-xl md:rounded-[24px] font-black uppercase tracking-[0.2em] text-[9px] md:text-xs hover:bg-silica-gold hover:text-white transition-all shadow-xl group/btn flex items-center justify-center gap-2">
         Open Lounge
         <ArrowUpRight size={16} md:size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
       </button>
    </div>
  </div>
);

const DemographicsCard = () => (
  <div className="bg-white rounded-2xl md:rounded-[48px] border-2 border-slate-100 p-6 md:p-10 shadow-sm group hover:border-silica-gold/10 transition-all">
    <h3 className="text-lg md:text-2xl font-black text-slate-900 mb-6 md:mb-8 tracking-tight">Diversity</h3>
    <div className="space-y-5 md:space-y-8">
      <DemographicItem label="General" percent={65} color="bg-silica" />
      <DemographicItem label="Pediatric" percent={15} color="bg-silica-gold" />
      <DemographicItem label="Geriatric" percent={20} color="bg-silica-deep" />
    </div>
  </div>
);

const EfficiencyItem = ({ name, score, patients }: any) => (
  <div className="flex items-center justify-between p-4 md:p-6 bg-slate-50/50 border-2 border-slate-50 rounded-xl md:rounded-[32px] group hover:border-silica-gold/20 hover:bg-white transition-all shadow-sm overflow-hidden">
    <div className="overflow-hidden">
      <p className="font-black text-sm md:text-lg text-slate-900 tracking-tight group-hover:text-silica-deep transition-colors truncate">{name}</p>
      <p className="text-[8px] md:text-[9px] text-slate-400 font-black uppercase tracking-[0.15em] mt-0.5 md:mt-1">{patients} Visits</p>
    </div>
    <div className="flex flex-col items-end shrink-0 ml-4">
      <span className="text-sm md:text-lg font-black text-silica-gold">{score}%</span>
      <div className="w-16 md:w-28 h-1 md:h-2 bg-slate-100 rounded-full overflow-hidden mt-1 md:mt-2 shadow-inner">
        <div className="h-full bg-silica-gold shadow-[0_0_8px_rgba(201,165,55,0.4)] rounded-full transition-all duration-1000" style={{width: `${score}%`}}></div>
      </div>
    </div>
  </div>
);

const DemographicItem = ({ label, percent, color }: { label: string, percent: number, color: string }) => (
  <div className="space-y-2 md:space-y-3">
    <div className="flex justify-between text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
      <span>{label}</span>
      <span className="text-slate-900">{percent}%</span>
    </div>
    <div className="h-2.5 md:h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner p-0.5 md:p-1">
      <div className={`h-full ${color} rounded-full transition-all duration-1000 shadow-sm`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: Patient['status'] }) => {
  const styles: Record<string, string> = {
    'Checked In': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Scheduled': 'bg-silica-goldSubtle text-silica-gold border-silica-gold/20',
    'In Progress': 'bg-silica-subtle text-silica-deep border-silica-border',
    'Completed': 'bg-slate-100 text-slate-500 border-slate-200',
  };

  return (
    <span className={`text-[7px] md:text-[9px] font-black uppercase tracking-[0.15em] px-2.5 md:px-5 py-1 md:py-1.5 rounded-lg md:rounded-full border shadow-sm ${styles[status]} group-hover:scale-105 transition-transform text-nowrap`}>
      {status}
    </span>
  );
};

export default Dashboard;
