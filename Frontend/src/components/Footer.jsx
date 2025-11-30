import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <div className="footer-logo-icon">🍽️</div>
            <div className="footer-logo-text">
              <h3>Recipe Explorer</h3>
              <p>Culinary Excellence</p>
            </div>
          </div>
          <p className="footer-description">
            Discover delicious recipes from around the world. 
            From traditional favorites to modern cuisine, explore 
            thousands of dishes to inspire your next meal.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><button onClick={() => navigate('/')}>Home</button></li>
            <li><button onClick={() => {
              if (window.location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                  document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}>Categories</button></li>
            <li>
              <button onClick={async () => {
                const { mealService } = await import('../services/api');
                const meal = await mealService.getRandomMeal();
                navigate(`/meal/${meal.id}`);
              }}>Random Recipe</button>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Popular Categories</h4>
          <ul className="footer-links">
            <li><button onClick={() => navigate('/category/Chicken')}>Chicken</button></li>
            <li><button onClick={() => navigate('/category/Vegetarian')}>Vegetarian</button></li>
            <li><button onClick={() => navigate('/category/Seafood')}>Seafood</button></li>
            <li><button onClick={() => navigate('/category/Dessert')}>Dessert</button></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>About</h4>
          <p className="footer-about">
            Recipe Explorer brings you curated recipes from TheMealDB, 
            making it easy to find and prepare delicious meals at home.
          </p>
          <div className="footer-social">
            <span className="social-icon">📧</span>
            <span className="social-icon">🐦</span>
            <span className="social-icon">📷</span>
            <span className="social-icon">📘</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Recipe Explorer. Powered by TheMealDB API.</p>
        <p className="footer-credits">Made with ❤️ for food lovers</p>
      </div>
    </footer>
  );
}

export default Footer;
