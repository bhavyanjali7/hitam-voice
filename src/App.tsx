import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { CategorySelector } from './components/CategorySelector';
import { DecisionWizardModal } from './components/DecisionWizardModal';
import { DestinationConfirmModal } from './components/DestinationConfirmModal';
import { CampusMap } from './components/CampusMap';
import { RoomModal } from './components/RoomModal';
import { SubmissionSuccessModal } from './components/SubmissionSuccessModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Destination, CategoryId, FeedbackType, Submission, CampusLocation } from './types/campus';
import { resolveDestination, getLocationById, getRoomById } from './services/routingService';
import { submissionService } from './services/submissionService';
import { Compass, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

export type JourneyStep = 
  | 'landing' 
  | 'category' 
  | 'confirm_destination' 
  | 'walking' 
  | 'in_room' 
  | 'submitted';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'student' | 'admin'>('student');
  const [journeyStep, setJourneyStep] = useState<JourneyStep>('landing');
  
  // Active destination
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);
  
  // Modals & UI states
  const [isWizardOpen, setIsWizardOpen] = useState<boolean>(false);
  const [isWalking, setIsWalking] = useState<boolean>(false);
  const [completedSubmission, setCompletedSubmission] = useState<Submission | null>(null);
  const [selectedLocationOnMap, setSelectedLocationOnMap] = useState<string | null>(null);

  // Trigger category resolution
  const handleCategorySelected = (
    categoryId: CategoryId, 
    subSelection?: { departmentId?: string; infraAreaId?: string; overrideRoomId?: string }
  ) => {
    const dest = resolveDestination(categoryId, subSelection);
    setActiveDestination(dest);
    setJourneyStep('confirm_destination');
  };

  // Trigger from decision tree wizard
  const handleWizardDestinationSelected = (roomId: string) => {
    const dest = resolveDestination('SOMETHING_ELSE', { overrideRoomId: roomId });
    setActiveDestination(dest);
    setJourneyStep('confirm_destination');
  };

  // User confirms "TAKE ME THERE →"
  const handleConfirmRoute = () => {
    setJourneyStep('walking');
    setIsWalking(true);
  };

  // Avatar arrives at room
  const handleArrivalAtDestination = () => {
    setIsWalking(false);
    setJourneyStep('in_room');
  };

  // Form submission inside room
  const handleRoomFormSubmit = (payload: {
    feedbackType: FeedbackType;
    message: string;
    followUps?: Record<string, string>;
    isAnonymous: boolean;
    studentInfo?: { name?: string; rollNo?: string; email?: string };
  }) => {
    if (!activeDestination) return;

    const sub = submissionService.createSubmission({
      categoryId: (activeDestination.categoryTitle as CategoryId) || 'SOMETHING_ELSE',
      categoryTitle: activeDestination.categoryTitle,
      department: activeDestination.subcategoryTitle,
      destinationName: activeDestination.roomName,
      roomCode: activeDestination.roomCode,
      locationId: activeDestination.locationId,
      feedbackType: payload.feedbackType,
      message: payload.message,
      followUps: payload.followUps,
      isAnonymous: payload.isAnonymous,
      studentInfo: payload.studentInfo,
    });

    setCompletedSubmission(sub);
    setJourneyStep('submitted');
  };

  // Reset student journey
  const handleResetJourney = () => {
    setJourneyStep('landing');
    setActiveDestination(null);
    setIsWalking(false);
    setCompletedSubmission(null);
    setSelectedLocationOnMap(null);
  };

  // Handle building click on map
  const handleSelectLocationOnMap = (loc: CampusLocation) => {
    setSelectedLocationOnMap(loc.id);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        onResetJourney={handleResetJourney}
      />

      {/* Main View Switching */}
      <main className="flex-1">
        {currentView === 'admin' ? (
          <AdminDashboard />
        ) : (
          <div>
            {/* 1. Landing Hero Step */}
            {journeyStep === 'landing' && (
              <LandingHero
                onEnterCampus={() => setJourneyStep('category')}
                onOpenWizard={() => setIsWizardOpen(true)}
              />
            )}

            {/* 2. Category Selection Step */}
            {journeyStep === 'category' && (
              <CategorySelector
                onSelectCategory={handleCategorySelected}
                onOpenDecisionTree={() => setIsWizardOpen(true)}
              />
            )}

            {/* 3, 4. Map & Walking Journey View */}
            {(journeyStep === 'walking' || journeyStep === 'confirm_destination' || journeyStep === 'in_room') && (
              <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
                
                {/* Map Sub-Header Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400">
                        CAMPUS NAVIGATION EXPLORER
                      </span>
                      <h3 className="text-base font-bold text-white">
                        {activeDestination ? `Destination: ${activeDestination.roomCode} - ${activeDestination.roomName}` : 'Explore HITAM Campus'}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setJourneyStep('category')}
                      className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      Change Category
                    </button>
                    {activeDestination && journeyStep !== 'walking' && (
                      <button
                        onClick={handleConfirmRoute}
                        className="flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md hover:scale-105 transition-transform"
                      >
                        <span>START WALK</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* SVG Interactive Map */}
                <CampusMap
                  destination={activeDestination}
                  isWalking={isWalking}
                  onArrival={handleArrivalAtDestination}
                  onSelectLocation={handleSelectLocationOnMap}
                  selectedLocationId={selectedLocationOnMap}
                />

              </div>
            )}

            {/* 5. Destination Confirmation Modal */}
            {journeyStep === 'confirm_destination' && activeDestination && (
              <DestinationConfirmModal
                destination={activeDestination}
                onConfirm={handleConfirmRoute}
                onCancel={() => setJourneyStep('category')}
              />
            )}

            {/* 6. Room Experience Entry Modal */}
            {journeyStep === 'in_room' && activeDestination && (
              <RoomModal
                destination={activeDestination}
                onSubmit={handleRoomFormSubmit}
                onClose={() => setJourneyStep('walking')}
              />
            )}

            {/* 7. Submission Success Confirmation Modal */}
            {journeyStep === 'submitted' && completedSubmission && (
              <SubmissionSuccessModal
                submission={completedSubmission}
                onDone={handleResetJourney}
              />
            )}

            {/* Decision Tree Helper Modal */}
            <DecisionWizardModal
              isOpen={isWizardOpen}
              onClose={() => setIsWizardOpen(false)}
              onSelectDestinationRoom={handleWizardDestinationSelected}
            />

          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 px-4 text-center text-xs text-slate-500">
        <p>© HITAM - Hyderabad Institute of Technology & Management | Student Voice Portal</p>
      </footer>

    </div>
  );
};
