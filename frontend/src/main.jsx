import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './i18n';
import { UserProvider } from './context/UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // Temporarily comment out or remove StrictMode for debugging
  // <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  // </React.StrictMode>,
);