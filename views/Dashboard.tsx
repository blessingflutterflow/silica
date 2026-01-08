
import React, { useState } from 'react';
import { UserRole, Patient } from '../types';
import { NAV_ITEMS, MOCK_PATIENTS, MOCK_APPOINTMENTS } from '../constants';
import { Bell, Search, LogOut, MoreVertical, Plus, UserCircle, Phone, Clock, Video as VideoIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DashboardProps {
  role: UserRole;
  onLogout: () => void;
}

const CHART_DATA = [
  { name: 'Mon', count: 24 },
  { name: 'Tue', count: 32 },
  { name: 'Wed', count: 28 },
  { name: 'Thu', count: 45 },
  { name: 'Fri', count: 38 },
  { name: 'Sat', count: 15 },
];

const Dashboard: React.FC<DashboardProps> = ({ role, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 flex flex-col p-4">
        <div className="flex items-center gap-3 px-3 py-6 mb-4">
          <div className="w-8 h-8 bg-slica rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="text-white font-bold tracking-tight text-xl">Slica</span>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-slica text-white shadow-lg shadow-slica-dark/40' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-slate-800">
          <div className="px-3 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 overflow-hidden flex items-center justify-center">
               <UserCircle className="text-slate-400" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Dr. Julian Smith</p>
              <p className="text-xs text-slate-500 truncate">{role}</p>
            </div>
            <button onClick={onLogout} className="text-slate-500 hover:text-red-400 transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search patients, charts, or orders..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slica-subtle transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-sm font-medium">
               <Clock size={16} />
               <span>Today, Mar 24 — 10:42 AM</span>
            </div>
            <button className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-slica rounded-full border-2 border-white"></span>
            </button>
            <button className="flex items-center gap-2 bg-slica text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slica-dark transition-all shadow-sm">
              <Plus size={16} />
              New Patient
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Clinical Overview</h1>
              <p className="text-slate-500">You have 8 patients scheduled for today</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold border border-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                System Healthy
              </span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Today's Appointments" value="12" subtext="+2 since morning" color="slica" />
            <StatCard label="Pending Lab Results" value="08" subtext="3 urgent reviews" color="amber" />
            <StatCard label="Completed Visits" value="04" subtext="Average 18min / patient" color="emerald" />
            <StatCard label="Revenue Today" value="$2.4k" subtext="Ahead of target" color="indigo" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Appointment Timeline */}
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                 <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                   <h3 className="font-semibold text-slate-800">Current Queue</h3>
                   <button className="text-xs text-slica font-semibold hover:underline">View All</button>
                 </div>
                 <div className="divide-y divide-slate-100">
                    {MOCK_APPOINTMENTS.map((app) => (
                      <div key={app.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                            {app.patientName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{app.patientName}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span className="flex items-center gap-1"><Clock size={12}/> {app.time}</span>
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200">{app.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <StatusBadge status={app.status} />
                           <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
                             <MoreVertical size={16} />
                           </button>
                        </div>
                      </div>
                    ))}
                 </div>
               </div>

               {/* Activity Chart */}
               <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="font-semibold text-slate-800">Clinic Traffic (Weekly)</h3>
                    <select className="bg-slate-50 border border-slate-200 rounded-lg text-xs px-3 py-1.5 focus:outline-none">
                      <option>Last 7 Days</option>
                      <option>This Month</option>
                    </select>
                 </div>
                 <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={CHART_DATA}>
                        <defs>
                          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2596be" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#2596be" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area type="monotone" dataKey="count" stroke="#2596be" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
               </div>
            </div>

            {/* Sidebar Cards */}
            <div className="space-y-6">
              <div className="bg-slate-900 rounded-[32px] p-6 text-white relative overflow-hidden group shadow-xl border border-slate-800">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-slica rounded-full blur-[60px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
                 <div className="relative z-10 space-y-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                      <VideoIcon size={20} className="text-slica-light" />
                    </div>
                    <h4 className="text-xl font-bold leading-tight">Telehealth Queue is Ready</h4>
                    <p className="text-slate-400 text-sm">3 patients waiting in the virtual lounge. Join now to start sessions.</p>
                    <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slica-subtle transition-all text-sm">
                      Go to Waiting Room
                    </button>
                 </div>
              </div>

              <div className="bg-white rounded-[32px] border border-slate-200 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-800 mb-4">Patient Demographics</h3>
                <div className="space-y-4">
                  <DemographicItem label="General" percent={65} color="bg-slica" />
                  <DemographicItem label="Pediatric" percent={15} color="bg-emerald-500" />
                  <DemographicItem label="Elderly" percent={20} color="bg-amber-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper Components
const StatCard = ({ label, value, subtext, color }: { label: string, value: string, subtext: string, color: string }) => {
  const colorMap: Record<string, string> = {
    slica: 'text-slica-dark bg-slica-subtle',
    amber: 'text-amber-600 bg-amber-50',
    emerald: 'text-emerald-600 bg-emerald-50',
    indigo: 'text-indigo-600 bg-indigo-50',
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group">
      <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
      <h4 className="text-3xl font-bold text-slate-900 mb-2 group-hover:scale-110 origin-left transition-transform">{value}</h4>
      <div className={`text-[10px] inline-flex font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${colorMap[color]}`}>
        {subtext}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: Patient['status'] }) => {
  const styles: Record<string, string> = {
    'Checked In': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'Scheduled': 'bg-amber-50 text-amber-700 border-amber-100',
    'In Progress': 'bg-slica-subtle text-slica-dark border-slica-light/30',
    'Completed': 'bg-slate-50 text-slate-600 border-slate-200',
  };

  return (
    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${styles[status]}`}>
      {status}
    </span>
  );
};

const DemographicItem = ({ label, percent, color }: { label: string, percent: number, color: string }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-xs font-medium">
      <span className="text-slate-600">{label}</span>
      <span className="text-slate-900">{percent}%</span>
    </div>
    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

export default Dashboard;
