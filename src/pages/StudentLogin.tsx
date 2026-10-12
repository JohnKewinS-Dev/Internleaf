import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  GraduationCap,
  Building2,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

export const StudentLogin: React.FC = () => {
  const { loginStudent, loginDemoStudent, setCurrentView } = useApp();

  const [email, setEmail] = useState('alex.chen@stanford.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginStudent(email);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white">
        {/* Left Side: Mint-green animated 3D illustration with floating internship cards */}
        <div className="lg:col-span-5 p-8 bg-gradient-to-br from-[#123C32] via-[#18332C] to-[#123C32] text-white flex flex-col justify-between relative overflow-hidden">
          {/* Ambient glowing orbs */}
          <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-[#31C48D]/30 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-[#98F6D5]/20 blur-2xl pointer-events-none" />

          {/* Top branding */}
          <div className="relative z-10">
            <button
              onClick={() => setCurrentView('landing')}
              className="inline-flex items-center gap-1.5 text-xs text-[#98F6D5] hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </button>

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#98F6D5] to-[#31C48D] flex items-center justify-center text-[#123C32] mb-4 shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-white">
              Student Portal
            </h2>
            <p className="text-xs text-[#98F6D5] mt-1">
              Your future starts with the right internship.
            </p>
          </div>

          {/* Floating Glass Mock Card */}
          <div className="relative z-10 my-8 glass-card bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 animate-float-slow">
            <div className="flex items-center justify-between text-[11px] text-[#98F6D5] mb-2 font-semibold">
              <span>Verified Match</span>
              <span className="bg-[#98F6D5]/20 px-2 py-0.5 rounded-full text-white">Summer 2026</span>
            </div>
            <p className="text-sm font-bold text-white">Machine Learning Engineer Intern</p>
            <p className="text-xs text-white/70 mt-0.5">QuantumPay · San Francisco</p>
            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-white/10">
              <span className="text-[#98F6D5] font-bold">$52 / hr</span>
              <span className="text-white/80 text-[10px]">1-Click Application</span>
            </div>
          </div>

          {/* Bottom Trust Indicators */}
          <div className="relative z-10 space-y-2 text-xs text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#98F6D5] shrink-0" />
              <span>Transparent application tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#98F6D5] shrink-0" />
              <span>Direct messages from tech recruiters</span>
            </div>
          </div>
        </div>

        {/* Right Side: Clean white glass login card */}
        <div className="lg:col-span-7 p-8 sm:p-10 bg-white/95 flex flex-col justify-center">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold text-[#18332C]">
                Sign in to your account
              </h3>
              <button
                onClick={loginDemoStudent}
                className="px-2.5 py-1 text-[11px] font-semibold text-[#123C32] bg-[#DDFBF0] hover:bg-[#98F6D5] border border-[#98F6D5] rounded-lg transition-colors flex items-center gap-1"
                title="Sign in with pre-filled demo student account"
              >
                <Sparkles className="w-3 h-3 text-[#31C48D]" />
                Demo 1-Click
              </button>
            </div>
            <p className="text-xs text-[#4A6B62] mt-1">
              Welcome back! Enter your university credentials to view applications.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#18332C] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#4A6B62] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.chen@stanford.edu"
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
                  onClick={() => alert('Password reset instructions sent to registered student email.')}
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
                <span>Remember this workstation</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs sm:text-sm font-semibold text-white bg-[#123C32] hover:bg-[#18332C] rounded-xl shadow-md shadow-[#31C48D]/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Sign In as Student</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Google or Demo Alternatives */}
          <div className="mt-5 space-y-3">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#DDFBF0] w-full" />
              <span className="bg-white px-3 text-[11px] text-[#4A6B62] uppercase tracking-wider absolute">
                or
              </span>
            </div>

            <button
              type="button"
              onClick={loginDemoStudent}
              className="w-full py-2.5 px-4 rounded-xl border border-[#DDFBF0] hover:bg-[#DDFBF0]/40 text-xs font-semibold text-[#18332C] transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Links to register and company switch */}
          <div className="mt-6 pt-4 border-t border-[#DDFBF0] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#4A6B62]">
            <p>
              New to Internleaf?{' '}
              <button
                onClick={() => setCurrentView('student-register')}
                className="font-bold text-[#123C32] hover:text-[#31C48D]"
              >
                Create Account
              </button>
            </p>

            <button
              onClick={() => setCurrentView('company-login')}
              className="flex items-center gap-1 font-semibold text-[#31C48D] hover:underline"
            >
              <Building2 className="w-3.5 h-3.5" />
              Switch to Company Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
