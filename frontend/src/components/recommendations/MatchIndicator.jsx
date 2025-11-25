import React from 'react';

const containerStyle = {
  width: '100%',
  backgroundColor: '#FFFFFF',
  border: '2px solid #000000',
  borderRadius: '20px',
  overflow: 'hidden',
  margin: '10px 0',
};

const labelStyle = {
  fontWeight: 'bold',
  color: '#000000',
  marginBottom: '5px',
  textAlign: 'left',
};

function MatchIndicator({ percentage }) {
  const fillerStyle = {
    height: '25px',
    width: `${percentage}%`,
    backgroundColor: '#FF6B35',
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 0.5s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  };

  const percentageTextStyle = {
    padding: '0 10px',
    color: percentage > 40 ? '#FFFFFF' : '#000000',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  };

  return (
    <div>
      <div style={labelStyle}>Match Score</div>
      <div style={containerStyle}>
        <div style={fillerStyle}>
          <span style={percentageTextStyle}>{`${percentage}%`}</span>
        </div>
      </div>
    </div>
  );
}

export default MatchIndicator;