import React, { useState } from 'react';
import { Internship, StudentProfile } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  CheckCircle2,
  FileText,
  Send,
  Upload,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';

interface InternshipDetailsModalProps {
  internship: Internship | null;
  onClose: () => void;
}

export const InternshipDetailsModal: React.FC<InternshipDetailsModalProps> = ({
  internship,
  onClose
}) => {
  const {
    currentUser,
    currentRole,
    applyToInternship,
    applications,
    setCurrentView,
    toggleSaveInternship,
    savedInternshipIds
  } = useApp();

  const [activeTab, setActiveTab] = useState<'details' | 'apply'>('details');
  const [coverNote, setCoverNote] = useState(
    "I am very excited about this internship role! My academic background and project experience align well with your tech stack, and I'd love to contribute."
  );
  const [selectedResume, setSelectedResume] = useState(
    currentUser?.role === 'student' && (currentUser as StudentProfile).resumeName
      ? (currentUser as StudentProfile).resumeName!
      : 'Alex_Chen_Software_Resume_2026.pdf'
  );
  const [submitting, setSubmitting] = useState(false);

  if (!internship) return null;

  const alreadyApplied = applications.some((a) => a.internshipId === internship.id);
  const isSaved = savedInternshipIds.includes(internship.id);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const success = applyToInternship(internship.id, coverNote, selectedResume);
      setSubmitting(false);
      if (success) {
        onClose();
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#123C32]/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel bg-white/95 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white relative animate-in zoom-in-95 duration-200">
        {/* Sticky modal header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#DDFBF0] flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DDFBF0] border border-[#98F6D5] flex items-center justify-center overflow-hidden shrink-0">
              {internship.companyLogo ? (
                <img
                  src={internship.companyLogo}
                  alt={internship.companyName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 className="w-5 h-5 text-[#123C32]" />
              )}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#18332C] leading-tight">
                {internship.title}
              </h2>
              <p className="text-xs text-[#4A6B62]">{internship.companyName}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#4A6B62] hover:text-[#18332C] hover:bg-[#DDFBF0]/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal navigation tabs */}
        <div className="px-6 pt-4 border-b border-[#DDFBF0] flex gap-2">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 text-xs font-semibold px-3 transition-colors border-b-2 ${
              activeTab === 'details'
                ? 'border-[#31C48D] text-[#123C32]'
                : 'border-transparent text-[#4A6B62] hover:text-[#18332C]'
            }`}
          >
            Role Overview & Requirements
          </button>
          <button
            onClick={() => setActiveTab('apply')}
            className={`pb-3 text-xs font-semibold px-3 transition-colors border-b-2 ${
              activeTab === 'apply'
                ? 'border-[#31C48D] text-[#123C32]'
                : 'border-transparent text-[#4A6B62] hover:text-[#18332C]'
            }`}
          >
            {alreadyApplied ? 'Application Status' : 'Submit Application'}
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {activeTab === 'details' ? (
            <div className="space-y-6">
              {/* Highlight summary card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#DDFBF0]/50 border border-[#98F6D5]/60 text-xs">
                <div>
                  <span className="text-[11px] text-[#4A6B62] block mb-0.5">Compensation</span>
                  <span className="font-bold text-[#18332C] flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-[#31C48D]" />
                    {internship.isPaid ? internship.stipend : 'Unpaid'}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#4A6B62] block mb-0.5">Location</span>
                  <span className="font-bold text-[#18332C] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#31C48D]" />
                    {internship.workType} ({internship.location})
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#4A6B62] block mb-0.5">Duration</span>
                  <span className="font-bold text-[#18332C] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#31C48D]" />
                    {internship.duration}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#4A6B62] block mb-0.5">Deadline</span>
                  <span className="font-bold text-[#18332C] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#31C48D]" />
                    {internship.deadline}
                  </span>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A6B62] mb-2.5">
                  Target Skills & Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {internship.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-xl text-xs font-medium text-[#123C32] bg-[#DDFBF0] border border-[#98F6D5]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A6B62] mb-2">
                  About the Internship
                </h4>
                <p className="text-xs sm:text-sm text-[#18332C]/85 leading-relaxed">
                  {internship.description}
                </p>
              </div>

              {/* Responsibilities */}
              {internship.responsibilities && internship.responsibilities.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A6B62] mb-2.5">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {internship.responsibilities.map((resp, i) => (
                      <li key={i} className="text-xs sm:text-sm text-[#18332C]/80 flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#31C48D] mt-2 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {internship.requirements && internship.requirements.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A6B62] mb-2.5">
                    Qualifications & Requirements
                  </h4>
                  <ul className="space-y-2">
                    {internship.requirements.map((req, i) => (
                      <li key={i} className="text-xs sm:text-sm text-[#18332C]/80 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#31C48D] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Perks */}
              {internship.perks && internship.perks.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A6B62] mb-2.5">
                    Internship Perks & Benefits
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {internship.perks.map((perk, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-white border border-[#DDFBF0] text-xs text-[#18332C] flex items-center gap-2"
                      >
                        <Award className="w-4 h-4 text-[#31C48D] shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action bar */}
              <div className="pt-4 border-t border-[#DDFBF0] flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => toggleSaveInternship(internship.id)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#18332C] bg-white border border-[#DDFBF0] hover:bg-[#DDFBF0]/50 transition-colors"
                >
                  {isSaved ? 'Bookmarked' : 'Save for Later'}
                </button>

                {alreadyApplied ? (
                  <button
                    onClick={() => setActiveTab('apply')}
                    className="px-5 py-2.5 text-xs font-semibold text-[#123C32] bg-[#DDFBF0] border border-[#98F6D5] rounded-xl flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#31C48D]" />
                    View Existing Application
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('apply')}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#123C32] hover:bg-[#18332C] rounded-xl shadow-md shadow-[#31C48D]/20 transition-all flex items-center gap-2"
                  >
                    Proceed to Apply
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              {alreadyApplied ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#DDFBF0] text-[#31C48D] flex items-center justify-center mx-auto border border-[#98F6D5]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#18332C]">
                      You've applied for this position!
                    </h3>
                    <p className="text-xs text-[#4A6B62] max-w-md mx-auto mt-1">
                      Your application has been received by {internship.companyName}. You can track status
                      updates and interview calls from your Student Dashboard.
                    </p>
                  </div>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        onClose();
                        setCurrentView('student-dashboard');
                      }}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#123C32] rounded-xl"
                    >
                      View in Application Tracker
                    </button>
                    <button
                      onClick={() => setActiveTab('details')}
                      className="px-4 py-2 text-xs font-medium text-[#18332C] bg-white border border-[#DDFBF0] rounded-xl"
                    >
                      Back to Overview
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-5">
                  <div className="p-4 rounded-2xl bg-[#DDFBF0]/40 border border-[#98F6D5]/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#4A6B62] tracking-wider block">
                        Applying As Candidate
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-[#18332C]">
                        {currentUser?.role === 'student'
                          ? (currentUser as StudentProfile).name
                          : 'Alex Chen (Demo Student)'}
                      </p>
                      <p className="text-[11px] text-[#4A6B62]">
                        {currentUser?.role === 'student'
                          ? (currentUser as StudentProfile).college
                          : 'Stanford University (CS)'}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[#123C32] bg-white px-3 py-1 rounded-lg border border-[#98F6D5]">
                      Verified Student
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#18332C] mb-1.5">
                      Select Resume Attachment
                    </label>
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#DDFBF0]">
                      <FileText className="w-5 h-5 text-[#31C48D] shrink-0" />
                      <div className="flex-1 text-xs">
                        <p className="font-semibold text-[#18332C]">{selectedResume}</p>
                        <p className="text-[11px] text-[#4A6B62]">Last updated 3 days ago · PDF (1.2 MB)</p>
                      </div>
                      <label className="cursor-pointer text-xs font-medium text-[#123C32] hover:text-[#31C48D] px-3 py-1 bg-[#DDFBF0]/80 rounded-lg transition-colors flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Change</span>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.docx"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setSelectedResume(e.target.files[0].name);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#18332C] mb-1.5">
                      Candidate Note / Cover Letter (Optional)
                    </label>
                    <textarea
                      rows={4}
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      placeholder="Explain why your skills make you a standout fit for this team..."
                      className="w-full text-xs sm:text-sm p-3.5 rounded-2xl glass-input resize-none focus:ring-2 focus:ring-[#31C48D] text-[#18332C]"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-[#4A6B62] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#31C48D] shrink-0" />
                    <span>
                      Your student profile metrics, GitHub links, and GPA will be shared with the hiring team at{' '}
                      {internship.companyName}.
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('details')}
                      className="px-4 py-2 text-xs font-medium text-[#4A6B62] hover:text-[#18332C]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 text-xs font-semibold text-white bg-[#123C32] hover:bg-[#31C48D] rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Submit Application'}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
