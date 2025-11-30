import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

// Lazy load route components for better performance
const Home = lazy(() => import('./components/Home'));
const SearchResults = lazy(() => import('./components/SearchResults'));
const CategoryMeals = lazy(() => import('./components/CategoryMeals'));
const MealDetail = lazy(() => import('./components/MealDetail'));

// Loading component
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
    <p>Loading delicious content...</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/category/:category" element={<CategoryMeals />} />
              <Route path="/meal/:id" element={<MealDetail />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
