import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import VoiceInput from '../../components/voice/VoiceInput';
import api from '../../api/axios';
import { UserContext } from '../../context/UserContext';

const prompts = {
  name: {
    en: 'First, what is your name?',
    hi: 'सबसे पहले, आपका नाम क्या है?',
    ta: 'முதலில், உங்கள் பெயர் என்ன?',
  },
  skills: {
    en: 'Great! What are some of your skills? Please say them separated by "and".',
    hi: 'बहुत अच्छे। आपके कुछ कौशल क्या हैं? कृपया उन्हें "और" से अलग करके कहें।',
    ta: 'அருமை. உங்கள் திறமைகள் சில யாவை? தயவுசெய்து அவற்றை "மற்றும்" என்று பிரித்துச் சொல்லுங்கள்.',
  },
  education: {
    en: 'Got it. Now, what is your highest education qualification?',
    hi: 'समझ गया। अब, आपकी उच्चतम शैक्षणिक योग्यता क्या है?',
    ta: 'புரிந்தது. இப்பொழுது, உங்கள் உயர்ந்த கல்வித் தகுதி என்ன?',
  },
  location: {
    en: 'Almost done! What is your current location?',
    hi: 'लगभग हो गया। आपका वर्तमान स्थान क्या है?',
    ta: 'கிட்டத்தட்ட முடிந்தது. உங்கள் தற்போதைய இடம் என்ன?',
  },
};

function OnboardingScreen() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [currentStep, setCurrentStep] = useState('language_select');
  const [userData, setUserData] = useState({
    name: '',
    skills: [],
    education: '',
    location: '',
  });
  const [prompt, setPrompt] = useState('');
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleLanguageSelect = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentStep('name');
    setPrompt(prompts.name[lng]);
  };
  
  const registerUserInDb = async (finalUserData) => {
    try {
      const response = await api.post('/user', finalUserData);
      console.log('User successfully registered:', response.data);
      setUser(response.data.user);
      setRegistrationComplete(true);
    } catch (err) {
      console.error('Failed to register user:', err);
    }
  };

  const handleVoiceDataCollected = (backendResponse) => {
    const collectedText = backendResponse.processedText;
    let nextStep = '';
    let newUserData = { ...userData };

    switch (currentStep) {
      case 'name':
        newUserData.name = collectedText;
        nextStep = 'skills';
        setPrompt(prompts.skills[i18n.language]);
        break;
      case 'skills':
        const skillsArray = collectedText.split(/and|और|மற்றும்/i).map(skill => skill.trim());
        newUserData.skills = skillsArray;
        nextStep = 'education';
        setPrompt(prompts.education[i18n.language]);
        break;
      case 'education':
        newUserData.education = collectedText;
        nextStep = 'location';
        setPrompt(prompts.location[i18n.language]);
        break;
      case 'location':
        newUserData.location = collectedText;
        nextStep = 'done';
        break;
      default:
        return;
    }
    
    setUserData(newUserData);
    setCurrentStep(nextStep);

    if (nextStep === 'done') {
      registerUserInDb(newUserData);
    }
  };

  const handleGetRecommendations = () => {
    navigate('/recommend');
  };

  return (
    <div className="onboarding-container">
      <img src="/assets/logo.png" alt="Skill Bridge Logo" className="onboarding-logo light-logo" />
      <img src="/assets/logoD.png" alt="Skill Bridge Logo" className="onboarding-logo dark-logo" />

      <h1 className="onboarding-title">{t('welcome_message')}</h1>

      {currentStep === 'language_select' ? (
        <>
          <p className="onboarding-text">{t('select_language')}</p>
          <div className="language-buttons">
            <button className="language-button" onClick={() => handleLanguageSelect('en')}>
                English
            </button>
            <button className="language-button" onClick={() => handleLanguageSelect('hi')}>
                हिन्दी
            </button>
            <button className="language-button" onClick={() => handleLanguageSelect('ta')}>
                தமிழ்
            </button>
          </div>
        </>
      ) : (
        <div className="voice-interaction-section">
          {!registrationComplete ? (
            <VoiceInput
              prompt={prompt}
              lang={i18n.language === 'en' ? 'en-US' : i18n.language + '-IN'}
              onComplete={handleVoiceDataCollected}
              key={currentStep}
            />
          ) : (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <p style={{ fontWeight: 'bold', fontSize: '1.3rem', color: 'var(--accent-blue)', marginBottom: '20px' }}>
                ✅ Registration Complete!
              </p>
              <button 
                className="button-primary"
                onClick={handleGetRecommendations}
              >
                Get Recommendations
              </button>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <p style={{ fontSize: '1.05rem', color: 'var(--primary-color)' }}>
          Prefer to type?{' '}
          <Link 
            to="/register" 
            style={{ 
              color: 'var(--accent-blue)', 
              textDecoration: 'underline',
              fontWeight: '600'
            }}
          >
            Register with the form instead.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default OnboardingScreen;
