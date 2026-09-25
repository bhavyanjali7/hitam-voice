import { Submission, SubmissionStatus, FeedbackType, CategoryId } from '../types/campus';

const STORAGE_KEY = 'hitam_campus_voice_submissions_v1';

// Initial pre-populated mock feedback submissions so Admin dashboard looks populated out of the box
const INITIAL_MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 'HITAM-SSG-8492',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    categoryId: 'ACADEMICS',
    categoryTitle: 'ACADEMICS',
    destinationName: 'Dean – Academics Office',
    roomCode: 'G19',
    locationId: 'main-block-middle',
    feedbackType: 'CONCERN',
    message: 'The mid-term exam schedule for 3rd year CSE-AIML has three major papers scheduled on consecutive days with zero preparation breaks. Kindly review.',
    isAnonymous: true,
    status: 'Under Review',
    adminNote: 'Scheduled for discussion at Dean Academics meeting tomorrow.',
  },
  {
    id: 'HITAM-SSG-7104',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hours ago
    categoryId: 'CANTEEN',
    categoryTitle: 'CANTEEN',
    destinationName: 'Canteen & Catering Desk',
    roomCode: 'CANTEEN',
    locationId: 'canteen',
    feedbackType: 'GRIEVANCE',
    message: 'The drinking water dispenser near the canteen block was not functioning cleanly today morning. Needs filter check immediately.',
    isAnonymous: false,
    studentInfo: {
      name: 'Rohan Sharma',
      rollNo: '22H61A0512',
      email: 'rohan.s@hitam.edu.in'
    },
    status: 'Action Taken',
    adminNote: 'Maintenance team inspected and replaced water filter element.',
  },
  {
    id: 'HITAM-SSG-5921',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    categoryId: 'INFRASTRUCTURE',
    categoryTitle: 'INFRASTRUCTURE',
    destinationName: 'Campus Infrastructure Cell',
    roomCode: 'G12',
    locationId: 'main-block-left',
    feedbackType: 'SUGGESTION',
    message: 'Adding additional charging ports under the shade trees near the pickleball court would be extremely helpful for students working on project laptops during breaks.',
    isAnonymous: true,
    status: 'Received',
  },
  {
    id: 'HITAM-SSG-3310',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    categoryId: 'DEPARTMENT',
    categoryTitle: 'DEPARTMENT',
    department: 'Computer Science & AI-ML',
    destinationName: 'CSE & AI-ML Department HOD Office',
    roomCode: 'F01',
    locationId: 'main-block-right',
    feedbackType: 'SUGGESTION',
    message: 'Requesting permission to organize an open-source AI hackathon next month in Lab 3.',
    isAnonymous: false,
    studentInfo: {
      name: 'Priya Verma',
      rollNo: '21H61A6634',
      email: 'priya.v@hitam.edu.in'
    },
    status: 'Resolved',
    adminNote: 'Approved by HOD. Lab 3 reserved for Oct 12-13.',
  },
];

class SubmissionService {
  private getStorage(): Submission[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        this.saveStorage(INITIAL_MOCK_SUBMISSIONS);
        return INITIAL_MOCK_SUBMISSIONS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_MOCK_SUBMISSIONS;
    }
  }

  private saveStorage(submissions: Submission[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  public getAllSubmissions(): Submission[] {
    return this.getStorage();
  }

  public createSubmission(payload: {
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
    studentInfo?: { name?: string; rollNo?: string; email?: string };
  }): Submission {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `HITAM-SSG-${randomNum}`;

    const newSubmission: Submission = {
      id: referenceId,
      timestamp: new Date().toISOString(),
      categoryId: payload.categoryId,
      categoryTitle: payload.categoryTitle,
      department: payload.department,
      destinationName: payload.destinationName,
      roomCode: payload.roomCode,
      locationId: payload.locationId,
      feedbackType: payload.feedbackType,
      message: payload.message,
      followUps: payload.followUps,
      isAnonymous: payload.isAnonymous,
      studentInfo: payload.isAnonymous ? undefined : payload.studentInfo,
      status: 'Received',
    };

    const current = this.getStorage();
    const updated = [newSubmission, ...current];
    this.saveStorage(updated);
    return newSubmission;
  }

  public updateStatus(id: string, status: SubmissionStatus, adminNote?: string): boolean {
    const current = this.getStorage();
    const index = current.findIndex(s => s.id === id);
    if (index === -1) return false;

    current[index].status = status;
    if (adminNote !== undefined) {
      current[index].adminNote = adminNote;
    }

    this.saveStorage(current);
    return true;
  }

  public getStats() {
    const subs = this.getStorage();
    return {
      total: subs.length,
      received: subs.filter(s => s.status === 'Received').length,
      underReview: subs.filter(s => s.status === 'Under Review').length,
      actionTaken: subs.filter(s => s.status === 'Action Taken').length,
      resolved: subs.filter(s => s.status === 'Resolved').length,
      grievances: subs.filter(s => s.feedbackType === 'GRIEVANCE').length,
      concerns: subs.filter(s => s.feedbackType === 'CONCERN').length,
      suggestions: subs.filter(s => s.feedbackType === 'SUGGESTION').length,
    };
  }

  public clearAll() {
    this.saveStorage(INITIAL_MOCK_SUBMISSIONS);
  }
}

export const submissionService = new SubmissionService();
