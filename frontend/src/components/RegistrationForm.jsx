import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { UserContext } from '../context/UserContext';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    education: '',
    location: '',
  });

  // 1. New state to track the registration success
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const skillsArray = formData.skills.split(',').map(skill => skill.trim());
    const userPayload = {
      name: formData.name,
      skills: skillsArray,
      education: formData.education,
      location: formData.location,
    };

    try {
      const response = await api.post('/user', userPayload);
      
      // Save the new user to the shared context
      setUser(response.data.user);
      
      // 2. Update state to show the success message and new button
      setMessage(`✅ Successfully Registered!`);
      setRegistrationSuccess(true);

    } catch (err) {
      console.error('Failed to register user:', err);
      setMessage('❌ Error: Could not register user.');
    }
  };

  const handleGetRecommendations = () => {
    navigate('/recommend');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>User Registration</h2>

      {/* 3. Conditionally render the form or the success state */}
      {!registrationSuccess ? (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Name:</label><br />
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Skills (comma-separated):</label><br />
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} required style={{ width: '100%' }} placeholder="Python, React, Marketing" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Education:</label><br />
            <input type="text" name="education" value={formData.education} onChange={handleChange} required style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Location:</label><br />
            <input type="text" name="location" value={formData.location} onChange={handleChange} required style={{ width: '100%' }} />
          </div>
          <button type="submit" style={{ padding: '10px 15px' }}>Register</button>
        </form>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={handleGetRecommendations} style={{ padding: '10px 20px', fontSize: '1.1rem' }}>
            Get Recommendations
          </button>
        </div>
      )}

      {message && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}

export default RegistrationForm;