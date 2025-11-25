import React from 'react';

const spinnerStyle = {
  border: '5px solid #f3f3f3',
  borderTop: '5px solid #FF6B35',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  animation: 'spin 1s linear infinite',
};

const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function LoadingSpinner() {
  return (
    <>
      <style>{keyframes}</style>
      <div style={spinnerStyle} aria-label="Loading content"></div>
    </>
  );
}

export default LoadingSpinner;