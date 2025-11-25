import React from 'react';
import './VoiceFeedback.css'; // Make sure to create this CSS file

// Placeholder for a Microphone Icon
const MicIcon = () => <svg /* SVG code for a mic */ stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M192 448h128v32h-128v-32zm-32-128h192v-32h-192v32zm160-192h-32v-64h-64v64h-32l64 64 64-64zM256 32c-88.364 0-160 71.636-160 160 0 48.32 21.543 92.483 55.42 121.745-21.755 16.243-37.743 37.15-46.126 60.255h201.412c-8.383-23.105-24.37-44.012-46.126-60.255C394.457 284.483 416 240.32 416 192c0-88.364-71.636-160-160-160z"></path></svg>;

/**
 * Visual feedback component for voice input.
 * @param {object} props
 * @param {boolean} props.isListening - True if the microphone is actively listening.
 * @param {boolean} props.isProcessing - True if the backend is processing the input.
 * @param {boolean} props.hasError - True if an error occurred.
 * @param {function} props.onClick - Function to call when the button is clicked.
 */
function VoiceFeedback({ isListening, isProcessing, hasError, ...props }) {
  const getButtonClass = () => {
    if (isListening) return 'listening';
    if (hasError) return 'error';
    return '';
  };

  return (
    <button
      className={`mic-button ${getButtonClass()}`}
      aria-label={isListening ? 'Stop recording' : 'Start recording'}
      {...props}
    >
      {isProcessing ? <div className="spinner"></div> : <MicIcon />}
    </button>
  );
}

export default VoiceFeedback;