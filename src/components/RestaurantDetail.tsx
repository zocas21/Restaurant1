import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Star, MapPin, Heart, ExternalLink, Phone, Clock, 
  Map, ChefHat, Check, Compass, Share2, MessageSquare, Coffee,
  Sparkles
} from 'lucide-react';
import { Restaurant } from '../types';
import { RESTAURANTS } from '../data/restaurants';

interface RestaurantDetailProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onSelectRestaurant: (id: string) => void;
  darkTheme: boolean;
}

export default function RestaurantDetail({
  restaurant,
  isFavorite,
  onToggleFavorite,
  onBack,
  onSelectRestaurant,
  darkTheme
}: RestaurantDetailProps) {
  const [activeImage, setActiveImage] = useState(restaurant.image);
  const [activeMenuTab, setActiveMenuTab] = useState<'all' | 'traditional' | 'international' | 'dessert' | 'beverage'>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  // Get similar restaurants (same location or share categories, excluding current)
  const similarRestaurants = RESTAURANTS.filter(
    r => r.id !== restaurant.id && 
    (r.location === restaurant.location || r.categories.some(c => restaurant.categories.includes(c)))
  ).slice(0, 3);

  const filteredMenu = restaurant.menuHighlights.filter(item => {
    if (activeMenuTab === 'all') return true;
    return item.type === activeMenuTab;
  });

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-12"
    >
      {/* Back Button & Share/Favorite Controls */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl border transition-all duration-300 ${
            darkTheme
              ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800'
              : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to List</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center gap-1.5 text-xs font-semibold ${
              darkTheme
                ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800'
                : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
          </button>

          {/* Favorite Button */}
          <button
            onClick={() => onToggleFavorite(restaurant.id)}
            className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center gap-1.5 text-xs font-semibold ${
              isFavorite
                ? 'bg-red-500 text-white border-red-500'
                : darkTheme
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">{isFavorite ? 'Saved' : 'Favorite'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Images, Description, Menus */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Showcase */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-250/10 shadow-lg">
              <img
                src={activeImage}
                alt={restaurant.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>{restaurant.location}, Addis Ababa</span>
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {restaurant.images.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative shrink-0 w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    activeImage === imgUrl ? 'border-amber-500 scale-95 shadow-md' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`${restaurant.name} ${index + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Restaurant Basics */}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {restaurant.categories.map((c, idx) => (
                <span
                  key={idx}
                  className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                    darkTheme ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-500/10 text-amber-800'
                  }`}
                >
                  {c}
                </span>
              ))}
              <span className={`text-xs px-2.5 py-1 rounded-md border ${
                darkTheme ? 'border-neutral-800 text-neutral-400' : 'border-neutral-200 text-neutral-500'
              }`}>
                Price: <strong className={darkTheme ? 'text-neutral-100' : 'text-neutral-900'}>{restaurant.priceRange}</strong>
              </span>
            </div>

            <h1 className={`text-3xl font-extrabold tracking-tight ${darkTheme ? 'text-white' : 'text-neutral-900'}`}>
              {restaurant.name}
            </h1>

            <div className="flex items-center gap-1.5 mt-3">
              <div className="flex items-center text-amber-500">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <span className={`text-base font-bold ${darkTheme ? 'text-white' : 'text-neutral-900'}`}>
                {restaurant.rating.toFixed(1)}
              </span>
              <span className={`text-sm ${darkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}>
                ({restaurant.reviewsCount} reviews)
              </span>
              <span className="text-neutral-400 mx-1.5">•</span>
              <span className={`text-sm font-medium ${darkTheme ? 'text-neutral-300' : 'text-neutral-600'}`}>
                {restaurant.address}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className={`p-6 rounded-2xl border ${
            darkTheme ? 'bg-neutral-900/40 border-neutral-800/80 text-neutral-300' : 'bg-neutral-50 border-neutral-150 text-neutral-700'
          }`}>
            <h2 className={`font-bold text-lg mb-3 ${darkTheme ? 'text-white' : 'text-neutral-900'}`}>
              About the Restaurant
            </h2>
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {restaurant.description}
            </p>
          </div>

          {/* Highlights Grid */}
          <div>
            <h2 className={`font-bold text-lg mb-4 flex items-center gap-1.5 ${darkTheme ? 'text-white' : 'text-neutral-900'}`}>
              <Sparkles className="w-4 h-4 text-amber-500" />
              Venue Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {restaurant.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                    darkTheme
                      ? 'bg-neutral-950/40 border-neutral-800/80 text-neutral-300'
                      : 'bg-white border-neutral-150 text-neutral-700'
                  }`}
                >
                  <div className="bg-amber-500/10 text-amber-500 p-1.5 rounded-lg shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Highlights section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`font-bold text-lg flex items-center gap-1.5 ${darkTheme ? 'text-white' : 'text-neutral-900'}`}>
                <ChefHat className="w-5 h-5 text-amber-500" />
                Menu Highlights
              </h2>
            </div>

            {/* Menu Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 border-b border-neutral-200/10">
              {(['all', 'traditional', 'international', 'dessert', 'beverage'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveMenuTab(tab)}
                  className={`text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all ${
                    activeMenuTab === tab
                      ? darkTheme
                        ? 'bg-amber-500 text-neutral-950 shadow-md'
                        : 'bg-neutral-900 text-white shadow'
                      : darkTheme
                        ? 'bg-neutral-900/60 text-neutral-400 hover:text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Menu List */}
            <div className="space-y-3.5">
              {filteredMenu.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-start justify-between gap-4 transition-all hover:scale-[1.01] ${
                    darkTheme
                      ? 'bg-neutral-900/20 border-neutral-800/60 hover:border-neutral-700'
                      : 'bg-white border-neutral-150 hover:shadow-sm'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-bold text-sm ${darkTheme ? 'text-neutral-100' : 'text-neutral-800'}`}>
                        {item.name}
                      </h4>
                      <span className={`text-[9px] uppercase font-extrabold tracking-widest px-1.5 py-0.5 rounded ${
                        item.type === 'traditional'
                          ? 'bg-red-500/10 text-red-500'
                          : item.type === 'international'
                            ? 'bg-blue-500/10 text-blue-500'
                            : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <p className={`text-xs leading-relaxed ${darkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      {item.description}
                    </p>
                  </div>
                  <div className={`text-sm font-extrabold whitespace-nowrap shrink-0 ${
                    darkTheme ? 'text-amber-400' : 'text-amber-600'
                  }`}>
                    {item.price}
                  </div>
                </div>
              ))}
              {filteredMenu.length === 0 && (
                <div className="text-center p-8 text-sm text-neutral-500">
                  No items listed in this category.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Sticky Map, Contact, Opening hours, Reviews */}
        <div className="space-y-8">
          {/* Quick Info & Directions Box */}
          <div className={`p-5 rounded-2xl border space-y-5 sticky top-20 ${
            darkTheme ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-150 shadow-sm'
          }`}>
            <h3 className={`font-bold text-base border-b pb-2.5 ${darkTheme ? 'text-white border-neutral-800' : 'text-neutral-900 border-neutral-100'}`}>
              Reservation & Contact
            </h3>
            
            {/* Hour detail */}
            <div className="space-y-3">
              <div className="flex gap-3 text-sm">
                <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                <div className="space-y-1">
                  <span className={`font-bold block text-xs ${darkTheme ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Opening Hours
                  </span>
                  {restaurant.openingHours.map((h, i) => (
                    <div key={i} className="text-xs text-neutral-400 flex flex-col">
                      <span className="font-semibold text-neutral-300">{h.days}:</span>
                      <span className="opacity-80">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phone detail */}
              <div className="flex gap-3 text-sm pt-2">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <div className="space-y-1 flex-1">
                  <span className={`font-bold block text-xs ${darkTheme ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Contact Number
                  </span>
                  <a
                    href={`tel:${restaurant.contact}`}
                    className="text-sm font-semibold text-amber-500 hover:underline flex items-center gap-1"
                  >
                    {restaurant.contact}
                  </a>
                </div>
              </div>
            </div>

            {/* Embed Map iframe */}
            <div className="rounded-xl overflow-hidden aspect-video relative border border-neutral-200/10 shadow-sm">
              <iframe
                title="Google Maps Location"
                src={restaurant.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="absolute inset-0"
              />
            </div>

            {/* Direct Directions Launcher */}
            <a
              href={restaurant.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-all duration-300 ${
                darkTheme
                  ? 'bg-amber-500 text-neutral-950 hover:bg-amber-400 active:scale-95'
                  : 'bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95'
              }`}
            >
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span>Get Directions (Google Maps)</span>
            </a>
          </div>

          {/* Customer Reviews Section */}
          <div className="space-y-4">
            <h2 className={`font-bold text-lg flex items-center gap-1.5 ${darkTheme ? 'text-white' : 'text-neutral-900'}`}>
              <MessageSquare className="w-5 h-5 text-amber-500" />
              Guest Reviews
            </h2>
            <div className="space-y-4">
              {restaurant.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className={`p-4 rounded-2xl border space-y-2.5 ${
                    darkTheme ? 'bg-neutral-900/30 border-neutral-800/80' : 'bg-neutral-50 border-neutral-150'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-700 shrink-0">
                        <img src={rev.avatar || `https://picsum.photos/seed/${rev.author}/80/80`} alt={rev.author} referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <span className={`text-xs font-bold block leading-none ${darkTheme ? 'text-neutral-100' : 'text-neutral-800'}`}>
                          {rev.author}
                        </span>
                        <span className="text-[10px] text-neutral-500">{rev.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 bg-amber-500/10 text-amber-500 text-xs font-bold px-2 py-0.5 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{rev.rating}</span>
                    </div>
                  </div>
                  <p className={`text-xs leading-relaxed ${darkTheme ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Restaurants Section */}
          <div className="space-y-4">
            <h2 className={`font-bold text-lg ${darkTheme ? 'text-white' : 'text-neutral-900'}`}>
              Similar Restaurants
            </h2>
            <div className="space-y-3">
              {similarRestaurants.map((sim) => (
                <div
                  key={sim.id}
                  onClick={() => {
                    onSelectRestaurant(sim.id);
                    setActiveImage(sim.image); // Reset active image state
                  }}
                  className={`p-3 rounded-xl border flex gap-3 cursor-pointer group transition-all duration-300 ${
                    darkTheme
                      ? 'bg-neutral-900/20 border-neutral-800/60 hover:border-amber-500/40 hover:bg-neutral-900/50'
                      : 'bg-white border-neutral-150 hover:border-amber-600/30 hover:shadow-sm'
                  }`}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-800 shrink-0">
                    <img src={sim.image} alt={sim.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <h4 className={`text-xs font-bold truncate ${darkTheme ? 'text-neutral-200 group-hover:text-amber-400' : 'text-neutral-800 group-hover:text-amber-600'}`}>
                      {sim.name}
                    </h4>
                    <span className="text-[10px] text-neutral-400 flex items-center gap-0.5">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      {sim.location}
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 text-amber-500 fill-current" />
                      <span className={`text-[11px] font-bold ${darkTheme ? 'text-white' : 'text-neutral-800'}`}>
                        {sim.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
