import React, { useState } from 'react';
import { Application, InterviewDetails } from '../types';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, Video, User, FileText, CheckCircle2 } from 'lucide-react';

interface ScheduleInterviewModalProps {
  application: Application | null;
  onClose: () => void;
}

export const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({
  application,
  onClose
}) => {
  const { updateApplicationStatus } = useApp();

  const [date, setDate] = useState('2026-10-20');
  const [time, setTime] = useState('02:00 PM EST');
  const [meetingLink, setMeetingLink] = useState('https://meet.google.com/qnt-leaf-call');
  const [roundName, setRoundName] = useState('Technical Screening: Algorithm & Architecture');
  const [interviewer, setInterviewer] = useState('Sarah Jenkins (Engineering Talent Lead)');
  const [notes, setNotes] = useState(
    'Please come prepared to discuss your past projects and have your development environment ready for a brief coding exercise.'
  );

  if (!application) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const details: InterviewDetails = {
      date,
      time,
      meetingLink,
      interviewer,
      roundName,
      notes
    };

    updateApplicationStatus(
      application.id,
      'Interview Scheduled',
      `Interview arranged for ${date} at ${time}. Invitation sent to ${application.studentEmail}.`,
      details
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#123C32]/40 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel bg-white/95 rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-white animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-[#DDFBF0] mb-5">
          <div>
            <h3 className="text-base font-bold text-[#18332C]">Schedule Interview</h3>
            <p className="text-xs text-[#4A6B62]">
              Candidate: <span className="font-semibold text-[#18332C]">{application.studentName}</span>{' '}
              · {application.internshipTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#4A6B62] hover:bg-[#DDFBF0]/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#18332C] mb-1">
              Interview Round Title
            </label>
            <input
              type="text"
              required
              value={roundName}
              onChange={(e) => setRoundName(e.target.value)}
              className="w-full text-xs p-3 rounded-xl glass-input text-[#18332C]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#18332C] mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#31C48D]" />
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs p-3 rounded-xl glass-input text-[#18332C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#18332C] mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#31C48D]" />
                Time & Timezone
              </label>
              <input
                type="text"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full text-xs p-3 rounded-xl glass-input text-[#18332C]"
                placeholder="e.g. 02:00 PM EST"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#18332C] mb-1 flex items-center gap-1">
              <Video className="w-3.5 h-3.5 text-[#31C48D]" />
              Video Conference Link
            </label>
            <input
              type="url"
              required
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              className="w-full text-xs p-3 rounded-xl glass-input text-[#18332C]"
              placeholder="https://meet.google.com/..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#18332C] mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#31C48D]" />
              Interviewer Name / Lead
            </label>
            <input
              type="text"
              required
              value={interviewer}
              onChange={(e) => setInterviewer(e.target.value)}
              className="w-full text-xs p-3 rounded-xl glass-input text-[#18332C]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#18332C] mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#31C48D]" />
              Preparation Notes for Candidate
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-3 rounded-xl glass-input resize-none text-[#18332C]"
            />
          </div>

          <div className="pt-3 border-t border-[#DDFBF0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#4A6B62] hover:text-[#18332C]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#123C32] hover:bg-[#31C48D] rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirm & Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
