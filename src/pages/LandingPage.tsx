import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Hero3DCanvas } from '../components/Hero3DCanvas';
import { InternshipCard } from '../components/InternshipCard';
import { InternshipDetailsModal } from '../components/InternshipDetailsModal';
import { Internship } from '../types';
import {
  Sparkles,
  ArrowRight,
  Search,
  Briefcase,
  Users,
  Building2,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Compass,
  GraduationCap,
  Star,
  ChevronRight,
  Filter
} from 'lucide-react';

const CATEGORIES = [
  'All Domains',
  'Artificial Intelligence',
  'Machine Learning',
  'Web Development',
  'Python Development',
  'Cybersecurity',
  'UI/UX Design',
  'Data Analytics',
  'Cloud Computing',
  'Java Development',
  'Marketing',
  'Finance'
];

export const LandingPage: React.FC = () => {
  const {
    internships,
    setCurrentView,
    loginDemoStudent,
    loginDemoCompany,
    currentUser,
    currentRole
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All Domains');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalInternship, setActiveModalInternship] = useState<Internship | null>(null);

  // Filter internships
  const filteredInternships = internships.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All Domains' ||
      job.department.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(selectedCategory.toLowerCase()));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen relative overflow-hidden pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Interactive 3D Canvas Background */}
        <Hero3DCanvas />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDFBF0]/90 border border-[#98F6D5] text-xs font-semibold text-[#123C32] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#31C48D]" />
              <span>Summer & Fall 2026 Internships Now Open</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#123C32] tracking-tight leading-[1.08] text-balance">
              Discover Opportunities. <br />
              <span className="bg-gradient-to-r from-[#123C32] via-[#31C48D] to-[#123C32] bg-clip-text text-transparent">
                Build Your Future.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#18332C]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Find internships that match your skills, connect with innovative companies, and
              take the first step toward your dream career.
            </p>

            {/* Primary & Secondary Dual CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => {
                  if (currentRole === 'student') setCurrentView('student-dashboard');
                  else setCurrentView('student-login');
                }}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#123C32] hover:bg-[#18332C] rounded-2xl shadow-lg shadow-[#31C48D]/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 group"
              >
                <span>Find Internships</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  if (currentRole === 'company') setCurrentView('company-dashboard');
                  else setCurrentView('company-login');
                }}
                className="px-6 py-3.5 text-sm font-semibold text-[#123C32] bg-white/85 hover:bg-white border border-[#DDFBF0] hover:border-[#98F6D5] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-[#31C48D]" />
                <span>Hire Interns</span>
              </button>
            </div>

            {/* Two Distinct User Paths Card */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0">
              <button
                onClick={() => setCurrentView('student-login')}
                className="p-3.5 rounded-2xl glass-card text-left flex items-center gap-3 group border border-[#DDFBF0]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#DDFBF0] flex items-center justify-center text-[#123C32] group-hover:bg-[#31C48D] group-hover:text-white transition-colors shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#18332C] group-hover:text-[#31C48D]">
                    I'm a Student
                  </h4>
                  <p className="text-[11px] text-[#4A6B62]">Explore paid tech roles & track applications</p>
                </div>
              </button>

              <button
                onClick={() => setCurrentView('company-login')}
                className="p-3.5 rounded-2xl glass-card text-left flex items-center gap-3 group border border-[#DDFBF0]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#DDFBF0] flex items-center justify-center text-[#123C32] group-hover:bg-[#31C48D] group-hover:text-white transition-colors shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#18332C] group-hover:text-[#31C48D]">
                    I'm a Company
                  </h4>
                  <p className="text-[11px] text-[#4A6B62]">Post roles & review top university talent</p>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Floating Glass Cards & Visual Composition */}
          <div className="lg:col-span-5 relative flex justify-center items-center min-h-[420px]">
            {/* Ambient mint blur circle */}
            <div className="absolute w-72 h-72 rounded-full bg-[#98F6D5]/40 filter blur-3xl pointer-events-none" />

            {/* Card 1: Main Floating Glass Internship Card */}
            <div className="w-full max-w-sm glass-panel bg-white/85 rounded-3xl p-5 shadow-2xl border border-white relative z-20 animate-float-slow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#123C32] to-[#31C48D] p-2 flex items-center justify-center text-[#98F6D5] font-bold text-xs">
                    QP
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#18332C]">QuantumPay AI</h4>
                    <p className="text-[10px] text-[#4A6B62]">San Francisco · Hybrid</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#123C32] bg-[#98F6D5] px-2.5 py-0.5 rounded-full">
                  $52 / hr
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#DDFBF0]/60 border border-[#98F6D5]/70 mb-3">
                <p className="text-xs font-semibold text-[#123C32]">
                  Machine Learning & AI Research Intern
                </p>
                <p className="text-[11px] text-[#4A6B62] mt-0.5">
                  12-week summer program with return full-time conversion.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="text-[10px] font-medium bg-white px-2 py-0.5 rounded-md border border-[#DDFBF0] text-[#123C32]">
                  PyTorch
                </span>
                <span className="text-[10px] font-medium bg-white px-2 py-0.5 rounded-md border border-[#DDFBF0] text-[#123C32]">
                  Python
                </span>
                <span className="text-[10px] font-medium bg-white px-2 py-0.5 rounded-md border border-[#DDFBF0] text-[#123C32]">
                  Transformers
                </span>
              </div>

              <div className="pt-3 border-t border-[#DDFBF0] flex items-center justify-between">
                <span className="text-[10px] text-[#4A6B62]">42 Applicants</span>
                <span className="text-[11px] font-bold text-[#31C48D] flex items-center gap-1">
                  1-Click Apply Ready
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Card 2: Floating Candidate Profile Badge */}
            <div className="absolute -bottom-4 -left-4 sm:-left-6 glass-card bg-white/90 rounded-2xl p-3 shadow-xl border border-white z-30 animate-float-reverse max-w-[210px]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#DDFBF0] shrink-0 border border-[#98F6D5]">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                    alt="Alex"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-[#18332C]">Alex Chen</p>
                  <p className="text-[10px] text-[#31C48D] font-medium">Stanford CS '26</p>
                  <span className="text-[9px] text-[#4A6B62]">Interview Scheduled</span>
                </div>
              </div>
            </div>

            {/* Card 3: Floating Status Tag */}
            <div className="absolute -top-3 -right-2 sm:-right-4 glass-card bg-white/90 rounded-2xl px-3.5 py-2 shadow-xl border border-white z-30 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#31C48D]" />
              <span className="text-xs font-semibold text-[#18332C]">Verified Stipends Only</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-4 mb-20 relative z-20">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 bg-white/80 border border-white shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#DDFBF0]">
            <div className="pt-2 sm:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#123C32] tracking-tight tabular-nums">
                1,420<span className="text-[#31C48D]">+</span>
              </p>
              <p className="text-xs font-semibold text-[#4A6B62] mt-1 uppercase tracking-wider">
                Total Internships Available
              </p>
            </div>

            <div className="pt-4 sm:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#123C32] tracking-tight tabular-nums">
                380<span className="text-[#31C48D]">+</span>
              </p>
              <p className="text-xs font-semibold text-[#4A6B62] mt-1 uppercase tracking-wider">
                Registered Companies
              </p>
            </div>

            <div className="pt-4 sm:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#123C32] tracking-tight tabular-nums">
                24.5k<span className="text-[#31C48D]">+</span>
              </p>
              <p className="text-xs font-semibold text-[#4A6B62] mt-1 uppercase tracking-wider">
                Students Connected
              </p>
            </div>

            <div className="pt-4 sm:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#123C32] tracking-tight tabular-nums">
                8,900<span className="text-[#31C48D]">+</span>
              </p>
              <p className="text-xs font-semibold text-[#4A6B62] mt-1 uppercase tracking-wider">
                Successful Placements
              </p>
            </div>
          </div>
          <p className="text-[11px] text-[#4A6B62]/70 text-center mt-4">
            Demonstration platform statistics updated daily across partner university recruitment cycles.
          </p>
        </div>
      </section>

      {/* 3. EXPLORE INTERNSHIPS WITH LIVE SEARCH & FILTERS */}
      <section id="explore-internships" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#31C48D] uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4" />
              <span>Curated Opportunities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123C32] tracking-tight">
              Featured Internships
            </h2>
            <p className="text-xs sm:text-sm text-[#4A6B62] mt-1">
              Filter by technology, compensation, or remote flexibility.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-[#4A6B62] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, company, or skill..."
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-2xl glass-input shadow-xs text-[#18332C]"
            />
          </div>
        </div>

        {/* Category Horizontal Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#123C32] text-white shadow-xs scale-[1.02]'
                  : 'bg-white/80 hover:bg-[#DDFBF0] text-[#18332C] border border-[#DDFBF0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Internship Cards Grid */}
        {filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                onViewDetails={(job) => setActiveModalInternship(job)}
                onApplyClick={(job) => setActiveModalInternship(job)}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto">
            <Filter className="w-10 h-10 text-[#31C48D] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#18332C]">No matching internships</h3>
            <p className="text-xs text-[#4A6B62] mt-1">
              Try adjusting your search criteria or domain filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All Domains');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#123C32] rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 4. WHY INTERNLEAF: GLASS BENTO GRID */}
      <section id="career-resources" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123C32] tracking-tight">
            Designed for Fast-Track Career Launch
          </h2>
          <p className="text-xs sm:text-sm text-[#4A6B62] mt-2">
            Traditional job boards leave students waiting in silent queues. Internleaf gives you
            transparency, verified pay, and direct line-of-sight to hiring teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-3xl p-7 bg-white/80 border border-[#DDFBF0]">
            <div className="w-12 h-12 rounded-2xl bg-[#DDFBF0] text-[#123C32] flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6 text-[#31C48D]" />
            </div>
            <h3 className="text-base font-bold text-[#18332C] mb-2">
              100% Verified Opportunities
            </h3>
            <p className="text-xs text-[#4A6B62] leading-relaxed">
              Every internship posting undergoes company verification. No ghost jobs, unpaid trial tasks, or vague compensation brackets.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-7 bg-white/80 border border-[#DDFBF0]">
            <div className="w-12 h-12 rounded-2xl bg-[#DDFBF0] text-[#123C32] flex items-center justify-center mb-5">
              <TrendingUp className="w-6 h-6 text-[#31C48D]" />
            </div>
            <h3 className="text-base font-bold text-[#18332C] mb-2">
              Transparent Application Tracking
            </h3>
            <p className="text-xs text-[#4A6B62] leading-relaxed">
              Real-time milestone timelines. Know exactly when your resume is reviewed, when you're shortlisted, and when interviews are scheduled.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-7 bg-white/80 border border-[#DDFBF0]">
            <div className="w-12 h-12 rounded-2xl bg-[#DDFBF0] text-[#123C32] flex items-center justify-center mb-5">
              <Sparkles className="w-6 h-6 text-[#31C48D]" />
            </div>
            <h3 className="text-base font-bold text-[#18332C] mb-2">
              High-Conversion Return Offers
            </h3>
            <p className="text-xs text-[#4A6B62] leading-relaxed">
              Over 78% of completed internships through Internleaf result in formal return offers for full-time new graduate software engineering roles.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FEATURED RECRUITERS & COMPANIES */}
      <section id="featured-companies" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="glass-panel rounded-3xl p-8 bg-gradient-to-r from-white/90 via-[#DDFBF0]/30 to-white/90 border border-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#123C32]">Hiring Partners</h3>
              <p className="text-xs text-[#4A6B62]">Top tech firms actively screening on Internleaf</p>
            </div>
            <button
              onClick={() => setCurrentView('company-register')}
              className="text-xs font-semibold text-[#123C32] hover:text-[#31C48D] flex items-center gap-1"
            >
              Register as an Employer Partner
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/70 border border-[#DDFBF0] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#123C32] text-[#98F6D5] font-bold text-xs flex items-center justify-center">
                QP
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#18332C]">QuantumPay</p>
                <p className="text-[10px] text-[#4A6B62]">FinTech & AI</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-[#DDFBF0] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#31C48D] text-white font-bold text-xs flex items-center justify-center">
                NC
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#18332C]">NovaCloud</p>
                <p className="text-[10px] text-[#4A6B62]">Cloud Infra</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-[#DDFBF0] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#18332C] text-[#98F6D5] font-bold text-xs flex items-center justify-center">
                AS
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#18332C]">Aura Studio</p>
                <p className="text-[10px] text-[#4A6B62]">Design Systems</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-[#DDFBF0] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#123C32] text-white font-bold text-xs flex items-center justify-center">
                CL
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#18332C]">CipherLock</p>
                <p className="text-[10px] text-[#4A6B62]">Cybersecurity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT SECTION & CTA BANNER */}
      <section id="about-section" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#123C32] via-[#18332C] to-[#123C32] text-white shadow-2xl relative overflow-hidden">
          {/* Subtle glowing mint circles */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#31C48D]/25 blur-3xl pointer-events-none" />
          <div className="absolute left-10 -top-20 w-60 h-60 rounded-full bg-[#98F6D5]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold text-[#98F6D5] tracking-widest uppercase">
              Start Your Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Ready to Secure Your Next Dream Internship?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Create your profile in 2 minutes, showcase your verified projects and GitHub repos,
              and receive direct interview invitations from top engineering squads.
            </p>

            <div className="pt-3 flex flex-wrap gap-3">
              <button
                onClick={() => setCurrentView('student-register')}
                className="px-6 py-3 bg-[#98F6D5] hover:bg-white text-[#123C32] rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
              >
                Sign Up as Student
              </button>
              <button
                onClick={() => setCurrentView('company-register')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-xl text-xs font-semibold transition-all"
              >
                Sign Up as Employer
              </button>
              <button
                onClick={loginDemoStudent}
                className="px-4 py-3 bg-[#31C48D]/20 hover:bg-[#31C48D]/40 border border-[#98F6D5]/40 text-[#98F6D5] rounded-xl text-xs font-semibold transition-all"
              >
                Try Demo Mode
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 border-t border-[#DDFBF0]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4A6B62]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#123C32] text-sm">Internleaf</span>
            <span>·</span>
            <span>Your Future Starts With the Right Internship.</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentView('student-login')} className="hover:text-[#18332C]">
              Student Portal
            </button>
            <button onClick={() => setCurrentView('company-login')} className="hover:text-[#18332C]">
              Company Portal
            </button>
            <span>© 2026 Internleaf Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* Modal for Details / Apply */}
      {activeModalInternship && (
        <InternshipDetailsModal
          internship={activeModalInternship}
          onClose={() => setActiveModalInternship(null)}
        />
      )}
    </div>
  );
};
