import React, { useEffect } from 'react';

/**
 * Plays a spoken audio prompt to the user.
 * @param {object} props
 * @param {string} props.prompt - The text to be spoken.
 * @param {string} props.lang - The language code (e.g., 'hi-IN', 'en-US').
 */
function VoicePrompts({ prompt, lang }) {
  useEffect(() => {
    if (prompt && window.speechSynthesis) {
      // Cancel any previous utterances to prevent overlap
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(prompt);
      utterance.lang = lang;
      
      // Optional: Find a specific voice for the language if available
      const voices = window.speechSynthesis.getVoices();
      const specificVoice = voices.find(voice => voice.lang === lang);
      if (specificVoice) {
        utterance.voice = specificVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }

    // Cleanup on component unmount
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [prompt, lang]); // Reruns whenever the prompt or language changes

  return null; // This component does not render any UI
}

export default VoicePrompts;