import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  CompanyProfile,
  Internship,
  Application,
  ApplicationStatus,
  InterviewDetails
} from '../types';
import {
  INITIAL_STUDENT,
  INITIAL_COMPANY,
  INITIAL_INTERNSHIPS,
  INITIAL_APPLICATIONS
} from '../data/mockData';

export type CurrentView =
  | 'landing'
  | 'explore'
  | 'student-login'
  | 'student-register'
  | 'company-login'
  | 'company-register'
  | 'student-dashboard'
  | 'company-dashboard';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentUser: StudentProfile | CompanyProfile | null;
  currentRole: 'student' | 'company' | null;
  currentView: CurrentView;
  setCurrentView: (view: CurrentView) => void;
  internships: Internship[];
  applications: Application[];
  savedInternshipIds: string[];
  activeStudentTab: string;
  setActiveStudentTab: (tab: string) => void;
  activeCompanyTab: string;
  setActiveCompanyTab: (tab: string) => void;
  selectedInternshipForModal: Internship | null;
  setSelectedInternshipForModal: (internship: Internship | null) => void;
  
  // Auth methods
  loginStudent: (email: string, password?: string) => boolean;
  registerStudent: (data: Partial<StudentProfile>) => void;
  loginCompany: (email: string, password?: string) => boolean;
  registerCompany: (data: Partial<CompanyProfile>) => void;
  loginDemoStudent: () => void;
  loginDemoCompany: () => void;
  logout: () => void;
  
  // Actions
  applyToInternship: (internshipId: string, coverNote: string, resumeName?: string) => boolean;
  toggleSaveInternship: (internshipId: string) => void;
  updateApplicationStatus: (
    appId: string,
    newStatus: ApplicationStatus,
    note?: string,
    interviewDetails?: InterviewDetails
  ) => void;
  postInternship: (newInternship: Omit<Internship, 'id' | 'postedDate' | 'applicantsCount' | 'status'>) => void;
  toggleInternshipStatus: (internshipId: string) => void;
  updateStudentProfile: (profile: Partial<StudentProfile>) => void;
  updateCompanyProfile: (profile: Partial<CompanyProfile>) => void;
  
  // Toasts
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'internleaf_user_v1',
  INTERNSHIPS: 'internleaf_internships_v1',
  APPLICATIONS: 'internleaf_applications_v1',
  SAVED: 'internleaf_saved_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<StudentProfile | CompanyProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : INITIAL_STUDENT;
    } catch {
      return INITIAL_STUDENT;
    }
  });

  const [currentView, setCurrentView] = useState<CurrentView>('landing');
  const [activeStudentTab, setActiveStudentTab] = useState<string>('overview');
  const [activeCompanyTab, setActiveCompanyTab] = useState<string>('overview');
  const [selectedInternshipForModal, setSelectedInternshipForModal] = useState<Internship | null>(null);

  const [internships, setInternships] = useState<Internship[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INTERNSHIPS);
      return saved ? JSON.parse(saved) : INITIAL_INTERNSHIPS;
    } catch {
      return INITIAL_INTERNSHIPS;
    }
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  const [savedInternshipIds, setSavedInternshipIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED);
      return saved ? JSON.parse(saved) : ['int_01', 'int_02'];
    } catch {
      return ['int_01', 'int_02'];
    }
  });

  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INTERNSHIPS, JSON.stringify(internships));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [internships]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedInternshipIds));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [savedInternshipIds]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const currentRole = currentUser?.role || null;

  // Student auth
  const loginStudent = (email: string) => {
    if (!email.trim()) {
      showToast('Please enter a valid email address', 'error');
      return false;
    }
    const studentUser: StudentProfile = {
      ...INITIAL_STUDENT,
      email: email.trim(),
      name: email.split('@')[0].replace('.', ' ')
    };
    setCurrentUser(studentUser);
    setCurrentView('student-dashboard');
    showToast(`Welcome back, ${studentUser.name}!`, 'success');
    return true;
  };

  const registerStudent = (data: Partial<StudentProfile>) => {
    const newStudent: StudentProfile = {
      ...INITIAL_STUDENT,
      ...data,
      id: `std_${Date.now()}`,
      role: 'student'
    };
    setCurrentUser(newStudent);
    setCurrentView('student-dashboard');
    showToast(`Account created! Welcome to Internleaf, ${newStudent.name}.`, 'success');
  };

  // Company auth
  const loginCompany = (email: string) => {
    if (!email.trim()) {
      showToast('Please enter an official company email', 'error');
      return false;
    }
    const companyUser: CompanyProfile = {
      ...INITIAL_COMPANY,
      email: email.trim()
    };
    setCurrentUser(companyUser);
    setCurrentView('company-dashboard');
    showToast(`Welcome back, ${companyUser.companyName}!`, 'success');
    return true;
  };

  const registerCompany = (data: Partial<CompanyProfile>) => {
    const newCompany: CompanyProfile = {
      ...INITIAL_COMPANY,
      ...data,
      id: `comp_${Date.now()}`,
      role: 'company',
      verified: true
    };
    setCurrentUser(newCompany);
    setCurrentView('company-dashboard');
    showToast(`Company profile registered! Welcome, ${newCompany.companyName}.`, 'success');
  };

  const loginDemoStudent = () => {
    setCurrentUser(INITIAL_STUDENT);
    setCurrentView('student-dashboard');
    showToast('Signed in as Demo Student (Alex Chen)', 'success');
  };

  const loginDemoCompany = () => {
    setCurrentUser(INITIAL_COMPANY);
    setCurrentView('company-dashboard');
    showToast('Signed in as Demo Recruiter (QuantumPay Technologies)', 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
    showToast('You have been signed out.', 'info');
  };

  // Applications
  const applyToInternship = (internshipId: string, coverNote: string, resumeName?: string) => {
    const job = internships.find((i) => i.id === internshipId);
    if (!job) {
      showToast('Internship listing not found', 'error');
      return false;
    }

    const student = currentUser?.role === 'student' ? (currentUser as StudentProfile) : INITIAL_STUDENT;

    // Check if already applied
    const alreadyApplied = applications.some(
      (a) => a.internshipId === internshipId && a.studentId === student.id
    );
    if (alreadyApplied) {
      showToast('You have already applied to this internship!', 'info');
      return false;
    }

    const todayStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newApp: Application = {
      id: `app_${Date.now()}`,
      internshipId: job.id,
      internshipTitle: job.title,
      companyName: job.companyName,
      companyLogo: job.companyLogo,
      studentId: student.id,
      studentName: student.name,
      studentEmail: student.email,
      studentCollege: student.college,
      studentDegree: `${student.degree} in ${student.department} (${student.gradYear})`,
      studentSkills: student.skills,
      resumeName: resumeName || student.resumeName || 'Default_Resume.pdf',
      coverNote,
      appliedDate: todayStr,
      status: 'Applied',
      timeline: [
        {
          status: 'Applied',
          date: todayStr,
          note: 'Application submitted successfully with candidate credentials and resume.'
        }
      ]
    };

    setApplications((prev) => [newApp, ...prev]);

    // increment applicantsCount
    setInternships((prev) =>
      prev.map((i) => (i.id === internshipId ? { ...i, applicantsCount: i.applicantsCount + 1 } : i))
    );

    showToast(`Successfully applied to ${job.title} at ${job.companyName}!`, 'success');
    return true;
  };

  const toggleSaveInternship = (internshipId: string) => {
    setSavedInternshipIds((prev) => {
      const isSaved = prev.includes(internshipId);
      if (isSaved) {
        showToast('Removed internship from bookmarks', 'info');
        return prev.filter((id) => id !== internshipId);
      } else {
        showToast('Saved internship to your bookmarks', 'success');
        return [...prev, internshipId];
      }
    });
  };

  const updateApplicationStatus = (
    appId: string,
    newStatus: ApplicationStatus,
    note?: string,
    interviewDetails?: InterviewDetails
  ) => {
    const todayStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;

        const defaultNotes: Record<ApplicationStatus, string> = {
          Applied: 'Application submitted.',
          'Under Review': 'Recruitment team started comprehensive portfolio review.',
          Shortlisted: 'Candidate profile shortlisted for direct interview rounds.',
          'Interview Scheduled': `Interview arranged for ${interviewDetails?.date || 'upcoming date'}.`,
          Selected: 'Official Internship Offer extended to candidate!',
          Rejected: 'Application was not selected for this cycle.'
        };

        const updatedTimeline = [
          ...app.timeline,
          {
            status: newStatus,
            date: todayStr,
            note: note || defaultNotes[newStatus]
          }
        ];

        return {
          ...app,
          status: newStatus,
          timeline: updatedTimeline,
          interviewDetails: interviewDetails || app.interviewDetails
        };
      })
    );

    showToast(`Application status updated to "${newStatus}"`, 'success');
  };

  const postInternship = (newInternship: Omit<Internship, 'id' | 'postedDate' | 'applicantsCount' | 'status'>) => {
    const todayStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const created: Internship = {
      ...newInternship,
      id: `int_${Date.now()}`,
      postedDate: todayStr,
      applicantsCount: 0,
      status: 'active'
    };

    setInternships((prev) => [created, ...prev]);
    showToast(`New internship posting "${created.title}" is now live!`, 'success');
  };

  const toggleInternshipStatus = (internshipId: string) => {
    setInternships((prev) =>
      prev.map((i) => {
        if (i.id !== internshipId) return i;
        const newStatus = i.status === 'active' ? 'closed' : 'active';
        showToast(`Listing marked as ${newStatus}`, 'info');
        return { ...i, status: newStatus };
      })
    );
  };

  const updateStudentProfile = (profile: Partial<StudentProfile>) => {
    setCurrentUser((prev) => {
      if (!prev || prev.role !== 'student') return prev;
      const updated = { ...prev, ...profile };
      return updated as StudentProfile;
    });
    showToast('Student profile updated successfully', 'success');
  };

  const updateCompanyProfile = (profile: Partial<CompanyProfile>) => {
    setCurrentUser((prev) => {
      if (!prev || prev.role !== 'company') return prev;
      const updated = { ...prev, ...profile };
      return updated as CompanyProfile;
    });
    showToast('Company profile updated successfully', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        currentView,
        setCurrentView,
        internships,
        applications,
        savedInternshipIds,
        activeStudentTab,
        setActiveStudentTab,
        activeCompanyTab,
        setActiveCompanyTab,
        selectedInternshipForModal,
        setSelectedInternshipForModal,
        loginStudent,
        registerStudent,
        loginCompany,
        registerCompany,
        loginDemoStudent,
        loginDemoCompany,
        logout,
        applyToInternship,
        toggleSaveInternship,
        updateApplicationStatus,
        postInternship,
        toggleInternshipStatus,
        updateStudentProfile,
        updateCompanyProfile,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
