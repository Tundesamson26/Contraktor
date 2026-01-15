import { Artisan, AnalyticsData, ServiceRequest } from "@/types";

const MOCK_ARTISANS: Artisan[] = Array.from({ length: 24 }).map((_, i) => ({
  id: `artisan-${i + 1}`,
  name: `Artisan ${i + 1}`,
  trade: ["Plumber", "Electrician", "Carpenter", "Painter"][i % 4],
  rating: 3 + (i % 20) / 10, // 3.0 to 4.9
  location: ["New York", "London", "San Francisco", "Berlin"][i % 4],
  availability: i % 3 !== 0,
  avatar: `https://i.pravatar.cc/150?u=artisan-${i + 1}`,
  bio: "Experienced professional with over 10 years in the field.",
  portfolio: [
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1595841696662-50d4d7756f64?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
  ]
}));

const MOCK_ANALYTICS: AnalyticsData[] = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
        date: d.toLocaleDateString('en-US', { weekday: 'short' }),
        count: Math.floor(Math.random() * 20) + 5
    };
});

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async getArtisans(page = 1, limit = 8, search = "", tradeFilter = ""): Promise<{ data: Artisan[], total: number }> {
    await delay(800);
    let filtered = MOCK_ARTISANS;

    if (search) {
        const lowerSearch = search.toLowerCase();
        filtered = filtered.filter(a => a.name.toLowerCase().includes(lowerSearch) || a.trade.toLowerCase().includes(lowerSearch));
    }
    
    if (tradeFilter && tradeFilter !== 'All') {
        filtered = filtered.filter(a => a.trade === tradeFilter);
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    
    return {
        data: filtered.slice(start, end),
        total: filtered.length
    };
  },

  async getArtisanById(id: string): Promise<Artisan | undefined> {
    await delay(500);
    return MOCK_ARTISANS.find(a => a.id === id);
  },

  async submitRequest(request: ServiceRequest): Promise<{ success: boolean }> {
    await delay(1500);
    console.log("Request Submitted:", request);
    return { success: true };
  },

  async getAnalytics(): Promise<AnalyticsData[]> {
    await delay(600);
    return MOCK_ANALYTICS;
  }
};
