import React, { useState } from 'react';

function ApplyButton({ onClick }) {
  const [isActive, setIsActive] = useState(false);

  const baseStyle = {
    width: '100%',
    minHeight: '50px', // Ensures touch target is large enough
    padding: '12px',
    backgroundColor: '#FF6B35',
    color: '#FFFFFF',
    border: '2px solid #000000',
    borderRadius: '10px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'transform 0.1s ease',
  };

  const activeStyle = {
    transform: 'scale(0.98)',
  };

  const handleMouseDown = () => setIsActive(true);
  const handleMouseUp = () => setIsActive(false);

  return (
    <button
      style={isActive ? { ...baseStyle, ...activeStyle } : baseStyle}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      Apply Now
    </button>
  );
}

export default ApplyButton;