import React, { useState } from 'react';
import { DECISION_TREE_NODES } from '../data/campusData';
import { HelpCircle, X, ChevronRight, RefreshCw } from 'lucide-react';

interface DecisionWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestinationRoom: (roomId: string) => void;
}

export const DecisionWizardModal: React.FC<DecisionWizardModalProps> = ({
  isOpen,
  onClose,
  onSelectDestinationRoom,
}) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');

  if (!isOpen) return null;

  const currentNode = DECISION_TREE_NODES[currentNodeId] || DECISION_TREE_NODES.start;

  const handleOptionClick = (opt: { nextNodeId?: string; destinationRoomId?: string }) => {
    if (opt.destinationRoomId) {
      onSelectDestinationRoom(opt.destinationRoomId);
      onClose();
    } else if (opt.nextNodeId) {
      setCurrentNodeId(opt.nextNodeId);
    }
  };

  const handleReset = () => {
    setCurrentNodeId('start');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border-4 border-slate-900 rounded-3xl p-6 sm:p-8 shadow-cartoon-lg overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b-2 border-slate-900 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-sky-300 border-2 border-slate-900">
              <HelpCircle className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Campus Finder Helper</h3>
              <p className="text-xs font-bold text-slate-600">Answer 2 quick questions to find your destination</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border-2 border-slate-900 transition-colors font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Question */}
        <div className="mb-6 bg-emerald-100 p-4 rounded-2xl border-2 border-slate-900">
          <span className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-900">
            QUESTION
          </span>
          <h4 className="text-base font-black text-slate-950 mt-1">
            {currentNode.question}
          </h4>
        </div>

        {/* Options List */}
        <div className="space-y-3 mb-6">
          {currentNode.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(opt)}
              className="w-full text-left p-4 rounded-2xl bg-slate-50 hover:bg-sky-100 border-2 border-slate-900 text-slate-900 font-bold text-xs sm:text-sm transition-all duration-150 flex items-center justify-between group shadow-sm"
            >
              <span>{opt.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-700 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-slate-900 text-xs font-black">
          {currentNodeId !== 'start' ? (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-slate-700 hover:text-slate-950"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Start Over</span>
            </button>
          ) : <div></div>}

          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-950"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};
