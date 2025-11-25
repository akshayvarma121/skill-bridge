import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useVoiceCommands } from '../../hooks/useVoiceCommands';

// Styles for the main floating button
const fabStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: '#FF6B35',
  color: 'white',
  border: '2px solid #000000',
  boxShadow: '4px 4px 0px #000000',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  zIndex: 1000,
};

// Style for the language toggle button
const langToggleStyle = {
  position: 'fixed',
  bottom: '90px',
  right: '25px',
  width: '50px',
  height: '30px',
  borderRadius: '15px',
  backgroundColor: '#000000',
  color: 'white',
  border: '2px solid #ffffff',
  fontWeight: 'bold',
  cursor: 'pointer',
  zIndex: 1000,
};

const listeningStyle = {
  animation: 'pulse 1.5s infinite',
};

// Placeholder Mic Icon
const MicIcon = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M192 448h128v32h-128v-32zm-32-128h192v-32h-192v32zm160-192h-32v-64h-64v64h-32l64 64 64-64zM256 32c-88.364 0-160 71.636-160 160 0 48.32 21.543 92.483 55.42 121.745-21.755 16.243-37.743 37.15-46.126 60.255h201.412c-8.383-23.105-24.37-44.012-46.126-60.255C394.457 284.483 416 240.32 416 192c0-88.364-71.636-160-160-160z"></path></svg>;

function VoiceNavigator() {
  const { commands } = useVoiceCommands();
  // 1. Get the 'transcript' from the hook
  const { listening, transcript } = useSpeechRecognition({ commands });
  const [currentLanguage, setCurrentLanguage] = useState('en-US');

  const handleToggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      console.log(`Listening for commands in: ${currentLanguage}`);
      SpeechRecognition.startListening({ continuous: true, language: currentLanguage });
    }
  };

  const switchLanguage = () => {
    const newLang = currentLanguage === 'en-US' ? 'hi-IN' : 'en-US';
    setCurrentLanguage(newLang);
    if (listening) {
      SpeechRecognition.stopListening();
      setTimeout(() => SpeechRecognition.startListening({ continuous: true, language: newLang }), 100);
    }
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(255, 107, 53, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 107, 53, 0); }
        }
      `}</style>
      
      {/* 2. Display the live transcript when listening */}
      {listening && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          left: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '20px',
          zIndex: 1000,
        }}>
          {transcript ? `"${transcript}"` : "Listening..."}
        </div>
      )}

      <button style={langToggleStyle} onClick={switchLanguage}>
        {currentLanguage === 'en-US' ? 'EN' : 'HI'}
      </button>

      <button
        style={listening ? { ...fabStyle, ...listeningStyle } : fabStyle}
        onClick={handleToggleListening}
        aria-label="Toggle voice navigation"
      >
        <MicIcon />
      </button>
    </>
  );
}

export default VoiceNavigator;