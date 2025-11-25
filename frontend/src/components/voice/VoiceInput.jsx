import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import api from '../../api/axios';
import VoiceFeedback from './VoiceFeedback';
import VoicePrompts from './VoicePrompts';

function VoiceInput({ prompt, lang, onComplete }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setInputText(transcript);
  }, [transcript]);

  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      setError('');
      setInputText('');
      SpeechRecognition.startListening({ continuous: false, language: lang });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText) {
      setError("Please say or type something first.");
      return;
    }
    setIsProcessing(true);
    setError('');
    try {
      const response = await api.post('/voice-input', { text: inputText, language: lang });
      if (onComplete) {
        onComplete(response.data);
      }
    } catch (err) {
      console.error("API call failed:", err);
      setError('Sorry, there was a problem processing your request.');
    } finally {
      setIsProcessing(false);
      resetTranscript();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <div><p>Voice input is not supported by your browser.</p></div>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <VoicePrompts prompt={prompt} lang={lang} />

      {/* --- NEW: Display the prompt visually --- */}
      <h2 style={{ marginBottom: '20px', fontWeight: '500', minHeight: '50px' }}>
        {prompt}
      </h2>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <VoiceFeedback
          isListening={listening}
          isProcessing={isProcessing}
          hasError={!!error}
          onClick={handleMicClick}
          disabled={isProcessing}
        />
        <p style={{ margin: 0 }}>
          {listening ? 'Listening...' : 'Tap mic to speak'}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Your voice input will appear here..."
          style={{ width: '100%', padding: '10px', fontSize: '1rem', marginBottom: '10px' }}
        />
        <button type="submit" disabled={isProcessing || !inputText} style={{ padding: '10px 20px', width: '100%' }}>
          {isProcessing ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}

export default VoiceInput;