export interface Artisan {
  id: string;
  name: string;
  trade: string; // e.g. "Plumber", "Electrician"
  rating: number; // 0-5
  location: string;
  availability: boolean;
  avatar: string;
  bio: string;
  portfolio: string[]; // Image URLs
}

export interface ServiceRequest {
  artisanId: string;
  clientName: string;
  clientEmail: string;
  details: string;
  date: string;
}

export interface AnalyticsData {
  date: string;
  count: number;
}
