import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { StudentProfile, Internship, Application, ApplicationStatus } from '../types';
import { InternshipCard } from '../components/InternshipCard';
import { InternshipDetailsModal } from '../components/InternshipDetailsModal';
import {
  LayoutDashboard,
  Compass,
  Sparkles,
  FileText,
  Bookmark,
  Calendar,
  MessageSquare,
  User,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  DollarSign,
  MapPin,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Github,
  Linkedin,
  Upload,
  ChevronRight,
  Building2,
  Video,
  Award,
  Layers,
  Edit3,
  X
} from 'lucide-react';

const TECH_DOMAINS = [
  'All Domains',
  'Java Development',
  'Python Development',
  'Artificial Intelligence',
  'Machine Learning',
  'Cybersecurity',
  'Web Development',
  'Data Analytics',
  'Cloud Computing',
  'UI/UX Design',
  'Marketing',
  'Finance'
];

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    internships,
    applications,
    savedInternshipIds,
    logout,
    activeStudentTab,
    setActiveStudentTab,
    updateStudentProfile
  } = useApp();

  const student = currentUser?.role === 'student' ? (currentUser as StudentProfile) : null;
  const studentName = student?.name || 'Alex Chen';

  const [activeModalInternship, setActiveModalInternship] = useState<Internship | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('All Domains');
  const [workTypeFilter, setWorkTypeFilter] = useState<'All' | 'Remote' | 'Hybrid' | 'On-site'>('All');
  const [onlyPaid, setOnlyPaid] = useState(false);
  const [experienceFilter, setExperienceFilter] = useState<string>('All');

  // Application tracker view filter
  const [appStatusFilter, setAppStatusFilter] = useState<string>('All');
  const [selectedAppForTimeline, setSelectedAppForTimeline] = useState<Application | null>(null);

  // Profile edit states
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileBio, setProfileBio] = useState(student?.bio || '');
  const [profileGithub, setProfileGithub] = useState(student?.github || '');
  const [profileLinkedin, setProfileLinkedin] = useState(student?.linkedin || '');

  // Calculate student statistics
  const studentApps = useMemo(
    () => applications.filter((a) => !student || a.studentId === student.id),
    [applications, student]
  );

  const stats = useMemo(() => {
    const total = studentApps.length;
    const underReview = studentApps.filter(
      (a) => a.status === 'Under Review' || a.status === 'Applied'
    ).length;
    const interviews = studentApps.filter((a) => a.status === 'Interview Scheduled').length;
    const offers = studentApps.filter((a) => a.status === 'Selected').length;
    return { total, underReview, interviews, offers };
  }, [studentApps]);

  // Saved internships
  const savedInternshipsList = useMemo(
    () => internships.filter((i) => savedInternshipIds.includes(i.id)),
    [internships, savedInternshipIds]
  );

  // Filtered internships for Explore
  const filteredInternships = useMemo(() => {
    return internships.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchTech =
        selectedTech === 'All Domains' ||
        job.skills.some((s) => s.toLowerCase().includes(selectedTech.toLowerCase())) ||
        job.department.toLowerCase().includes(selectedTech.toLowerCase());

      const matchWorkType = workTypeFilter === 'All' || job.workType === workTypeFilter;
      const matchPaid = !onlyPaid || job.isPaid;
      const matchExp = experienceFilter === 'All' || job.experienceLevel === experienceFilter;

      return matchSearch && matchTech && matchWorkType && matchPaid && matchExp;
    });
  }, [internships, searchQuery, selectedTech, workTypeFilter, onlyPaid, experienceFilter]);

  // Recommended internships (Matching student skills)
  const recommendedInternships = useMemo(() => {
    const studentSkills = student?.skills || ['Python', 'React', 'Machine Learning'];
    return internships
      .map((job) => {
        const matchingCount = job.skills.filter((s) =>
          studentSkills.some((ss) => ss.toLowerCase() === s.toLowerCase())
        ).length;
        return { job, matchingCount };
      })
      .sort((a, b) => b.matchingCount - a.matchingCount)
      .map((item) => item.job);
  }, [internships, student]);

  // Scheduled interviews
  const scheduledInterviews = useMemo(
    () => studentApps.filter((a) => a.status === 'Interview Scheduled' && a.interviewDetails),
    [studentApps]
  );

  // Profile completion calculation
  const profileCompletionPercent = useMemo(() => {
    if (!student) return 85;
    let score = 50;
    if (student.skills && student.skills.length >= 4) score += 15;
    if (student.resumeName) score += 15;
    if (student.projects && student.projects.length >= 2) score += 10;
    if (student.github) score += 5;
    if (student.linkedin) score += 5;
    return Math.min(score, 100);
  }, [student]);

  const sidebarLinks = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'explore', label: 'Explore Internships', icon: Compass },
    { id: 'recommended', label: 'Recommended For You', icon: Sparkles },
    { id: 'applications', label: 'My Applications', icon: FileText, badge: stats.total },
    { id: 'saved', label: 'Saved Internships', icon: Bookmark, badge: savedInternshipsList.length },
    { id: 'interviews', label: 'Interviews', icon: Calendar, badge: stats.interviews },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'resume', label: 'Resume Manager', icon: Layers },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleSaveProfile = () => {
    updateStudentProfile({
      bio: profileBio,
      github: profileGithub,
      linkedin: profileLinkedin
    });
    setEditingProfile(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SIDEBAR NAVIGATION (240px - 280px standard) */}
        <aside className="lg:col-span-3 glass-panel rounded-3xl p-4 bg-white/85 shadow-lg border border-white sticky top-20">
          {/* Student Profile Snapshot */}
          <div className="p-3 mb-3 rounded-2xl bg-gradient-to-br from-[#DDFBF0]/80 to-white border border-[#98F6D5] flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#123C32] text-[#98F6D5] overflow-hidden border border-[#98F6D5] shrink-0 flex items-center justify-center font-bold text-sm">
              {student?.avatar ? (
                <img src={student.avatar} alt={studentName} className="w-full h-full object-cover" />
              ) : (
                studentName.substring(0, 2).toUpperCase()
              )}
            </div>
            <div className="overflow-hidden">
              <h3 className="text-xs font-bold text-[#18332C] truncate">{studentName}</h3>
              <p className="text-[11px] text-[#4A6B62] truncate">
                {student?.college || 'Stanford University'}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[10px] font-semibold text-[#123C32] bg-[#98F6D5]/60 px-1.5 py-0.2 rounded">
                  Student Seeker
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeStudentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveStudentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#123C32] text-white shadow-xs font-semibold'
                      : 'text-[#18332C]/80 hover:bg-[#DDFBF0]/70 hover:text-[#18332C]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#98F6D5]' : 'text-[#4A6B62]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-[#31C48D] text-white' : 'bg-[#DDFBF0] text-[#123C32]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-2 border-t border-[#DDFBF0] mt-2">
              <button
                onClick={logout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* MAIN DASHBOARD CONTENT AREA */}
        <main className="lg:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeStudentTab === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Header */}
              <div className="glass-panel rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-white via-white to-[#DDFBF0]/40 border border-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#123C32] tracking-tight">
                    Welcome back, {studentName}!
                  </h1>
                  <p className="text-xs sm:text-sm text-[#4A6B62] mt-1">
                    You have <span className="font-semibold text-[#18332C]">{stats.interviews} upcoming interview</span>{' '}
                    and {stats.underReview} applications currently in recruiter review.
                  </p>
                </div>
                <button
                  onClick={() => setActiveStudentTab('explore')}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-[#123C32] hover:bg-[#31C48D] rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Explore Internships</span>
                </button>
              </div>

              {/* Overview 4 KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="glass-card rounded-2xl p-5 bg-white/90 border border-[#DDFBF0]">
                  <span className="text-[11px] font-semibold text-[#4A6B62] uppercase tracking-wider block">
                    Total Applications
                  </span>
                  <div className="flex items-baseline justify-between mt-2">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#123C32] tabular-nums">
                      {stats.total}
                    </p>
                    <FileText className="w-5 h-5 text-[#31C48D]" />
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 bg-white/90 border border-[#DDFBF0]">
                  <span className="text-[11px] font-semibold text-[#4A6B62] uppercase tracking-wider block">
                    Under Review
                  </span>
                  <div className="flex items-baseline justify-between mt-2">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#123C32] tabular-nums">
                      {stats.underReview}
                    </p>
                    <Clock className="w-5 h-5 text-amber-500" />
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 bg-white/90 border border-[#DDFBF0]">
                  <span className="text-[11px] font-semibold text-[#4A6B62] uppercase tracking-wider block">
                    Interviews Scheduled
                  </span>
                  <div className="flex items-baseline justify-between mt-2">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#123C32] tabular-nums">
                      {stats.interviews}
                    </p>
                    <Calendar className="w-5 h-5 text-[#31C48D]" />
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 bg-white/90 border border-[#DDFBF0]">
                  <span className="text-[11px] font-semibold text-[#4A6B62] uppercase tracking-wider block">
                    Offers Received
                  </span>
                  <div className="flex items-baseline justify-between mt-2">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#123C32] tabular-nums">
                      {stats.offers}
                    </p>
                    <Award className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              </div>

              {/* Upcoming Interview Alert Box */}
              {scheduledInterviews.length > 0 && (
                <div className="glass-panel rounded-3xl p-5 bg-gradient-to-r from-[#DDFBF0] via-white to-white border border-[#98F6D5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#31C48D] text-white flex items-center justify-center shrink-0">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#123C32] bg-[#98F6D5]/60 px-2 py-0.5 rounded-full">
                        Upcoming Interview Call
                      </span>
                      <h4 className="text-sm font-bold text-[#18332C] mt-1">
                        {scheduledInterviews[0].internshipTitle} · {scheduledInterviews[0].companyName}
                      </h4>
                      <p className="text-xs text-[#4A6B62]">
                        {scheduledInterviews[0].interviewDetails?.date} at{' '}
                        {scheduledInterviews[0].interviewDetails?.time} ({scheduledInterviews[0].interviewDetails?.interviewer})
                      </p>
                    </div>
                  </div>
                  <a
                    href={scheduledInterviews[0].interviewDetails?.meetingLink || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#123C32] hover:bg-[#31C48D] rounded-xl flex items-center gap-1.5 shadow-xs whitespace-nowrap"
                  >
                    <span>Join Google Meet</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Recommended Internships Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#18332C]">
                      Recommended Internships For You
                    </h3>
                    <p className="text-xs text-[#4A6B62]">
                      Matched based on your target skills ({student?.skills?.slice(0, 3).join(', ')}...)
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveStudentTab('recommended')}
                    className="text-xs font-semibold text-[#31C48D] hover:underline flex items-center gap-1"
                  >
                    View All Matches
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedInternships.slice(0, 4).map((job) => (
                    <InternshipCard
                      key={job.id}
                      internship={job}
                      onViewDetails={(j) => setActiveModalInternship(j)}
                      onApplyClick={(j) => setActiveModalInternship(j)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXPLORE INTERNSHIPS WITH EXTENSIVE FILTERS */}
          {activeStudentTab === 'explore' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#18332C]">Explore Tech Internships</h2>
                <p className="text-xs text-[#4A6B62] mt-0.5">
                  Search across verified opportunities with transparent compensation.
                </p>
              </div>

              {/* Comprehensive Search & Multi-Filter Bar */}
              <div className="glass-panel rounded-3xl p-5 bg-white/90 border border-white space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#4A6B62] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search title, tech stack (e.g. Python, React), or company..."
                      className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl glass-input text-[#18332C]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={workTypeFilter}
                      onChange={(e) => setWorkTypeFilter(e.target.value as any)}
                      className="text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                    >
                      <option value="All">All Locations</option>
                      <option value="Remote">Remote Only</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                    </select>

                    <select
                      value={experienceFilter}
                      onChange={(e) => setExperienceFilter(e.target.value)}
                      className="text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                    >
                      <option value="All">All Levels</option>
                      <option value="Beginner / Fresher">Beginner / Fresher</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>

                    <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#DDFBF0] bg-white cursor-pointer text-xs text-[#18332C] whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={onlyPaid}
                        onChange={(e) => setOnlyPaid(e.target.checked)}
                        className="rounded text-[#31C48D]"
                      />
                      <span>Paid Only</span>
                    </label>
                  </div>
                </div>

                {/* Specific Tech Domain Chips */}
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#4A6B62] tracking-wider block mb-2">
                    Filter by Specialization
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {TECH_DOMAINS.map((domain) => (
                      <button
                        key={domain}
                        onClick={() => setSelectedTech(domain)}
                        className={`text-xs px-3 py-1 rounded-lg transition-colors ${
                          selectedTech === domain
                            ? 'bg-[#123C32] text-white font-semibold'
                            : 'bg-[#DDFBF0]/60 text-[#18332C] hover:bg-[#DDFBF0] border border-[#98F6D5]/50'
                        }`}
                      >
                        {domain}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results count & grid */}
              <div className="flex items-center justify-between text-xs text-[#4A6B62]">
                <span>Showing {filteredInternships.length} internship positions</span>
                {(searchQuery || selectedTech !== 'All Domains' || workTypeFilter !== 'All' || onlyPaid) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTech('All Domains');
                      setWorkTypeFilter('All');
                      setOnlyPaid(false);
                      setExperienceFilter('All');
                    }}
                    className="text-[#31C48D] font-medium hover:underline"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>

              {filteredInternships.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredInternships.map((job) => (
                    <InternshipCard
                      key={job.id}
                      internship={job}
                      onViewDetails={(j) => setActiveModalInternship(j)}
                      onApplyClick={(j) => setActiveModalInternship(j)}
                    />
                  ))}
                </div>
              ) : (
                <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto">
                  <Filter className="w-10 h-10 text-[#31C48D] mx-auto mb-3" />
                  <h3 className="text-base font-bold text-[#18332C]">No matching internships</h3>
                  <p className="text-xs text-[#4A6B62] mt-1">
                    Try loosening your filter constraints or clearing the search query.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RECOMMENDED FOR YOU */}
          {activeStudentTab === 'recommended' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#18332C]">Recommended For You</h2>
                <p className="text-xs text-[#4A6B62] mt-0.5">
                  Algorithmically curated based on your target skills, degree department, and preferred roles.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedInternships.map((job) => (
                  <InternshipCard
                    key={job.id}
                    internship={job}
                    onViewDetails={(j) => setActiveModalInternship(j)}
                    onApplyClick={(j) => setActiveModalInternship(j)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MY APPLICATIONS & TIMELINE TRACKING */}
          {activeStudentTab === 'applications' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#18332C]">Application Tracker</h2>
                  <p className="text-xs text-[#4A6B62] mt-0.5">
                    Track your submissions across all 6 recruitment lifecycle stages.
                  </p>
                </div>

                {/* Status Segmented Filter */}
                <div className="flex items-center gap-1 p-1 bg-white/80 rounded-xl border border-[#DDFBF0] overflow-x-auto">
                  {['All', 'Applied', 'Under Review', 'Interview Scheduled', 'Selected'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setAppStatusFilter(st)}
                      className={`px-3 py-1 text-xs rounded-lg transition-colors whitespace-nowrap ${
                        appStatusFilter === st
                          ? 'bg-[#123C32] text-white font-semibold'
                          : 'text-[#4A6B62] hover:text-[#18332C]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Applications List */}
              <div className="space-y-4">
                {studentApps
                  .filter((a) => appStatusFilter === 'All' || a.status === appStatusFilter)
                  .map((app) => {
                    const isExpanded = selectedAppForTimeline?.id === app.id;
                    return (
                      <div
                        key={app.id}
                        className="glass-card rounded-2xl p-5 bg-white/90 border border-[#DDFBF0] transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-[#DDFBF0] flex items-center justify-center p-1 border border-[#98F6D5]">
                              {app.companyLogo ? (
                                <img
                                  src={app.companyLogo}
                                  alt={app.companyName}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <Building2 className="w-5 h-5 text-[#123C32]" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-[#18332C]">{app.internshipTitle}</h3>
                              <p className="text-xs text-[#4A6B62]">
                                {app.companyName} · Applied on {app.appliedDate}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                app.status === 'Interview Scheduled'
                                  ? 'bg-[#98F6D5] text-[#123C32] border border-[#31C48D]'
                                  : app.status === 'Selected'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : app.status === 'Under Review'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-[#DDFBF0] text-[#123C32]'
                              }`}
                            >
                              {app.status}
                            </span>

                            <button
                              onClick={() => setSelectedAppForTimeline(isExpanded ? null : app)}
                              className="px-3 py-1.5 text-xs font-semibold text-[#123C32] hover:text-[#31C48D] bg-[#DDFBF0]/70 rounded-xl"
                            >
                              {isExpanded ? 'Hide Timeline' : 'View Timeline'}
                            </button>
                          </div>
                        </div>

                        {/* Interactive Timeline Stepper */}
                        {isExpanded && (
                          <div className="mt-5 pt-4 border-t border-[#DDFBF0] animate-in fade-in duration-200">
                            <h4 className="text-xs font-bold text-[#18332C] uppercase tracking-wider mb-4">
                              Application Milestone Progression
                            </h4>

                            <div className="relative pl-6 space-y-4 border-l-2 border-[#31C48D]/40">
                              {app.timeline.map((event, idx) => (
                                <div key={idx} className="relative">
                                  <div className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-[#31C48D] ring-4 ring-white" />
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-bold text-[#18332C]">
                                        {event.status}
                                      </span>
                                      <span className="text-[11px] text-[#4A6B62]">
                                        · {event.date}
                                      </span>
                                    </div>
                                    <p className="text-xs text-[#18332C]/80 mt-0.5">{event.note}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {app.interviewDetails && (
                              <div className="mt-4 p-4 rounded-xl bg-[#DDFBF0]/50 border border-[#98F6D5] text-xs">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-bold text-[#123C32]">
                                      Interview Confirmed: {app.interviewDetails.roundName}
                                    </p>
                                    <p className="text-[#4A6B62] mt-0.5">
                                      {app.interviewDetails.date} at {app.interviewDetails.time} · Host:{' '}
                                      {app.interviewDetails.interviewer}
                                    </p>
                                  </div>
                                  <a
                                    href={app.interviewDetails.meetingLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-1.5 bg-[#123C32] text-white rounded-lg font-semibold hover:bg-[#31C48D] transition-colors"
                                  >
                                    Join Call
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* TAB 5: SAVED INTERNSHIPS */}
          {activeStudentTab === 'saved' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#18332C]">Saved Internships</h2>
                <p className="text-xs text-[#4A6B62] mt-0.5">
                  Positions you've bookmarked for future review or deadline tracking.
                </p>
              </div>

              {savedInternshipsList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedInternshipsList.map((job) => (
                    <InternshipCard
                      key={job.id}
                      internship={job}
                      onViewDetails={(j) => setActiveModalInternship(j)}
                      onApplyClick={(j) => setActiveModalInternship(j)}
                    />
                  ))}
                </div>
              ) : (
                <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto">
                  <Bookmark className="w-10 h-10 text-[#31C48D] mx-auto mb-3" />
                  <h3 className="text-base font-bold text-[#18332C]">No saved internships yet</h3>
                  <p className="text-xs text-[#4A6B62] mt-1">
                    Click the bookmark icon on any internship card to save it here.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: INTERVIEWS */}
          {activeStudentTab === 'interviews' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#18332C]">Scheduled Interviews</h2>
                <p className="text-xs text-[#4A6B62] mt-0.5">
                  Manage confirmed video conference rounds and technical challenges.
                </p>
              </div>

              {scheduledInterviews.length > 0 ? (
                <div className="space-y-4">
                  {scheduledInterviews.map((app) => (
                    <div
                      key={app.id}
                      className="glass-card rounded-2xl p-6 bg-white/90 border border-[#98F6D5] space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#31C48D] tracking-wider">
                            Confirmed Technical Round
                          </span>
                          <h3 className="text-base font-bold text-[#18332C]">
                            {app.interviewDetails?.roundName}
                          </h3>
                          <p className="text-xs text-[#4A6B62]">
                            Company: <span className="font-semibold text-[#18332C]">{app.companyName}</span> · Role:{' '}
                            {app.internshipTitle}
                          </p>
                        </div>

                        <a
                          href={app.interviewDetails?.meetingLink || '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 text-xs font-semibold text-white bg-[#123C32] hover:bg-[#31C48D] rounded-xl flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
                        >
                          <Video className="w-4 h-4" />
                          <span>Enter Video Room</span>
                        </a>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#DDFBF0]/60 border border-[#98F6D5]/60 text-xs">
                        <div>
                          <span className="text-[11px] text-[#4A6B62] block">Date</span>
                          <span className="font-bold text-[#18332C]">{app.interviewDetails?.date}</span>
                        </div>
                        <div>
                          <span className="text-[11px] text-[#4A6B62] block">Time</span>
                          <span className="font-bold text-[#18332C]">{app.interviewDetails?.time}</span>
                        </div>
                        <div>
                          <span className="text-[11px] text-[#4A6B62] block">Interviewer</span>
                          <span className="font-bold text-[#18332C]">{app.interviewDetails?.interviewer}</span>
                        </div>
                      </div>

                      {app.interviewDetails?.notes && (
                        <p className="text-xs text-[#18332C]/80 italic">
                          " {app.interviewDetails.notes} "
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto">
                  <Calendar className="w-10 h-10 text-[#31C48D] mx-auto mb-3" />
                  <h3 className="text-base font-bold text-[#18332C]">No interviews scheduled</h3>
                  <p className="text-xs text-[#4A6B62] mt-1">
                    Once companies shortlist your application and invite you for a call, interview details will appear here.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: MESSAGES */}
          {activeStudentTab === 'messages' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#18332C]">Recruiter Messages</h2>
                <p className="text-xs text-[#4A6B62] mt-0.5">
                  Direct communications from hiring leads and talent acquisition partners.
                </p>
              </div>

              <div className="glass-panel rounded-3xl p-6 bg-white/90 border border-white space-y-4">
                <div className="p-4 rounded-2xl bg-[#DDFBF0]/50 border border-[#98F6D5] flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#123C32] text-[#98F6D5] flex items-center justify-center font-bold text-xs shrink-0">
                    QP
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#18332C]">
                        Sarah Jenkins (Head of Talent @ QuantumPay)
                      </p>
                      <span className="text-[10px] text-[#4A6B62]">Yesterday</span>
                    </div>
                    <p className="text-xs text-[#18332C]/80 mt-1 leading-relaxed">
                      "Hi Alex! We were very impressed by your NeuralVision Classifier repo on GitHub.
                      Dr. Vance is looking forward to the technical discussion next week!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: STUDENT PROFILE & PROGRESS INDICATOR */}
          {activeStudentTab === 'profile' && (
            <div className="space-y-6">
              {/* Profile Completion Meter */}
              <div className="glass-panel rounded-3xl p-6 bg-gradient-to-r from-white via-white to-[#DDFBF0]/50 border border-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#123C32] uppercase tracking-wider">
                      Profile Completion
                    </span>
                    <span className="text-xs font-bold text-[#31C48D] tabular-nums">
                      {profileCompletionPercent}%
                    </span>
                  </div>
                  <p className="text-xs text-[#4A6B62] mt-0.5">
                    Profiles with 90%+ completion receive 3.4x more interview invitations.
                  </p>
                  <div className="w-full sm:w-64 h-2 bg-[#DDFBF0] rounded-full overflow-hidden mt-2.5">
                    <div
                      className="h-full bg-[#31C48D] rounded-full transition-all duration-500"
                      style={{ width: `${profileCompletionPercent}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="px-4 py-2 text-xs font-semibold text-[#123C32] bg-white border border-[#DDFBF0] hover:bg-[#DDFBF0] rounded-xl flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{editingProfile ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              {/* Profile Details Card */}
              <div className="glass-panel rounded-3xl p-6 sm:p-8 bg-white/90 border border-white space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-[#DDFBF0] border-2 border-[#98F6D5] overflow-hidden shrink-0 flex items-center justify-center">
                    {student?.avatar ? (
                      <img src={student.avatar} alt={studentName} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-[#123C32]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#18332C]">{studentName}</h3>
                    <p className="text-xs text-[#4A6B62]">
                      {student?.degree} in {student?.department} · {student?.college} (Class of{' '}
                      {student?.gradYear})
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-[#31C48D]">
                      {student?.github && (
                        <a
                          href={student.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 hover:underline"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}
                      {student?.linkedin && (
                        <a
                          href={student.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 hover:underline"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          <span>LinkedIn</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {editingProfile ? (
                  <div className="space-y-4 pt-4 border-t border-[#DDFBF0]">
                    <div>
                      <label className="block text-xs font-semibold text-[#18332C] mb-1">
                        Professional Summary / Bio
                      </label>
                      <textarea
                        rows={3}
                        value={profileBio}
                        onChange={(e) => setProfileBio(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl glass-input resize-none text-[#18332C]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#18332C] mb-1">
                          GitHub Profile URL
                        </label>
                        <input
                          type="url"
                          value={profileGithub}
                          onChange={(e) => setProfileGithub(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#18332C] mb-1">
                          LinkedIn Profile URL
                        </label>
                        <input
                          type="url"
                          value={profileLinkedin}
                          onChange={(e) => setProfileLinkedin(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleSaveProfile}
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-[#123C32] hover:bg-[#31C48D] rounded-xl shadow-xs"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A6B62] mb-1.5">
                      Bio
                    </h4>
                    <p className="text-xs sm:text-sm text-[#18332C]/85 leading-relaxed">
                      {student?.bio || 'Building modern software applications and exploring AI models.'}
                    </p>
                  </div>
                )}

                {/* Skills */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A6B62] mb-2">
                    Verified Technical Skills
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {student?.skills?.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-xl text-xs font-medium text-[#123C32] bg-[#DDFBF0] border border-[#98F6D5]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                {student?.projects && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A6B62] mb-2.5">
                      Highlighted Projects
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {student.projects.map((proj, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-white border border-[#DDFBF0] space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-[#18332C]">{proj.title}</h5>
                            {proj.link && (
                              <a
                                href={proj.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] text-[#31C48D] hover:underline flex items-center gap-0.5"
                              >
                                <span>Code</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <p className="text-[11px] text-[#4A6B62] leading-relaxed">{proj.description}</p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {proj.tech.map((t) => (
                              <span
                                key={t}
                                className="text-[10px] text-[#123C32] bg-[#DDFBF0]/80 px-1.5 py-0.5 rounded"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 9: RESUME MANAGER */}
          {activeStudentTab === 'resume' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#18332C]">Resume Manager</h2>
                <p className="text-xs text-[#4A6B62] mt-0.5">
                  Keep your official resume up-to-date for automated 1-click applications.
                </p>
              </div>

              <div className="glass-panel rounded-3xl p-6 bg-white/90 border border-white space-y-4">
                <div className="p-4 rounded-2xl bg-white border border-[#DDFBF0] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-[#31C48D]" />
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-[#18332C]">
                        {student?.resumeName || 'Alex_Chen_Software_Resume_2026.pdf'}
                      </p>
                      <p className="text-[11px] text-[#4A6B62]">Primary Active Resume · PDF format</p>
                    </div>
                  </div>

                  <label className="cursor-pointer px-4 py-2 text-xs font-semibold text-[#123C32] bg-[#DDFBF0] hover:bg-[#98F6D5] rounded-xl border border-[#98F6D5] transition-colors flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Version</span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          updateStudentProfile({ resumeName: e.target.files[0].name });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10 & 11: NOTIFICATIONS & SETTINGS */}
          {(activeStudentTab === 'notifications' || activeStudentTab === 'settings') && (
            <div className="glass-panel rounded-3xl p-8 bg-white/90 border border-white text-center">
              <h3 className="text-base font-bold text-[#18332C]">
                {activeStudentTab === 'notifications' ? 'Notifications' : 'Account Settings'}
              </h3>
              <p className="text-xs text-[#4A6B62] mt-1 max-w-sm mx-auto">
                Email alerts and preferences are active for {student?.email || 'your account'}.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Modal for Details or Applying */}
      {activeModalInternship && (
        <InternshipDetailsModal
          internship={activeModalInternship}
          onClose={() => setActiveModalInternship(null)}
        />
      )}
    </div>
  );
};
