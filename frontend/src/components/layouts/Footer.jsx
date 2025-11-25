import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="app-footer">
      <p>
        &copy; 2025 Skill Bridge Internship Organizer | 
        <span style={{ color: 'var(--secondary-color)', fontWeight: '600', marginLeft: '8px' }}>
          Connecting Potential. Building Futures.
        </span>
      </p>
    </footer>
  );
}

export default Footer;
