import { useNavigate } from 'react-router-dom';

// This hook returns the command configuration for react-speech-recognition
export const useVoiceCommands = () => {
  const navigate = useNavigate();

  const commands = [
    {
      // Matches commands in English or Hindi
      command: ['Go to internships', 'इंटर्नशिप दिखाओ', 'इंटर्नशिप पर जाएं'],
      callback: () => navigate('/internships'),
      matchInterim: true, // For faster response
    },
    {
      command: ['Go home', 'वापस जाओ', 'होम पर जाएं'],
      callback: () => navigate('/'),
      matchInterim: true,
    },
    // Add more navigation commands here
  ];

  return { commands };
};