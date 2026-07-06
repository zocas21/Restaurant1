import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Sparkles, X, MessageSquare, Coffee, MapPin, 
  CornerDownLeft, ChefHat, HelpCircle, Compass, Star
} from 'lucide-react';
import { ChatMessage, Restaurant } from '../types';
import { RESTAURANTS } from '../data/restaurants';

interface AIChatBotProps {
  darkTheme: boolean;
  onSelectRestaurant: (id: string) => void;
  onClose?: () => void;
  embedded?: boolean; // If true, render as a full static container rather than a floating overlay
}

const PRESETS = [
  'Where can I find the best Shiro in a clay pot?',
  'Recommend a romantic fine dining spot in Bole.',
  'What is an authentic place with traditional live music?',
  'Where can I get a great strong macchiato in Piazza?'
];

export default function AIChatBot({
  darkTheme,
  onSelectRestaurant,
  onClose,
  embedded = false
}: AIChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Selam! I am Amara, your personal AI dining concierge for Ethiopia. 🇪🇹\n\nI can help you discover local gems in Addis Ababa—from authentic clay-pot Shiro stews and beautiful traditional dance shows to cozy historic cafes and premium romantic fusion spots. What are you craving today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Build discussion history matching our backend requirements
      const history = [...messages, userMsg].map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });

      if (!response.ok) {
        throw new Error('API server error');
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedRestaurants: data.suggestedRestaurantIds
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Error fetching chat reply:', error);
      
      // Fallback message
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: "I apologize, but I encountered a slight connection issue. However, based on my local database, we have several top-rated restaurants in Bole and Kazanchis ready for you! Try searching for 'Traditional' or 'Cafes' to find instant options.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePresetClick = (preset: string) => {
    handleSendMessage(preset);
  };

  const getRestaurantData = (id: string): Restaurant | undefined => {
    return RESTAURANTS.find(r => r.id === id);
  };

  const chatContainer = (
    <div className={`flex flex-col h-full overflow-hidden ${
      embedded 
        ? '' 
        : `rounded-2xl border ${darkTheme ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} shadow-2xl`
    }`}>
      {/* Top Header */}
      {!embedded && (
        <div className={`px-5 py-4 flex items-center justify-between border-b ${
          darkTheme ? 'bg-neutral-950/40 border-neutral-800' : 'bg-neutral-50 border-neutral-150'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`text-sm font-bold block ${darkTheme ? 'text-white' : 'text-neutral-900'}`}>
                  Amara Concierge
                </span>
                <span className="bg-amber-500/15 text-amber-500 text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full">
                  AI Guide
                </span>
              </div>
              <span className="text-[10px] text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Online & Ready
              </span>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className={`p-1 rounded-lg border hover:scale-105 transition-transform ${
                darkTheme ? 'border-neutral-800 text-neutral-400 hover:text-white' : 'border-neutral-200 text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Messages list */}
      <div className={`flex-1 p-5 overflow-y-auto space-y-4 ${
        darkTheme ? 'bg-neutral-950/20' : 'bg-neutral-50/40'
      }`}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
            }`}
          >
            {/* Bubble content */}
            <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-sm border ${
              msg.sender === 'user'
                ? darkTheme
                  ? 'bg-amber-500 border-amber-600 text-neutral-950 font-medium'
                  : 'bg-neutral-900 border-neutral-950 text-white font-medium'
                : darkTheme
                  ? 'bg-neutral-900/90 border-neutral-800/80 text-neutral-150'
                  : 'bg-white border-neutral-150 text-neutral-800'
            }`}>
              {msg.text}
            </div>

            {/* Time badge */}
            <span className={`text-[10px] mt-1 px-1.5 opacity-60 ${
              darkTheme ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
              {msg.timestamp}
            </span>

            {/* Recommended interactive cards if available */}
            {msg.suggestedRestaurants && msg.suggestedRestaurants.length > 0 && (
              <div className="w-full mt-3 space-y-2.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-500 flex items-center gap-1 pl-1">
                  <ChefHat className="w-3.5 h-3.5" />
                  Suggested Venues
                </span>
                {msg.suggestedRestaurants.map((resId) => {
                  const res = getRestaurantData(resId);
                  if (!res) return null;
                  return (
                    <div
                      key={resId}
                      onClick={() => onSelectRestaurant(resId)}
                      className={`p-3.5 rounded-xl border flex gap-3 cursor-pointer group transition-all duration-300 ${
                        darkTheme
                          ? 'bg-neutral-900 border-neutral-800 hover:border-amber-500 hover:bg-neutral-800'
                          : 'bg-white border-neutral-200 hover:border-amber-600 hover:shadow-sm'
                      }`}
                    >
                      <img
                        src={res.image}
                        alt={res.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className={`text-xs font-bold truncate ${darkTheme ? 'text-neutral-100 group-hover:text-amber-400' : 'text-neutral-800 group-hover:text-amber-600'}`}>
                            {res.name}
                          </h4>
                          <div className="flex items-center text-amber-500 shrink-0">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-[10px] font-bold ml-0.5">{res.rating}</span>
                          </div>
                        </div>
                        <p className={`text-[10px] truncate ${darkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}>
                          {res.location} • {res.categories[0]}
                        </p>
                        <span className="text-[9px] font-semibold text-amber-500 flex items-center gap-0.5 mt-0.5">
                          View details
                          <Compass className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {/* Typing skeleton bubble */}
        {isTyping && (
          <div className="flex flex-col items-start max-w-[80%] mr-auto">
            <div className={`p-4 rounded-2xl border flex items-center gap-1.5 shadow-sm ${
              darkTheme ? 'bg-neutral-900/90 border-neutral-800 text-neutral-100' : 'bg-white border-neutral-150 text-neutral-800'
            }`}>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Recommended Suggestion chips when box is empty or first welcome */}
      {messages.length === 1 && (
        <div className={`px-5 py-3 border-t ${
          darkTheme ? 'bg-neutral-950/30 border-neutral-850' : 'bg-neutral-50/50 border-neutral-100'
        }`}>
          <span className={`text-[10px] uppercase font-bold tracking-wider mb-2 block ${
            darkTheme ? 'text-neutral-500' : 'text-neutral-400'
          }`}>
            Suggested Questions
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handlePresetClick(preset)}
                className={`text-xs px-3 py-1.5 rounded-full border text-left transition-all ${
                  darkTheme
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-amber-500 hover:text-white'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-amber-600 hover:text-neutral-900 shadow-sm'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input container */}
      <div className={`p-4 border-t ${
        darkTheme ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-150'
      }`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Amara about local foods, music, cafes..."
            className={`flex-1 text-sm py-3 px-4 rounded-xl border focus:outline-none focus:ring-1 ${
              darkTheme
                ? 'bg-neutral-950 border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:border-amber-500 focus:ring-amber-500'
                : 'bg-neutral-50 border-neutral-250 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:ring-amber-600'
            }`}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className={`p-3 rounded-xl flex items-center justify-center transition-all ${
              !inputValue.trim() || isTyping
                ? 'opacity-40 cursor-not-allowed bg-neutral-800 text-neutral-500'
                : darkTheme
                  ? 'bg-amber-500 text-neutral-950 hover:bg-amber-400 hover:scale-105 active:scale-95'
                  : 'bg-neutral-900 text-white hover:bg-neutral-800 hover:scale-105 active:scale-95'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );

  if (embedded) {
    return chatContainer;
  }

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] max-w-sm h-[500px]">
      {chatContainer}
    </div>
  );
}
