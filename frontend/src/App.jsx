import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import OnboardingScreen from './features/onboarding/OnboardingScreen.jsx';
import InternshipList from './features/internships/InternshipList.jsx';
import RecommendationList from './features/recommendations/RecommendationList.jsx';
import Header from './components/layouts/Header.jsx';
import Footer from './components/layouts/Footer.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';
import VoiceNavigator from './components/voice/VoiceNavigator.jsx';
import './styles/global.css';

// Create a new component to contain the application logic and conditional rendering
function AppContent() {
  const location = useLocation(); // Get the current URL location
  const { t } = useTranslation();

  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<OnboardingScreen />} />
          <Route path="/internships" element={<InternshipList />} />
          <Route path="/recommend" element={<RecommendationList />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </main>
      <Footer />
      
      {/* Only show the VoiceNavigator if we are NOT on the homepage */}
      {location.pathname !== '/' && <VoiceNavigator />}
    </div>
  );
}

// Your main App component now just sets up the router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;