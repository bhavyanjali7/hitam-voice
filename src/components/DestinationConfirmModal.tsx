import React from 'react';
import { Destination } from '../types/campus';
import { MapPin, ArrowRight, Info } from 'lucide-react';

interface DestinationConfirmModalProps {
  destination: Destination;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DestinationConfirmModal: React.FC<DestinationConfirmModalProps> = ({
  destination,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border-4 border-slate-900 rounded-3xl p-6 sm:p-8 shadow-cartoon-lg text-center overflow-hidden">
        
        {/* Top Icon */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400 border-3 border-slate-900 flex items-center justify-center shadow-sm mb-4 animate-bounce">
          <MapPin className="w-8 h-8 text-slate-950" />
        </div>

        <span className="text-xs font-mono font-black uppercase tracking-widest text-slate-950 bg-emerald-300 px-3 py-1 rounded-full border-2 border-slate-900">
          YOUR DESTINATION
        </span>

        {/* Room Code */}
        <h2 className="text-5xl font-black text-slate-900 tracking-tight mt-4 font-mono">
          {destination.roomCode}
        </h2>

        {/* Room Name */}
        <h3 className="text-2xl font-black text-slate-800 mt-1">
          {destination.roomName}
        </h3>

        <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border-2 border-slate-900 text-left space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-800 font-bold">
            <span>In-Charge / Office:</span>
            <strong className="text-slate-950 font-black">{destination.inCharge}</strong>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-800 font-bold">
            <span>Category:</span>
            <span className="text-emerald-700 font-black">{destination.categoryTitle}</span>
          </div>
          {destination.notes && (
            <div className="pt-2 border-t border-slate-300 text-[11px] text-slate-700 font-medium flex items-start gap-1.5">
              <Info className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
              <span>{destination.notes}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-8 space-y-3">
          <button
            onClick={onConfirm}
            className="w-full cartoony-btn-emerald py-4 rounded-2xl text-base flex items-center justify-center gap-3 group"
          >
            <span>PLAY & WALK TO OFFICE</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onCancel}
            className="text-xs font-black text-slate-600 hover:text-slate-950 transition-colors"
          >
            Change Category
          </button>
        </div>

      </div>
    </div>
  );
};
