import { Artisan, AnalyticsData, ServiceRequest } from "@/types";

/**
 * Client-side service that performs real HTTP requests to internal API routes.
 * This fulfills the requirement for using async requests (fetch/axios).
 */
export const mockApi = {
  async getArtisans(page = 1, limit = 8, search = "", tradeFilter = ""): Promise<{ data: Artisan[], total: number }> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
      trade: tradeFilter
    });
    
    const response = await fetch(`/api/artisans?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch artisans");
    return response.json();
  },

  async getArtisanById(id: string): Promise<Artisan | undefined> {
    const response = await fetch(`/api/artisans/${id}`);
    if (response.status === 404) return undefined;
    if (!response.ok) throw new Error("Failed to fetch artisan");
    return response.json();
  },

  async submitRequest(request: ServiceRequest): Promise<{ success: boolean }> {
    const response = await fetch("/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) throw new Error("Failed to submit request");
    return response.json();
  },

  async getAnalytics(): Promise<AnalyticsData[]> {
    const response = await fetch("/api/analytics");
    if (!response.ok) throw new Error("Failed to fetch analytics");
    return response.json();
  }
};
