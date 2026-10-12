import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { ToastContainer } from './components/ToastContainer';
import { LandingPage } from './pages/LandingPage';
import { StudentLogin } from './pages/StudentLogin';
import { StudentRegister } from './pages/StudentRegister';
import { CompanyLogin } from './pages/CompanyLogin';
import { CompanyRegister } from './pages/CompanyRegister';
import { StudentDashboard } from './pages/StudentDashboard';
import { CompanyDashboard } from './pages/CompanyDashboard';

const MainContent: React.FC = () => {
  const { currentView, currentRole } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'landing':
      case 'explore':
        return <LandingPage />;
      case 'student-login':
        return <StudentLogin />;
      case 'student-register':
        return <StudentRegister />;
      case 'company-login':
        return <CompanyLogin />;
      case 'company-register':
        return <CompanyRegister />;
      case 'student-dashboard':
        return <StudentDashboard />;
      case 'company-dashboard':
        return <CompanyDashboard />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4FFF9] text-[#18332C] relative selection:bg-[#98F6D5] selection:text-[#123C32]">
      {/* Background ambient gradient glow blobs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#98F6D5]/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#E0F2FE]/25 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Floating Top Navbar */}
      <Navbar />

      {/* Dynamic Viewport */}
      <main className="animate-in fade-in duration-300">
        {renderView()}
      </main>

      {/* Global Glass Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
