import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mealService } from '../services/api';
import ProgressiveImage from './ProgressiveImage';
import './CategoryMeals.css';

function CategoryMeals() {
  const { category } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadMeals();
  }, [category]);

  const loadMeals = async () => {
    setLoading(true);
    window.scrollTo(0, 0);
    try {
      const data = await mealService.getMealsByCategory(category);
      setMeals(data);
    } catch (error) {
      console.error('Error loading meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMealClick = (id) => {
    navigate(`/meal/${id}`);
  };

  const categoryEmojis = {
    'Beef': '🥩',
    'Chicken': '🍗',
    'Dessert': '🍰',
    'Lamb': '🍖',
    'Miscellaneous': '🍽️',
    'Pasta': '🍝',
    'Pork': '🥓',
    'Seafood': '🦞',
    'Side': '🥗',
    'Starter': '🥟',
    'Vegan': '🌱',
    'Vegetarian': '🥦',
    'Breakfast': '🍳',
    'Goat': '🍖'
  };

  return (
    <div className="category-meals">
      <div className="category-header">
        <div className="category-icon-large">{categoryEmojis[category] || '🍽️'}</div>
        <h1 className="category-title">{category} Recipes</h1>
        {!loading && <p className="category-count">{meals.length} delicious recipes</p>}
      </div>
      
      {loading ? (
        <div className="meals-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="meal-card skeleton-card">
              <div className="skeleton skeleton-image"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
          ))}
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

export default CategoryMeals;
