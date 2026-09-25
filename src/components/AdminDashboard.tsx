import React, { useState, useEffect } from 'react';
import { Submission, SubmissionStatus } from '../types/campus';
import { submissionService } from '../services/submissionService';
import { 
  ShieldCheck, Filter, Search, RefreshCw, CheckCircle2, 
  Clock, AlertCircle, FileText, Check, ChevronRight, BarChart3, Building
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [activeSubmission, setActiveSubmission] = useState<Submission | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState<string>('');

  const loadData = () => {
    const data = submissionService.getAllSubmissions();
    setSubmissions(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const stats = submissionService.getStats();

  const handleUpdateStatus = (id: string, newStatus: SubmissionStatus) => {
    submissionService.updateStatus(id, newStatus, adminNoteInput || undefined);
    loadData();
    if (activeSubmission && activeSubmission.id === id) {
      setActiveSubmission(prev => prev ? { ...prev, status: newStatus, adminNote: adminNoteInput || prev.adminNote } : null);
    }
  };

  const filtered = submissions.filter(s => {
    if (selectedStatusFilter !== 'ALL' && s.status !== selectedStatusFilter) return false;
    if (selectedCategoryFilter !== 'ALL' && s.categoryId !== selectedCategoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.id.toLowerCase().includes(q) ||
        s.destinationName.toLowerCase().includes(q) ||
        s.roomCode.toLowerCase().includes(q) ||
        s.message.toLowerCase().includes(q) ||
        (s.studentInfo?.name && s.studentInfo.name.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const getFormalStatusBadge = (status: SubmissionStatus) => {
    switch (status) {
      case 'Received':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-300">Received</span>;
      case 'Under Review':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-300">Under Review</span>;
      case 'Action Taken':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-300">Action Taken</span>;
      case 'Resolved':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-300">Resolved</span>;
    }
  };

  const getFormalFeedbackBadge = (type: string) => {
    switch (type) {
      case 'GRIEVANCE': return <span className="text-rose-700 font-semibold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Grievance</span>;
      case 'CONCERN': return <span className="text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Concern</span>;
      case 'SUGGESTION': return <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Suggestion</span>;
      default: return <span className="text-slate-700 font-semibold bg-slate-50 px-2 py-0.5 rounded border border-slate-200">General</span>;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-6 font-sans text-slate-800 bg-slate-50 min-h-screen">
      
      {/* Formal Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-6 h-6 text-slate-700" />
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              HITAM SSG Administrative Governance Console
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Executive Feedback Records, Destination Office Action Tracking & Resolution Monitoring
          </p>
        </div>

        <button
          onClick={loadData}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Formal Executive KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Submissions</div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{stats.total}</div>
          <div className="text-xs text-slate-400 mt-1">Across all campus departments</div>
        </div>

        <div className="bg-white border border-amber-200 p-5 rounded-xl shadow-sm">
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Under Review</div>
          <div className="text-3xl font-extrabold text-amber-600 mt-2">{stats.underReview}</div>
          <div className="text-xs text-amber-600/80 mt-1">Pending committee evaluation</div>
        </div>

        <div className="bg-white border border-blue-200 p-5 rounded-xl shadow-sm">
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Action Taken</div>
          <div className="text-3xl font-extrabold text-blue-600 mt-2">{stats.actionTaken}</div>
          <div className="text-xs text-blue-600/80 mt-1">Active resolution in progress</div>
        </div>

        <div className="bg-white border border-emerald-200 p-5 rounded-xl shadow-sm">
          <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Resolved</div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2">{stats.resolved}</div>
          <div className="text-xs text-emerald-600/80 mt-1">Cases closed successfully</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by Ticket ID, room code, text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none focus:border-slate-500 focus:bg-white"
          />
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Status:</span>
          </div>
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="Received">Received</option>
            <option value="Under Review">Under Review</option>
            <option value="Action Taken">Action Taken</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

      </div>

      {/* Formal Submissions Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 text-slate-600 font-semibold uppercase text-[11px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Ticket Reference</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Destination Office</th>
                <th className="p-4">Nature</th>
                <th className="p-4">Feedback Content</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 font-medium">
                    No submissions found matching criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((sub) => (
                  <tr 
                    key={sub.id} 
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => {
                      setActiveSubmission(sub);
                      setAdminNoteInput(sub.adminNote || '');
                    }}
                  >
                    <td className="p-4 font-mono font-bold text-slate-900">
                      {sub.id}
                    </td>
                    <td className="p-4 text-slate-500 font-medium">
                      {new Date(sub.timestamp).toLocaleDateString()} {new Date(sub.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{sub.destinationName}</div>
                      <div className="text-[11px] font-mono text-slate-500">Room: {sub.roomCode}</div>
                    </td>
                    <td className="p-4">
                      {getFormalFeedbackBadge(sub.feedbackType)}
                    </td>
                    <td className="p-4 max-w-xs truncate text-slate-600 font-medium">
                      {sub.message}
                    </td>
                    <td className="p-4">
                      {getFormalStatusBadge(sub.status)}
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSubmission(sub);
                          setAdminNoteInput(sub.adminNote || '');
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Inspect & Action
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formal Modal Detail View */}
      {activeSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">OFFICIAL CASE FILE</span>
                <h3 className="text-2xl font-bold text-slate-900 font-mono">{activeSubmission.id}</h3>
              </div>
              <button
                onClick={() => setActiveSubmission(null)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-300"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 font-medium">Destination Office:</span>
                <p className="font-bold text-slate-900">{activeSubmission.roomCode} - {activeSubmission.destinationName}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Category:</span>
                <p className="font-bold text-slate-900">{activeSubmission.categoryTitle}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Nature:</span>
                <p className="mt-0.5">{getFormalFeedbackBadge(activeSubmission.feedbackType)}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Student Identity:</span>
                <p className="font-semibold text-slate-800">
                  {activeSubmission.isAnonymous ? 'Anonymous Submission' : `${activeSubmission.studentInfo?.name} (${activeSubmission.studentInfo?.rollNo || ''})`}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">Student Feedback Narrative:</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                "{activeSubmission.message}"
              </div>
            </div>

            {activeSubmission.followUps && (
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">Follow-Up Particulars:</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                  {Object.entries(activeSubmission.followUps).map(([k, v]) => (
                    <div key={k}>
                      <strong className="text-slate-900">{k}:</strong> <span className="text-slate-700">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Formal Status Controls */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <label className="block text-xs font-bold text-slate-800 uppercase">
                Update Governance Case Status:
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Received', 'Under Review', 'Action Taken', 'Resolved'] as SubmissionStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(activeSubmission.id, st)}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all ${
                      activeSubmission.status === st
                        ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Administrative Note / Official Remarks:
                </label>
                <input
                  type="text"
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  placeholder="Record internal resolution notes or administrative status..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-medium text-slate-900 outline-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => handleUpdateStatus(activeSubmission.id, activeSubmission.status)}
                  className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-slate-800 transition-colors"
                >
                  Save Status & Official Note
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
