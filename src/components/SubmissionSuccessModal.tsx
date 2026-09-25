import React, { useState, useEffect } from 'react';
import { Submission } from '../types/campus';
import { CheckCircle2, Copy, Check, LogOut } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubmissionSuccessModalProps {
  submission: Submission;
  onDone: () => void;
}

export const SubmissionSuccessModal: React.FC<SubmissionSuccessModalProps> = ({
  submission,
  onDone,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(submission.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border-4 border-slate-900 rounded-3xl p-8 shadow-cartoon-lg text-center overflow-hidden">
        
        {/* Top Celebration Icon */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-400 border-3 border-slate-900 flex items-center justify-center shadow-sm mb-6 animate-bounce">
          <CheckCircle2 className="w-9 h-9 text-slate-950" />
        </div>

        <span className="text-xs font-mono font-black uppercase tracking-widest text-slate-950 bg-emerald-300 px-3 py-1 rounded-full border-2 border-slate-900">
          MESSAGE DELIVERED ✓
        </span>

        <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-4">
          Your Voice Has Been Recorded
        </h2>

        <p className="text-sm font-bold text-slate-700 mt-2 max-w-sm mx-auto">
          Delivered directly to <strong className="text-emerald-800 underline">{submission.destinationName} ({submission.roomCode})</strong>.
        </p>

        {/* Reference Ticket Card */}
        <div className="my-6 p-5 rounded-2xl bg-amber-100 border-3 border-slate-900 text-left space-y-3 relative">
          <div className="flex items-center justify-between text-xs font-mono font-black text-slate-900">
            <span>REFERENCE TICKET ID</span>
            <span className="bg-emerald-300 px-2 py-0.5 rounded-full border border-slate-900 text-[10px]">RECEIVED</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-slate-950 font-mono tracking-wider">
              {submission.id}
            </span>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-slate-900 text-xs font-black text-slate-900 shadow-sm hover:bg-slate-50 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-sky-600" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] font-bold text-slate-700 pt-2 border-t-2 border-slate-900/20">
            Save this reference ID if you want to track your submission status later in the Admin Portal.
          </p>
        </div>

        {/* Action Button */}
        <div className="space-y-3">
          <button
            onClick={onDone}
            className="w-full cartoony-btn-emerald py-4 rounded-2xl text-sm flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>RETURN TO CAMPUS MAP</span>
          </button>
        </div>

      </div>
    </div>
  );
};
