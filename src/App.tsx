import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { ChatPage } from './components/ChatPage';
import { RoleplayPage } from './components/RoleplayPage';
import { ProgressPage } from './components/ProgressPage';
import { DailyChallengePage } from './components/DailyChallengePage';
import { SettingsPage } from './components/SettingsPage';
import { ProfilePage } from './components/ProfilePage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { LogoutModal } from './components/LogoutModal';
import { OnboardingPage } from './components/OnboardingPage';
import { ResultSummaryPage } from './components/ResultSummaryPage';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

type Page =
  | 'login'
  | 'register'
  | 'home'
  | 'chat'
  | 'roleplay'
  | 'progress'
  | 'challenge'
  | 'settings'
  | 'profile'
  | 'result-summary';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userName, setUserName] = useState('John Doe');
  const [showOnboarding, setShowOnboarding] = useState(false);

  // 🔹 Ambil nama user dari localStorage kalau sudah pernah diubah di Settings
  useEffect(() => {
    const saved = localStorage.getItem('userSettings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name && parsed.name.trim() !== '') {
          setUserName(parsed.name);
        }
      } catch (err) {
        console.error('Error parsing userSettings:', err);
      }
    }
  }, []);

  // 🔹 Update nama setiap kali user ubah Settings
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('userSettings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.name && parsed.name.trim() !== '') {
            setUserName(parsed.name);
          }
        } catch (err) {
          console.error('Error parsing updated userSettings:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Check if user has seen onboarding
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding && isAuthenticated) {
      setShowOnboarding(true);
    }
  }, [isAuthenticated]);

  const handleNavigate = (
    page:
      | 'home'
      | 'chat'
      | 'roleplay'
      | 'progress'
      | 'challenge'
      | 'settings'
      | 'profile'
  ) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
    toast.success('Welcome to Speaken.AI!');
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
    toast.success('Account created successfully! Welcome aboard!');
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    setIsAuthenticated(false);
    setCurrentPage('login');
    toast.success('You have successfully logged out. See you soon!');
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
  };

  // Show auth pages if not authenticated
  if (!isAuthenticated) {
    if (currentPage === 'register') {
      return (
        <RegisterPage
          onRegister={handleRegister}
          onNavigateToLogin={() => setCurrentPage('login')}
        />
      );
    }
    return (
      <LoginPage
        onLogin={handleLogin}
        onNavigateToRegister={() => setCurrentPage('register')}
      />
    );
  }

  // Show onboarding for first-time users
  if (isAuthenticated && showOnboarding) {
    return <OnboardingPage onComplete={handleOnboardingComplete} />;
  }

  // Show Result Summary page (without navigation)
  if (currentPage === 'result-summary') {
    return (
      <ResultSummaryPage
        onTryAgain={() => setCurrentPage('roleplay')}
        onBackToDashboard={() => setCurrentPage('home')}
      />
    );
  }

  // 🔹 Main App
  return (
    <div className="size-full">
      {/* Navigation */}
      <Navigation
        currentPage={currentPage as any}
        onNavigate={handleNavigate}
        onLogout={handleLogoutClick}
        userName={userName}
      />

      {/* Page Content */}
      <div className="h-full">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'chat' && <ChatPage />}
        {currentPage === 'roleplay' && (
          <RoleplayPage onViewResult={() => setCurrentPage('result-summary')} />
        )}
        {currentPage === 'progress' && <ProgressPage />}
        {currentPage === 'challenge' && <DailyChallengePage />}
        {currentPage === 'settings' && <SettingsPage />}
        {currentPage === 'profile' && <ProfilePage />}
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />

      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />
    </div>
  );
}
