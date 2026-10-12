import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Mail,
  Lock,
  Globe,
  User,
  FileText,
  Upload,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const CompanyRegister: React.FC = () => {
  const { registerCompany, setCurrentView } = useApp();

  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [industry, setIndustry] = useState('Artificial Intelligence & SaaS');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [location, setLocation] = useState('San Francisco, CA');
  const [logoName, setLogoName] = useState('Company_Logo_Icon.png');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !email.trim()) {
      setError('Please provide company name and official email.');
      return;
    }
    if (password && confirmPassword && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    registerCompany({
      companyName,
      email,
      industry,
      website: website || `https://${companyName.toLowerCase().replace(/\s+/g, '')}.io`,
      description: description || 'Pioneering innovative digital solutions for modern technology landscapes.',
      contactPerson: contactPerson || 'Talent Acquisition Team',
      location,
      verified: true
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white">
        {/* Left Side */}
        <div className="lg:col-span-4 p-8 bg-gradient-to-br from-[#123C32] to-[#102B24] text-white flex flex-col justify-between">
          <div>
            <button
              onClick={() => setCurrentView('landing')}
              className="inline-flex items-center gap-1.5 text-xs text-[#98F6D5] hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Home
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#98F6D5] text-[#123C32] flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Employer Partner</h2>
            <p className="text-xs text-[#98F6D5] mt-1">
              Connect with vetted students from premier engineering and business programs.
            </p>
          </div>

          <div className="space-y-3 text-xs text-white/80 my-8">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#98F6D5] shrink-0 mt-0.5" />
              <span>Verified Employer badge to boost applicant trust</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#98F6D5] shrink-0 mt-0.5" />
              <span>Multi-step internship posting with customized requirements</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#98F6D5] shrink-0 mt-0.5" />
              <span>Integrated candidate shortlisting & interview scheduler</span>
            </div>
          </div>

          <p className="text-[11px] text-white/60">
            Existing employer account?{' '}
            <button
              onClick={() => setCurrentView('company-login')}
              className="font-bold text-[#98F6D5] hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>

        {/* Right Side Form */}
        <div className="lg:col-span-8 p-8 sm:p-10 bg-white/95 max-h-[85vh] overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#18332C]">Register Company Account</h3>
            <p className="text-xs text-[#4A6B62] mt-1">
              Provide corporate details to complete verification and begin hiring interns.
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
                  Company Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[#4A6B62] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. NextWave Systems"
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl glass-input text-[#18332C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18332C] mb-1">
                  Official Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#4A6B62] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="recruiting@nextwave.com"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#18332C] mb-1">
                  Industry / Domain
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                >
                  <option value="Artificial Intelligence & SaaS">Artificial Intelligence & SaaS</option>
                  <option value="FinTech & Payment Systems">FinTech & Payment Systems</option>
                  <option value="Cloud Infrastructure & DevOps">Cloud Infrastructure & DevOps</option>
                  <option value="Cybersecurity & Defense">Cybersecurity & Defense</option>
                  <option value="HealthTech & BioInformatics">HealthTech & BioInformatics</option>
                  <option value="Consumer Web & Mobile">Consumer Web & Mobile</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18332C] mb-1">
                  Company Website
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-[#4A6B62] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://company.io"
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl glass-input text-[#18332C]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#18332C] mb-1">
                  Contact Person / Talent Lead
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#4A6B62] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Jordan Lee (Director of University Talent)"
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl glass-input text-[#18332C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18332C] mb-1">
                  Headquarters Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. San Francisco, CA (or Remote)"
                  className="w-full text-xs p-2.5 rounded-xl glass-input text-[#18332C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#18332C] mb-1">
                Company Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your company mission, tech stack, and what makes your internship program exceptional..."
                className="w-full text-xs p-3 rounded-xl glass-input resize-none text-[#18332C]"
              />
            </div>

            {/* Logo upload */}
            <div>
              <label className="block text-xs font-semibold text-[#18332C] mb-1">
                Company Brand Logo (PNG / SVG)
              </label>
              <div className="p-3 rounded-xl border border-dashed border-[#31C48D] bg-[#DDFBF0]/30 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <Building2 className="w-5 h-5 text-[#31C48D]" />
                  <span className="font-semibold text-[#18332C]">{logoName}</span>
                </div>
                <label className="cursor-pointer text-xs font-medium text-[#123C32] bg-white px-3 py-1 rounded-lg border border-[#98F6D5] shadow-2xs hover:bg-[#DDFBF0]">
                  <span>Upload Logo</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setLogoName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-[11px] text-[#123C32] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#31C48D] shrink-0" />
              <span>
                Verified instantly for initial posting demonstration; university student profiles
                will see your verified recruiter badge immediately.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs sm:text-sm font-semibold text-white bg-[#123C32] hover:bg-[#18332C] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>Create Company Profile & Open Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
