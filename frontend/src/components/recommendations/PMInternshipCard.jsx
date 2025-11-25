import React from 'react';
import MatchIndicator from './MatchIndicator';
import SkillsTag from './SkillsTag';
import ApplyButton from './ApplyButton';

const cardStyle = {
  backgroundColor: '#FFFFFF',
  border: '3px solid #000000',
  borderRadius: '15px',
  padding: '20px',
  margin: '16px',
  boxShadow: '8px 8px 0px #000000',
  fontFamily: 'sans-serif',
  maxWidth: '400px',
};

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#000000',
  margin: '0 0 10px 0',
};

const infoStyle = {
  fontSize: '1rem',
  color: '#000000',
  margin: '4px 0',
};

const skillsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  margin: '15px 0',
};

function PMInternshipCard({ internship }) {
  const { title, skills_required, match_percentage, location, stipend } = internship;

  const handleApply = () => {
    // In a real app, this would redirect to a PM portal URL
    console.log(`Applying for: ${title}`);
    alert(`Redirecting to apply for ${title}...`);
  };

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>{title}</h3>
      <p style={infoStyle}><strong>Location:</strong> {location}</p>
      <p style={infoStyle}><strong>Stipend:</strong> ₹{stipend}/month</p>
      
      <MatchIndicator percentage={match_percentage} />
      
      <div style={skillsContainerStyle}>
        {skills_required.map((skill, index) => (
          <SkillsTag key={index} skill={skill} />
        ))}
      </div>
      
      <ApplyButton onClick={handleApply} />
    </div>
  );
}

export default PMInternshipCard;