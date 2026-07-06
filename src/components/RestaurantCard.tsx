import React from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Heart, ExternalLink, Flame, DollarSign, Compass } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (id: string) => void;
  darkTheme: boolean;
  key?: React.Key;
}

export default function RestaurantCard({
  restaurant,
  isFavorite,
  onToggleFavorite,
  onSelect,
  darkTheme
}: RestaurantCardProps) {
  // Translate priceLevel to symbols
  const renderPriceLevel = (level: string) => {
    switch (level) {
      case 'Budget': return '$';
      case 'Moderate': return '$$';
      case 'Expensive': return '$$$';
      case 'Luxury': return '$$$$';
      default: return '$$';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`group flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-300 ${
        darkTheme
          ? 'bg-neutral-900 border-neutral-800 hover:border-amber-500/50 shadow-lg hover:shadow-amber-500/5'
          : 'bg-white border-neutral-100 hover:border-amber-600/30 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Image & Favorite Toggle */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        
        {/* Price level tag */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-0.5">
          <span className="text-amber-400">{renderPriceLevel(restaurant.priceLevel)}</span>
          <span className="opacity-60 text-[10px] ml-1">{restaurant.priceLevel}</span>
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(restaurant.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-md ${
            isFavorite
              ? 'bg-red-500 text-white border-red-500 hover:scale-110'
              : 'bg-black/40 text-white hover:bg-black/60 border border-white/10 hover:scale-110'
          }`}
          aria-label="Save to favorites"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Location tag on bottom left */}
        <div className="absolute bottom-3 left-3 bg-neutral-900/85 backdrop-blur-sm text-neutral-100 text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-amber-500" />
          <span>{restaurant.location}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Rating and Reviews count */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className={`text-sm font-bold ${darkTheme ? 'text-white' : 'text-neutral-900'}`}>
                {restaurant.rating.toFixed(1)}
              </span>
              <span className={`text-xs ${darkTheme ? 'text-neutral-500' : 'text-neutral-400'}`}>
                ({restaurant.reviewsCount} reviews)
              </span>
            </div>
            
            <div className="flex gap-1.5 flex-wrap justify-end max-w-[50%]">
              {restaurant.categories.slice(0, 1).map((category, idx) => (
                <span 
                  key={idx} 
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    darkTheme 
                      ? 'bg-amber-500/10 text-amber-400' 
                      : 'bg-amber-500/10 text-amber-700'
                  }`}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Restaurant Title */}
          <h3 
            onClick={() => onSelect(restaurant.id)}
            className={`text-lg font-bold leading-tight cursor-pointer hover:text-amber-500 transition-colors ${
              darkTheme ? 'text-neutral-100' : 'text-neutral-800'
            }`}
          >
            {restaurant.name}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-2.5 mb-3">
            {restaurant.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className={`text-[11px] px-2 py-0.5 rounded ${
                  darkTheme 
                    ? 'bg-neutral-800 text-neutral-300 border border-neutral-700/50' 
                    : 'bg-neutral-100 text-neutral-600 border border-neutral-200/40'
                }`}
              >
                {tag}
              </span>
            ))}
            {restaurant.tags.length > 2 && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded self-center ${darkTheme ? 'text-neutral-500' : 'text-neutral-400'}`}>
                +{restaurant.tags.length - 2} more
              </span>
            )}
          </div>

          {/* Review Snippet */}
          <p className={`text-xs italic line-clamp-2 pl-2 border-l-2 mb-4 leading-relaxed ${
            darkTheme ? 'text-neutral-400 border-amber-500/40' : 'text-neutral-500 border-amber-600/40'
          }`}>
            "{restaurant.reviewSnippet}"
          </p>
        </div>

        {/* Buttons Action */}
        <div className="flex gap-2 pt-2 border-t border-dashed border-neutral-200/10 mt-auto">
          <button
            onClick={() => onSelect(restaurant.id)}
            className={`flex-1 text-xs font-semibold py-2.5 px-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 ${
              darkTheme
                ? 'bg-amber-500 text-neutral-950 hover:bg-amber-400 active:scale-95'
                : 'bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95'
            }`}
          >
            View Details
          </button>
          
          <a
            href={restaurant.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`p-2.5 rounded-xl border flex items-center justify-center transition-all duration-300 ${
              darkTheme
                ? 'border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800'
                : 'border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
            }`}
            title="Get Directions in Google Maps"
          >
            <Compass className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
