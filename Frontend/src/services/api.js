import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const mealService = {
  // Get random meal
  getRandomMeal: async () => {
    const response = await api.get('/meals/random');
    return response.data;
  },

  // Search meals by name
  searchMeals: async (query) => {
    const response = await api.get(`/meals/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  // Get all categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get meals by category
  getMealsByCategory: async (category) => {
    const response = await api.get(`/meals/category/${category}`);
    return response.data;
  },

  // Get meal details by ID
  getMealById: async (id) => {
    const response = await api.get(`/meals/${id}`);
    return response.data;
  }
};

export default api;
