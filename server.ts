import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { RESTAURANTS } from './src/data/restaurants.js'; // Use .js extension for ES Module path resolution safety

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API lazily and check if API key exists
let aiInstance: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      console.warn('WARNING: GEMINI_API_KEY environment variable is missing or using default. Falling back to rule-based engine.');
      return null;
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// RESTAURANT API ENDPOINTS
app.get('/api/restaurants', (req, res) => {
  res.json(RESTAURANTS);
});

// AI SMART RECOMMENDATIONS ENGINE
app.post('/api/recommendations', async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const ai = getGemini();

  // Clean the restaurant info for prompt to save tokens
  const simplifiedRestaurants = RESTAURANTS.map(r => ({
    id: r.id,
    name: r.name,
    location: r.location,
    categories: r.categories,
    tags: r.tags,
    priceLevel: r.priceLevel,
    priceRange: r.priceRange,
    description: r.description,
    reviewSnippet: r.reviewSnippet
  }));

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `User search query: "${query}"

Here is the database of restaurants in Addis Ababa, Ethiopia:
${JSON.stringify(simplifiedRestaurants, null, 2)}

Provide up to 3 restaurant recommendations that best fit the user's query. Return the results in a structured JSON schema. The reasoning should be specific, warm, and highlight details about the food, atmosphere, or location from the description that match the user's request. Add a friendly introductory summary addressing their search.`,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: 'You are Amara, the premium AI Recommendation Assistant for Ethiopia Best Restaurants Explorer. Analyze queries and match them with the provided restaurant dataset accurately.',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    restaurantId: { type: Type.STRING, description: 'The exact id of the recommended restaurant (e.g., meskott, cravings, habesha2000, kategna).' },
                    reason: { type: Type.STRING, description: 'A highly specific, friendly 1-2 sentence reason explaining why this restaurant fits the user’s query.' }
                  },
                  required: ['restaurantId', 'reason']
                }
              },
              aiSummary: { type: Type.STRING, description: 'A brief, encouraging intro summary tailored to the user’s search (e.g. "For a traditional Ethiopian feast with live music, these spots in Addis Ababa are exceptional:")' }
            },
            required: ['recommendations', 'aiSummary']
          }
        }
      });

      const responseText = response.text;
      if (responseText) {
        const result = JSON.parse(responseText.trim());
        return res.json(result);
      }
    } catch (error) {
      console.error('Error generating Gemini recommendations:', error);
    }
  }

  // Graceful Fallback rule-based matching if Gemini is not set up or fails
  console.log('Running fallback matching for: ', query);
  const lowercaseQuery = query.toLowerCase();
  
  // Simple heuristic matching
  const matches = RESTAURANTS.filter(r => {
    return (
      r.name.toLowerCase().includes(lowercaseQuery) ||
      r.location.toLowerCase().includes(lowercaseQuery) ||
      r.categories.some(c => c.toLowerCase().includes(lowercaseQuery)) ||
      r.tags.some(t => t.toLowerCase().includes(lowercaseQuery)) ||
      r.description.toLowerCase().includes(lowercaseQuery)
    );
  }).slice(0, 3);

  // If no direct matches, return general top-rated
  const finalMatches = matches.length > 0 ? matches : RESTAURANTS.slice(0, 3);

  const recommendations = finalMatches.map(r => {
    let reason = `We highly recommend ${r.name} in ${r.location} for its premium dining atmosphere, excellent ${r.priceLevel.toLowerCase()} pricing, and signature dishes.`;
    if (lowercaseQuery.includes('traditional') || lowercaseQuery.includes('injera') || lowercaseQuery.includes('food')) {
      reason = `${r.name} is exceptional for authentic Ethiopian cuisine, serving magnificent stews like Doro Wat and herbed butter delicacies in a beautiful setting.`;
    } else if (lowercaseQuery.includes('cafe') || lowercaseQuery.includes('coffee') || lowercaseQuery.includes('macchiato')) {
      reason = `If you are looking for a great brew, ${r.name} serves amazing rich single-origin Ethiopian coffee with fantastic aromas and cozy interiors.`;
    } else if (lowercaseQuery.includes('music') || lowercaseQuery.includes('jazz') || lowercaseQuery.includes('night')) {
      reason = `${r.name} is famous for its vibrant evening atmosphere, spectacular live musicians, and signature cocktails.`;
    } else if (lowercaseQuery.includes('vegan') || lowercaseQuery.includes('fasting')) {
      reason = `${r.name} is a paradise for plant-based food, offering delicious and healthy "Bayenetu" fasting stews on teff injera.`;
    }
    return {
      restaurantId: r.id,
      reason
    };
  });

  const aiSummary = matches.length > 0
    ? `I found some excellent spots in Addis Ababa matching your search for "${query}":`
    : `Based on your interest in Addis Ababa's dining scene, I highly recommend exploring these trending favorites:`;

  return res.json({
    recommendations,
    aiSummary
  });
});

// AI CHAT CONCIERGE ASSISTANT
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Conversation history is required' });
  }

  const ai = getGemini();

  // Simplified restaurant details to inject into Gemini context
  const restaurantContext = RESTAURANTS.map(r => ({
    id: r.id,
    name: r.name,
    location: r.location,
    categories: r.categories,
    tags: r.tags,
    priceLevel: r.priceLevel,
    priceRange: r.priceRange,
    description: r.description,
    menu: r.menuHighlights.map(m => m.name).join(', '),
    highlights: r.highlights.join(', ')
  }));

  if (ai) {
    try {
      // Map frontend messages structure to Gemini structure
      const contents = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: `You are Amara, the elite AI dining concierge and tour guide for the "Ethiopia Best Restaurants Explorer".
Your tone is incredibly warm, professional, cultured, and enthusiastic about Ethiopian culinary heritage.

Guidelines:
1. Speak knowledgeably about authentic Ethiopian cuisine (Injera, Tibs, Shiro, Doro Wat, Kitfo, Tej wine, and traditional Jebena coffee ceremonies).
2. Recommend specific restaurants ONLY from our curated Addis Ababa dataset:
${JSON.stringify(restaurantContext, null, 2)}
3. If a restaurant from our dataset is a good match, you MUST include its exact ID (e.g. 'meskott', 'cravings', 'kategna', 'habesha2000', 'lomicafe', 'gusto', 'alchemist', 'goldenplate', 'henom', 'tomoca') in the 'suggestedRestaurantIds' array of the JSON response. This allows the UI to display interactive cards for them.
4. Keep replies concise, engaging, and structured with markdown line breaks where helpful.
5. Strictly return your response in the JSON schema requested.`,
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: { type: Type.STRING, description: 'The conversational response from Amara. Enthusiastic, helpful, cultured, and friendly.' },
              suggestedRestaurantIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'The exact matching restaurant IDs from the dataset that you mentioned or recommended in this response (e.g. ["meskott", "kategna"]). Empty array if none apply.'
              }
            },
            required: ['reply', 'suggestedRestaurantIds']
          }
        }
      });

      const responseText = response.text;
      if (responseText) {
        const result = JSON.parse(responseText.trim());
        return res.json(result);
      }
    } catch (error) {
      console.error('Error generating Gemini chat response:', error);
    }
  }

  // Graceful Fallback if Gemini fails or is missing
  const lastUserMessage = messages[messages.length - 1]?.text || '';
  const lowercaseMsg = lastUserMessage.toLowerCase();

  let reply = `Hello! I am Amara, your dining concierge. It is wonderful to chat with you! `;
  let suggestedRestaurantIds: string[] = [];

  if (lowercaseMsg.includes('traditional') || lowercaseMsg.includes('injera') || lowercaseMsg.includes('doro') || lowercaseMsg.includes('ethiopian')) {
    reply += `Ethiopian food is a beautiful communal art. I highly suggest visiting **Kategna Traditional Restaurant** in Bole for its pristine classic dishes like Doro Wat and its crispy Kategna appetizer with honey, or **2000 Habesha Cultural Restaurant** for an amazing buffet alongside a breathtaking evening of traditional regional dances.`;
    suggestedRestaurantIds = ['kategna', 'habesha2000'];
  } else if (lowercaseMsg.includes('coffee') || lowercaseMsg.includes('cafe') || lowercaseMsg.includes('macchiato')) {
    reply += `Addis Ababa is the coffee capital of the world! You must experience **Tomoca Coffee** in Bole for their historic, rich, Italian-style standing bar and legendary double macchiato. If you are exploring historic Piazza, **Lomi Cafe** is a serene vintage space with gorgeous arched windows and organic iced honey pastries.`;
    suggestedRestaurantIds = ['tomoca', 'lomicafe'];
  } else if (lowercaseMsg.includes('fine') || lowercaseMsg.includes('luxury') || lowercaseMsg.includes('expensive') || lowercaseMsg.includes('fancy') || lowercaseMsg.includes('romantic')) {
    reply += `For a truly exceptional evening, **Meskott Culinary Experience** in Kazanchis serves elevated modern adaptations of African heritage stews in an artistic gallery setting. If you want a romantic vibe with live cellos and craft cocktails, **The Alchemist Dine & Wine** in Bole is spectacular. And **Gusto Ristorante** provides world-class fine-dining Italian pastas.`;
    suggestedRestaurantIds = ['meskott', 'alchemist', 'gusto'];
  } else if (lowercaseMsg.includes('vegan') || lowercaseMsg.includes('fasting') || lowercaseMsg.includes('cheap') || lowercaseMsg.includes('budget') || lowercaseMsg.includes('shiro')) {
    reply += `If you want amazing plant-based fasting stews, **Henom Restaurant** in Sarbet is local legend. Their "Special Bayenetu" platter is a spectacular rainbow of 12 vegetable and legume stews, and their hot clay-pot Shiro is incredibly pocket-friendly!`;
    suggestedRestaurantIds = ['henom'];
  } else if (lowercaseMsg.includes('music') || lowercaseMsg.includes('jazz') || lowercaseMsg.includes('bar') || lowercaseMsg.includes('live')) {
    reply += `For live music, **Cravings Restaurant & Bar** in Bole is incredibly vibrant, featuring live Ethio-Jazz bands and signature spiced cocktails. Of course, **2000 Habesha** also offers high-energy traditional cultural shows nightly!`;
    suggestedRestaurantIds = ['cravings', 'habesha2000'];
  } else {
    reply += `How can I help guide your culinary tour of Addis Ababa today? Feel free to ask me for traditional Ethiopian stews, cozy cafes, upscale romantic dining, vegan fasting spots, or lively venues with Ethio-Jazz!`;
  }

  return res.json({
    reply,
    suggestedRestaurantIds
  });
});

// VITE SERVER OR PRODUCTION STATIC SERVING MIDDLEWARE
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ethiopia Best Restaurants Explorer server running on http://localhost:${PORT}`);
  });
}

startServer();
