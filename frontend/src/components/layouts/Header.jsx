import React from 'react';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '../common/ThemeToggle.jsx';

function Header() {
  const { t } = useTranslation();

  return (
    <header className="app-header">
      <div className="logo">
        <img src="/assets/logo.png" alt="Skill Bridge Logo" className="logo-img light-logo" />
        <img src="/assets/logoD.png" alt="Skill Bridge Logo" className="logo-img dark-logo" />
        <span className="logo-text">Skill Bridge</span>
      </div>
      <ThemeToggle />
    </header>
  );
}

export default Header;
