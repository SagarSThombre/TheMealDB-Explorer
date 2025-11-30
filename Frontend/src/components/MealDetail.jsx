import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mealService } from '../services/api';
import ProgressiveImage from './ProgressiveImage';
import './MealDetail.css';

function MealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMeal();
  }, [id]);

  const loadMeal = async () => {
    setLoading(true);
    setError(null);
    window.scrollTo(0, 0);
    try {
      const data = await mealService.getMealById(id);
      setMeal(data);
    } catch (err) {
      console.error('Error loading meal:', err);
      setError('Failed to load meal details');
    } finally {
      setLoading(false);
    }
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (loading) {
    return (
      <div className="meal-detail">
        <div className="meal-detail-skeleton">
          <div className="skeleton skeleton-header"></div>
          <div className="skeleton skeleton-content"></div>
          <div className="skeleton skeleton-content"></div>
        </div>
      </div>
    );
  }

  if (error || !meal) {
    return (
      <div className="meal-detail">
        <div className="error-container">
          <div className="error-icon">😞</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error || 'Meal not found'}</p>
          <button onClick={() => navigate('/')} className="back-button">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="meal-detail">
      <button onClick={() => navigate(-1)} className="back-nav">
        ← Back
      </button>

      <div className="meal-header">
        <div className="meal-image-wrapper">
          <ProgressiveImage 
            src={meal.thumbnail} 
            alt={meal.name}
            className="meal-image"
            aspectRatio="4/3"
          />
        </div>
        <div className="meal-info">
          <div className="meal-badges">
            <span className="badge badge-category">{meal.category}</span>
            <span className="badge badge-area">{meal.area}</span>
          </div>
          <h1 className="meal-title">{meal.name}</h1>
          <p className="meal-description">
            A delicious {meal.area} {meal.category.toLowerCase()} recipe with authentic flavors
          </p>
        </div>
      </div>

      <div className="meal-content">
        <div className="content-grid">
          <div className="ingredients-section">
            <h2 className="section-heading">
              <span className="heading-icon">🥘</span>
              Ingredients
            </h2>
            <ul className="ingredients-list">
              {meal.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  <span className="ingredient-check">✓</span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="instructions-section">
            <h2 className="section-heading">
              <span className="heading-icon">👨‍🍳</span>
              Instructions
            </h2>
            <div className="instructions">
              {meal.instructions.split('\r\n').map((step, index) => {
                if (!step.trim()) return null;
                const isStepNumber = step.toLowerCase().startsWith('step');
                return (
                  <div key={index} className={isStepNumber ? 'instruction-step' : 'instruction-text'}>
                    {isStepNumber ? (
                      <div className="step-number">{step.match(/\d+/)?.[0] || index + 1}</div>
                    ) : null}
                    <p>{isStepNumber ? step.replace(/step \d+/i, '').trim() : step}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {meal.youtube && (
          <div className="video-section">
            <h2 className="section-heading">
              <span className="heading-icon">🎥</span>
              Video Tutorial
            </h2>
            <div className="video-container">
              <iframe
                src={getYoutubeEmbedUrl(meal.youtube)}
                title={meal.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MealDetail;
