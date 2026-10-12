import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const CompanyLogin: React.FC = () => {
  const { loginCompany, loginDemoCompany, setCurrentView } = useApp();

  const [email, setEmail] = useState('careers@quantumpay.io');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginCompany(email);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white">
        {/* Left Side: Corporate mint-green glass design */}
        <div className="lg:col-span-5 p-8 bg-gradient-to-br from-[#123C32] via-[#102B24] to-[#123C32] text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <button
              onClick={() => setCurrentView('landing')}
              className="inline-flex items-center gap-1.5 text-xs text-[#98F6D5] hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </button>

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#31C48D] to-[#98F6D5] text-[#123C32] flex items-center justify-center mb-4 shadow-md">
              <Building2 className="w-6 h-6" />
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-white">
              Company Portal
            </h2>
            <p className="text-xs text-[#98F6D5] mt-1">
              Hire vetted university interns with verified technical skills.
            </p>
          </div>

          {/* Recruiter metric card */}
          <div className="relative z-10 my-8 glass-card bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-between text-[11px] text-[#98F6D5] mb-2 font-semibold">
              <span>Recruiter Command</span>
              <span className="bg-[#31C48D]/30 px-2 py-0.5 rounded-full text-white">Verified</span>
            </div>
            <p className="text-sm font-bold text-white">QuantumPay Technologies</p>
            <p className="text-xs text-white/70 mt-0.5">Active Postings: 2 · Applicants: 42</p>
            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-white/10">
              <span className="text-[#98F6D5] font-bold">1-Click Status Flow</span>
              <span className="text-white/80 text-[10px]">Shortlist & Interview</span>
            </div>
          </div>

          <div className="relative z-10 space-y-2 text-xs text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#98F6D5] shrink-0" />
              <span>Multi-section internship publishing wizard</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#98F6D5] shrink-0" />
              <span>Direct interview scheduler with meeting links</span>
            </div>
          </div>
        </div>

        {/* Right Side: Clean corporate white glass card */}
        <div className="lg:col-span-7 p-8 sm:p-10 bg-white/95 flex flex-col justify-center">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold text-[#18332C]">
                Company Recruiter Sign In
              </h3>
              <button
                onClick={loginDemoCompany}
                className="px-2.5 py-1 text-[11px] font-semibold text-[#123C32] bg-[#DDFBF0] hover:bg-[#98F6D5] border border-[#98F6D5] rounded-lg transition-colors flex items-center gap-1"
                title="Sign in with demo recruiter credentials"
              >
                <Sparkles className="w-3 h-3 text-[#31C48D]" />
                Demo Recruiter
              </button>
            </div>
            <p className="text-xs text-[#4A6B62] mt-1">
              Access your internship pipeline and review candidate submissions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#18332C] mb-1.5">
                Official Company Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#4A6B62] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="recruiting@company.com"
                  className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl glass-input text-[#18332C]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#18332C]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset sent to official corporate domain.')}
                  className="text-[11px] font-medium text-[#31C48D] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#4A6B62] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-xl glass-input text-[#18332C]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4A6B62] hover:text-[#18332C]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 text-xs text-[#4A6B62] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#31C48D] focus:ring-[#31C48D]"
                />
                <span>Remember this corporate workstation</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs sm:text-sm font-semibold text-white bg-[#123C32] hover:bg-[#18332C] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Sign In to Recruitment Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#DDFBF0] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#4A6B62]">
            <p>
              Looking to hire?{' '}
              <button
                onClick={() => setCurrentView('company-register')}
                className="font-bold text-[#123C32] hover:text-[#31C48D]"
              >
                Register Company
              </button>
            </p>

            <button
              onClick={() => setCurrentView('student-login')}
              className="flex items-center gap-1 font-semibold text-[#31C48D] hover:underline"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Switch to Student Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
