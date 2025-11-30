import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { mealService } from '../services/api';
import ProgressiveImage from './ProgressiveImage';
import './SearchResults.css';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
      searchMeals(query);
    }
  }, [query]);

  const searchMeals = async (searchQuery) => {
    setLoading(true);
    try {
      const data = await mealService.searchMeals(searchQuery);
      setMeals(data);
    } catch (error) {
      console.error('Error searching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMealClick = (id) => {
    navigate(`/meal/${id}`);
  };

  return (
    <div className="search-results">
      <div className="results-header">
        <h1 className="results-title">
          Search Results for <span className="query-highlight">"{query}"</span>
        </h1>
        {!loading && <p className="results-count">{meals.length} recipes found</p>}
      </div>
      
      {loading ? (
        <div className="meals-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="meal-card skeleton-card">
              <div className="skeleton skeleton-image"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
          ))}
        </div>
      ) : meals.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h2>No recipes found</h2>
          <p>Try searching with different keywords or browse our categories</p>
          <button onClick={() => navigate('/')} className="back-home-button">
            Back to Home
          </button>
        </div>
      ) : (
        <div className="meals-grid">
          {meals.map((meal, index) => (
            <div
              key={meal.id}
              className="meal-card"
              onClick={() => handleMealClick(meal.id)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProgressiveImage 
                src={meal.thumbnail} 
                alt={meal.name}
                className="meal-image"
                aspectRatio="1/1"
              />
              <div className="meal-card-content">
                <h3 className="meal-name">{meal.name}</h3>
                <div className="meal-card-arrow">→</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
