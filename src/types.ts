export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
}

export interface MenuItem {
  name: string;
  price: string;
  description: string;
  type: 'traditional' | 'international' | 'beverage' | 'dessert';
}

export interface OpeningHour {
  days: string;
  hours: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  location: string; // e.g. "Bole", "Kazanchis", "Piazza", "Sarbet"
  address: string;
  priceLevel: 'Budget' | 'Moderate' | 'Expensive' | 'Luxury';
  priceRange: string; // e.g. "ETB 500 - 1000"
  categories: string[]; // e.g. ["Traditional", "Fine Dining", "Vegan", "Cafes", "24/7"]
  tags: string[]; // e.g. ["Live Music", "Buffet", "Cozy", "Outdoor Seating", "Strong Coffee"]
  image: string;
  images: string[];
  description: string;
  reviewSnippet: string;
  highlights: string[];
  menuHighlights: MenuItem[];
  openingHours: OpeningHour[];
  contact: string;
  mapEmbedUrl: string; // Styled Google Maps Embed URL or iframe src
  mapDirectionsUrl: string; // Google Maps directions link
  reviews: Review[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedRestaurants?: string[]; // IDs of recommended restaurants
}
