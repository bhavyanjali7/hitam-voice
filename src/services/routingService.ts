import { Destination, RoutePath, CategoryId, RouteWaypoint } from '../types/campus';
import { CAMPUS_LOCATIONS, ROOMS_DATA, DEPARTMENTS_DATA, INFRASTRUCTURE_AREAS } from '../data/campusData';

/**
 * Service providing resolution logic to map student categories/selections
 * into target destinations and SVG route pathways across the HITAM campus.
 */

export function getRoomById(roomId: string) {
  return ROOMS_DATA.find(r => r.id === roomId) || ROOMS_DATA[0];
}

export function getLocationById(locationId: string) {
  return CAMPUS_LOCATIONS.find(l => l.id === locationId) || CAMPUS_LOCATIONS[0];
}

/**
 * Resolves student selections into a clear campus destination object.
 */
export function resolveDestination(
  categoryId: CategoryId,
  subSelection?: { departmentId?: string; infraAreaId?: string; overrideRoomId?: string }
): Destination {
  // If explicitly overridden (e.g. from decision tree)
  if (subSelection?.overrideRoomId) {
    const room = getRoomById(subSelection.overrideRoomId);
    const loc = getLocationById(room.locationId);
    return {
      locationId: loc.id,
      roomId: room.id,
      roomCode: room.code,
      roomName: room.name,
      inCharge: room.inCharge,
      categoryTitle: getCategoryTitle(categoryId),
      subcategoryTitle: 'Custom Selection',
      notes: room.notes,
    };
  }

  switch (categoryId) {
    case 'ACADEMICS': {
      const room = getRoomById('g19-dean-academics');
      const loc = getLocationById(room.locationId);
      return {
        locationId: loc.id,
        roomId: room.id,
        roomCode: room.code,
        roomName: room.name,
        inCharge: room.inCharge,
        categoryTitle: 'ACADEMICS',
        notes: room.notes,
      };
    }

    case 'STUDENT_SSG': {
      const room = getRoomById('g04-ssg-room');
      const loc = getLocationById(room.locationId);
      return {
        locationId: loc.id,
        roomId: room.id,
        roomCode: room.code,
        roomName: room.name,
        inCharge: room.inCharge,
        categoryTitle: 'STUDENT / SSG',
        notes: room.notes,
      };
    }

    case 'CANTEEN': {
      const room = getRoomById('canteen-office');
      const loc = getLocationById(room.locationId);
      return {
        locationId: loc.id,
        roomId: room.id,
        roomCode: room.code,
        roomName: room.name,
        inCharge: room.inCharge,
        categoryTitle: 'CANTEEN',
        notes: room.notes,
      };
    }

    case 'DEPARTMENT': {
      const dept = DEPARTMENTS_DATA.find(d => d.id === subSelection?.departmentId) || DEPARTMENTS_DATA[0];
      const room = getRoomById(dept.destinationRoomId);
      const loc = getLocationById(room.locationId);
      return {
        locationId: loc.id,
        roomId: room.id,
        roomCode: room.code,
        roomName: room.name,
        inCharge: `${room.inCharge} (${dept.code})`,
        categoryTitle: 'DEPARTMENT',
        subcategoryTitle: dept.name,
        notes: room.notes,
      };
    }

    case 'INFRASTRUCTURE': {
      const area = INFRASTRUCTURE_AREAS.find(a => a.id === subSelection?.infraAreaId) || INFRASTRUCTURE_AREAS[0];
      const room = getRoomById(area.roomId);
      const loc = getLocationById(room.locationId);
      return {
        locationId: loc.id,
        roomId: room.id,
        roomCode: room.code,
        roomName: room.name,
        inCharge: room.inCharge,
        categoryTitle: 'INFRASTRUCTURE',
        subcategoryTitle: area.name,
        notes: room.notes,
      };
    }

    case 'CLUBS_ACTIVITIES': {
      const room = getRoomById('sac-room');
      const loc = getLocationById(room.locationId);
      return {
        locationId: loc.id,
        roomId: room.id,
        roomCode: room.code,
        roomName: room.name,
        inCharge: room.inCharge,
        categoryTitle: 'CLUBS & ACTIVITIES',
        notes: room.notes,
      };
    }

    case 'SOMETHING_ELSE':
    default: {
      const room = getRoomById('g04-ssg-room');
      const loc = getLocationById(room.locationId);
      return {
        locationId: loc.id,
        roomId: room.id,
        roomCode: room.code,
        roomName: room.name,
        inCharge: room.inCharge,
        categoryTitle: 'SOMETHING ELSE',
        notes: room.notes,
      };
    }
  }
}

function getCategoryTitle(id: CategoryId): string {
  const titles: Record<CategoryId, string> = {
    ACADEMICS: 'ACADEMICS',
    INFRASTRUCTURE: 'INFRASTRUCTURE',
    STUDENT_SSG: 'STUDENT / SSG',
    CANTEEN: 'CANTEEN',
    DEPARTMENT: 'DEPARTMENT',
    CLUBS_ACTIVITIES: 'CLUBS & ACTIVITIES',
    SOMETHING_ELSE: 'SOMETHING ELSE',
  };
  return titles[id] || 'FEEDBACK';
}

/**
 * Generates an SVG smooth curve path and waypoints from Entrance to target destination location.
 */
export function generateRoutePath(startLocId: string, targetLocId: string): RoutePath {
  const startLoc = getLocationById(startLocId);
  const targetLoc = getLocationById(targetLocId);

  const startX = startLoc.x + startLoc.width / 2;
  const startY = startLoc.y + startLoc.height / 2;
  const targetX = targetLoc.x + targetLoc.width / 2;
  const targetY = targetLoc.y + targetLoc.height / 2;

  // Waypoints via central campus pathways
  const waypoints: RouteWaypoint[] = [];

  // Start at entrance
  waypoints.push({ x: startX, y: startY, label: 'Main Entrance' });

  // Move left towards main central avenue
  const aveX = 480;
  const lowerAveY = 700;

  if (targetLocId === 'football-ground') {
    waypoints.push({ x: 740, y: 720, label: 'Football Ground Field' });
  } else if (targetLocId === 'kho-kho-court') {
    waypoints.push({ x: aveX, y: lowerAveY, label: 'Near HITAM Fort' });
    waypoints.push({ x: 200, y: 730, label: 'Kho-Kho Court' });
  } else if (targetLocId === 'volleyball-court' || targetLocId === 'pickleball-court' || targetLocId === 'canteen') {
    waypoints.push({ x: aveX, y: lowerAveY, label: 'Near HITAM Fort' });
    waypoints.push({ x: 260, y: 550, label: 'West Campus Avenue' });
    waypoints.push({ x: targetX, y: targetY, label: targetLoc.name });
  } else if (targetLocId === 'auditorium' || targetLocId === 'amphitheatre' || targetLocId === 'throwball-court') {
    waypoints.push({ x: 750, y: 600, label: 'East Campus Pathway' });
    waypoints.push({ x: targetX, y: targetY, label: targetLoc.name });
  } else {
    // Default Main Block locations (Middle, Left, Right wings)
    waypoints.push({ x: aveX, y: lowerAveY, label: 'Near HITAM Fort' });
    waypoints.push({ x: aveX, y: 420, label: 'Ascending Main Central Stairs' });
    waypoints.push({ x: aveX, y: 280, label: 'Main Block Archway' });
    waypoints.push({ x: targetX, y: targetY, label: targetLoc.name });
  }

  // Construct SVG cubic/quadratic path d string
  let d = `M ${waypoints[0].x} ${waypoints[0].y}`;
  for (let i = 1; i < waypoints.length; i++) {
    const prev = waypoints[i - 1];
    const curr = waypoints[i];
    // Smooth bezier curve control point
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    d += ` Q ${prev.x} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  return {
    id: `route-${startLocId}-to-${targetLocId}`,
    startLocationId: startLocId,
    endLocationId: targetLocId,
    waypoints,
    svgPathD: d,
    milestones: [
      { percent: 10, message: 'Entered HITAM Campus entrance...' },
      { percent: 35, message: 'Walking past HITAM Fort & main avenue...' },
      { percent: 65, message: `Heading towards ${targetLoc.name}...` },
      { percent: 90, message: 'Almost there...' },
      { percent: 100, message: `You have arrived at ${targetLoc.name}!` },
    ],
  };
}
