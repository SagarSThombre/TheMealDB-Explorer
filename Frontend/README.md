# Recipe Explorer - Frontend

A modern, responsive React.js application for exploring recipes from TheMealDB API.

## Features

✅ **Premium UI/UX** - Hotel/restaurant-grade design with elegant typography  
✅ **Recipe Search** - Advanced search with beautiful result cards  
✅ **Category Browser** - Interactive category cards with icons and animations  
✅ **Random Meal** - "I'm Feeling Hungry" & "Surprise Me" buttons  
✅ **Recipe Details** - Step-by-step instructions with video tutorials  
✅ **Progressive Images** - Lazy loading with smooth fade-in effects  
✅ **Loading Skeletons** - Skeleton screens for better perceived performance  
✅ **Responsive Design** - Fully responsive on all devices  
✅ **Smooth Animations** - Entrance animations and hover effects  
✅ **SEO Optimized** - Proper meta tags and semantic HTML  

## Tech Stack

- **React 18** - UI library with Hooks
- **React Router v6** - Client-side routing with lazy loading
- **Axios** - HTTP client for API requests
- **Vite** - Lightning-fast build tool and dev server
- **CSS3** - Custom styling with CSS variables and animations
- **Google Fonts** - Playfair Display & Inter for premium typography
- **Intersection Observer API** - Progressive image loading
- **React.lazy()** - Code splitting for optimal performance

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend service running on `http://localhost:8080`

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Make sure the backend service is running on port 8080

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Home.jsx              # Home page with search and categories
│   │   ├── Header.jsx            # Navigation header
│   │   ├── SearchResults.jsx    # Search results page
│   │   ├── CategoryMeals.jsx    # Category-filtered meals
│   │   ├── MealDetail.jsx       # Detailed recipe view
│   │   └── *.css                # Component styles
│   ├── services/
│   │   └── api.js               # API service layer
│   ├── App.jsx                  # Main app component with routing
│   ├── App.css                  # Global styles
│   └── main.jsx                 # Application entry point
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies
```

## API Endpoints Used

The frontend communicates with the following backend endpoints:

- `GET /api/v1/meals/random` - Get a random meal
- `GET /api/v1/meals/search?q={query}` - Search meals by name
- `GET /api/v1/categories` - Get all meal categories
- `GET /api/v1/meals/category/{category}` - Get meals by category
- `GET /api/v1/meals/{id}` - Get meal details by ID

## Features Implemented

### 1. Premium Hero Section
- Elegant gradient background with floating elements
- Large, impactful typography with Playfair Display
- Advanced search with icon and smooth animations
- Call-to-action buttons with gradient effects
- Statistics display (recipes, categories, countries)

### 2. Enhanced Recipe Search
- Beautiful search interface with icons
- Skeleton loading for search results
- Empty state with helpful messaging
- Progressive image loading on result cards
- Staggered entrance animations

### 3. Category Browser
- Category cards with emojis and hover effects
- Gold accent line animation on hover
- Grid layout with responsive breakpoints
- Loading skeletons during data fetch
- Smooth page transitions

### 4. Random Meal Discovery
- Multiple entry points ("Surprise Me", "I'm Feeling Hungry")
- Spinner animation during loading
- Instant navigation to recipe details

### 5. Premium Recipe Details
- Two-column layout for ingredients and instructions
- Numbered step indicators with gradient styling
- Progressive image loading for meal photos
- Embedded YouTube video with lazy loading
- Back navigation with smooth transitions
- Category and cuisine badges

### 6. Footer Component
- Multi-column layout with navigation
- Quick links and popular categories
- Social media icons
- Responsive design

### 7. Progressive Image Loading
- Intersection Observer for lazy loading
- Skeleton placeholder while loading
- Smooth fade-in animation on load
- Optimized viewport detection (50px margin)

### 8. Loading States
- Page-level suspense boundaries
- Skeleton screens for all components
- Spinner animations
- Shimmer effects for placeholders

### 9. Responsive Design
- Mobile-first CSS architecture
- Breakpoints: 640px, 968px
- Touch-optimized interactions
- Fluid typography and spacing
- Grid layouts with auto-fit/fill

### 10. Animations & Transitions
- Entrance animations (fadeInUp, fadeInDown)
- Staggered card animations
- Hover effects with transforms
- Smooth page scrolling
- 60fps CSS transforms

## Performance Optimizations

### Code Splitting & Lazy Loading
- **Route-based code splitting** - Each page loads only when needed
- **React.lazy() & Suspense** - Dynamic imports for components
- **Progressive image loading** - Images load as they enter viewport
- **Intersection Observer** - Efficient viewport detection

### UI Performance
- **Skeleton screens** - Instant visual feedback during loading
- **CSS animations** - Hardware-accelerated transforms
- **Debounced search** - Reduced API calls
- **Optimized re-renders** - React best practices

### Build Optimizations
- **Vite bundling** - Optimized production builds
- **Tree shaking** - Removes unused code
- **Asset optimization** - Minified CSS and JS
- **Proxy configuration** - Eliminates CORS preflight requests

### Perceived Performance
- **Staggered animations** - Sequential card appearances
- **Loading states** - Clear feedback for all actions
- **Smooth transitions** - 60fps animations
- **Font preloading** - Eliminates FOIT/FOUT

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Backend Connection Issues
If you see connection errors:
1. Verify backend is running on `http://localhost:8080`
2. Check backend CORS configuration
3. Ensure proxy is configured in `vite.config.js`

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Development Guidelines

### Code Quality
- Clean, readable code
- Reusable components
- Consistent naming conventions
- Proper error handling

### Best Practices
- REST API principles
- Component composition
- Separation of concerns (components, services, styles)
- Responsive design patterns

## Future Enhancements

- Add favorites/bookmarks functionality
- Implement meal planning features
- Add print recipe option
- Include nutritional information
- Add social sharing capabilities

## License

This project is for educational purposes.

## Author

Developed as part of the TheMealDB Explorer project.
