import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CampusLocation, Destination, RoutePath } from '../types/campus';
import { CAMPUS_LOCATIONS } from '../data/campusData';
import { generateRoutePath } from '../services/routingService';
import { 
  Building2, BookOpen, GraduationCap, Mic2, Theater, Utensils, 
  Trophy, Activity, CircleDot, Zap, Dumbbell, LogIn, Castle, Footprints,
  ZoomIn, ZoomOut, Maximize2, Navigation, Compass, Sparkles,
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Gamepad2, CheckCircle2
} from 'lucide-react';

interface CampusMapProps {
  destination: Destination | null;
  isWalking: boolean;
  onArrival?: () => void;
  onSelectLocation?: (loc: CampusLocation) => void;
  selectedLocationId?: string | null;
}

export const CampusMap: React.FC<CampusMapProps> = ({
  destination,
  isWalking,
  onArrival,
  onSelectLocation,
  selectedLocationId,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredLocation, setHoveredLocation] = useState<CampusLocation | null>(null);
  
  // Character Position & Movement State
  const [characterPos, setCharacterPos] = useState<{ x: number; y: number }>({ x: 865, y: 720 });
  const [facingDirection, setFacingDirection] = useState<'left' | 'right' | 'up' | 'down'>('up');
  const [isCharacterMoving, setIsCharacterMoving] = useState<boolean>(false);
  const [routePath, setRoutePath] = useState<RoutePath | null>(null);
  const [hasArrivedAtTarget, setHasArrivedAtTarget] = useState<boolean>(false);
  
  // Proximity to building detection
  const [nearbyLocation, setNearbyLocation] = useState<CampusLocation | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Reset position & path guide when destination changes
  useEffect(() => {
    if (destination) {
      const route = generateRoutePath('entrance-gate', destination.locationId);
      setRoutePath(route);
      setCharacterPos({ x: 865, y: 720 }); // Start at Entrance Gate
      setHasArrivedAtTarget(false);
    } else {
      setRoutePath(null);
      setCharacterPos({ x: 865, y: 720 });
      setHasArrivedAtTarget(false);
    }
  }, [destination]);

  // Proximity Detection Engine: Check if character is near any building or target
  useEffect(() => {
    let foundNear: CampusLocation | null = null;
    const padding = 45;

    for (const loc of CAMPUS_LOCATIONS) {
      if (
        characterPos.x >= loc.x - padding &&
        characterPos.x <= loc.x + loc.width + padding &&
        characterPos.y >= loc.y - padding &&
        characterPos.y <= loc.y + loc.height + padding
      ) {
        foundNear = loc;
        break;
      }
    }
    setNearbyLocation(foundNear);

    // Check if reached destination
    if (destination && foundNear && foundNear.id === destination.locationId) {
      if (!hasArrivedAtTarget) {
        setHasArrivedAtTarget(true);
      }
    } else {
      setHasArrivedAtTarget(false);
    }
  }, [characterPos, destination, hasArrivedAtTarget]);

  // MOVEMENT CONTROLS
  const moveCharacter = useCallback((dx: number, dy: number, dir: 'left' | 'right' | 'up' | 'down') => {
    setFacingDirection(dir);
    setIsCharacterMoving(true);
    
    setCharacterPos(prev => {
      const nextX = Math.max(30, Math.min(970, prev.x + dx));
      const nextY = Math.max(30, Math.min(770, prev.y + dy));
      return { x: nextX, y: nextY };
    });

    // Reset movement animation after key release tick
    setTimeout(() => {
      setIsCharacterMoving(false);
    }, 150);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't hijack if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const speed = 14; // Responsive movement speed per keypress

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        moveCharacter(0, -speed, 'up');
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        moveCharacter(0, speed, 'down');
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        moveCharacter(-speed, 0, 'left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        moveCharacter(speed, 0, 'right');
      } else if (e.key === 'Enter') {
        if (hasArrivedAtTarget && onArrival) {
          onArrival();
        } else if (nearbyLocation && onSelectLocation) {
          onSelectLocation(nearbyLocation);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveCharacter, nearbyLocation, hasArrivedAtTarget, onArrival, onSelectLocation]);

  const isDestinationLoc = (locId: string) => destination?.locationId === locId;

  return (
    <div className="relative w-full h-[660px] lg:h-[740px] bg-gradient-to-b from-sky-200 via-emerald-100 to-emerald-200 rounded-3xl overflow-hidden border-4 border-slate-900 shadow-cartoon select-none group">
      
      {/* HUD Cartoony Header Toolbar */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border-2 border-slate-900 shadow-cartoon">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-emerald-600 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono">
            Interactive Campus Explorer
          </span>
        </div>
        
        {destination ? (
          <div className="border-l-2 border-slate-300 pl-3 flex items-center gap-2 text-xs font-bold text-slate-800">
            <Navigation className="w-4 h-4 text-emerald-600 animate-bounce" />
            <span>Target: <strong className="text-emerald-700 underline">{destination.roomCode} ({destination.roomName})</strong></span>
          </div>
        ) : (
          <div className="border-l-2 border-slate-300 pl-3 text-xs font-bold text-slate-600">
            Walk across campus to destination
          </div>
        )}
      </div>

      {/* Map Zoom & Pan Control Buttons */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button 
          onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
          className="p-2.5 bg-white hover:bg-emerald-50 text-slate-900 font-black rounded-2xl border-2 border-slate-900 shadow-cartoon transition-all"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
          className="p-2.5 bg-white hover:bg-emerald-50 text-slate-900 font-black rounded-2xl border-2 border-slate-900 shadow-cartoon transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button 
          onClick={() => { setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); }}
          className="p-2.5 bg-white hover:bg-emerald-50 text-slate-900 font-black rounded-2xl border-2 border-slate-900 shadow-cartoon transition-all"
          title="Reset View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* On-Screen Controller D-Pad Buttons */}
      <div className="absolute bottom-6 right-6 z-20 bg-white/95 backdrop-blur-md p-3 rounded-3xl border-3 border-slate-900 shadow-cartoon flex flex-col items-center gap-1">
        <span className="text-[9px] font-mono font-black uppercase tracking-wider text-slate-700 mb-0.5">CONTROLS</span>
        <button
          onClick={() => moveCharacter(0, -18, 'up')}
          className="p-2.5 bg-amber-300 hover:bg-amber-400 active:bg-amber-500 rounded-xl border-2 border-slate-900 shadow-sm active:translate-y-0.5"
          title="Walk Up"
        >
          <ArrowUp className="w-4 h-4 text-slate-950" />
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={() => moveCharacter(-18, 0, 'left')}
            className="p-2.5 bg-amber-300 hover:bg-amber-400 active:bg-amber-500 rounded-xl border-2 border-slate-900 shadow-sm active:translate-y-0.5"
            title="Walk Left"
          >
            <ArrowLeft className="w-4 h-4 text-slate-950" />
          </button>
          <button
            onClick={() => moveCharacter(0, 18, 'down')}
            className="p-2.5 bg-amber-300 hover:bg-amber-400 active:bg-amber-500 rounded-xl border-2 border-slate-900 shadow-sm active:translate-y-0.5"
            title="Walk Down"
          >
            <ArrowDown className="w-4 h-4 text-slate-950" />
          </button>
          <button
            onClick={() => moveCharacter(18, 0, 'right')}
            className="p-2.5 bg-amber-300 hover:bg-amber-400 active:bg-amber-500 rounded-xl border-2 border-slate-900 shadow-sm active:translate-y-0.5"
            title="Walk Right"
          >
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>

      {/* Target Arrival Action Banner */}
      {hasArrivedAtTarget && destination ? (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 bg-emerald-400 border-4 border-slate-900 px-6 py-3 rounded-2xl shadow-cartoon-lg flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-6 h-6 text-slate-950" />
          <div>
            <div className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-950">DESTINATION REACHED!</div>
            <div className="text-sm font-black text-slate-950">
              You arrived at {destination.roomCode} ({destination.roomName})!
            </div>
          </div>
          <button
            onClick={() => onArrival && onArrival()}
            className="px-4 py-2 bg-slate-950 text-white rounded-xl text-xs font-black hover:bg-slate-800 shadow-sm border border-slate-900 flex items-center gap-1.5"
          >
            <span>ENTER ROOM</span>
            <LogIn className="w-4 h-4" />
          </button>
        </div>
      ) : nearbyLocation ? (
        /* Nearby Location Banner */
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 bg-amber-300 border-3 border-slate-900 px-4 py-2 rounded-2xl shadow-cartoon flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-slate-950" />
          <div className="text-xs font-black text-slate-950">
            Near <strong className="underline">{nearbyLocation.name}</strong>!
          </div>
          <button
            onClick={() => onSelectLocation && onSelectLocation(nearbyLocation)}
            className="px-3 py-1 bg-slate-950 text-white rounded-xl text-xs font-black hover:bg-slate-800"
          >
            INSPECT
          </button>
        </div>
      ) : null}

      {/* SVG Canvas Map Container */}
      <div 
        className="w-full h-full overflow-hidden"
        style={{
          transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
          transformOrigin: 'center center',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 1000 800"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern id="cartoony-grass" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect width="60" height="60" fill="#a7f3d0" />
              <circle cx="15" cy="15" r="3" fill="#6ee7b7" />
              <circle cx="45" cy="40" r="4" fill="#34d399" opacity="0.6" />
            </pattern>
          </defs>

          {/* Map Base */}
          <rect width="1000" height="800" fill="#bbf7d0" />
          <rect width="1000" height="800" fill="url(#cartoony-grass)" opacity="0.75" />

          {/* Drifting Clouds */}
          <g className="animate-cloud-float opacity-80 pointer-events-none">
            <path d="M 50 40 Q 65 20 85 40 Q 105 20 125 40 Q 140 50 120 65 Q 100 70 80 65 Q 40 60 50 40 Z" fill="#ffffff" opacity="0.9" />
            <path d="M 350 70 Q 365 50 385 70 Q 405 50 425 70 Q 440 80 420 95 Q 400 100 380 95 Q 340 90 350 70 Z" fill="#ffffff" opacity="0.85" />
            <path d="M 750 30 Q 765 10 785 30 Q 805 10 825 30 Q 840 40 820 55 Q 800 60 780 55 Q 740 50 750 30 Z" fill="#ffffff" opacity="0.9" />
          </g>

          {/* CAMPUS PATHWAYS & ROADS */}
          <path d="M 80 680 Q 500 680 920 680" fill="none" stroke="#e2e8f0" strokeWidth="28" strokeLinecap="round" />
          <path d="M 80 680 Q 500 680 920 680" fill="none" stroke="#475569" strokeWidth="3" strokeDasharray="12 12" />

          {/* Main Central Stairs */}
          <rect x="430" y="320" width="140" height="360" rx="16" fill="#cbd5e1" stroke="#334155" strokeWidth="3" />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={`stair-${i}`} x="435" y={340 + i * 26} width="130" height="12" rx="4" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
          ))}

          {/* Upper Connecting Pathway */}
          <path d="M 160 330 Q 500 330 840 330" fill="none" stroke="#e2e8f0" strokeWidth="20" strokeLinecap="round" />

          {/* Swaying Trees */}
          {[
            { cx: 80, cy: 300 }, { cx: 100, cy: 330 }, { cx: 330, cy: 350 }, { cx: 370, cy: 380 },
            { cx: 630, cy: 350 }, { cx: 670, cy: 380 }, { cx: 880, cy: 350 }, { cx: 910, cy: 380 },
            { cx: 770, cy: 400 }, { cx: 820, cy: 560 }, { cx: 860, cy: 590 }, { cx: 380, cy: 690 },
            { cx: 600, cy: 690 }, { cx: 50, cy: 630 }
          ].map((t, idx) => (
            <g key={`tree-${idx}`} className="animate-tree-sway" style={{ animationDelay: `${idx * 0.3}s`, transformOrigin: `${t.cx}px ${t.cy + 15}px` }}>
              <ellipse cx={t.cx} cy={t.cy + 12} rx="14" ry="6" fill="#000000" opacity="0.15" />
              <rect x={t.cx - 3} y={t.cy} width="6" height="14" rx="2" fill="#78350f" />
              <circle cx={t.cx} cy={t.cy - 6} r="16" fill="#10b981" stroke="#065f46" strokeWidth="2" />
              <circle cx={t.cx - 4} cy={t.cy - 10} r="10" fill="#34d399" />
              <circle cx={t.cx + 4} cy={t.cy - 4} r="8" fill="#059669" />
            </g>
          ))}

          {/* Yellow Campus Bus */}
          <g transform="translate(260, 695)">
            <rect x="0" y="0" width="70" height="26" rx="6" fill="#f59e0b" stroke="#0f172a" strokeWidth="2.5" />
            <rect x="6" y="4" width="12" height="10" rx="2" fill="#38bdf8" />
            <rect x="22" y="4" width="12" height="10" rx="2" fill="#38bdf8" />
            <rect x="38" y="4" width="12" height="10" rx="2" fill="#38bdf8" />
            <rect x="54" y="4" width="10" height="10" rx="2" fill="#38bdf8" />
            <circle cx="15" cy="26" r="4" fill="#0f172a" />
            <circle cx="55" cy="26" r="4" fill="#0f172a" />
          </g>

          {/* Route Path Visual Guide Trail */}
          {routePath && (
            <g>
              <path
                d={routePath.svgPathD}
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.3"
              />
              <path
                d={routePath.svgPathD}
                fill="none"
                stroke="#0284c7"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 8"
                className="animate-path-dash"
              />
            </g>
          )}

          {/* Campus Buildings */}
          {CAMPUS_LOCATIONS.map((loc) => {
            const isTarget = isDestinationLoc(loc.id);
            const isHovered = hoveredLocation?.id === loc.id;
            const isNear = nearbyLocation?.id === loc.id;

            return (
              <g
                key={loc.id}
                onClick={() => onSelectLocation && onSelectLocation(loc)}
                onMouseEnter={() => setHoveredLocation(loc)}
                onMouseLeave={() => setHoveredLocation(null)}
                className="cursor-pointer transition-all duration-200"
              >
                {/* Target Pulsing Glow */}
                {(isTarget || isNear) && (
                  <rect
                    x={loc.x - 8}
                    y={loc.y - 8}
                    width={loc.width + 16}
                    height={loc.height + 16}
                    rx="20"
                    fill="none"
                    stroke={isTarget ? '#f59e0b' : '#38bdf8'}
                    strokeWidth="4"
                    strokeDasharray="6 6"
                    className="animate-pulse"
                  />
                )}

                {/* Building Drop Shadow */}
                <rect
                  x={loc.x + 4}
                  y={loc.y + 6}
                  width={loc.width}
                  height={loc.height}
                  rx="16"
                  fill="#0f172a"
                  opacity="0.25"
                />

                {/* Building Base Box */}
                <rect
                  x={loc.x}
                  y={loc.y}
                  width={loc.width}
                  height={loc.height}
                  rx="16"
                  fill={isTarget ? '#fef08a' : isHovered || isNear ? '#ffffff' : loc.color}
                  stroke="#0f172a"
                  strokeWidth="3"
                  className="transition-all duration-200"
                />

                {/* Roof Header */}
                <rect
                  x={loc.x + 3}
                  y={loc.y + 3}
                  width={loc.width - 6}
                  height={Math.max(loc.height / 3.2, 18)}
                  rx="10"
                  fill={loc.accentColor}
                  stroke="#0f172a"
                  strokeWidth="1.5"
                />

                {/* Windows */}
                {loc.type === 'building' && (
                  <g opacity="0.8">
                    <rect x={loc.x + 12} y={loc.y + loc.height / 2} width="12" height="12" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                    <rect x={loc.x + loc.width - 24} y={loc.y + loc.height / 2} width="12" height="12" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                  </g>
                )}

                {/* Building Labels */}
                <foreignObject
                  x={loc.x}
                  y={loc.y}
                  width={loc.width}
                  height={loc.height}
                  className="pointer-events-none"
                >
                  <div className="w-full h-full flex flex-col items-center justify-between p-2 text-center text-slate-900">
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-900 truncate bg-white/90 px-2 py-0.5 rounded-full border border-slate-900 mt-0.5">
                      {loc.shortName}
                    </div>
                    <div className="text-[11px] font-extrabold line-clamp-2 leading-tight text-slate-950 drop-shadow-sm mb-1">
                      {loc.name}
                    </div>
                  </div>
                </foreignObject>

                {/* Target Badge */}
                {isTarget && (
                  <foreignObject
                    x={loc.x + loc.width / 2 - 65}
                    y={loc.y - 42}
                    width="130"
                    height="40"
                    className="pointer-events-none animate-bounce"
                  >
                    <div className="bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-center shadow-cartoon border-2 border-slate-900 flex items-center justify-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                      <span>TARGET OFFICE</span>
                    </div>
                  </foreignObject>
                )}
              </g>
            );
          })}

          {/* HITAM FORT FLAG */}
          <g transform="translate(490, 670)">
            <line x1="0" y1="0" x2="0" y2="-30" stroke="#0f172a" strokeWidth="3" />
            <path d="M 0 -30 Q 12 -25 24 -30 Q 12 -35 0 -40 Z" fill="#f97316" stroke="#0f172a" strokeWidth="1.5" />
          </g>

          {/* STUDENT CONTROLLED PLAYABLE CHARACTER */}
          <g 
            transform={`translate(${characterPos.x}, ${characterPos.y})`} 
            className="transition-transform duration-75 ease-out pointer-events-none z-30"
          >
            {/* Character Shadow */}
            <ellipse cx="0" cy="18" rx="14" ry="5" fill="#0f172a" opacity="0.35" />

            {/* Stepping Character Model with Leg Animations */}
            <g className={isCharacterMoving ? 'animate-walk-bob' : ''}>
              
              {/* Backpack */}
              <rect x="-14" y="-8" width="8" height="14" rx="3" fill="#f97316" stroke="#0f172a" strokeWidth="2" />
              
              {/* Body (Student Hoodie) */}
              <rect x="-10" y="-10" width="20" height="22" rx="6" fill="#0284c7" stroke="#0f172a" strokeWidth="2.5" />

              {/* Cute Head */}
              <circle cx="0" cy="-22" r="11" fill="#fde047" stroke="#0f172a" strokeWidth="2.5" />
              
              {/* Student Red Cap */}
              <path d="M -12 -24 Q 0 -34 12 -24 L 14 -22 L -14 -22 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />

              {/* Facial Expression (facing direction) */}
              {facingDirection === 'right' && (
                <>
                  <circle cx="4" cy="-22" r="1.5" fill="#0f172a" />
                  <path d="M 4 -18 Q 7 -18 7 -16" stroke="#0f172a" strokeWidth="1.5" fill="none" />
                </>
              )}
              {facingDirection === 'left' && (
                <>
                  <circle cx="-4" cy="-22" r="1.5" fill="#0f172a" />
                  <path d="M -4 -18 Q -7 -18 -7 -16" stroke="#0f172a" strokeWidth="1.5" fill="none" />
                </>
              )}
              {(facingDirection === 'up' || facingDirection === 'down') && (
                <>
                  <circle cx="-3" cy="-22" r="1.5" fill="#0f172a" />
                  <circle cx="3" cy="-22" r="1.5" fill="#0f172a" />
                  <path d="M -2 -17 Q 0 -15 2 -17" stroke="#0f172a" strokeWidth="1.5" fill="none" />
                </>
              )}

              {/* Legs with dynamic stepping angle */}
              <line 
                x1="-5" y1="12" 
                x2={isCharacterMoving ? '-8' : '-5'} y2={isCharacterMoving ? '20' : '18'} 
                stroke="#0f172a" strokeWidth="3" strokeLinecap="round" 
              />
              <line 
                x1="5" y1="12" 
                x2={isCharacterMoving ? '8' : '5'} y2={isCharacterMoving ? '17' : '18'} 
                stroke="#0f172a" strokeWidth="3" strokeLinecap="round" 
              />

            </g>
          </g>

        </svg>
      </div>

      {/* Hover Tooltip */}
      {hoveredLocation && (
        <div className="absolute bottom-4 left-4 z-20 max-w-xs bg-white border-3 border-slate-900 p-3 rounded-2xl shadow-cartoon backdrop-blur-md pointer-events-none animate-fadeIn">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full border border-slate-900" style={{ backgroundColor: hoveredLocation.accentColor }}></span>
            <h4 className="text-xs font-black text-slate-900">{hoveredLocation.name}</h4>
          </div>
          <p className="text-[11px] text-slate-700 font-semibold leading-snug">{hoveredLocation.description}</p>
        </div>
      )}

    </div>
  );
};
