import React from 'react';
import { motion } from 'motion/react';
import { User, MapPin, Sparkles, Shield, Heart, HelpCircle, Star } from 'lucide-react';

interface UserProfileProps {
  darkTheme: boolean;
  currentNeighborhood: string;
  onChangeNeighborhood: (neighborhood: string) => void;
  favoritesCount: number;
}

export default function UserProfile({
  darkTheme,
  currentNeighborhood,
  onChangeNeighborhood,
  favoritesCount
}: UserProfileProps) {
  const neighborhoods = ['Bole', 'Kazanchis', 'Piazza', 'Sarbet'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto px-4 py-8 space-y-6"
    >
      {/* Profile Header */}
      <div className={`p-6 rounded-2xl border flex items-center gap-5 ${
        darkTheme ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-150 shadow-sm'
      }`}>
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-red-500 to-amber-400 flex items-center justify-center shadow">
          <User className="w-8 h-8 text-neutral-950" />
        </div>
        <div>
          <h2 className={`text-xl font-black ${darkTheme ? 'text-white' : 'text-neutral-900'}`}>
            Ethiopian Food Explorer
          </h2>
          <p className={`text-xs mt-0.5 font-medium ${darkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}>
            yordanosayalew211@gmail.com
          </p>
          <div className="flex gap-2 mt-2">
            <span className="bg-amber-500/10 text-amber-500 text-[9px] uppercase font-black px-2 py-0.5 rounded-md">
              Amara Concierge Member
            </span>
          </div>
        </div>
      </div>

      {/* Neighborhood Preferences (Grounding Near Me) */}
      <div className={`p-6 rounded-2xl border space-y-4.5 ${
        darkTheme ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-150 shadow-sm'
      }`}>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-500" />
          <h3 className={`font-bold text-sm ${darkTheme ? 'text-neutral-100' : 'text-neutral-800'}`}>
            Set Mock Current Neighborhood
          </h3>
        </div>
        
        <p className={`text-xs leading-relaxed ${darkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}>
          Configure your active neighborhood in Addis Ababa. When you click <strong>“Near Me”</strong> in the Search or Recommendation panels, the application will prioritize restaurants located in this area.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {neighborhoods.map((n) => {
            const isSelected = currentNeighborhood === n;
            return (
              <button
                key={n}
                onClick={() => onChangeNeighborhood(n)}
                className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                  isSelected
                    ? darkTheme
                      ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-md'
                      : 'bg-neutral-900 text-white border-neutral-900 shadow'
                    : darkTheme
                      ? 'bg-neutral-950/40 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>

      {/* User Statistics / Preferences */}
      <div className="grid grid-cols-2 gap-4">
        {/* Saved Count card */}
        <div className={`p-5 rounded-2xl border flex flex-col justify-between h-28 ${
          darkTheme ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-150 shadow-sm'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wider block ${darkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Saved Favorites
          </span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className={`text-3xl font-black ${darkTheme ? 'text-white' : 'text-neutral-900'}`}>
              {favoritesCount}
            </span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
          </div>
          <span className={`text-[10px] ${darkTheme ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Stored securely in Local Storage
          </span>
        </div>

        {/* Level badge */}
        <div className={`p-5 rounded-2xl border flex flex-col justify-between h-28 ${
          darkTheme ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-150 shadow-sm'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wider block ${darkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Explorer Tier
          </span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className={`text-2xl font-black ${darkTheme ? 'text-amber-500' : 'text-amber-600'}`}>
              Gourmet
            </span>
            <Star className="w-4 h-4 text-amber-500 fill-current" />
          </div>
          <span className={`text-[10px] ${darkTheme ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Cultural Dining Expert
          </span>
        </div>
      </div>

      {/* Guide details / Help center */}
      <div className={`p-5 rounded-2xl border text-xs leading-relaxed space-y-2.5 ${
        darkTheme ? 'bg-neutral-950/40 border-neutral-850 text-neutral-400' : 'bg-neutral-50 border-neutral-100 text-neutral-600'
      }`}>
        <div className="flex items-center gap-1.5 text-amber-500 font-bold">
          <HelpCircle className="w-4 h-4" />
          <span>Need help exploring?</span>
        </div>
        <p>
          Ethiopian restaurants often host special "Fasting" days on Wednesdays and Fridays where all-vegan stews (Bayenetu) are served. Our explorer highlights these spots with detailed tags to make dining smooth and easy!
        </p>
      </div>
    </motion.div>
  );
}
