# 🚀 Quick Start Guide

## Prerequisites
- Node.js v16+ installed
- Backend running on `http://localhost:8080`

## Installation & Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

## What to Expect

### First Load
- Beautiful hero section with animated background
- Search bar with icon
- Category browser with emoji icons
- Footer with navigation

### Performance Features
- **Instant Page Loads**: Code splitting ensures fast initial load
- **Smooth Scrolling**: Hardware-accelerated animations
- **Progressive Images**: Images fade in as they load
- **Skeleton Screens**: Instant visual feedback

### UI Highlights
- **Premium Typography**: Playfair Display + Inter fonts
- **Gold & Burgundy**: Elegant color scheme
- **Hover Effects**: Interactive cards with smooth transitions
- **Responsive**: Works perfectly on mobile and desktop

## Testing the Features

### 1. Search
- Type any ingredient or dish name
- See results with progressive image loading
- Click any card to view details

### 2. Categories
- Scroll to "Explore by Category" section
- Click any category card
- Browse meals in that category

### 3. Random Recipe
- Click "I'm Feeling Hungry" on homepage
- Or "Surprise Me" in header
- Get instant random recipe

### 4. Recipe Details
- Click any meal card
- View ingredients with checkmarks
- Read numbered instructions
- Watch embedded YouTube video

## Build for Production

```bash
npm run build
```

Creates optimized production build in `dist/` folder with:
- Minified JS/CSS
- Code splitting
- Vendor chunks
- Removed console.logs

## Preview Production Build

```bash
npm run preview
```

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Tips
- **Slow Connection?** Skeleton screens show immediately
- **Mobile?** Fully responsive with touch-optimized UI
- **Back Button**: Use browser back or in-app back navigation

---

Enjoy exploring recipes! 🍽️
