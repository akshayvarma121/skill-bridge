import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../context/UserContext';
import api from '../../api/axios';
import PMInternshipCard from '../../components/recommendations/PMInternshipCard'; // 1. Import the new card component

// --- New styles for the container and skeleton loading ---
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  width: '100%',
};

const skeletonCardStyle = {
  backgroundColor: '#e0e0e0',
  border: '3px solid #a0a0a0',
  borderRadius: '15px',
  padding: '20px',
  margin: '16px',
  width: 'calc(100% - 32px)',
  maxWidth: '400px',
  height: '350px',
  opacity: '0.5',
};

function RecommendationList() {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        // The backend expects a full UserProfile object, so send the entire 'user' object from context.
        const response = await api.post('/recommend', user);
        setRecommendations(response.data);
      } catch (err) {
        console.error("Failed to fetch recommendations:", err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
}, [user]);

  if (loading) {
    // 2. Use a skeleton loader for better perceived performance
    return (
      <div style={containerStyle}>
        <div style={skeletonCardStyle}></div>
        <div style={skeletonCardStyle}></div>
      </div>
    );
  }

  if (!user) {
    return <div>Please complete onboarding to see recommendations.</div>;
  }

  return (
    <div style={containerStyle}>
      <h2>{t('personalized_recommendations_for', { name: user.name })}</h2>
      
      {recommendations.length > 0 ? (
        // 3. Map over the data and render the new PMInternshipCard component
        recommendations.map(internship => (
          <PMInternshipCard key={internship._id} internship={internship} />
        ))
      ) : (
        <p>{t('no_recommendations_found')}</p>
      )}
    </div>
  );
}

export default RecommendationList;