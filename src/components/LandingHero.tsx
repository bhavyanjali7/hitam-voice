import React from 'react';
import { ArrowRight, Sparkles, MapPin, Compass, Shield, CheckCircle2, Footprints } from 'lucide-react';

interface LandingHeroProps {
  onEnterCampus: () => void;
  onOpenWizard: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onEnterCampus, onOpenWizard }) => {
  return (
    <div className="relative min-h-[580px] lg:min-h-[640px] flex flex-col items-center justify-center text-center px-4 py-12 overflow-hidden bg-gradient-to-b from-emerald-100 via-sky-50 to-emerald-100/60 border-b-4 border-slate-900">
      
      {/* Decorative Floating Clouds / Badges */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-300 border-2 border-slate-900 text-slate-950 text-xs font-black uppercase tracking-wider mb-6 shadow-cartoon animate-bounce">
        <Sparkles className="w-4 h-4 text-slate-950" />
        <span>HITAM Student Voice Mini-Game</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight max-w-4xl leading-[1.1] mb-6">
        WHERE WOULD YOU <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent underline decoration-amber-400 decoration-wavy underline-offset-8">
          TAKE THIS?
        </span>
      </h1>

      {/* Core Concept Subtitles */}
      <div className="max-w-2xl mx-auto mb-10 space-y-3">
        <p className="text-2xl sm:text-3xl font-black text-slate-800">
          "Something bothering you at HITAM?"
        </p>
        <p className="text-base sm:text-xl font-bold text-slate-600">
          Don't fill out a generic boring form. <strong className="text-slate-950 font-black bg-emerald-300 px-2 py-0.5 rounded-lg border border-slate-900">Walk across campus & take it to the right place!</strong>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 z-10 w-full max-w-md mx-auto">
        <button
          onClick={onEnterCampus}
          className="w-full sm:w-auto flex-1 cartoony-btn-emerald py-4 px-8 rounded-2xl text-base flex items-center justify-center gap-3 group"
        >
          <Footprints className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>ENTER CAMPUS</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onOpenWizard}
          className="w-full sm:w-auto flex-1 cartoony-btn-sky py-4 px-6 rounded-2xl text-sm flex items-center justify-center gap-2"
        >
          <Compass className="w-4 h-4" />
          <span>Where Do I Go?</span>
        </button>
      </div>

      {/* Feature Highlights Grid */}
      <div className="mt-14 pt-8 border-t-2 border-slate-900/10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
        <div className="bg-white border-2 border-slate-900 p-4 rounded-2xl shadow-cartoon flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-400 border border-slate-900 text-slate-950 shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900">Interactive Map Walk</h4>
            <p className="text-[11px] font-semibold text-slate-600 mt-0.5">Virtually walk across HITAM campus to the actual room</p>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-900 p-4 rounded-2xl shadow-cartoon flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-sky-400 border border-slate-900 text-slate-950 shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900">100% Anonymous First</h4>
            <p className="text-[11px] font-semibold text-slate-600 mt-0.5">No login required unless you voluntarily include details</p>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-900 p-4 rounded-2xl shadow-cartoon flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-400 border border-slate-900 text-slate-950 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900">Trackable Ticket ID</h4>
            <p className="text-[11px] font-semibold text-slate-600 mt-0.5">Receive a reference ticket (HITAM-SSG-XXXX) to track action</p>
          </div>
        </div>
      </div>

    </div>
  );
};
