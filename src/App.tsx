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

type Page = 'login' | 'register' | 'home' | 'chat' | 'roleplay' | 'progress' | 'challenge' | 'settings' | 'profile';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userName] = useState('John Doe');
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check if user has seen onboarding
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding && isAuthenticated) {
      setShowOnboarding(true);
    }
  }, [isAuthenticated]);

  const handleNavigate = (page: 'home' | 'chat' | 'roleplay' | 'progress' | 'challenge' | 'settings' | 'profile') => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    setIsAuthenticated(false);
    setCurrentPage('login');
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

  // Show main app if authenticated
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
        {currentPage === 'roleplay' && <RoleplayPage />}
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
    </div>
  );
}
