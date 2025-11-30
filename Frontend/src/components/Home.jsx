import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mealService } from '../services/api';
import './Home.css';

function Home() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await mealService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const handleRandomMeal = async () => {
    setLoading(true);
    try {
      const meal = await mealService.getRandomMeal();
      navigate(`/meal/${meal.id}`);
    } catch (error) {
      console.error('Error getting random meal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
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
    <div className="home">
      <div className="hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-badge">Culinary Excellence</div>
          <h1 className="hero-title">
            Discover Your Next
            <span className="hero-title-highlight"> Culinary Adventure</span>
          </h1>
          <p className="hero-subtitle">
            Explore thousands of delicious recipes from around the world, 
            from traditional favorites to modern cuisine
          </p>
          
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search for recipes, ingredients, or cuisine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">Search</button>
            </div>
          </form>

          <div className="hero-actions">
            <button 
              onClick={handleRandomMeal} 
              className="random-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  Finding Recipe...
                </>
              ) : (
                <>
                  <span className="button-icon">🎲</span>
                  I'm Feeling Hungry
                </>
              )}
            </button>
            <button 
              onClick={() => document.getElementById('categories').scrollIntoView({ behavior: 'smooth' })}
              className="browse-button"
            >
              Browse Categories
            </button>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Recipes</div>
          </div>
          <div className="stat">
            <div className="stat-number">14</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat">
            <div className="stat-number">50+</div>
            <div className="stat-label">Countries</div>
          </div>
        </div>
      </div>

      <div className="categories-section" id="categories">
        <div className="section-header">
          <h2 className="section-title">Explore by Category</h2>
          <p className="section-subtitle">
            Browse our curated collection of recipes organized by category
          </p>
        </div>
        
        {categoriesLoading ? (
          <div className="categories-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="category-card skeleton">
                <div className="category-icon skeleton"></div>
                <div className="skeleton-text"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div
                key={category}
                className="category-card"
                onClick={() => handleCategoryClick(category)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="category-icon">{categoryEmojis[category] || '🍽️'}</div>
                <h3 className="category-name">{category}</h3>
                <div className="category-arrow">→</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="features-section">
        <div className="feature">
          <div className="feature-icon">📖</div>
          <h3>Detailed Instructions</h3>
          <p>Step-by-step cooking instructions for every recipe</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🎥</div>
          <h3>Video Tutorials</h3>
          <p>Watch and learn with embedded video guides</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🌍</div>
          <h3>Global Cuisine</h3>
          <p>Discover dishes from cuisines around the world</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
