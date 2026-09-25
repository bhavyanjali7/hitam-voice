import React from 'react';
import { Compass, ShieldCheck, MapPin, RefreshCw, Footprints } from 'lucide-react';

interface NavbarProps {
  currentView: 'student' | 'admin';
  onViewChange: (view: 'student' | 'admin') => void;
  onResetJourney: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, onResetJourney }) => {
  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-md px-4 lg:px-8 py-3.5 flex items-center justify-between border-b-2 ${
      currentView === 'admin'
        ? 'bg-slate-900 border-slate-800 text-white'
        : 'bg-white/90 border-slate-900 text-slate-900'
    }`}>
      {/* Brand & Logo */}
      <div 
        onClick={onResetJourney}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-2xl bg-amber-400 border-2 border-slate-900 p-0.5 shadow-sm group-hover:rotate-6 transition-transform">
          <div className="w-full h-full bg-emerald-400 rounded-xl flex items-center justify-center border border-slate-900">
            <Compass className="w-5 h-5 text-slate-950" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black tracking-tight font-mono">HITAM</h1>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border border-slate-900 uppercase tracking-wider ${
              currentView === 'admin' ? 'bg-indigo-500 text-white' : 'bg-emerald-300 text-slate-950'
            }`}>
              {currentView === 'admin' ? 'Admin Portal' : 'Campus Voice'}
            </span>
          </div>
          <p className={`text-xs font-bold hidden sm:block ${currentView === 'admin' ? 'text-slate-400' : 'text-slate-600'}`}>
            Hyderabad Institute of Technology & Management
          </p>
        </div>
      </div>

      {/* Navigation Mode Switcher */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-900">
        <button
          onClick={() => onViewChange('student')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
            currentView === 'student'
              ? 'bg-emerald-400 text-slate-950 border-2 border-slate-900 shadow-sm'
              : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Footprints className="w-4 h-4" />
          <span>Student Map</span>
        </button>

        <button
          onClick={() => onViewChange('admin')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
            currentView === 'admin'
              ? 'bg-slate-900 text-white border-2 border-slate-900 shadow-sm'
              : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Admin Console</span>
        </button>
      </div>

      {/* Reset Action */}
      <div className="flex items-center gap-3">
        {currentView === 'student' && (
          <button
            onClick={onResetJourney}
            className="flex items-center gap-1.5 text-xs font-black text-slate-900 bg-amber-300 hover:bg-amber-400 px-3 py-2 rounded-xl border-2 border-slate-900 shadow-sm transition-transform active:translate-y-0.5"
            title="Start fresh journey"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">New Walk</span>
          </button>
        )}
      </div>
    </header>
  );
};
