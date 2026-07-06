import React from 'react';
import { motion } from 'motion/react';
import { Heart, Search } from 'lucide-react';
import { Restaurant } from '../types';
import RestaurantCard from './RestaurantCard';

interface FavoritesListProps {
  favorites: string[];
  restaurants: Restaurant[];
  onToggleFavorite: (id: string) => void;
  onSelectRestaurant: (id: string) => void;
  darkTheme: boolean;
  onNavigateDiscover: () => void;
}

export default function FavoritesList({
  favorites,
  restaurants,
  onToggleFavorite,
  onSelectRestaurant,
  darkTheme,
  onNavigateDiscover
}: FavoritesListProps) {
  
  // Find all restaurants that match saved favorite IDs
  const savedRestaurants = restaurants.filter(r => favorites.includes(r.id));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8 border-b border-neutral-200/10 pb-4">
        <Heart className="w-7 h-7 text-red-500 fill-current animate-pulse" />
        <div>
          <h1 className={`text-2xl font-black ${darkTheme ? 'text-white' : 'text-neutral-900'}`}>
            My Favorites
          </h1>
          <p className={`text-xs ${darkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}>
            You have saved {savedRestaurants.length} {savedRestaurants.length === 1 ? 'restaurant' : 'restaurants'} for your next culinary adventure.
          </p>
        </div>
      </div>

      {savedRestaurants.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {savedRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectRestaurant}
              darkTheme={darkTheme}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-12 text-center rounded-2xl border flex flex-col items-center justify-center space-y-5 max-w-md mx-auto ${
            darkTheme ? 'bg-neutral-900/50 border-neutral-850' : 'bg-neutral-50 border-neutral-150'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <h3 className={`font-bold text-base ${darkTheme ? 'text-neutral-100' : 'text-neutral-800'}`}>
              No favorites saved yet
            </h3>
            <p className={`text-xs ${darkTheme ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Browse through our premium selection of traditional stews, cafes, and fine dining and save them to plan your dining!
            </p>
          </div>
          <button
            onClick={onNavigateDiscover}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 ${
              darkTheme
                ? 'bg-amber-500 text-neutral-950 hover:bg-amber-400'
                : 'bg-neutral-900 text-white hover:bg-neutral-800'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Discover Restaurants</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
