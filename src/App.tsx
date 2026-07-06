import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, SlidersHorizontal, Heart, MessageSquare, User, 
  Sparkles, Compass, Sun, Moon, MapPin, Star, RefreshCw,
  X, Info, Flame, AlertCircle, UtensilsCrossed
} from 'lucide-react';

import { Restaurant } from './types';
import { RESTAURANTS } from './data/restaurants';

// Sub-components
import RestaurantCard from './components/RestaurantCard';
import FilterSidebar from './components/FilterSidebar';
import RestaurantDetail from './components/RestaurantDetail';
import AIChatBot from './components/AIChatBot';
import UserProfile from './components/UserProfile';
import FavoritesList from './components/FavoritesList';

// Reference our custom hero image generated previously
const heroImg = '/src/assets/images/ethiopian_culinary_hero_1783348963839.jpg';

interface FilterState {
  categories: string[];
  priceLevels: ('Budget' | 'Moderate' | 'Expensive' | 'Luxury')[];
  minRating: number;
  openNow: boolean;
}

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  priceLevels: [],
  minRating: 0,
  openNow: false
};

export default function App() {
  // Navigation View State
  const [view, setView] = useState<'home' | 'chat' | 'favorites' | 'profile' | 'detail'>('home');
  const [previousView, setPreviousView] = useState<'home' | 'chat' | 'favorites' | 'profile'>('home');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);

  // Core Theme & Preferences
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  const [currentNeighborhood, setCurrentNeighborhood] = useState<string>('Bole');
  
  // Favorites storage
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('ethiopia_best_restaurants_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // AI Recommendations State
  const [aiRecommendations, setAiRecommendations] = useState<{
    recommendations: { restaurantId: string; reason: string }[];
    aiSummary: string;
  } | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Geolocation detection simulation state
  const [detectingLocation, setDetectingLocation] = useState(false);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('ethiopia_best_restaurants_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleSelectRestaurant = (id: string, fromDetail: boolean = false) => {
    if (!fromDetail) {
      // If we are navigating to details from another view, store where we came from
      setPreviousView(view === 'detail' ? previousView : (view as any));
    }
    setSelectedRestaurantId(id);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Run the AI Recommendations fetch (debounced/triggered on-demand)
  const triggerAIRecommendation = async (query: string) => {
    if (!query.trim()) return;
    setIsLoadingAI(true);
    setAiError(null);
    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      if (!res.ok) {
        throw new Error('Recommendations engine error');
      }
      const data = await res.json();
      setAiRecommendations(data);
    } catch (err) {
      console.error(err);
      setAiError('Failed to parse recommendations');
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      triggerAIRecommendation(searchQuery);
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setAiRecommendations(null);
    }
  };

  // Clear all filters & search
  const handleResetAll = () => {
    setSearchQuery('');
    setFilters(DEFAULT_FILTERS);
    setAiRecommendations(null);
  };

  // Chip recommendation click triggers
  const handleChipClick = (chip: string) => {
    if (chip === 'Near Me') {
      setDetectingLocation(true);
      setTimeout(() => {
        setDetectingLocation(false);
        setSearchQuery(`Restaurants in ${currentNeighborhood}`);
        triggerAIRecommendation(`Restaurants in ${currentNeighborhood}`);
        // Filter local state instantly to showcase location specificity
        setFilters({
          ...DEFAULT_FILTERS,
          categories: []
        });
      }, 900);
    } else if (chip === 'Top Rated') {
      setSearchQuery('Top Rated');
      triggerAIRecommendation('Top Rated');
      setFilters({
        ...DEFAULT_FILTERS,
        minRating: 4.7
      });
    } else if (chip === 'Traditional Food') {
      setSearchQuery('Traditional Ethiopian');
      triggerAIRecommendation('Traditional Ethiopian');
      setFilters({
        ...DEFAULT_FILTERS,
        categories: ['Traditional Ethiopian']
      });
    } else if (chip === 'Luxury Dining') {
      setSearchQuery('Luxury Dining');
      triggerAIRecommendation('Luxury Dining');
      setFilters({
        ...DEFAULT_FILTERS,
        priceLevels: ['Luxury']
      });
    } else if (chip === 'Open Now') {
      setFilters({
        ...filters,
        openNow: !filters.openNow
      });
    }
  };

  // Local client-side filtering logic to combine with searches
  const filteredRestaurants = RESTAURANTS.filter(restaurant => {
    // Search input keyword check (applied to name, location, description, or categories)
    if (searchQuery && searchQuery !== 'Top Rated' && searchQuery !== 'Traditional Ethiopian' && searchQuery !== 'Luxury Dining') {
      const q = searchQuery.toLowerCase();
      const matchSearch = 
        restaurant.name.toLowerCase().includes(q) ||
        restaurant.location.toLowerCase().includes(q) ||
        restaurant.categories.some(c => c.toLowerCase().includes(q)) ||
        restaurant.tags.some(t => t.toLowerCase().includes(q)) ||
        restaurant.description.toLowerCase().includes(q);
      
      if (!matchSearch) return false;
    }

    // Categories filter
    if (filters.categories.length > 0) {
      const matchCat = restaurant.categories.some(c => filters.categories.includes(c));
      if (!matchCat) return false;
    }

    // Price Levels filter
    if (filters.priceLevels.length > 0) {
      if (!filters.priceLevels.includes(restaurant.priceLevel)) return false;
    }

    // Rating filter
    if (filters.minRating > 0) {
      if (restaurant.rating < filters.minRating) return false;
    }

    // Open Now filter (mock rule: cafes are open early, bars are open late, traditional stews are open all day)
    if (filters.openNow) {
      // Simulate that Kategna, Golden Plate, and Tomoca are open now, but others might have specific schedules. 
      // All items in dataset have opening hours. Let's allow simple mockup logic or match current local hour
      const localTime = new Date();
      const currentHour = localTime.getHours();
      
      // Let's assume some are closed if current time is late, e.g. Cafe (closed past 9 PM), Traditional (closed past 11:30 PM), etc.
      // Since it is 7 AM in metadata, everything is generally waking up!
      if (restaurant.id === 'alchemist' && currentHour < 12) {
        return false; // Alchemist opens late (4 PM)
      }
    }

    return true;
  });

  // Extract all categories available across our database for FilterSidebar list
  const availableCategories = Array.from(
    new Set(RESTAURANTS.flatMap(r => r.categories))
  );

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${
      darkTheme ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900'
    }`}>
      
      {/* 1. Global Navigation Bar */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
        darkTheme ? 'bg-neutral-950/80 border-neutral-900' : 'bg-white/80 border-neutral-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => { setView('home'); handleResetAll(); }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-red-500 to-amber-300 flex items-center justify-center shadow-lg">
              <Compass className="w-5.5 h-5.5 text-neutral-950 animate-spin-slow" />
            </div>
            <div>
              <span className="font-black tracking-tight text-sm sm:text-base bg-gradient-to-r from-amber-400 via-red-500 to-amber-300 bg-clip-text text-transparent block uppercase">
                Ethiopia Best
              </span>
              <span className={`text-[10px] uppercase font-bold tracking-widest block -mt-1 ${darkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Restaurants Explorer
              </span>
            </div>
          </div>

          {/* Desktop/Tablet Navigation list */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => { setView('home'); handleResetAll(); }}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                view === 'home'
                  ? darkTheme ? 'bg-amber-500 text-neutral-950 shadow-md' : 'bg-neutral-900 text-white'
                  : darkTheme ? 'text-neutral-300 hover:bg-neutral-900' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => setView('chat')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 ${
                view === 'chat'
                  ? darkTheme ? 'bg-amber-500 text-neutral-950 shadow-md' : 'bg-neutral-900 text-white'
                  : darkTheme ? 'text-neutral-300 hover:bg-neutral-900' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Amara Chat
            </button>
            <button
              onClick={() => setView('favorites')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 ${
                view === 'favorites'
                  ? darkTheme ? 'bg-amber-500 text-neutral-950 shadow-md' : 'bg-neutral-900 text-white'
                  : darkTheme ? 'text-neutral-300 hover:bg-neutral-900' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              Favorites
              {favorites.length > 0 && (
                <span className="bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {favorites.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setView('profile')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 ${
                view === 'profile'
                  ? darkTheme ? 'bg-amber-500 text-neutral-950 shadow-md' : 'bg-neutral-900 text-white'
                  : darkTheme ? 'text-neutral-300 hover:bg-neutral-900' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Profile
            </button>
          </nav>

          {/* Theme Toggle & Mobile Menu Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkTheme(!darkTheme)}
              className={`p-2.5 rounded-xl border transition-all duration-300 ${
                darkTheme
                  ? 'border-neutral-800 text-amber-400 bg-neutral-900/60 hover:text-amber-300'
                  : 'border-neutral-200 text-neutral-600 bg-neutral-50 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
              title={darkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkTheme ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Content Body */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* A. Landing Discover View */}
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-0"
            >
              {/* Premium Hero Banner Section */}
              <div className="relative py-20 px-4 overflow-hidden border-b border-neutral-200/5">
                {/* Visual Backdrop Overlay with blur */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={heroImg}
                    alt="Ethiopian Culinary Hero"
                    className="w-full h-full object-cover opacity-35 scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
                    darkTheme ? 'from-neutral-950' : 'from-neutral-50'
                  }`} />
                  <div className={`absolute inset-0 backdrop-blur-[2px] ${
                    darkTheme ? 'bg-neutral-950/40' : 'bg-neutral-50/25'
                  }`} />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-500 border border-amber-500/25 py-1 px-3.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI-Powered Smart Search Explorer</span>
                  </motion.div>

                  <h1 className={`text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] ${
                    darkTheme ? 'text-white' : 'text-neutral-950'
                  }`}>
                    Discover the Best <br />
                    <span className="bg-gradient-to-r from-amber-400 via-red-500 to-amber-300 bg-clip-text text-transparent">
                      Restaurants in Ethiopia
                    </span>
                  </h1>

                  <p className={`text-xs sm:text-sm max-w-lg mx-auto leading-relaxed ${
                    darkTheme ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    Type what you crave (e.g. “Intimate traditional dinner with music” or “Strong coffee in Piazza”) to experience instant AI recommended results.
                  </p>

                  {/* AI Main Search Bar */}
                  <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto flex items-center gap-2 pt-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-3.5 w-5 h-5 text-neutral-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Search best restaurants in Addis Ababa..."
                        className={`w-full py-3.5 pl-12 pr-4 text-sm sm:text-base rounded-2xl border transition-all focus:outline-none focus:ring-1 ${
                          darkTheme
                            ? 'bg-neutral-900 border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:border-amber-500 focus:ring-amber-500'
                            : 'bg-white border-neutral-250 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:ring-amber-600'
                        }`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsSidebarOpen(true)}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-center gap-1.5 relative ${
                        darkTheme
                          ? 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:border-neutral-700'
                          : 'border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900'
                      }`}
                      title="Open Filters Sidebar"
                    >
                      <SlidersHorizontal className="w-5 h-5" />
                      {filters !== DEFAULT_FILTERS && (
                        <span className="absolute -top-1 -right-1 bg-amber-500 w-3 h-3 rounded-full" />
                      )}
                    </button>
                  </form>

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap justify-center gap-2 pt-3 max-w-xl mx-auto">
                    {(['Top Rated', 'Open Now', 'Traditional Food', 'Luxury Dining', 'Near Me'] as const).map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleChipClick(chip)}
                        className={`text-xs px-3.5 py-1.5 rounded-xl border font-bold transition-all flex items-center gap-1 ${
                          chip === 'Near Me'
                            ? 'border-amber-500/20 bg-amber-500/5 text-amber-400 hover:bg-amber-500/10'
                            : darkTheme
                              ? 'border-neutral-800 bg-neutral-900/40 text-neutral-300 hover:border-neutral-700 hover:text-white'
                              : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        {chip === 'Near Me' && <MapPin className="w-3 h-3" />}
                        {chip === 'Top Rated' && <Star className="w-3 h-3 text-amber-500 fill-current" />}
                        <span>{chip}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic location detector panel */}
              <AnimatePresence>
                {detectingLocation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-amber-500/10 text-amber-500 text-xs font-semibold py-3 px-4 text-center flex items-center justify-center gap-2 border-b border-amber-500/25"
                  >
                    <Compass className="w-4 h-4 animate-spin" />
                    <span>Detecting your coordinates in Addis Ababa... prioritizing nearest restaurants in {currentNeighborhood}!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Core Layout containing Filters & Main Grid */}
              <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
                {/* Filter Sidebar container */}
                <FilterSidebar
                  filters={filters}
                  onChangeFilters={setFilters}
                  onResetFilters={() => setFilters(DEFAULT_FILTERS)}
                  availableCategories={availableCategories}
                  darkTheme={darkTheme}
                  isOpen={isSidebarOpen}
                  onClose={() => setIsSidebarOpen(false)}
                />

                {/* Listing & AI recommended panel */}
                <div className="flex-1 space-y-8">
                  
                  {/* AI Smart recommended box if query is active */}
                  <AnimatePresence mode="wait">
                    {isLoadingAI ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`p-6 rounded-2xl border space-y-4 ${
                          darkTheme ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-150 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                          <h3 className="font-bold text-sm text-amber-500 animate-pulse uppercase tracking-wider">
                            Amara AI recommendations loading...
                          </h3>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 bg-neutral-800 rounded w-3/4 animate-pulse" />
                          <div className="h-4 bg-neutral-800 rounded w-1/2 animate-pulse" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="h-28 bg-neutral-800 rounded-xl animate-pulse" />
                          <div className="h-28 bg-neutral-800 rounded-xl animate-pulse" />
                        </div>
                      </motion.div>
                    ) : aiRecommendations ? (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className={`p-6 rounded-2xl border shadow-xl ${
                          darkTheme
                            ? 'bg-gradient-to-b from-neutral-900 to-neutral-950 border-amber-500/20'
                            : 'bg-gradient-to-b from-amber-50/30 to-white border-amber-500/20 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3 border-b border-amber-500/10 pb-3">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-amber-500" />
                            <h3 className="font-black text-sm uppercase tracking-wider text-amber-500">
                              Amara AI Recommended Results
                            </h3>
                          </div>
                          <button
                            onClick={() => setAiRecommendations(null)}
                            className="text-neutral-500 hover:text-neutral-300"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <p className={`text-sm font-semibold mb-4 italic leading-relaxed ${darkTheme ? 'text-neutral-200' : 'text-neutral-800'}`}>
                          "{aiRecommendations.aiSummary}"
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {aiRecommendations.recommendations.map((rec, index) => {
                            const restaurant = RESTAURANTS.find(r => r.id === rec.restaurantId);
                            if (!restaurant) return null;
                            return (
                              <div
                                key={index}
                                onClick={() => handleSelectRestaurant(restaurant.id)}
                                className={`p-4 rounded-xl border cursor-pointer group transition-all duration-300 flex gap-3 ${
                                  darkTheme
                                    ? 'bg-neutral-950 border-neutral-800 hover:border-amber-500 hover:bg-neutral-900'
                                    : 'bg-white border-neutral-200 hover:border-amber-600 hover:shadow-sm'
                                }`}
                              >
                                <img
                                  src={restaurant.image}
                                  alt={restaurant.name}
                                  className="w-14 h-14 rounded-lg object-cover shrink-0"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5">
                                  <div className="flex items-center justify-between gap-1">
                                    <h4 className={`text-xs font-extrabold truncate ${darkTheme ? 'text-neutral-100 group-hover:text-amber-400' : 'text-neutral-800 group-hover:text-amber-600'}`}>
                                      {restaurant.name}
                                    </h4>
                                    <div className="flex items-center text-amber-500 shrink-0">
                                      <Star className="w-3 h-3 fill-current" />
                                      <span className="text-[10px] font-bold ml-0.5">{restaurant.rating}</span>
                                    </div>
                                  </div>
                                  <p className={`text-[11px] leading-relaxed line-clamp-2 ${darkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}>
                                    {rec.reason}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  {/* Header Title for matches count */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className={`font-black text-xl ${darkTheme ? 'text-white' : 'text-neutral-900'}`}>
                        {searchQuery ? `Search Results for "${searchQuery}"` : 'Curated Restaurants'}
                      </h2>
                      <p className={`text-xs ${darkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        Found {filteredRestaurants.length} matching restaurants in Addis Ababa
                      </p>
                    </div>
                    {filteredRestaurants.length < RESTAURANTS.length && (
                      <button
                        onClick={handleResetAll}
                        className={`text-xs flex items-center gap-1 hover:text-amber-500 transition-colors ${
                          darkTheme ? 'text-neutral-400' : 'text-neutral-500'
                        }`}
                      >
                        <RefreshCw className="w-3 h-3" />
                        Clear Searches
                      </button>
                    )}
                  </div>

                  {/* Main Grid mapping filtered cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRestaurants.map((res) => (
                      <RestaurantCard
                        key={res.id}
                        restaurant={res}
                        isFavorite={favorites.includes(res.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onSelect={(id) => handleSelectRestaurant(id)}
                        darkTheme={darkTheme}
                      />
                    ))}
                  </div>

                  {/* Empty state if search returned nothing */}
                  {filteredRestaurants.length === 0 && (
                    <div className={`p-12 rounded-2xl border text-center max-w-md mx-auto space-y-4 ${
                      darkTheme ? 'bg-neutral-900/30 border-neutral-850' : 'bg-neutral-50 border-neutral-150'
                    }`}>
                      <UtensilsCrossed className="w-12 h-12 text-amber-500 mx-auto" />
                      <div className="space-y-1">
                        <h3 className={`font-bold text-base ${darkTheme ? 'text-neutral-200' : 'text-neutral-800'}`}>
                          No restaurants match your filters
                        </h3>
                        <p className={`text-xs ${darkTheme ? 'text-neutral-500' : 'text-neutral-400'}`}>
                          Try resetting filters or clear your search to browse our standard curated database.
                        </p>
                      </div>
                      <button
                        onClick={handleResetAll}
                        className="px-4 py-2 bg-amber-500 text-neutral-950 font-semibold text-xs rounded-xl hover:bg-amber-400 transition-all"
                      >
                        Reset All Explorer Search
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* B. Full Detail View */}
          {view === 'detail' && selectedRestaurantId && (
            <RestaurantDetail
              restaurant={RESTAURANTS.find(r => r.id === selectedRestaurantId)!}
              isFavorite={favorites.includes(selectedRestaurantId)}
              onToggleFavorite={handleToggleFavorite}
              onBack={() => setView(previousView)}
              onSelectRestaurant={(id) => handleSelectRestaurant(id, true)}
              darkTheme={darkTheme}
            />
          )}

          {/* C. Dedicated AI Chat View */}
          {view === 'chat' && (
            <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-140px)] flex flex-col">
              <div className="mb-4">
                <h1 className={`text-2xl font-black ${darkTheme ? 'text-white' : 'text-neutral-900'}`}>
                  Amara Dining Concierge
                </h1>
                <p className={`text-xs ${darkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Experience full-conversational AI dining recommendations grounded directly with local stews, cafes, and shows.
                </p>
              </div>
              <div className="flex-1 min-h-0">
                <AIChatBot
                  darkTheme={darkTheme}
                  onSelectRestaurant={(id) => handleSelectRestaurant(id)}
                  embedded={true}
                />
              </div>
            </div>
          )}

          {/* D. Saved Favorites view */}
          {view === 'favorites' && (
            <FavoritesList
              favorites={favorites}
              restaurants={RESTAURANTS}
              onToggleFavorite={handleToggleFavorite}
              onSelectRestaurant={(id) => handleSelectRestaurant(id)}
              darkTheme={darkTheme}
              onNavigateDiscover={() => setView('home')}
            />
          )}

          {/* E. Profile & Geolocation preferences view */}
          {view === 'profile' && (
            <UserProfile
              darkTheme={darkTheme}
              currentNeighborhood={currentNeighborhood}
              onChangeNeighborhood={setCurrentNeighborhood}
              favoritesCount={favorites.length}
            />
          )}

        </AnimatePresence>
      </main>

      {/* Floating AI Bubble overlay when view is NOT chat, so they can trigger chat anytime! */}
      {view !== 'chat' && view !== 'detail' && (
        <div className="hidden md:block">
          <AIChatBot
            darkTheme={darkTheme}
            onSelectRestaurant={(id) => handleSelectRestaurant(id)}
          />
        </div>
      )}

      {/* 3. Mobile Sticky Bottom Navigation Rail */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t flex items-center justify-around h-16 backdrop-blur-md transition-colors duration-300 ${
        darkTheme ? 'bg-neutral-950/95 border-neutral-900 text-neutral-400' : 'bg-white/95 border-neutral-200 text-neutral-600'
      }`}>
        <button
          onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center gap-1.5 flex-1 h-full transition-all ${
            view === 'home' ? 'text-amber-500 font-extrabold scale-105' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Explorer</span>
        </button>

        <button
          onClick={() => { setView('chat'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center gap-1.5 flex-1 h-full transition-all ${
            view === 'chat' ? 'text-amber-500 font-extrabold scale-105' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px]">AI Chat</span>
        </button>

        <button
          onClick={() => { setView('favorites'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center gap-1.5 flex-1 h-full transition-all relative ${
            view === 'favorites' ? 'text-amber-500 font-extrabold scale-105' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px]">Favorites</span>
          {favorites.length > 0 && (
            <span className="absolute top-2 right-6 bg-red-500 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </button>

        <button
          onClick={() => { setView('profile'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center gap-1.5 flex-1 h-full transition-all ${
            view === 'profile' ? 'text-amber-500 font-extrabold scale-105' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Profile</span>
        </button>
      </div>
    </div>
  );
}
