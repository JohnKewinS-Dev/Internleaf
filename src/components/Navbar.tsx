import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  User,
  Building2,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Compass,
  ArrowRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    currentRole,
    currentView,
    setCurrentView,
    logout,
    loginDemoStudent,
    loginDemoCompany
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-4 z-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <nav className="glass-nav rounded-2xl px-5 py-3 flex items-center justify-between gap-8 transition-all">
        {/* Zone 1: Single text wordmark with subtle mint emblem */}
        <button
          onClick={() => {
            setCurrentView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#31C48D] rounded-xl py-1 px-1.5 -ml-1.5 transition-transform active:scale-95"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#123C32] to-[#31C48D] flex items-center justify-center shadow-sm shadow-[#31C48D]/30 group-hover:rotate-6 transition-transform">
            <svg
              className="w-5 h-5 text-[#98F6D5]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A9.49 9.49 0 0 1 12 21a9 9 0 0 0 9-9 8.65 8.65 0 0 0-4-4zm-5 11c-2.8 0-5.18-1.57-6.39-3.87 2.15-4.14 4.54-7.25 9.39-8.13A7 7 0 0 1 12 19z" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-[#123C32] block leading-none font-display">
              Internleaf
            </span>
            <span className="text-[10px] font-medium text-[#4A6B62] tracking-wider uppercase">
              Opportunity Engine
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-[#18332C]">
          <button
            onClick={() => {
              setCurrentView('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`transition-colors hover:text-[#31C48D] whitespace-nowrap shrink-0 ${
              currentView === 'landing' ? 'text-[#31C48D] font-semibold' : 'text-[#18332C]/80'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              if (currentRole === 'student') {
                setCurrentView('student-dashboard');
              } else {
                setCurrentView('explore');
              }
            }}
            className={`transition-colors hover:text-[#31C48D] whitespace-nowrap shrink-0 ${
              currentView === 'explore' ? 'text-[#31C48D] font-semibold' : 'text-[#18332C]/80'
            }`}
          >
            Explore Internships
          </button>
          <button
            onClick={() => {
              setCurrentView('landing');
              setTimeout(() => {
                const el = document.getElementById('featured-companies');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="text-[#18332C]/80 hover:text-[#31C48D] transition-colors whitespace-nowrap shrink-0"
          >
            Companies
          </button>
          <button
            onClick={() => {
              setCurrentView('landing');
              setTimeout(() => {
                const el = document.getElementById('career-resources');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="text-[#18332C]/80 hover:text-[#31C48D] transition-colors whitespace-nowrap shrink-0"
          >
            Career Resources
          </button>
          <button
            onClick={() => {
              setCurrentView('landing');
              setTimeout(() => {
                const el = document.getElementById('about-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="text-[#18332C]/80 hover:text-[#31C48D] transition-colors whitespace-nowrap shrink-0"
          >
            About Us
          </button>
        </div>

        {/* Zone 3: 1 Primary Action / User Profile */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/70 hover:bg-white border border-[#DDFBF0] hover:border-[#98F6D5] transition-all shadow-xs"
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden bg-[#DDFBF0] flex items-center justify-center border border-[#98F6D5]/60">
                  {'avatar' in currentUser && currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : 'logo' in currentUser && currentUser.logo ? (
                    <img
                      src={currentUser.logo}
                      alt={currentUser.companyName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-[#123C32]" />
                  )}
                </div>
                <div className="text-left text-xs leading-tight">
                  <span className="font-semibold text-[#18332C] block truncate max-w-[110px]">
                    {'name' in currentUser ? currentUser.name : currentUser.companyName}
                  </span>
                  <span className="text-[10px] text-[#31C48D] font-medium capitalize">
                    {currentRole} Portal
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#4A6B62]" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 border border-white">
                  <div className="px-3 py-2 border-b border-[#DDFBF0] mb-1">
                    <p className="text-xs font-semibold text-[#18332C] truncate">
                      {'name' in currentUser ? currentUser.name : currentUser.companyName}
                    </p>
                    <p className="text-[11px] text-[#4A6B62] truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      if (currentRole === 'student') setCurrentView('student-dashboard');
                      else setCurrentView('company-dashboard');
                    }}
                    className="w-full px-3 py-2 text-left text-xs font-medium text-[#18332C] hover:bg-[#DDFBF0]/60 flex items-center gap-2 transition-colors"
                  >
                    <Compass className="w-4 h-4 text-[#31C48D]" />
                    Go to {currentRole === 'student' ? 'Student' : 'Company'} Dashboard
                  </button>
                  <div className="h-px bg-[#DDFBF0] my-1" />
                  <p className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#4A6B62] font-semibold">
                    Quick Role Switch
                  </p>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      if (currentRole === 'student') {
                        loginDemoCompany();
                      } else {
                        loginDemoStudent();
                      }
                    }}
                    className="w-full px-3 py-1.5 text-left text-xs text-[#18332C] hover:bg-[#DDFBF0]/60 flex items-center gap-2 transition-colors"
                  >
                    {currentRole === 'student' ? (
                      <>
                        <Building2 className="w-3.5 h-3.5 text-[#31C48D]" />
                        Switch to Employer View
                      </>
                    ) : (
                      <>
                        <User className="w-3.5 h-3.5 text-[#31C48D]" />
                        Switch to Student View
                      </>
                    )}
                  </button>
                  <div className="h-px bg-[#DDFBF0] my-1" />
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full px-3 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView('student-login')}
                className="px-4 py-2 text-xs font-medium text-[#123C32] hover:text-[#31C48D] transition-colors whitespace-nowrap"
              >
                Log In
              </button>
              <button
                onClick={() => setCurrentView('student-register')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#123C32] hover:bg-[#18332C] rounded-xl shadow-sm transition-all hover:shadow-[#31C48D]/20 hover:scale-[1.02] active:scale-95 whitespace-nowrap flex items-center gap-1.5"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Quick Demo Button for effortless instant testing */}
          {!currentUser && (
            <button
              onClick={loginDemoStudent}
              title="Test drive as demo student"
              className="px-2.5 py-1.5 text-[11px] font-medium text-[#123C32] bg-[#DDFBF0] hover:bg-[#98F6D5] border border-[#98F6D5] rounded-xl transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#31C48D]" />
              Demo
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          {currentUser && (
            <button
              onClick={() => {
                if (currentRole === 'student') setCurrentView('student-dashboard');
                else setCurrentView('company-dashboard');
              }}
              className="p-1.5 text-xs bg-[#DDFBF0] text-[#123C32] rounded-lg font-semibold"
            >
              Dashboard
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#18332C] hover:bg-[#DDFBF0]/60 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-panel rounded-2xl p-4 shadow-xl border border-white space-y-3">
          <div className="flex flex-col gap-2 text-sm font-medium">
            <button
              onClick={() => {
                setCurrentView('landing');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#DDFBF0]/50"
            >
              Home
            </button>
            <button
              onClick={() => {
                if (currentRole === 'student') setCurrentView('student-dashboard');
                else setCurrentView('explore');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#DDFBF0]/50"
            >
              Explore Internships
            </button>
            <button
              onClick={() => {
                setCurrentView('landing');
                setMobileMenuOpen(false);
                setTimeout(() => {
                  document.getElementById('featured-companies')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#DDFBF0]/50"
            >
              Companies
            </button>
          </div>

          <div className="pt-3 border-t border-[#DDFBF0] flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    if (currentRole === 'student') setCurrentView('student-dashboard');
                    else setCurrentView('company-dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-3 bg-[#123C32] text-white rounded-xl text-center text-xs font-semibold"
                >
                  Open Dashboard ({currentRole})
                </button>
                <button
                  onClick={() => {
                    if (currentRole === 'student') loginDemoCompany();
                    else loginDemoStudent();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-3 bg-[#DDFBF0] text-[#123C32] rounded-xl text-center text-xs font-semibold"
                >
                  Switch Role Demo
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-xs font-medium text-rose-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setCurrentView('student-login');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-3 bg-white text-[#123C32] border border-[#DDFBF0] rounded-xl text-center text-xs font-medium"
                >
                  Student Login
                </button>
                <button
                  onClick={() => {
                    setCurrentView('company-login');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-3 bg-[#123C32] text-white rounded-xl text-center text-xs font-semibold"
                >
                  Company Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
