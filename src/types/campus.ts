export type LocationType = 'building' | 'court' | 'outdoor' | 'landmark' | 'entrance' | 'canteen';

export interface CampusLocation {
  id: string;
  name: string;
  shortName: string;
  type: LocationType;
  description: string;
  x: number; // Map percentage or coordinate
  y: number;
  width: number;
  height: number;
  color: string;
  accentColor: string;
  iconName: string;
  isSelectable: boolean;
}

export interface Room {
  id: string;
  code: string; // e.g., "G19", "G04", "F08"
  name: string; // e.g., "Dean – Academics"
  locationId: string;
  floor: 'Ground Floor (G)' | 'First Floor (F)' | 'Second Floor (S)' | 'Third Floor (T)' | 'Outdoor / Campus Area';
  inCharge: string;
  isPlaceholder: boolean;
  notes?: string;
}

export interface Department {
  id: string;
  code: string; // e.g. CSE-AIML
  name: string;
  destinationRoomId: string;
  hodName: string;
  isPlaceholder: boolean;
}

export type CategoryId = 
  | 'ACADEMICS' 
  | 'INFRASTRUCTURE' 
  | 'STUDENT_SSG' 
  | 'CANTEEN' 
  | 'DEPARTMENT' 
  | 'CLUBS_ACTIVITIES' 
  | 'SOMETHING_ELSE';

export interface Category {
  id: CategoryId;
  title: string;
  iconName: string;
  description: string;
  color: string;
  requiresSubtype?: 'area' | 'department' | 'wizard';
}

export interface Destination {
  locationId: string;
  roomId: string;
  roomCode: string;
  roomName: string;
  inCharge: string;
  categoryTitle: string;
  subcategoryTitle?: string;
  notes?: string;
}

export interface RouteWaypoint {
  x: number;
  y: number;
  label?: string;
}

export interface RouteMilestone {
  percent: number; // 0 to 100
  message: string;
}

export interface RoutePath {
  id: string;
  startLocationId: string;
  endLocationId: string;
  waypoints: RouteWaypoint[];
  svgPathD: string;
  milestones: RouteMilestone[];
}

export type FeedbackType = 'GRIEVANCE' | 'CONCERN' | 'SUGGESTION' | 'SOMETHING_ELSE';

export type SubmissionStatus = 'Received' | 'Under Review' | 'Action Taken' | 'Resolved';

export interface StudentContactInfo {
  name?: string;
  rollNo?: string;
  email?: string;
}

export interface Submission {
  id: string; // e.g. HITAM-SSG-3948
  timestamp: string;
  categoryId: CategoryId;
  categoryTitle: string;
  department?: string;
  destinationName: string;
  roomCode: string;
  locationId: string;
  feedbackType: FeedbackType;
  message: string;
  followUps?: Record<string, string>;
  isAnonymous: boolean;
  studentInfo?: StudentContactInfo;
  status: SubmissionStatus;
  adminNote?: string;
}

export interface DecisionNode {
  id: string;
  question: string;
  options: {
    label: string;
    description?: string;
    nextNodeId?: string;
    destinationRoomId?: string;
  }[];
}
