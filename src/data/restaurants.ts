import { Restaurant } from '../types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'meskott',
    name: 'Meskott Culinary Experience',
    rating: 4.8,
    reviewsCount: 312,
    location: 'Kazanchis',
    address: 'Guinea Conakry St, Kazanchis, Addis Ababa',
    priceLevel: 'Luxury',
    priceRange: 'ETB 1500 - 3000',
    categories: ['Fine Dining', 'Traditional Ethiopian'],
    tags: ['Cozy', 'Outdoor Seating', 'Gourmet', 'Wine Pairing'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Meskott offers an elevated take on traditional Ethiopian and pan-African ingredients, combining authentic flavors with modern culinary techniques. Located in the diplomatic heart of Kazanchis, it features an intimate ambient setting with curated artwork, premium wine lists, and a scenic garden courtyard.',
    reviewSnippet: 'An absolute masterpiece. They take local Ethiopian ingredients and turn them into 5-star Michelin-level dishes. The service is impeccable.',
    highlights: ['Fine Art Gallery', 'Intimate Seating', 'Premium Wine Pairing', 'Lush Garden Courtyard', 'Vegan Gourmet Options'],
    menuHighlights: [
      { name: 'Meskott Degustation Platter', price: 'ETB 2,400', description: 'A slow-cooked tasting journey of Doro Wat, Siga Wat, and custom vegetable purées on artisanal organic teff injera.', type: 'traditional' },
      { name: 'Deconstructed Kitfo Tartare', price: 'ETB 1,850', description: 'Finely minced premium beef warmed with niter kibbeh (herbed butter) and mitmita, served with cardamon-infused cottage cheese croutons.', type: 'traditional' },
      { name: 'Pan-Seared Nile Perch', price: 'ETB 1,950', description: 'Fresh Nile Perch fillet crusted with berbere spices, served over a bed of roasted sweet potato mash and warm garlic spinach.', type: 'international' },
      { name: 'Tej-Glazed Chocolate Mousse', price: 'ETB 750', description: 'Dark chocolate velvet mousse flavored with a reduction of local honey wine (Tej) and a hint of Ethiopian cardamom.', type: 'dessert' }
    ],
    openingHours: [
      { days: 'Monday - Friday', hours: '12:00 PM - 11:00 PM' },
      { days: 'Saturday - Sunday', hours: '1:00 PM - 11:30 PM' }
    ],
    contact: '+251 11 558 4040',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.540188981452!2d38.76742517591646!3d9.014389689255866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b859066666667%3A0x6b4cd48a318df883!2sKazanchis%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set',
    mapDirectionsUrl: 'https://maps.google.com/?q=Kazanchis+Addis+Ababa+Ethiopia',
    reviews: [
      { id: 'm1', author: 'Dr. Alula Bekele', rating: 5, date: 'June 15, 2026', comment: 'Undoubtedly the best modern dining experience in Addis. Meskott combines heritage with modern gastronomy seamlessly.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
      { id: 'm2', author: 'Sarah Jenkins', rating: 5, date: 'May 28, 2026', comment: 'Amazing! The Tej-glazed dessert was phenomenal and the garden atmosphere is so peaceful away from the city noise.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
      { id: 'm3', author: 'Yared Selassie', rating: 4, date: 'April 10, 2026', comment: 'Highly creative menu. It is on the pricier side for Addis, but the ambiance and artistic plating make it worth every Birr.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' }
    ]
  },
  {
    id: 'cravings',
    name: 'Cravings Restaurant & Bar',
    rating: 4.6,
    reviewsCount: 245,
    location: 'Bole',
    address: 'Cameroon St, Bole, Addis Ababa (Near Edna Mall)',
    priceLevel: 'Moderate',
    priceRange: 'ETB 800 - 1600',
    categories: ['Fine Dining', 'Traditional Ethiopian'],
    tags: ['Live Music', 'Cocktails', 'Nightlife', 'Buffet'],
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Cravings Restaurant & Bar is Bole’s premier destination for high-energy dining. Blending delicious local specialties with international favorites, it features a fantastic bar with custom infusions, a regular lineup of live bands, and a legendary Sunday Brunch Buffet that draws food lovers from all over the capital.',
    reviewSnippet: 'The rib-eye tibs are to die for, and their signature berbere margaritas are incredibly unique! A vibrant and fun place to hang out with friends.',
    highlights: ['Live Ethio-Jazz bands', 'Signature Spiced Cocktails', 'Acoustic Thursday Nights', 'Cozy Balcony Lounge'],
    menuHighlights: [
      { name: 'Vibrant Rib-Eye Tibs', price: 'ETB 1,100', description: 'Premium cut rib-eye cubed and flash-sautéed with red onions, jalapeños, rosemary, and finished with local herbed butter.', type: 'traditional' },
      { name: 'Cravings Fusion Burger', price: 'ETB 850', description: 'Double beef patty seasoned with awaze (spicy mustard paste), melted local Gouda cheese, caramelized onions, and homemade aioli.', type: 'international' },
      { name: 'Spiced Berbere Margarita', price: 'ETB 450', description: 'Premium tequila, fresh lime juice, honey water, finished with a subtle rim of spicy Berbere and sea salt.', type: 'beverage' }
    ],
    openingHours: [
      { days: 'Monday - Thursday', hours: '11:00 AM - 12:00 AM' },
      { days: 'Friday - Sunday', hours: '11:00 AM - 2:00 AM' }
    ],
    contact: '+251 911 234 567',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.716104279586!2d38.78363717591629!3d9.001004189498263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850d99999999%3A0x6b8de8d893f3c4e!2sBole%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000001!5m2!1sen!2set',
    mapDirectionsUrl: 'https://maps.google.com/?q=Bole+Edna+Mall+Addis+Ababa+Ethiopia',
    reviews: [
      { id: 'c1', author: 'Semhal Gidey', rating: 5, date: 'June 29, 2026', comment: 'Love the Friday jazz vibe. Food is outstanding, particularly the sizzling hot tibs. Great place to start the weekend.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150' },
      { id: 'c2', author: 'Marcus Vance', rating: 4, date: 'June 02, 2026', comment: 'Very lively atmosphere! The service was a bit slow on a busy Friday night, but the amazing rib-eye made up for it.', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150' }
    ]
  },
  {
    id: 'goldenplate',
    name: 'Golden Plate Restaurant',
    rating: 4.5,
    reviewsCount: 189,
    location: 'Kazanchis',
    address: 'Near Intercontinental Hotel, Kazanchis, Addis Ababa',
    priceLevel: 'Moderate',
    priceRange: 'ETB 600 - 1200',
    categories: ['Fine Dining', 'Buffet'],
    tags: ['Buffet', 'Family Friendly', 'Spacious', 'Meeting Friendly'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Golden Plate is celebrated for its gargantuan, high-quality, and cost-effective buffet services. Catering to corporate professionals in Kazanchis and families alike, this grand hall features an extensive array of traditional stews, local fresh vegetables, premium cuts of roasted meats, and international hot dishes.',
    reviewSnippet: 'The most consistent buffet in Addis. Incredible range of fasting (vegan) foods on Wednesdays and Fridays. Extremely clean and professional.',
    highlights: ['Massive Fasting (Vegan) Buffet', 'Corporate Private Dining Rooms', 'Fresh Juice Bar', 'Family Lounge Area'],
    menuHighlights: [
      { name: 'Daily Grand Buffet', price: 'ETB 750', description: 'Unlimited access to over 30 traditional stews (wats), grilled meats, custom salads, and classic desserts.', type: 'traditional' },
      { name: 'Kitfo Special Plate', price: 'ETB 900', description: 'A massive portion of freshly minced beef seasoned with spiced butter, served with Gomen (collard greens) and Ayibe (cheese) on teff injera.', type: 'traditional' },
      { name: 'Fresh Avocado-Mango Layered Juice', price: 'ETB 180', description: 'A thick, traditional Ethiopian layered fresh fruit juice served with a squeeze of fresh lime.', type: 'beverage' }
    ],
    openingHours: [
      { days: 'Monday - Sunday', hours: '6:30 AM - 10:00 PM' }
    ],
    contact: '+251 11 515 8888',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.540188981452!2d38.76742517591646!3d9.014389689255866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b859066666667%3A0x6b4cd48a318df883!2sKazanchis%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000002!5m2!1sen!2set',
    mapDirectionsUrl: 'https://maps.google.com/?q=Kazanchis+Intercontinental+Addis+Ababa+Ethiopia',
    reviews: [
      { id: 'g1', author: 'Aster Kassa', rating: 5, date: 'May 12, 2026', comment: 'Excellent fasting buffet. The Gomen wat and Misir wat tasted exactly like home. Extremely neat and polite staff.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' },
      { id: 'g2', author: 'Dawit Hailu', rating: 4, date: 'April 20, 2026', comment: 'Ideal for team business lunches. The space is vast and can accommodate large groups easily. Great value for money.', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150' }
    ]
  },
  {
    id: 'henom',
    name: 'Henom Restaurant',
    rating: 4.4,
    reviewsCount: 156,
    location: 'Sarbet',
    address: 'Sarbet, Behind Federal Police Building, Addis Ababa',
    priceLevel: 'Budget',
    priceRange: 'ETB 300 - 700',
    categories: ['Traditional Ethiopian', 'Vegan'],
    tags: ['Budget Friendly', 'Fast Service', 'Local Favorite', 'Takeout'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Henom Restaurant is a bustling neighborhood gem in Sarbet, highly revered for serving some of the fastest, freshest, and most pocket-friendly traditional stews in Addis. Packed daily with students, office workers, and expats, it is particularly famous for its legendary "Bayenetu" (traditional fasting combination platter).',
    reviewSnippet: 'The best and cheapest Bayenetu in Addis Ababa, hands down! The flavors are deeply authentic and the service is exceptionally fast.',
    highlights: ['Legendary Bayenetu Platters', 'Fast Casual Style', 'Very Budget Friendly', 'Fresh local ingredients'],
    menuHighlights: [
      { name: 'Special Bayenetu Platter', price: 'ETB 320', description: 'An amazing visual kaleidoscope of 12 distinct traditional vegetable, lentil, and chickpea stews served on fresh warm teff injera.', type: 'traditional' },
      { name: 'Siga Firfir (Beef Firfir)', price: 'ETB 450', description: 'Torn pieces of injera thoroughly soaked in a rich, spicy beef and berbere sauce, spiced with green chili.', type: 'traditional' },
      { name: 'Traditional Spiced Shiro', price: 'ETB 280', description: 'Ground chickpeas simmered slowly with garlic, onions, and local spices, served boiling in a traditional clay pot (Shiro Tegabere).', type: 'traditional' }
    ],
    openingHours: [
      { days: 'Monday - Saturday', hours: '7:00 AM - 9:30 PM' },
      { days: 'Sunday', hours: '8:00 AM - 8:30 PM' }
    ],
    contact: '+251 922 456 789',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.8522100412853!2d38.74659617591605!3d8.988009189531518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85994ba9b769%3A0x6b8769db00000000!2sSarbet%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000003!5m2!1sen!2set',
    mapDirectionsUrl: 'https://maps.google.com/?q=Sarbet+Addis+Ababa+Ethiopia',
    reviews: [
      { id: 'h1', author: 'Brook Haileselassie', rating: 5, date: 'June 18, 2026', comment: 'This is my daily lunch spot. Incredible quality, dirt cheap, and the Shiro Tegabere is always bubbling hot.', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150' },
      { id: 'h2', author: 'Elena Rostova', rating: 4, date: 'May 04, 2026', comment: 'As a vegan, this place is heaven. The Bayenetu is delicious and so filling. Simple place but highly recommended!', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150' }
    ]
  },
  {
    id: 'alchemist',
    name: 'The Alchemist Dine & Wine',
    rating: 4.7,
    reviewsCount: 201,
    location: 'Bole',
    address: 'Rwanda Rd, Bole, Addis Ababa',
    priceLevel: 'Luxury',
    priceRange: 'ETB 1800 - 3500',
    categories: ['Fine Dining', 'Live Music'],
    tags: ['Cocktails', 'Gourmet', 'Chic', 'Romantic', 'Live Music'],
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'The Alchemist Dine & Wine represents contemporary culinary magic in Addis. Tucked away on Rwanda Road, this upscale lounge boasts a romantic dimly-lit dining hall, a glass cocktail laboratory, and an exceptional fusion menu that bridges Italian gastronomy with delicate local Ethiopian notes. It hosts exclusive live cello and jazz ensembles on weekends.',
    reviewSnippet: 'The Alchemist is an amazing sensory journey. Perfect lighting, incredible live cello performance, and cocktails that feel like pure chemistry.',
    highlights: ['Live Classical & Jazz Duets', 'Glass Mixology Bar', 'Extremely Romantic Vibe', 'Sommelier curated wines'],
    menuHighlights: [
      { name: 'Awaze Beef Tenderloin', price: 'ETB 1,980', description: 'Grilled export-grade tenderloin, marinated in awaze reduction, served with roasted rosemary fingerling potatoes and black truffle butter.', type: 'international' },
      { name: 'Truffle Shiro Ravioli', price: 'ETB 1,450', description: 'Fresh house-made pasta stuffed with smooth, velvety spiced Shiro, tossed in a light truffle cream sauce and shaved parmesan.', type: 'international' },
      { name: 'The Elixir Infusion', price: 'ETB 480', description: 'Smoked cardamom whiskey, rosemary syrup, fresh lemon, finished with dry ice tableside smoke.', type: 'beverage' }
    ],
    openingHours: [
      { days: 'Monday - Thursday', hours: '4:00 PM - 11:30 PM' },
      { days: 'Friday - Sunday', hours: '12:00 PM - 1:00 AM' }
    ],
    contact: '+251 912 345 678',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.716104279586!2d38.78363717591629!3d9.001004189498263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850d99999999%3A0x6b8de8d893f3c4e!2sBole%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000004!5m2!1sen!2set',
    mapDirectionsUrl: 'https://maps.google.com/?q=Bole+Rwanda+Addis+Ababa+Ethiopia',
    reviews: [
      { id: 'a1', author: 'Hiwot Wolde', rating: 5, date: 'June 10, 2026', comment: 'Perfect date night. The truffle shiro ravioli was an absolute revelation! Will definitely visit again.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' },
      { id: 'a2', author: 'Christopher Vance', rating: 5, date: 'May 19, 2026', comment: 'Excellent cocktails. Highly professional mixologists. A top tier upscale bar and eatery.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' }
    ]
  },
  {
    id: 'habesha2000',
    name: '2000 Habesha Cultural Restaurant',
    rating: 4.7,
    reviewsCount: 512,
    location: 'Bole',
    address: 'Bole Road, Near Friendship Building, Addis Ababa',
    priceLevel: 'Expensive',
    priceRange: 'ETB 1000 - 2000',
    categories: ['Traditional Ethiopian', 'Live Music', 'Buffet'],
    tags: ['Live Music', 'Buffet', 'Cultural Show', 'Traditional Coffee'],
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800'
    ],
    description: '2000 Habesha is Addis Ababa’s ultimate cultural dining arena. Immersive and visually spectacular, this massive circular restaurant features high-ceiling thatched roof architecture, traditional wooden low stools (Berchuma), and a giant buffet. Every single night, visitors are treated to an explosive live music and dance showcase displaying the rich choreographic heritages of Ethiopia’s different regions.',
    reviewSnippet: 'The definitive Ethiopian cultural experience. Captivating tribal dancers, spectacular food, and an amazing coffee ceremony. Essential for first-timers!',
    highlights: ['Everyday 8:00 PM Cultural Dance Show', 'All-you-can-eat Traditional Buffet', 'Live Traditional Instruments (Masinko & Kirar)', 'Clay pot Shiro & Tej Honey Wine'],
    menuHighlights: [
      { name: 'Habesha Deluxe Feast', price: 'ETB 1,450', description: 'A gorgeous, massive, multi-meat traditional platter featuring Doro Wat, Siga Wat, Kitfo, Key Wat, and various fasting stews.', type: 'traditional' },
      { name: 'Traditional Tej Wine (Large)', price: 'ETB 380', description: 'Authentic house-fermented honey wine served in traditional spherical glass flasks (Berele).', type: 'beverage' },
      { name: 'Fresh clay-pot Coffee Ceremony', price: 'ETB 150', description: 'Freshly roasted coffee beans walked to your table, brewed in a traditional clay Jebena, served with fresh popcorn.', type: 'beverage' }
    ],
    openingHours: [
      { days: 'Monday - Sunday', hours: '12:00 PM - 11:30 PM' }
    ],
    contact: '+251 11 661 6367',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.716104279586!2d38.78363717591629!3d9.001004189498263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850d99999999%3A0x6b8de8d893f3c4e!2sBole%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000005!5m2!1sen!2set',
    mapDirectionsUrl: 'https://maps.google.com/?q=Bole+Habesha+2000+Addis+Ababa+Ethiopia',
    reviews: [
      { id: 'ha1', author: 'Daniel Tedros', rating: 5, date: 'July 01, 2026', comment: 'The tribal dancing show is incredible! My foreign business partners were absolutely blown away. Food is exceptionally flavorful.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
      { id: 'ha2', author: 'Leah Kim', rating: 5, date: 'June 24, 2026', comment: 'Best evening in Addis. You sit on cute small stools, eat incredible Doro Wat with your hands, and watch high energy dancing. 10/10!', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' }
    ]
  },
  {
    id: 'lomicafe',
    name: 'Lomi Cafe & Restaurant',
    rating: 4.3,
    reviewsCount: 112,
    location: 'Piazza',
    address: 'Adwa St, Piazza, Addis Ababa',
    priceLevel: 'Budget',
    priceRange: 'ETB 200 - 500',
    categories: ['Cafes', 'Vegan'],
    tags: ['Cozy', 'Strong Coffee', 'Pastries', 'Budget Friendly'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Lomi Cafe is a cozy retro hideout in historic Piazza. Fusing Italian-colonial architectural charm with modern barista cultures, it is famous for robust Ethiopian single-origin macchiatos, fresh local lemonades (Lomi), and freshly baked sweet pastries. An ideal quiet space for digital creators and book lovers.',
    reviewSnippet: 'The best macchiato in Piazza. Incredibly cozy seating near the high arched windows, with classic pastries that melt in your mouth.',
    highlights: ['Single-Origin Macchiato', 'Aesthetic Arched Windows', 'Calm quiet atmosphere', 'Very Budget Friendly'],
    menuHighlights: [
      { name: 'Piazza Double Macchiato', price: 'ETB 90', description: 'Intense double espresso shot layered with rich, thick steamed local milk.', type: 'beverage' },
      { name: 'Lomi Sparkling Mint Lemonade', price: 'ETB 120', description: 'Freshly squeezed local lemon juice, organic wild honey, crushed mint, and sparkling water.', type: 'beverage' },
      { name: 'Cinnamon Sambusa Sweet Twist', price: 'ETB 140', description: 'Crispy fried pastry triangles stuffed with sweetened lentils, cinnamon, and organic brown honey.', type: 'dessert' }
    ],
    openingHours: [
      { days: 'Monday - Sunday', hours: '6:30 AM - 9:00 PM' }
    ],
    contact: '+251 11 111 2233',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.4079873322194!2d38.75112117591666!3d9.030588689104085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85f677777777%3A0x6b8de8d893f3c4e!2sPiazza%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000006!5m2!1sen!2set',
    mapDirectionsUrl: 'https://maps.google.com/?q=Piazza+Addis+Ababa+Ethiopia',
    reviews: [
      { id: 'lo1', author: 'Marta Hailu', rating: 5, date: 'June 05, 2026', comment: 'Fabulous macchiato. Very authentic, strong, and smooth. Piazza’s finest spot to read.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' },
      { id: 'lo2', author: 'Jonathan Miller', rating: 4, date: 'May 11, 2026', comment: 'Lovely historic building. High ceilings and peaceful vibe. The sambusa twists were surprisingly delicious!', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150' }
    ]
  },
  {
    id: 'kategna',
    name: 'Kategna Traditional Restaurant',
    rating: 4.8,
    reviewsCount: 489,
    location: 'Bole',
    address: 'Near Cameroon St, Bole, Addis Ababa',
    priceLevel: 'Moderate',
    priceRange: 'ETB 600 - 1300',
    categories: ['Traditional Ethiopian', 'Vegan'],
    tags: ['Cozy', 'Local Favorite', 'Outdoor Seating', 'Strong Coffee'],
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Kategna is legendary among Addis locals for setting the gold standard of traditional cuisine. Famed for its pristine hygiene, incredibly consistent flavors, and beautiful garden tables in Bole, it specializes in the classic "Kategna" appetizer (crispy spiced injera) and the most tender Key Wat stews in the country.',
    reviewSnippet: 'The absolute gold standard of traditional food in Addis Ababa. Incredible Kategna appetizer and the Doro Wat tasted like it was cooked for 24 hours.',
    highlights: ['Pristine Traditional Hygiene', 'Scenic Outdoor Garden Gazebos', 'Legendary Crispy Kategna Appetizer', 'Freshly Churned Herbed Butter'],
    menuHighlights: [
      { name: 'Kategna with Honey', price: 'ETB 380', description: 'Toasted crispy rolls of double-layered injera coated inside with herbed butter and mitmita spice, served with premium organic highland honey.', type: 'traditional' },
      { name: 'Special Doro Wat (Chicken Stew)', price: 'ETB 1,100', description: 'A rich, dark, slow-simmered traditional chicken stew cooked with berbere, herbed butter, cardamon, containing a tender chicken leg and a hard-boiled egg.', type: 'traditional' },
      { name: 'Boseza Kitfo (Warm Clay-Pot)', price: 'ETB 1,250', description: 'Premium beef Kitfo warmed gently in a traditional clay pot, loaded with spiced butter, cardamon, and crumbled kocho bread.', type: 'traditional' }
    ],
    openingHours: [
      { days: 'Monday - Sunday', hours: '8:00 AM - 10:30 PM' }
    ],
    contact: '+251 11 663 8383',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.716104279586!2d38.78363717591629!3d9.001004189498263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850d99999999%3A0x6b8de8d893f3c4e!2sBole%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000007!5m2!1sen!2set',
    mapDirectionsUrl: 'https://maps.google.com/?q=Bole+Kategna+Addis+Ababa+Ethiopia',
    reviews: [
      { id: 'kat1', author: 'Tsion Yohannes', rating: 5, date: 'June 20, 2026', comment: 'You cannot say you ate Ethiopian food until you eat at Kategna. The special Doro Wat is absolutely magnificent.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' },
      { id: 'kat2', author: 'Markus Weber', rating: 5, date: 'May 30, 2026', comment: 'The Kategna with honey is the best thing I have ever tasted. Outdoor garden seating is quiet and highly pleasant.', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150' }
    ]
  },
  {
    id: 'gusto',
    name: 'Gusto Ristorante',
    rating: 4.7,
    reviewsCount: 178,
    location: 'Kazanchis',
    address: 'Post Office Area, Kazanchis, Addis Ababa',
    priceLevel: 'Luxury',
    priceRange: 'ETB 1600 - 3200',
    categories: ['Fine Dining'],
    tags: ['Cozy', 'Gourmet', 'Wine Pairing', 'Romantic'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Located in Kazanchis, Gusto Ristorante is Addis Ababa’s ultimate Italian fine dining experience. Boasting authentic Italian chefs, handmade pastas, wood-fired pizzas, and exceptional seafood, the restaurant features exquisite interior woodwork, a rooftop sunset view, and a massive wine cellar housing exclusive imported vintages.',
    reviewSnippet: 'The best homemade pasta in East Africa. Beautiful romantic decor, premium services, and an amazing selection of wines.',
    highlights: ['Handmade Pasta Daily', 'Sunset Rooftop Terraces', 'Deep Imported Wine Cellar', 'Live Violin on Wednesdays'],
    menuHighlights: [
      { name: 'Lobster Fettuccine', price: 'ETB 2,100', description: 'Fresh house-made fettuccine tossed with grilled local lobster tails, cherry tomatoes, garlic, white wine, and rich lobster bisque.', type: 'international' },
      { name: 'Truffle Porcini Risotto', price: 'ETB 1,650', description: 'Slow-simmered Carnaroli rice cooked in a rich wild porcini broth, finished with white truffle oil and premium Parmigiano-Reggiano.', type: 'international' },
      { name: 'Classic Italian Tiramisu', price: 'ETB 580', description: 'Ladyfingers soaked in single-origin Tomoca espresso coffee, layered with fresh whipped mascarpone and dark cocoa powder.', type: 'dessert' }
    ],
    openingHours: [
      { days: 'Monday - Sunday', hours: '12:00 PM - 11:00 PM' }
    ],
    contact: '+251 11 557 1111',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.540188981452!2d38.76742517591646!3d9.014389689255866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b859066666667%3A0x6b4cd48a318df883!2sKazanchis%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000008!5m2!1sen!2set',
    mapDirectionsUrl: 'https://maps.google.com/?q=Kazanchis+Addis+Ababa+Ethiopia',
    reviews: [
      { id: 'gu1', author: 'Netsanet Kebede', rating: 5, date: 'June 08, 2026', comment: 'Exceptional. The lobster pasta is absolute perfection. Gusto is the gold standard for Italian in Ethiopia.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' },
      { id: 'gu2', author: 'Alberto Rossi', rating: 5, date: 'May 14, 2026', comment: 'As an Italian expat, I am very picky. The porcini risotto here is as authentic as anything in Milan. Bravissimo!', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' }
    ]
  },
  {
    id: 'tomoca',
    name: 'Tomoca Coffee (Bole Branch)',
    rating: 4.9,
    reviewsCount: 612,
    location: 'Bole',
    address: 'Cameroon St, Bole, Addis Ababa (Near Airport Road)',
    priceLevel: 'Budget',
    priceRange: 'ETB 80 - 200',
    categories: ['Cafes'],
    tags: ['Cozy', 'Strong Coffee', 'Local Favorite', '24/7'],
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'TO.MO.CA. is the first and oldest coffee roasting company in Addis Ababa, established in 1953. Operating multiple branches, this elegant Bole branch is famed for its authentic standing coffee counters, incredible golden crema macchiatos, and packages of freshly roasted premium Ethiopian Arabica coffee bags shipped worldwide. An absolute pilgrimage for coffee aficionados.',
    reviewSnippet: 'The absolute legendary standard of coffee. A beautiful standing bar, incredible deep aromas, and a macchiato that will change your life.',
    highlights: ['Iconic 1953 Vintage Espresso Roast', 'Standing Italian-Style Coffee Bar', 'Premium Coffee Bag Sales', 'Incredibly Rich Crema'],
    menuHighlights: [
      { name: 'Macchiato Speciale', price: 'ETB 80', description: 'Famous concentrated standing coffee layered with rich thick golden foam.', type: 'beverage' },
      { name: 'Tomoca Espresso Single', price: 'ETB 70', description: 'A bold, fruity single-origin shot roasted in-house from premium Harar Arabica beans.', type: 'beverage' },
      { name: 'Traditional Honey Macchiato', price: 'ETB 110', description: 'Rich double macchiato finished with a swirl of organic wild Ethiopian honey.', type: 'beverage' }
    ],
    openingHours: [
      { days: 'Monday - Sunday', hours: '6:00 AM - 10:00 PM' }
    ],
    contact: '+251 11 111 5353',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.716104279586!2d38.78363717591629!3d9.001004189498263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850d99999999%3A0x6b8de8d893f3c4e!2sBole%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000009!5m2!1sen!2set',
    mapDirectionsUrl: 'https://maps.google.com/?q=Bole+Tomoca+Addis+Ababa+Ethiopia',
    reviews: [
      { id: 'to1', author: 'Elias Tesfaye', rating: 5, date: 'July 05, 2026', comment: 'I have been drinking Tomoca since I was a teenager. It is the best espresso in the world, full stop.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
      { id: 'to2', author: 'Emma Watson', rating: 5, date: 'June 17, 2026', comment: 'The standing coffee bar has so much history and character. The macchiato is incredibly strong and satisfying!', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' }
    ]
  }
];
