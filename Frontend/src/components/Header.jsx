import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const scrollToCategories = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <Link to="/" className="logo">
          <div className="logo-icon">🍽️</div>
          <div className="logo-text">
            <span className="logo-title">Recipe Explorer</span>
            <span className="logo-subtitle">Culinary Excellence</span>
          </div>
        </Link>
        <nav className="nav">
          <button 
            onClick={() => navigate('/')} 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={scrollToCategories} 
            className="nav-link"
          >
            Categories
          </button>
          
          <button 
            onClick={async () => {
              const { mealService } = await import('../services/api');
              const meal = await mealService.getRandomMeal();
              navigate(`/meal/${meal.id}`);
            }} 
            className="nav-button-primary"
          >
            Surprise Me
          </button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export default Header;
