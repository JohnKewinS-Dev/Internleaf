import React from 'react';
import { Internship } from '../types';
import { useApp } from '../context/AppContext';
import {
  Bookmark,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  ArrowUpRight,
  CheckCircle2,
  Building2
} from 'lucide-react';

interface InternshipCardProps {
  internship: Internship;
  onApplyClick?: (internship: Internship) => void;
  onViewDetails?: (internship: Internship) => void;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({
  internship,
  onApplyClick,
  onViewDetails
}) => {
  const { savedInternshipIds, toggleSaveInternship, applications, currentUser } = useApp();

  const isSaved = savedInternshipIds.includes(internship.id);
  const alreadyApplied = applications.some((a) => a.internshipId === internship.id);

  return (
    <div
      onClick={() => onViewDetails && onViewDetails(internship)}
      className={`glass-card rounded-2xl p-6 relative flex flex-col justify-between cursor-pointer group transition-all duration-300 ${
        internship.featured
          ? 'ring-1 ring-[#31C48D]/40 bg-gradient-to-b from-white/95 via-white/85 to-[#DDFBF0]/30'
          : 'bg-white/80'
      }`}
    >
      {/* Top row: Company icon, Title, Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#DDFBF0] to-white border border-[#98F6D5]/60 flex items-center justify-center p-1.5 shadow-xs shrink-0 overflow-hidden">
              {internship.companyLogo ? (
                <img
                  src={internship.companyLogo}
                  alt={internship.companyName}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    // Fallback to building icon
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <Building2 className="w-6 h-6 text-[#123C32]" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#123C32]/80 tracking-tight">
                  {internship.companyName}
                </span>
                {internship.featured && (
                  <span className="text-[10px] font-semibold text-[#123C32] bg-[#98F6D5]/70 border border-[#31C48D]/40 px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#18332C] group-hover:text-[#31C48D] transition-colors leading-snug">
                {internship.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveInternship(internship.id);
            }}
            className={`p-2 rounded-xl transition-all ${
              isSaved
                ? 'bg-[#31C48D] text-white shadow-xs'
                : 'bg-white/70 hover:bg-[#DDFBF0] text-[#4A6B62] border border-[#DDFBF0]'
            }`}
            title={isSaved ? 'Remove Bookmark' : 'Save Internship'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Unboxed Metadata row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#4A6B62] mb-3.5">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#31C48D]" />
            {internship.location}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 font-medium text-[#18332C]">
            <DollarSign className="w-3.5 h-3.5 text-[#31C48D]" />
            {internship.isPaid ? `${internship.stipend} Stipend` : 'Unpaid'}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#4A6B62]" />
            {internship.duration}
          </span>
        </div>

        {/* Short description */}
        <p className="text-xs text-[#18332C]/75 line-clamp-2 mb-4 leading-relaxed">
          {internship.description}
        </p>

        {/* Skills inline chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {internship.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-medium text-[#123C32] bg-[#DDFBF0]/80 border border-[#98F6D5]/70 px-2.5 py-0.5 rounded-lg"
            >
              {skill}
            </span>
          ))}
          {internship.skills.length > 4 && (
            <span className="text-[11px] font-medium text-[#4A6B62] px-1 py-0.5">
              +{internship.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom Footer: Deadline & Action */}
      <div className="pt-3.5 border-t border-[#DDFBF0] flex items-center justify-between gap-3">
        <div className="text-[11px] text-[#4A6B62] flex items-center gap-1">
          <Calendar className="w-3 h-3 text-[#31C48D]" />
          <span>Deadline: {internship.deadline}</span>
        </div>

        <div className="flex items-center gap-2">
          {alreadyApplied ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#123C32] bg-[#DDFBF0] px-3 py-1.5 rounded-xl border border-[#98F6D5]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#31C48D]" />
              Applied
            </span>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onApplyClick) {
                  onApplyClick(internship);
                } else if (onViewDetails) {
                  onViewDetails(internship);
                }
              }}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#123C32] hover:bg-[#31C48D] rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1"
            >
              Apply Now
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
