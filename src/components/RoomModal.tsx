import React, { useState } from 'react';
import { Destination, FeedbackType } from '../types/campus';
import { 
  Building2, AlertTriangle, HelpCircle, CheckCircle2, Info, 
  ChevronDown, ChevronUp, Lock, UserCheck, Send
} from 'lucide-react';

interface RoomModalProps {
  destination: Destination;
  onSubmit: (payload: {
    feedbackType: FeedbackType;
    message: string;
    followUps?: Record<string, string>;
    isAnonymous: boolean;
    studentInfo?: { name?: string; rollNo?: string; email?: string };
  }) => void;
  onClose: () => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({ destination, onSubmit, onClose }) => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('CONCERN');
  const [message, setMessage] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  
  const [name, setName] = useState<string>('');
  const [rollNo, setRollNo] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [showFollowUps, setShowFollowUps] = useState<boolean>(false);
  const [followWhatHappened, setFollowWhatHappened] = useState<string>('');
  const [followFrequency, setFollowFrequency] = useState<string>('');
  const [followAffected, setFollowAffected] = useState<string>('');
  const [followProposedChange, setFollowProposedChange] = useState<string>('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrorMsg('Please write a brief message before submitting.');
      return;
    }

    const followUps: Record<string, string> = {};
    if (followWhatHappened.trim()) followUps['What happened?'] = followWhatHappened;
    if (followFrequency.trim()) followUps['How often does this happen?'] = followFrequency;
    if (followAffected.trim()) followUps['Who or what is affected?'] = followAffected;
    if (followProposedChange.trim()) followUps['What would you change?'] = followProposedChange;

    onSubmit({
      feedbackType,
      message: message.trim(),
      followUps: Object.keys(followUps).length > 0 ? followUps : undefined,
      isAnonymous,
      studentInfo: isAnonymous ? undefined : { name, rollNo, email },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border-4 border-slate-900 rounded-3xl p-6 sm:p-8 shadow-cartoon-lg my-8">
        
        {/* Header Room Banner */}
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-300 border-2 border-slate-900 text-slate-950 flex items-center justify-center font-mono font-black text-xl shadow-sm">
              {destination.roomCode}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-emerald-800 bg-emerald-300 px-2 py-0.5 rounded-full border border-slate-900">
                  ARRIVED AT DESTINATION
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">
                {destination.roomName}
              </h2>
              <p className="text-xs font-bold text-slate-600">{destination.inCharge}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-black text-slate-700 hover:text-slate-950 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border-2 border-slate-900 rounded-xl"
          >
            Leave Room
          </button>
        </div>

        {/* Room Welcome Banner */}
        <div className="bg-amber-100 p-4 rounded-2xl border-2 border-slate-900 mb-6">
          <p className="text-xs font-black text-slate-900">
            "You've arrived. You came here for a reason. What would you like to tell us?"
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          
          {/* Feedback Type Selection Pills */}
          <div>
            <label className="block text-xs font-mono font-black uppercase tracking-wider text-slate-900 mb-3">
              SELECT FEEDBACK NATURE:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { type: 'GRIEVANCE' as FeedbackType, label: '🔴 GRIEVANCE', color: 'bg-rose-200 border-rose-900 text-rose-950' },
                { type: 'CONCERN' as FeedbackType, label: '🟡 CONCERN', color: 'bg-amber-200 border-amber-900 text-amber-950' },
                { type: 'SUGGESTION' as FeedbackType, label: '🟢 SUGGESTION', color: 'bg-emerald-200 border-emerald-900 text-emerald-950' },
                { type: 'SOMETHING_ELSE' as FeedbackType, label: '🔵 OTHER', color: 'bg-sky-200 border-sky-900 text-sky-950' },
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setFeedbackType(item.type)}
                  className={`py-3 px-2 rounded-xl text-xs font-black border-2 transition-all ${
                    feedbackType === item.type
                      ? `${item.color} shadow-sm ring-2 ring-slate-900 scale-[1.02]`
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Message Area */}
          <div>
            <label className="block text-xs font-mono font-black uppercase tracking-wider text-slate-900 mb-2">
              TELL US WHAT'S ON YOUR MIND:
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => { setMessage(e.target.value); setErrorMsg(null); }}
              placeholder="Be honest. Be specific. Tell us what happened, what should change, or what should continue."
              className="w-full bg-slate-50 border-2 border-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-400 rounded-2xl p-4 text-sm font-bold text-slate-900 placeholder-slate-400 outline-none transition-all resize-none shadow-sm"
            />
            {errorMsg && <p className="text-xs text-rose-600 mt-1 font-black">{errorMsg}</p>}
          </div>

          {/* Optional Follow-up Accordion */}
          <div className="border-2 border-slate-900 rounded-2xl overflow-hidden bg-sky-50">
            <button
              type="button"
              onClick={() => setShowFollowUps(!showFollowUps)}
              className="w-full p-4 flex items-center justify-between text-xs font-black text-slate-900 hover:bg-sky-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-sky-600" />
                <span>Optional Follow-up Questions (Help us act faster)</span>
              </div>
              {showFollowUps ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showFollowUps && (
              <div className="p-4 pt-0 border-t-2 border-slate-900 space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-[11px] text-slate-800 font-bold mb-1">What happened specifically?</label>
                  <input
                    type="text"
                    value={followWhatHappened}
                    onChange={(e) => setFollowWhatHappened(e.target.value)}
                    placeholder="Brief description of the event..."
                    className="w-full bg-white border-2 border-slate-900 rounded-xl p-2.5 text-xs font-bold text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-800 font-bold mb-1">How often does this happen?</label>
                  <input
                    type="text"
                    value={followFrequency}
                    onChange={(e) => setFollowFrequency(e.target.value)}
                    placeholder="First time / Daily / Weekly during exams..."
                    className="w-full bg-white border-2 border-slate-900 rounded-xl p-2.5 text-xs font-bold text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-800 font-bold mb-1">Who or what is affected?</label>
                  <input
                    type="text"
                    value={followAffected}
                    onChange={(e) => setFollowAffected(e.target.value)}
                    placeholder="Entire class / CSE branch / Canteen visitors..."
                    className="w-full bg-white border-2 border-slate-900 rounded-xl p-2.5 text-xs font-bold text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-800 font-bold mb-1">What solution would you suggest?</label>
                  <input
                    type="text"
                    value={followProposedChange}
                    onChange={(e) => setFollowProposedChange(e.target.value)}
                    placeholder="Your proposed fix or improvement..."
                    className="w-full bg-white border-2 border-slate-900 rounded-xl p-2.5 text-xs font-bold text-slate-900 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Anonymous Toggle & Voluntary Information */}
          <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-slate-900 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-700" />
                <div>
                  <h4 className="text-xs font-black text-slate-900">Submit Anonymously</h4>
                  <p className="text-[11px] font-bold text-slate-600">Default is 100% anonymous</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-900 after:border-2 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {!isAnonymous && (
              <div className="pt-3 border-t-2 border-slate-900 space-y-3 animate-fadeIn">
                <p className="text-[11px] font-black text-slate-900">Provide voluntary contact info for status updates:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white border-2 border-slate-900 rounded-xl p-2.5 text-xs font-bold text-slate-900 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Roll Number"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    className="bg-white border-2 border-slate-900 rounded-xl p-2.5 text-xs font-bold text-slate-900 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white border-2 border-slate-900 rounded-xl p-2.5 text-xs font-bold text-slate-900 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full cartoony-btn-emerald py-4 rounded-2xl text-sm flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>SUBMIT VOICE TO {destination.roomCode}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
