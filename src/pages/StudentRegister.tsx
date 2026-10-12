import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Building2,
  Calendar,
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileText
} from 'lucide-react';

const COMMON_SKILLS = [
  'Python',
  'TypeScript',
  'React',
  'Java',
  'Machine Learning',
  'Next.js',
  'SQL',
  'Tailwind CSS',
  'Cybersecurity',
  'Cloud / AWS',
  'UI/UX Design',
  'Data Analytics'
];

export const StudentRegister: React.FC = () => {
  const { registerStudent, setCurrentView } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [degree, setDegree] = useState('Bachelor of Science');
  const [department, setDepartment] = useState('Computer Science');
  const [gradYear, setGradYear] = useState('2026');
  const [skills, setSkills] = useState<string[]>(['Python', 'React', 'TypeScript']);
  const [resumeName, setResumeName] = useState<string>('My_University_Resume_2026.pdf');
  const [error, setError] = useState('');

  const toggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setError('Please fill in your name and email');
      return;
    }
    if (password && confirmPassword && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    registerStudent({
      name: fullName,
      email,
      college: collegeName || 'State University',
      degree,
      department,
      gradYear,
      skills,
      resumeName
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white">
        {/* Left Side: Branding and perks */}
        <div className="lg:col-span-4 p-8 bg-gradient-to-br from-[#123C32] to-[#18332C] text-white flex flex-col justify-between">
          <div>
            <button
              onClick={() => setCurrentView('landing')}
              className="inline-flex items-center gap-1.5 text-xs text-[#98F6D5] hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Home
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#98F6D5] text-[#123C32] flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Join Internleaf</h2>
            <p className="text-xs text-[#98F6D5] mt-1">
              Start applying to verified tech and business internships in minutes.
            </p>
          </div>

          <div className="space-y-3 text-xs text-white/80 my-8">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#98F6D5] shrink-0 mt-0.5" />
              <span>One-click applications with pre-filled profiles</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#98F6D5] shrink-0 mt-0.5" />
              <span>Direct messages and interview invitations</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#98F6D5] shrink-0 mt-0.5" />
              <span>Compensation transparency across all listings</span>
            </div>
          </div>

          <p className="text-[11px] text-white/60">
            Already registered?{' '}
            <button
              onClick={() => setCurrentView('student-login')}
              className="font-bold text-[#98F6D5] hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-8 p-8 sm:p-10 bg-white/95 max-h-[85vh] overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#18332C]">Create Student Profile</h3>
            <p className="text-xs text-[#4A6B62] mt-1">
              Fill in your academic credentials so companies can match your skills.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#18332C] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#4A6B62] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Maya Patel"
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl glass-input text-[#18332C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18332C] mb-1">
                  University Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#4A6B62] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maya.patel@mit.edu"
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl glass-input text-[#18332C]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#18332C] mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#4A6B62] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl glass-input text-[#18332C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18332C] mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#4A6B62] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl glass-input text-[#18332C]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#18332C] mb-1">
                  College / University
                </label>
                <input
                  type="text"
                  required
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="e.g. Massachusetts Institute of Technology"
                  className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18332C] mb-1">
                  Graduation Year
                </label>
                <select
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                >
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#18332C] mb-1">Degree</label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="e.g. Bachelor of Science"
                  className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18332C] mb-1">
                  Department / Major
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Electrical Eng & CS"
                  className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                />
              </div>
            </div>

            {/* Skills selection */}
            <div>
              <label className="block text-xs font-semibold text-[#18332C] mb-1.5">
                Skills & Tech Stack (Click to select)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_SKILLS.map((skill) => {
                  const selected = skills.includes(skill);
                  return (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                        selected
                          ? 'bg-[#123C32] text-[#98F6D5] border-[#123C32] font-semibold'
                          : 'bg-white text-[#18332C] border-[#DDFBF0] hover:bg-[#DDFBF0]/50'
                      }`}
                    >
                      {selected ? `✓ ${skill}` : `+ ${skill}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-xs font-semibold text-[#18332C] mb-1">
                Attach Resume (PDF / DOCX)
              </label>
              <div className="p-3 rounded-xl border border-dashed border-[#31C48D] bg-[#DDFBF0]/30 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <FileText className="w-5 h-5 text-[#31C48D]" />
                  <span className="font-semibold text-[#18332C]">{resumeName}</span>
                </div>
                <label className="cursor-pointer text-xs font-medium text-[#123C32] bg-white px-3 py-1 rounded-lg border border-[#98F6D5] shadow-2xs hover:bg-[#DDFBF0]">
                  <span>Browse File</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setResumeName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs sm:text-sm font-semibold text-white bg-[#123C32] hover:bg-[#18332C] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>Complete Registration & Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
