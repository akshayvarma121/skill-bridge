import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../api/axios';
import Card from '../../components/common/Card.jsx';

function InternshipList() {
  const { t } = useTranslation();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternships = async () => {
      // Reset states on re-fetch, though not strictly needed with the dependency array change
      setLoading(true);
      setError(null);
      
      try {
        const response = await api.get('/internships');

        // --- CRITICAL FIX ---
        // Always verify that the API response is an array before setting state.
        // Sometimes an API might return an object like { "data": [...] } or an error object.
        // This check prevents the ".map is not a function" error if the API format changes.
        if (Array.isArray(response.data)) {
          setInternships(response.data);
        } else {
          // Log a warning and set an empty array to prevent a crash.
          console.warn("API did not return an array. Response:", response.data);
          setInternships([]); 
        }

      } catch (err) {
        setError(t('error_fetching_internships'));
        console.error("Failed to fetch internships:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
    // --- OPTIMIZATION ---
    // Changed dependency from [t] to []. This prevents the component from re-fetching
    // all the internships every time the language changes, which is more efficient
    // unless the internship data itself is translated by the backend.
  }, []);

  if (loading) {
    return (
      <div className="internship-container loading-state">
        <p>{t('loading_internships')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="internship-container error-state">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="internship-container">
      <h2 className="internship-title">{t('internship_listings')}</h2>
      {internships.length > 0 ? (
        <ul className="internship-list">
          {internships.map(internship => (
            // Using a more specific key if possible, but id is great.
            <li key={internship.id} className="internship-item">
              <Card>
              <h3>{internship.title}</h3>
              <p><strong>{t('company')}:</strong> {internship.company}</p>
              <p><strong>{t('location')}:</strong> {internship.location}</p>
              </Card>
           
            </li>

          ))}
        </ul>
      ) : (
        <p>{t('no_internships_found')}</p>
      )}
    </div>
  );
}

export default InternshipList;