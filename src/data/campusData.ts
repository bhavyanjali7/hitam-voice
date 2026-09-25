import { CampusLocation, Room, Department, Category, DecisionNode } from '../types/campus';

/**
 * HITAM Campus Locations Configuration
 * Coordinates correspond to stylized vector SVG map (1000 x 800 viewBox)
 * Preserves the exact spatial placement from the provided aerial reference photo.
 */
export const CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: 'entrance-gate',
    name: 'Main Campus Entrance',
    shortName: 'Entrance',
    type: 'entrance',
    description: 'Welcome gate of HITAM campus',
    x: 820,
    y: 720,
    width: 90,
    height: 60,
    color: '#059669',
    accentColor: '#34d399',
    iconName: 'LogIn',
    isSelectable: true,
  },
  {
    id: 'hitam-fort',
    name: 'HITAM Fort',
    shortName: 'Fort',
    type: 'landmark',
    description: 'Iconic open campus structure & flag post',
    x: 430,
    y: 680,
    width: 140,
    height: 70,
    color: '#b45309',
    accentColor: '#f59e0b',
    iconName: 'Castle',
    isSelectable: true,
  },
  {
    id: 'main-stairs',
    name: 'Main Central Stairs',
    shortName: 'Main Stairs',
    type: 'landmark',
    description: 'Central steps leading to administrative block',
    x: 440,
    y: 400,
    width: 80,
    height: 240,
    color: '#475569',
    accentColor: '#94a3b8',
    iconName: 'Footprints',
    isSelectable: true,
  },
  {
    id: 'main-block-middle',
    name: 'Main Block - Administrative & Central',
    shortName: 'Main Block (Middle)',
    type: 'building',
    description: 'Houses Dean Academics (G19), SSG Room (G04), Principal & Admin',
    x: 380,
    y: 130,
    width: 200,
    height: 180,
    color: '#1e3a8a',
    accentColor: '#60a5fa',
    iconName: 'Building2',
    isSelectable: true,
  },
  {
    id: 'main-block-left',
    name: 'Main Block - Left Wing (Rooms 07–14)',
    shortName: 'Rooms 07–14 Wing',
    type: 'building',
    description: 'Classrooms & Labs (G07–G14, F07–F14, S07–S14, T07–T14)',
    x: 130,
    y: 150,
    width: 210,
    height: 180,
    color: '#0f766e',
    accentColor: '#2dd4bf',
    iconName: 'BookOpen',
    isSelectable: true,
  },
  {
    id: 'main-block-right',
    name: 'Main Block - Right Wing (Rooms 01–06)',
    shortName: 'Rooms 01–06 Wing',
    type: 'building',
    description: 'Department HOD Offices & Rooms (G01–G06, F01–F06, S01–S06, T01–T06)',
    x: 620,
    y: 150,
    width: 210,
    height: 180,
    color: '#4c1d95',
    accentColor: '#a78bfa',
    iconName: 'GraduationCap',
    isSelectable: true,
  },
  {
    id: 'auditorium',
    name: 'Auditorium Complex',
    shortName: 'Auditorium',
    type: 'building',
    description: 'Indoor events, seminars & grand assemblies',
    x: 840,
    y: 130,
    width: 130,
    height: 130,
    color: '#854d0e',
    accentColor: '#fbbf24',
    iconName: 'Mic2',
    isSelectable: true,
  },
  {
    id: 'amphitheatre',
    name: 'Outdoor Amphitheatre',
    shortName: 'Amphitheatre',
    type: 'outdoor',
    description: 'Open-air performances, student club activities & gatherings',
    x: 800,
    y: 420,
    width: 140,
    height: 120,
    color: '#047857',
    accentColor: '#10b981',
    iconName: 'Theater',
    isSelectable: true,
  },
  {
    id: 'canteen',
    name: 'HITAM Canteen & Food Court',
    shortName: 'Canteen',
    type: 'canteen',
    description: 'Dining area, refreshments, snacks & beverage counter',
    x: 160,
    y: 370,
    width: 150,
    height: 110,
    color: '#c2410c',
    accentColor: '#fb923c',
    iconName: 'Utensils',
    isSelectable: true,
  },
  {
    id: 'volleyball-court',
    name: 'Volleyball Court',
    shortName: 'Volleyball',
    type: 'court',
    description: 'Outdoor volleyball sports facility',
    x: 110,
    y: 520,
    width: 120,
    height: 80,
    color: '#15803d',
    accentColor: '#4ade80',
    iconName: 'Trophy',
    isSelectable: true,
  },
  {
    id: 'pickleball-court',
    name: 'Pickleball Court',
    shortName: 'Pickleball',
    type: 'court',
    description: 'Standard outdoor pickleball court',
    x: 250,
    y: 530,
    width: 110,
    height: 80,
    color: '#0284c7',
    accentColor: '#38bdf8',
    iconName: 'Activity',
    isSelectable: true,
  },
  {
    id: 'throwball-court',
    name: 'Throwball Court',
    shortName: 'Throwball',
    type: 'court',
    description: 'Dedicated throwball court near main block',
    x: 650,
    y: 380,
    width: 120,
    height: 80,
    color: '#7c3aed',
    accentColor: '#c084fc',
    iconName: 'CircleDot',
    isSelectable: true,
  },
  {
    id: 'kho-kho-court',
    name: 'Kho-Kho Court',
    shortName: 'Kho-Kho',
    type: 'court',
    description: 'Traditional outdoor sports arena',
    x: 110,
    y: 690,
    width: 160,
    height: 90,
    color: '#9a3412',
    accentColor: '#fdba74',
    iconName: 'Zap',
    isSelectable: true,
  },
  {
    id: 'football-ground',
    name: 'Main Football Ground',
    shortName: 'Football Ground',
    type: 'court',
    description: 'Large sports field & athletics area',
    x: 650,
    y: 680,
    width: 180,
    height: 100,
    color: '#166534',
    accentColor: '#86efac',
    iconName: 'Dumbbell',
    isSelectable: true,
  },
];

/**
 * CONFIGURABLE ROOM & ENDPOINT DATA
 * NOTE: Placeholders are explicitly indicated for missing room numbers per instructions.
 */
export const ROOMS_DATA: Room[] = [
  {
    id: 'g19-dean-academics',
    code: 'G19',
    name: 'Dean – Academics Office',
    locationId: 'main-block-middle',
    floor: 'Ground Floor (G)',
    inCharge: 'Dean of Academic Affairs',
    isPlaceholder: false,
    notes: 'Handles curriculum, examination disputes, faculty matters & academic governance.'
  },
  {
    id: 'g04-ssg-room',
    code: 'G04',
    name: 'Student Support Group (SSG) Office',
    locationId: 'main-block-middle',
    floor: 'Ground Floor (G)',
    inCharge: 'SSG Committee & Student Welfare Officer',
    isPlaceholder: false,
    notes: 'Handles student grievances, counseling, policy questions & student experience.'
  },
  {
    id: 'canteen-office',
    code: 'CANTEEN',
    name: 'Canteen & Catering Desk',
    locationId: 'canteen',
    floor: 'Outdoor / Campus Area',
    inCharge: 'Canteen Manager & Hygiene Supervisor',
    isPlaceholder: false,
    notes: 'Food quality, pricing, cleanliness, food safety, service speed.'
  },
  {
    id: 'f01-cse-aiml',
    code: 'F01',
    name: 'CSE & AI-ML Department HOD Office',
    locationId: 'main-block-right',
    floor: 'First Floor (F)',
    inCharge: 'HOD – Computer Science & AI-ML',
    isPlaceholder: true, // [PLACEHOLDER: Update exact room if changed]
    notes: 'Department specific academic & lab concerns.'
  },
  {
    id: 'f02-ece-hod',
    code: 'F02',
    name: 'ECE Department HOD Office',
    locationId: 'main-block-right',
    floor: 'First Floor (F)',
    inCharge: 'HOD – Electronics & Communication',
    isPlaceholder: true, // [PLACEHOLDER]
  },
  {
    id: 'f03-eee-hod',
    code: 'F03',
    name: 'EEE Department HOD Office',
    locationId: 'main-block-right',
    floor: 'First Floor (F)',
    inCharge: 'HOD – Electrical & Electronics',
    isPlaceholder: true, // [PLACEHOLDER]
  },
  {
    id: 'f04-mech-hod',
    code: 'F04',
    name: 'Mechanical Engineering HOD Office',
    locationId: 'main-block-right',
    floor: 'First Floor (F)',
    inCharge: 'HOD – Mechanical Engineering',
    isPlaceholder: true, // [PLACEHOLDER]
  },
  {
    id: 'f05-civil-hod',
    code: 'F05',
    name: 'Civil Engineering HOD Office',
    locationId: 'main-block-right',
    floor: 'First Floor (F)',
    inCharge: 'HOD – Civil Engineering',
    isPlaceholder: true, // [PLACEHOLDER]
  },
  {
    id: 'g12-maintenance',
    code: 'G12',
    name: 'Campus Infrastructure & Maintenance Cell',
    locationId: 'main-block-left',
    floor: 'Ground Floor (G)',
    inCharge: 'Estate Manager & Infrastructure Team',
    isPlaceholder: true, // [PLACEHOLDER]
    notes: 'Repairs, electricity, water supply, washrooms, classroom benches, ACs.'
  },
  {
    id: 'sports-office',
    code: 'G08',
    name: 'Physical Education & Sports Office',
    locationId: 'main-block-left',
    floor: 'Ground Floor (G)',
    inCharge: 'Sports Director & Equipment Desk',
    isPlaceholder: true, // [PLACEHOLDER]
    notes: 'Sports grounds, equipment maintenance, tournament support.'
  },
  {
    id: 'sac-room',
    code: 'S04',
    name: 'Student Activity Centre (SAC)',
    locationId: 'main-block-right',
    floor: 'Second Floor (S)',
    inCharge: 'Clubs Coordinator & Cultural Head',
    isPlaceholder: true, // [PLACEHOLDER]
    notes: 'Clubs, hackathons, college fest, event permissions.'
  },
];

/**
 * CONFIGURABLE DEPARTMENTS DATA
 */
export const DEPARTMENTS_DATA: Department[] = [
  {
    id: 'cse-aiml',
    code: 'CSE-AIML',
    name: 'Computer Science & AI-ML',
    destinationRoomId: 'f01-cse-aiml',
    hodName: 'Dr. Head of CSE & AI-ML',
    isPlaceholder: true,
  },
  {
    id: 'ece',
    code: 'ECE',
    name: 'Electronics & Communication Engg.',
    destinationRoomId: 'f02-ece-hod',
    hodName: 'Dr. Head of ECE',
    isPlaceholder: true,
  },
  {
    id: 'eee',
    code: 'EEE',
    name: 'Electrical & Electronics Engg.',
    destinationRoomId: 'f03-eee-hod',
    hodName: 'Dr. Head of EEE',
    isPlaceholder: true,
  },
  {
    id: 'mech',
    code: 'Mechanical',
    name: 'Mechanical Engineering',
    destinationRoomId: 'f04-mech-hod',
    hodName: 'Dr. Head of Mechanical',
    isPlaceholder: true,
  },
  {
    id: 'civil',
    code: 'Civil',
    name: 'Civil Engineering',
    destinationRoomId: 'f05-civil-hod',
    hodName: 'Dr. Head of Civil',
    isPlaceholder: true,
  },
];

/**
 * FEEDBACK CATEGORIES
 */
export const CATEGORIES_DATA: Category[] = [
  {
    id: 'ACADEMICS',
    title: 'ACADEMICS',
    iconName: 'BookOpen',
    description: 'Classes, faculty, examinations, curriculum, evaluation & academic policies',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'INFRASTRUCTURE',
    title: 'INFRASTRUCTURE',
    iconName: 'Building',
    description: 'Classrooms, labs, washrooms, electricity, AC, benches & facilities maintenance',
    color: 'from-emerald-500 to-teal-700',
    requiresSubtype: 'area',
  },
  {
    id: 'STUDENT_SSG',
    title: 'STUDENT / SSG',
    iconName: 'Users',
    description: 'General student concerns, student counseling, policy guidance & SSG experience',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'CANTEEN',
    title: 'CANTEEN',
    iconName: 'Utensils',
    description: 'Food quality, pricing, hygiene standards, drinking water & cafeteria service',
    color: 'from-rose-500 to-red-600',
  },
  {
    id: 'DEPARTMENT',
    title: 'DEPARTMENT',
    iconName: 'Laptop',
    description: 'Issues specific to your branch, departmental labs, faculty or HOD guidance',
    color: 'from-purple-500 to-indigo-700',
    requiresSubtype: 'department',
  },
  {
    id: 'CLUBS_ACTIVITIES',
    title: 'CLUBS & ACTIVITIES',
    iconName: 'Trophy',
    description: 'Student clubs, campus events, sports facilities, fests & extra-curriculars',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'SOMETHING_ELSE',
    title: 'SOMETHING ELSE',
    iconName: 'HelpCircle',
    description: 'Not sure where it belongs? Take a 15-second guided decision helper',
    color: 'from-slate-600 to-slate-800',
    requiresSubtype: 'wizard',
  },
];

/**
 * INFRASTRUCTURE SUB-AREAS MAPPING
 */
export const INFRASTRUCTURE_AREAS = [
  { id: 'classroom', name: 'Classrooms / Lecture Halls', roomId: 'g12-maintenance' },
  { id: 'lab', name: 'Computer / Engineering Labs', roomId: 'g12-maintenance' },
  { id: 'washroom', name: 'Washrooms & Sanitation', roomId: 'g12-maintenance' },
  { id: 'sports', name: 'Sports Grounds / Courts', roomId: 'sports-office' },
  { id: 'canteen-facility', name: 'Canteen Benches & Dining Area', roomId: 'canteen-office' },
  { id: 'auditorium-fac', name: 'Auditorium & AV Systems', roomId: 'g12-maintenance' },
  { id: 'outdoor-campus', name: 'Campus Pathways & Gardens', roomId: 'g12-maintenance' },
];

/**
 * DECISION TREE NODES ("I DON'T KNOW WHERE TO GO")
 */
export const DECISION_TREE_NODES: Record<string, DecisionNode> = {
  start: {
    id: 'start',
    question: 'What is the primary nature of what you want to share?',
    options: [
      { label: 'Related to exams, marks, attendance, or teaching', nextNodeId: 'academics_sub' },
      { label: 'Physical broken item, wifi, light, fan, or cleanliness', nextNodeId: 'infra_sub' },
      { label: 'Food, drinking water, canteen pricing or hygiene', destinationRoomId: 'canteen-office' },
      { label: 'Events, student clubs, sports or extra-curriculars', destinationRoomId: 'sac-room' },
      { label: 'Personal support, student harassment, or general counseling', destinationRoomId: 'g04-ssg-room' },
    ]
  },
  academics_sub: {
    id: 'academics_sub',
    question: 'Is this about your specific branch or college-wide academic governance?',
    options: [
      { label: 'College-wide governance, curriculum, or exam office', destinationRoomId: 'g19-dean-academics' },
      { label: 'Specific to my engineering branch / HOD', nextNodeId: 'dept_select' },
    ]
  },
  infra_sub: {
    id: 'infra_sub',
    question: 'Where is the issue physically located?',
    options: [
      { label: 'In sports court or grounds', destinationRoomId: 'sports-office' },
      { label: 'In canteen area', destinationRoomId: 'canteen-office' },
      { label: 'In main block, classrooms, labs, or washrooms', destinationRoomId: 'g12-maintenance' },
    ]
  },
  dept_select: {
    id: 'dept_select',
    question: 'Which department are you enrolled in?',
    options: DEPARTMENTS_DATA.map(d => ({
      label: `${d.code} - ${d.name}`,
      destinationRoomId: d.destinationRoomId
    }))
  }
};
