import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  CompanyProfile,
  Internship,
  Application,
  ApplicationStatus,
  WorkType,
  ExperienceLevel
} from '../types';
import { ScheduleInterviewModal } from '../components/ScheduleInterviewModal';
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  Briefcase,
  Users,
  UserCheck,
  Calendar,
  MessageSquare,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Clock,
  MapPin,
  DollarSign,
  FileText,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldCheck,
  Video,
  Upload,
  ArrowRight,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Filter
} from 'lucide-react';

export const CompanyDashboard: React.FC = () => {
  const {
    currentUser,
    internships,
    applications,
    logout,
    activeCompanyTab,
    setActiveCompanyTab,
    updateApplicationStatus,
    postInternship,
    toggleInternshipStatus,
    updateCompanyProfile
  } = useApp();

  const company = currentUser?.role === 'company' ? (currentUser as CompanyProfile) : null;
  const companyName = company?.companyName || 'QuantumPay Technologies';

  // State for Interview Modal
  const [selectedAppForInterview, setSelectedAppForInterview] = useState<Application | null>(null);

  // Filter state for applicants
  const [applicantFilterStatus, setApplicantFilterStatus] = useState<string>('All');
  const [selectedInternshipFilter, setSelectedInternshipFilter] = useState<string>('All');

  // POST AN INTERNSHIP MULTI-SECTION FORM STATE
  const [postStep, setPostStep] = useState(1);
  const [formTitle, setFormTitle] = useState('');
  const [formDept, setFormDept] = useState('Artificial Intelligence');
  const [formLocation, setFormLocation] = useState('San Francisco, CA');
  const [formWorkType, setFormWorkType] = useState<WorkType>('Hybrid');
  const [formIsPaid, setFormIsPaid] = useState(true);
  const [formStipend, setFormStipend] = useState('$50 / hr');
  const [formDuration, setFormDuration] = useState('12 Weeks (Summer 2026)');
  const [formExpLevel, setFormExpLevel] = useState<ExperienceLevel>('Intermediate');
  const [formSkills, setFormSkills] = useState('Python, Machine Learning, PyTorch, SQL');
  const [formDescription, setFormDescription] = useState('');
  const [formResponsibilities, setFormResponsibilities] = useState(
    'Collaborate with engineering squad on core architecture\nOptimize low-latency algorithmic pipelines\nParticipate in code reviews and tech sprints'
  );
  const [formRequirements, setFormRequirements] = useState(
    'Enrolled in CS or quantitative degree\nStrong data structures and algorithms foundation\nHands-on personal or academic project experience'
  );
  const [formPerks, setFormPerks] = useState(
    'Competitive hourly rate\nDirect return offer pipeline\nExecutive mentorship'
  );
  const [formDeadline, setFormDeadline] = useState('June 30, 2026');

  // Company Profile Edit State
  const [editDesc, setEditDesc] = useState(company?.description || '');
  const [editWebsite, setEditWebsite] = useState(company?.website || '');
  const [editContact, setEditContact] = useState(company?.contactPerson || '');

  // Statistics
  const companyInternships = useMemo(
    () => internships.filter((i) => !company || i.companyId === company.id || i.companyName === companyName),
    [internships, company, companyName]
  );

  const companyApps = useMemo(
    () =>
      applications.filter(
        (a) => !company || a.companyName.toLowerCase().includes(companyName.toLowerCase())
      ),
    [applications, company, companyName]
  );

  const stats = useMemo(() => {
    const activePosts = companyInternships.filter((i) => i.status === 'active').length;
    const totalApplicants = companyApps.length;
    const shortlisted = companyApps.filter((a) => a.status === 'Shortlisted').length;
    const interviews = companyApps.filter((a) => a.status === 'Interview Scheduled').length;
    const filled = companyApps.filter((a) => a.status === 'Selected').length;
    return { activePosts, totalApplicants, shortlisted, interviews, filled };
  }, [companyInternships, companyApps]);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    postInternship({
      companyId: company?.id || 'comp_01',
      companyName: company?.companyName || 'QuantumPay Technologies',
      companyLogo: company?.logo || '',
      title: formTitle,
      department: formDept,
      location: formLocation,
      workType: formWorkType,
      isPaid: formIsPaid,
      stipend: formStipend,
      duration: formDuration,
      experienceLevel: formExpLevel,
      skills: formSkills.split(',').map((s) => s.trim()).filter(Boolean),
      description: formDescription || 'Exciting internship opportunity with hands-on responsibilities.',
      responsibilities: formResponsibilities.split('\n').filter(Boolean),
      requirements: formRequirements.split('\n').filter(Boolean),
      perks: formPerks.split('\n').filter(Boolean),
      deadline: formDeadline
    });

    // Reset and redirect to manage
    setFormTitle('');
    setFormDescription('');
    setPostStep(1);
    setActiveCompanyTab('manage');
  };

  const handleSaveProfile = () => {
    updateCompanyProfile({
      description: editDesc,
      website: editWebsite,
      contactPerson: editContact
    });
  };

  const sidebarLinks = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Company Profile', icon: Building2 },
    { id: 'post', label: 'Post an Internship', icon: PlusCircle },
    { id: 'manage', label: 'Manage Internships', icon: Briefcase, badge: stats.activePosts },
    { id: 'applicants', label: 'Applicants', icon: Users, badge: stats.totalApplicants },
    { id: 'shortlisted', label: 'Shortlisted Candidates', icon: UserCheck, badge: stats.shortlisted },
    { id: 'interviews', label: 'Interview Management', icon: Calendar, badge: stats.interviews },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SIDEBAR NAVIGATION */}
        <aside className="lg:col-span-3 glass-panel rounded-3xl p-4 bg-white/85 shadow-lg border border-white sticky top-20">
          <div className="p-3 mb-3 rounded-2xl bg-gradient-to-br from-[#123C32] to-[#18332C] text-white flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#98F6D5] text-[#123C32] overflow-hidden shrink-0 flex items-center justify-center font-bold text-sm">
              {company?.logo ? (
                <img src={company.logo} alt={companyName} className="w-full h-full object-cover" />
              ) : (
                companyName.substring(0, 2).toUpperCase()
              )}
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold text-white truncate">{companyName}</h3>
                <ShieldCheck className="w-3.5 h-3.5 text-[#98F6D5] shrink-0" />
              </div>
              <p className="text-[10px] text-[#98F6D5] truncate">{company?.industry || 'FinTech & AI'}</p>
              <span className="text-[9px] font-semibold text-white/70 uppercase">Recruiter Portal</span>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeCompanyTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveCompanyTab(item.id)}
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

        {/* MAIN DASHBOARD VIEWPORT */}
        <main className="lg:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeCompanyTab === 'overview' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="glass-panel rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-white via-white to-[#DDFBF0]/40 border border-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#123C32] tracking-tight">
                    Recruitment Command Center
                  </h1>
                  <p className="text-xs sm:text-sm text-[#4A6B62] mt-1">
                    {companyName} · {stats.activePosts} active postings attracting {stats.totalApplicants} candidate submissions.
                  </p>
                </div>
                <button
                  onClick={() => setActiveCompanyTab('post')}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-[#123C32] hover:bg-[#31C48D] rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Post an Internship</span>
                </button>
              </div>

              {/* Statistics Row: 5 Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="glass-card rounded-2xl p-4 bg-white/90 border border-[#DDFBF0]">
                  <span className="text-[10px] font-semibold text-[#4A6B62] uppercase tracking-wider block">
                    Active Postings
                  </span>
                  <p className="text-2xl font-extrabold text-[#123C32] mt-1 tabular-nums">
                    {stats.activePosts}
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-4 bg-white/90 border border-[#DDFBF0]">
                  <span className="text-[10px] font-semibold text-[#4A6B62] uppercase tracking-wider block">
                    Total Applicants
                  </span>
                  <p className="text-2xl font-extrabold text-[#123C32] mt-1 tabular-nums">
                    {stats.totalApplicants}
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-4 bg-white/90 border border-[#DDFBF0]">
                  <span className="text-[10px] font-semibold text-[#4A6B62] uppercase tracking-wider block">
                    Shortlisted
                  </span>
                  <p className="text-2xl font-extrabold text-blue-700 mt-1 tabular-nums">
                    {stats.shortlisted}
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-4 bg-white/90 border border-[#DDFBF0]">
                  <span className="text-[10px] font-semibold text-[#4A6B62] uppercase tracking-wider block">
                    Interviews Set
                  </span>
                  <p className="text-2xl font-extrabold text-[#31C48D] mt-1 tabular-nums">
                    {stats.interviews}
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-4 bg-white/90 border border-[#DDFBF0]">
                  <span className="text-[10px] font-semibold text-[#4A6B62] uppercase tracking-wider block">
                    Positions Filled
                  </span>
                  <p className="text-2xl font-extrabold text-emerald-700 mt-1 tabular-nums">
                    {stats.filled}
                  </p>
                </div>
              </div>

              {/* Recent Applicants Quick Queue */}
              <div className="glass-panel rounded-3xl p-6 bg-white/90 border border-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#18332C]">Candidate Submissions Queue</h3>
                    <p className="text-xs text-[#4A6B62]">
                      Review candidate credentials and advance candidate status.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveCompanyTab('applicants')}
                    className="text-xs font-semibold text-[#31C48D] hover:underline"
                  >
                    View All Applicants ({companyApps.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {companyApps.slice(0, 3).map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-2xl bg-white border border-[#DDFBF0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#98F6D5] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#DDFBF0] text-[#123C32] font-bold text-xs flex items-center justify-center border border-[#98F6D5]">
                          {app.studentName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#18332C]">{app.studentName}</h4>
                          <p className="text-[11px] text-[#4A6B62]">
                            {app.studentDegree} · {app.internshipTitle}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {app.studentSkills.slice(0, 3).map((s) => (
                              <span
                                key={s}
                                className="text-[10px] text-[#123C32] bg-[#DDFBF0]/80 px-1.5 py-0.2 rounded"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                            app.status === 'Interview Scheduled'
                              ? 'bg-[#98F6D5] text-[#123C32]'
                              : app.status === 'Shortlisted'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-[#DDFBF0] text-[#123C32]'
                          }`}
                        >
                          {app.status}
                        </span>

                        <button
                          onClick={() => {
                            setSelectedAppForInterview(app);
                          }}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-[#123C32] hover:bg-[#31C48D] rounded-xl transition-colors whitespace-nowrap"
                        >
                          Schedule Call
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMPANY PROFILE */}
          {activeCompanyTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#18332C]">Company Profile & Branding</h2>
                <p className="text-xs text-[#4A6B62] mt-0.5">
                  This information is displayed to students applying to your internship listings.
                </p>
              </div>

              <div className="glass-panel rounded-3xl p-6 sm:p-8 bg-white/90 border border-white space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#DDFBF0] border border-[#98F6D5] flex items-center justify-center p-2 shrink-0">
                    {company?.logo ? (
                      <img src={company.logo} alt={companyName} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Building2 className="w-8 h-8 text-[#123C32]" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-[#18332C]">{companyName}</h3>
                      <span className="text-[11px] font-semibold text-[#123C32] bg-[#98F6D5] px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Employer
                      </span>
                    </div>
                    <p className="text-xs text-[#4A6B62] mt-0.5">
                      {company?.industry} · {company?.location || 'San Francisco, CA'} · {company?.size}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#DDFBF0]">
                  <div>
                    <label className="block text-xs font-semibold text-[#18332C] mb-1">
                      Company Bio & Mission
                    </label>
                    <textarea
                      rows={3}
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl glass-input resize-none text-[#18332C]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#18332C] mb-1">
                        Official Website
                      </label>
                      <input
                        type="url"
                        value={editWebsite}
                        onChange={(e) => setEditWebsite(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#18332C] mb-1">
                        Contact Person / Talent Lead
                      </label>
                      <input
                        type="text"
                        value={editContact}
                        onChange={(e) => setEditContact(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#123C32] hover:bg-[#31C48D] rounded-xl shadow-xs"
                  >
                    Save Company Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: POST AN INTERNSHIP MULTI-SECTION FORM */}
          {activeCompanyTab === 'post' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#18332C]">Post an Internship</h2>
                <p className="text-xs text-[#4A6B62] mt-0.5">
                  Publish a new opportunity across student talent feeds in 4 easy steps.
                </p>
              </div>

              {/* Multi-step progress indicator */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { step: 1, title: '1. Role Overview' },
                  { step: 2, title: '2. Requirements' },
                  { step: 3, title: '3. Stipend & Perks' },
                  { step: 4, title: '4. Publish & Review' }
                ].map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setPostStep(s.step)}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      postStep === s.step
                        ? 'bg-[#123C32] text-white border-[#123C32]'
                        : postStep > s.step
                        ? 'bg-[#DDFBF0] text-[#123C32] border-[#98F6D5]'
                        : 'bg-white text-[#4A6B62] border-[#DDFBF0]'
                    }`}
                  >
                    <span className="text-xs font-bold block">{s.title}</span>
                  </button>
                ))}
              </div>

              {/* Form container */}
              <form onSubmit={handlePostSubmit} className="glass-panel rounded-3xl p-6 sm:p-8 bg-white/90 border border-white space-y-5">
                {/* Section 1 */}
                {postStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#18332C] uppercase tracking-wider">
                      Section 1: Role Overview & Department
                    </h3>

                    <div>
                      <label className="block text-xs font-semibold text-[#18332C] mb-1">
                        Internship Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. Distributed Systems & Cloud Intern"
                        className="w-full text-xs p-3 rounded-xl glass-input text-[#18332C]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#18332C] mb-1">
                          Department / Category
                        </label>
                        <select
                          value={formDept}
                          onChange={(e) => setFormDept(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                        >
                          <option value="Artificial Intelligence">Artificial Intelligence</option>
                          <option value="Machine Learning">Machine Learning</option>
                          <option value="Web Development">Web Development</option>
                          <option value="Cybersecurity">Cybersecurity</option>
                          <option value="Data Analytics">Data Analytics</option>
                          <option value="Cloud Computing">Cloud Computing</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Java Development">Java Development</option>
                          <option value="Marketing">Marketing</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#18332C] mb-1">
                          Work Type
                        </label>
                        <select
                          value={formWorkType}
                          onChange={(e) => setFormWorkType(e.target.value as WorkType)}
                          className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                        >
                          <option value="Remote">Remote</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="On-site">On-site</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#18332C] mb-1">
                        Location Details
                      </label>
                      <input
                        type="text"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        placeholder="e.g. San Francisco, CA (or Remote US/Canada)"
                        className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setPostStep(2)}
                        className="px-5 py-2.5 text-xs font-semibold text-white bg-[#123C32] rounded-xl flex items-center gap-1.5"
                      >
                        <span>Next: Requirements</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Section 2 */}
                {postStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#18332C] uppercase tracking-wider">
                      Section 2: Skills & Qualifications
                    </h3>

                    <div>
                      <label className="block text-xs font-semibold text-[#18332C] mb-1">
                        Required Skills (Comma separated) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formSkills}
                        onChange={(e) => setFormSkills(e.target.value)}
                        placeholder="Python, React, TypeScript, Docker"
                        className="w-full text-xs p-3 rounded-xl glass-input text-[#18332C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#18332C] mb-1">
                        Experience Level
                      </label>
                      <select
                        value={formExpLevel}
                        onChange={(e) => setFormExpLevel(e.target.value as ExperienceLevel)}
                        className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                      >
                        <option value="Beginner / Fresher">Beginner / Fresher</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#18332C] mb-1">
                        Requirements List (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={formRequirements}
                        onChange={(e) => setFormRequirements(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl glass-input resize-none text-[#18332C]"
                      />
                    </div>

                    <div className="flex justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setPostStep(1)}
                        className="px-4 py-2 text-xs font-medium text-[#4A6B62]"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setPostStep(3)}
                        className="px-5 py-2.5 text-xs font-semibold text-white bg-[#123C32] rounded-xl flex items-center gap-1.5"
                      >
                        <span>Next: Stipend & Perks</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Section 3 */}
                {postStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#18332C] uppercase tracking-wider">
                      Section 3: Compensation & Duration
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#18332C] mb-1">
                          Compensation Type
                        </label>
                        <select
                          value={formIsPaid ? 'paid' : 'unpaid'}
                          onChange={(e) => setFormIsPaid(e.target.value === 'paid')}
                          className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                        >
                          <option value="paid">Paid Internship</option>
                          <option value="unpaid">Unpaid / College Credit</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#18332C] mb-1">
                          Stipend Rate
                        </label>
                        <input
                          type="text"
                          value={formStipend}
                          onChange={(e) => setFormStipend(e.target.value)}
                          placeholder="e.g. $45 / hr or $4,000 / month"
                          className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#18332C] mb-1">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={formDuration}
                          onChange={(e) => setFormDuration(e.target.value)}
                          placeholder="e.g. 12 Weeks (Summer 2026)"
                          className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#18332C] mb-1">
                          Application Deadline
                        </label>
                        <input
                          type="text"
                          value={formDeadline}
                          onChange={(e) => setFormDeadline(e.target.value)}
                          placeholder="e.g. May 30, 2026"
                          className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#18332C] mb-1">
                        Perks & Benefits (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={formPerks}
                        onChange={(e) => setFormPerks(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl glass-input resize-none text-[#18332C]"
                      />
                    </div>

                    <div className="flex justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setPostStep(2)}
                        className="px-4 py-2 text-xs font-medium text-[#4A6B62]"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setPostStep(4)}
                        className="px-5 py-2.5 text-xs font-semibold text-white bg-[#123C32] rounded-xl flex items-center gap-1.5"
                      >
                        <span>Next: Review & Publish</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Section 4 */}
                {postStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#18332C] uppercase tracking-wider">
                      Section 4: Summary & Instant Publishing
                    </h3>

                    <div className="p-4 rounded-2xl bg-[#DDFBF0]/50 border border-[#98F6D5] space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#123C32] text-sm">{formTitle || 'Untitled Role'}</span>
                        <span className="font-bold text-[#31C48D]">{formStipend}</span>
                      </div>
                      <p className="text-[#4A6B62]">
                        {formDept} · {formWorkType} · {formDuration}
                      </p>
                      <p className="text-[#18332C]">Skills: {formSkills}</p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#18332C] mb-1">
                        Full Role Description
                      </label>
                      <textarea
                        rows={3}
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        placeholder="Provide details about team goals, tech challenges, and mentorship..."
                        className="w-full text-xs p-3 rounded-xl glass-input resize-none text-[#18332C]"
                      />
                    </div>

                    <div className="flex justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setPostStep(3)}
                        className="px-4 py-2 text-xs font-medium text-[#4A6B62]"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 text-xs font-bold text-white bg-[#123C32] hover:bg-[#31C48D] rounded-xl shadow-md transition-all flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Publish Internship Posting</span>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* TAB 4: MANAGE INTERNSHIPS */}
          {activeCompanyTab === 'manage' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#18332C]">Manage Internship Postings</h2>
                  <p className="text-xs text-[#4A6B62] mt-0.5">
                    Toggle active recruitment status and monitor applicant volume.
                  </p>
                </div>
                <button
                  onClick={() => setActiveCompanyTab('post')}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[#123C32] hover:bg-[#31C48D] rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>New Role</span>
                </button>
              </div>

              <div className="space-y-3">
                {companyInternships.map((job) => (
                  <div
                    key={job.id}
                    className="glass-card rounded-2xl p-5 bg-white/90 border border-[#DDFBF0] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[#18332C]">{job.title}</h3>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            job.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {job.status === 'active' ? 'Active & Receiving Apps' : 'Closed'}
                        </span>
                      </div>
                      <p className="text-xs text-[#4A6B62] mt-0.5">
                        {job.department} · {job.workType} · {job.stipend} · Deadline: {job.deadline}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right text-xs">
                        <span className="font-bold text-[#123C32] block tabular-nums">
                          {job.applicantsCount} Applicants
                        </span>
                        <span className="text-[10px] text-[#4A6B62]">Posted on {job.postedDate}</span>
                      </div>

                      <button
                        onClick={() => toggleInternshipStatus(job.id)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-[#DDFBF0] bg-white hover:bg-[#DDFBF0] text-[#18332C] transition-colors"
                      >
                        {job.status === 'active' ? 'Close Listing' : 'Reactivate'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5 & 6: APPLICANTS & SHORTLISTED PIPELINE */}
          {(activeCompanyTab === 'applicants' || activeCompanyTab === 'shortlisted') && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#18332C]">
                    {activeCompanyTab === 'shortlisted' ? 'Shortlisted Candidates' : 'Applicant Pipeline'}
                  </h2>
                  <p className="text-xs text-[#4A6B62] mt-0.5">
                    Evaluate candidate submissions, view student resumes, and advance stages.
                  </p>
                </div>

                {activeCompanyTab === 'applicants' && (
                  <div className="flex items-center gap-2">
                    <select
                      value={applicantFilterStatus}
                      onChange={(e) => setApplicantFilterStatus(e.target.value)}
                      className="text-xs p-2 rounded-xl glass-input text-[#18332C]"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Applied">Applied</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Selected">Selected / Offer</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {companyApps
                  .filter((a) => {
                    if (activeCompanyTab === 'shortlisted') {
                      return a.status === 'Shortlisted';
                    }
                    return applicantFilterStatus === 'All' || a.status === applicantFilterStatus;
                  })
                  .map((app) => (
                    <div
                      key={app.id}
                      className="glass-card rounded-2xl p-5 bg-white/95 border border-[#DDFBF0] space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#123C32] text-[#98F6D5] flex items-center justify-center font-bold text-sm shrink-0">
                            {app.studentName.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-bold text-[#18332C]">{app.studentName}</h3>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  app.status === 'Interview Scheduled'
                                    ? 'bg-[#98F6D5] text-[#123C32]'
                                    : app.status === 'Selected'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : app.status === 'Shortlisted'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-[#DDFBF0] text-[#123C32]'
                                }`}
                              >
                                {app.status}
                              </span>
                            </div>
                            <p className="text-xs text-[#4A6B62] mt-0.5">
                              {app.studentEmail} · {app.studentCollege} ({app.studentDegree})
                            </p>
                            <p className="text-xs font-semibold text-[#31C48D] mt-0.5">
                              Applying for: {app.internshipTitle}
                            </p>
                          </div>
                        </div>

                        {/* Resume pill */}
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-[#DDFBF0]/60 border border-[#98F6D5] text-xs">
                          <FileText className="w-4 h-4 text-[#31C48D]" />
                          <span className="font-semibold text-[#123C32]">{app.resumeName}</span>
                        </div>
                      </div>

                      {/* Candidate note */}
                      {app.coverNote && (
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-[#18332C]/80">
                          <span className="font-semibold text-[#18332C] block mb-0.5">Candidate Note:</span>
                          "{app.coverNote}"
                        </div>
                      )}

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5">
                        {app.studentSkills.map((sk) => (
                          <span
                            key={sk}
                            className="text-[11px] font-medium text-[#123C32] bg-[#DDFBF0] px-2 py-0.5 rounded-md"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>

                      {/* Pipeline Action Controls */}
                      <div className="pt-3 border-t border-[#DDFBF0] flex flex-wrap items-center justify-between gap-3">
                        <span className="text-[11px] text-[#4A6B62]">
                          Applied on {app.appliedDate}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'Under Review')}
                            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-[#DDFBF0] border border-[#DDFBF0] rounded-xl text-[#18332C]"
                          >
                            Review
                          </button>

                          <button
                            onClick={() => updateApplicationStatus(app.id, 'Shortlisted')}
                            className="px-3 py-1.5 text-xs font-medium bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl"
                          >
                            Shortlist
                          </button>

                          <button
                            onClick={() => setSelectedAppForInterview(app)}
                            className="px-3 py-1.5 text-xs font-semibold bg-[#123C32] hover:bg-[#31C48D] text-white rounded-xl shadow-xs"
                          >
                            Schedule Interview
                          </button>

                          <button
                            onClick={() => updateApplicationStatus(app.id, 'Selected')}
                            className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
                          >
                            Extend Offer
                          </button>

                          <button
                            onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                            className="px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 7: INTERVIEW MANAGEMENT */}
          {activeCompanyTab === 'interviews' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#18332C]">Interview Management</h2>
                <p className="text-xs text-[#4A6B62] mt-0.5">
                  Scheduled candidate interviews, video meeting links, and interviewer notes.
                </p>
              </div>

              <div className="space-y-4">
                {companyApps
                  .filter((a) => a.status === 'Interview Scheduled' && a.interviewDetails)
                  .map((app) => (
                    <div
                      key={app.id}
                      className="glass-card rounded-2xl p-5 bg-white/95 border border-[#98F6D5] space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-bold text-[#18332C]">
                            {app.interviewDetails?.roundName}
                          </h3>
                          <p className="text-xs text-[#4A6B62]">
                            Candidate: <span className="font-semibold text-[#18332C]">{app.studentName}</span>{' '}
                            ({app.studentEmail}) · Role: {app.internshipTitle}
                          </p>
                        </div>

                        <a
                          href={app.interviewDetails?.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 text-xs font-semibold text-white bg-[#123C32] hover:bg-[#31C48D] rounded-xl flex items-center gap-1.5 shadow-xs self-start sm:self-auto"
                        >
                          <Video className="w-4 h-4" />
                          <span>Join Video Call</span>
                        </a>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-[#DDFBF0]/50 border border-[#98F6D5]/60 text-xs">
                        <div>
                          <span className="text-[#4A6B62] block">Interview Date</span>
                          <span className="font-bold text-[#18332C]">{app.interviewDetails?.date}</span>
                        </div>
                        <div>
                          <span className="text-[#4A6B62] block">Time & Timezone</span>
                          <span className="font-bold text-[#18332C]">{app.interviewDetails?.time}</span>
                        </div>
                        <div>
                          <span className="text-[#4A6B62] block">Interviewer</span>
                          <span className="font-bold text-[#18332C]">
                            {app.interviewDetails?.interviewer}
                          </span>
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
            </div>
          )}

          {/* TAB 8 & 9: MESSAGES & ANALYTICS */}
          {(activeCompanyTab === 'messages' || activeCompanyTab === 'analytics') && (
            <div className="glass-panel rounded-3xl p-8 bg-white/90 border border-white text-center">
              <h3 className="text-base font-bold text-[#18332C]">
                {activeCompanyTab === 'messages' ? 'Recruiter Messages' : 'Talent Funnel Analytics'}
              </h3>
              <p className="text-xs text-[#4A6B62] mt-1 max-w-sm mx-auto">
                Candidate conversion metrics and response rates are operating in high-performance tier.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Schedule Interview Modal */}
      {selectedAppForInterview && (
        <ScheduleInterviewModal
          application={selectedAppForInterview}
          onClose={() => setSelectedAppForInterview(null)}
        />
      )}
    </div>
  );
};
