export type UserRole = 'student' | 'company';

export interface StudentProfile {
  id: string;
  role: 'student';
  name: string;
  email: string;
  college: string;
  degree: string;
  department: string;
  gradYear: string;
  skills: string[];
  bio: string;
  avatar: string;
  resumeName?: string;
  resumeUrl?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  preferredRoles: string[];
  certifications: { name: string; issuer: string; year: string }[];
  projects: { title: string; description: string; link?: string; tech: string[] }[];
}

export interface CompanyProfile {
  id: string;
  role: 'company';
  companyName: string;
  email: string;
  industry: string;
  website: string;
  description: string;
  contactPerson: string;
  logo: string;
  location: string;
  verified: boolean;
  size: string;
}

export type WorkType = 'Remote' | 'On-site' | 'Hybrid';
export type ExperienceLevel = 'Beginner / Fresher' | 'Intermediate' | 'Advanced';

export interface Internship {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  title: string;
  department: string;
  location: string;
  workType: WorkType;
  isPaid: boolean;
  stipend: string;
  duration: string;
  experienceLevel: ExperienceLevel;
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
  deadline: string;
  postedDate: string;
  applicantsCount: number;
  status: 'active' | 'closed';
  featured?: boolean;
}

export type ApplicationStatus =
  | 'Applied'
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview Scheduled'
  | 'Selected'
  | 'Rejected';

export interface ApplicationTimelineEvent {
  status: ApplicationStatus;
  date: string;
  note: string;
}

export interface InterviewDetails {
  date: string;
  time: string;
  meetingLink: string;
  interviewer: string;
  roundName: string;
  notes?: string;
}

export interface Application {
  id: string;
  internshipId: string;
  internshipTitle: string;
  companyName: string;
  companyLogo: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentCollege: string;
  studentDegree: string;
  studentSkills: string[];
  resumeName: string;
  coverNote: string;
  appliedDate: string;
  status: ApplicationStatus;
  timeline: ApplicationTimelineEvent[];
  interviewDetails?: InterviewDetails;
}
