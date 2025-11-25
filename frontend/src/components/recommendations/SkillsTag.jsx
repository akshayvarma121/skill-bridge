import React from 'react';

const tagStyle = {
  display: 'inline-block',
  backgroundColor: '#FFFFFF',
  color: '#000000',
  border: '2px solid #000000',
  borderRadius: '15px',
  padding: '6px 12px',
  margin: '4px',
  fontSize: '0.9rem',
  fontWeight: 'bold',
};

function SkillsTag({ skill }) {
  return <div style={tagStyle}>{skill}</div>;
}

export default SkillsTag;