import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, SlidersHorizontal, Check, RefreshCw, Star } from 'lucide-react';

interface FilterState {
  categories: string[];
  priceLevels: ('Budget' | 'Moderate' | 'Expensive' | 'Luxury')[];
  minRating: number;
  openNow: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChangeFilters: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  availableCategories: string[];
  darkTheme: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({
  filters,
  onChangeFilters,
  onResetFilters,
  availableCategories,
  darkTheme,
  isOpen,
  onClose
}: FilterSidebarProps) {
  
  const priceLevels: ('Budget' | 'Moderate' | 'Expensive' | 'Luxury')[] = [
    'Budget', 'Moderate', 'Expensive', 'Luxury'
  ];

  const handleToggleCategory = (category: string) => {
    const isSelected = filters.categories.includes(category);
    const updated = isSelected
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onChangeFilters({ ...filters, categories: updated });
  };

  const handleTogglePriceLevel = (level: 'Budget' | 'Moderate' | 'Expensive' | 'Luxury') => {
    const isSelected = filters.priceLevels.includes(level);
    const updated = isSelected
      ? filters.priceLevels.filter(p => p !== level)
      : [...filters.priceLevels, level];
    
    onChangeFilters({ ...filters, priceLevels: updated });
  };

  const handleSelectRating = (rating: number) => {
    onChangeFilters({ ...filters, minRating: filters.minRating === rating ? 0 : rating });
  };

  const handleToggleOpenNow = () => {
    onChangeFilters({ ...filters, openNow: !filters.openNow });
  };

  const activeFiltersCount = 
    filters.categories.length + 
    filters.priceLevels.length + 
    (filters.minRating > 0 ? 1 : 0) + 
    (filters.openNow ? 1 : 0);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`p-5 flex items-center justify-between border-b ${
        darkTheme ? 'border-neutral-800' : 'border-neutral-100'
      }`}>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-amber-500" />
          <h2 className={`font-bold text-lg ${darkTheme ? 'text-white' : 'text-neutral-900'}`}>
            Filters
          </h2>
          {activeFiltersCount > 0 && (
            <span className="bg-amber-500 text-neutral-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {activeFiltersCount > 0 && (
            <button
              onClick={onResetFilters}
              className={`text-xs flex items-center gap-1 hover:text-amber-500 transition-colors ${
                darkTheme ? 'text-neutral-400' : 'text-neutral-500'
              }`}
              title="Reset Filters"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          )}
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg border md:hidden ${
              darkTheme ? 'border-neutral-800 text-neutral-400 hover:text-white' : 'border-neutral-200 text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body scroll */}
      <div className="flex-1 overflow-y-auto p-5 space-y-7">
        {/* Category Filters */}
        <div>
          <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${
            darkTheme ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            Categories
          </h3>
          <div className="flex flex-col gap-2">
            {availableCategories.map((category) => {
              const isSelected = filters.categories.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => handleToggleCategory(category)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 text-left border ${
                    isSelected
                      ? darkTheme
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-semibold'
                        : 'bg-amber-500/5 border-amber-500 text-amber-800 font-semibold shadow-sm'
                      : darkTheme
                        ? 'bg-neutral-900/40 border-neutral-800/80 text-neutral-300 hover:border-neutral-700'
                        : 'bg-neutral-50 border-neutral-200/60 text-neutral-700 hover:bg-neutral-100/50'
                  }`}
                >
                  <span>{category}</span>
                  {isSelected && (
                    <motion.div layoutId="check-cat" className="text-amber-500">
                      <Check className="w-4 h-4" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Level Filters */}
        <div>
          <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${
            darkTheme ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            Price Range
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {priceLevels.map((level) => {
              const isSelected = filters.priceLevels.includes(level);
              return (
                <button
                  key={level}
                  onClick={() => handleTogglePriceLevel(level)}
                  className={`px-3 py-3 rounded-xl text-xs transition-all duration-200 font-medium border text-center flex flex-col items-center justify-center gap-0.5 ${
                    isSelected
                      ? darkTheme
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-semibold'
                        : 'bg-amber-500/5 border-amber-500 text-amber-800 font-semibold shadow-sm'
                      : darkTheme
                        ? 'bg-neutral-900/40 border-neutral-800/80 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                        : 'bg-neutral-50 border-neutral-200/60 text-neutral-600 hover:bg-neutral-100/50 hover:text-neutral-900'
                  }`}
                >
                  <span className="font-bold text-sm">
                    {level === 'Budget' && '$'}
                    {level === 'Moderate' && '$$'}
                    {level === 'Expensive' && '$$$'}
                    {level === 'Luxury' && '$$$$'}
                  </span>
                  <span className="text-[10px] opacity-75">{level}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${
            darkTheme ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            Minimum Rating
          </h3>
          <div className="flex gap-2">
            {[4.0, 4.5, 4.8].map((rating) => {
              const isSelected = filters.minRating === rating;
              return (
                <button
                  key={rating}
                  onClick={() => handleSelectRating(rating)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all duration-200 flex items-center justify-center gap-1 ${
                    isSelected
                      ? darkTheme
                        ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-md'
                        : 'bg-neutral-900 text-white border-neutral-900 shadow'
                      : darkTheme
                        ? 'bg-neutral-900/40 border-neutral-800/80 text-neutral-300 hover:border-neutral-700'
                        : 'bg-neutral-50 border-neutral-200/60 text-neutral-600 hover:bg-neutral-100/50'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                  <span>{rating.toFixed(1)}+</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Open Now Toggle */}
        <div className={`p-4 rounded-2xl flex items-center justify-between border ${
          darkTheme ? 'bg-neutral-950/40 border-neutral-800' : 'bg-neutral-50 border-neutral-150'
        }`}>
          <div>
            <span className={`text-sm font-bold block ${darkTheme ? 'text-neutral-100' : 'text-neutral-800'}`}>
              Open Now
            </span>
            <span className={`text-xs ${darkTheme ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Hide currently closed venues
            </span>
          </div>
          <button
            onClick={handleToggleOpenNow}
            className={`w-11 h-6 rounded-full p-1 transition-all duration-300 relative ${
              filters.openNow ? 'bg-amber-500' : darkTheme ? 'bg-neutral-800' : 'bg-neutral-200'
            }`}
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`w-4 h-4 rounded-full bg-white shadow-sm ${
                filters.openNow ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop view: persistent static side bar */}
      <div className={`hidden md:block w-72 shrink-0 border-r h-[calc(100vh-64px)] overflow-hidden sticky top-16 ${
        darkTheme ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-neutral-150'
      }`}>
        {sidebarContent}
      </div>

      {/* Mobile view: slide-in panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />
            {/* Sidebar sliding */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 h-full w-full max-w-sm z-50 md:hidden shadow-2xl flex flex-col ${
                darkTheme ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'
              }`}
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
