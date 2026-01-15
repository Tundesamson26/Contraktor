import { describe, it, expect } from 'vitest';
import { mockApi } from '@/lib/mock-api';

describe('Mock API', () => {
  it('should filter artisans by search term', async () => {
    const result = await mockApi.getArtisans(1, 8, 'James Wilson');
    
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every(a => a.name.includes('James Wilson'))).toBe(true);
  });

  it('should filter artisans by trade', async () => {
    const result = await mockApi.getArtisans(1, 8, '', 'Plumber');
    
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every(a => a.trade === 'Plumber')).toBe(true);
  });

  it('should return paginated results', async () => {
    const page1 = await mockApi.getArtisans(1, 8);
    const page2 = await mockApi.getArtisans(2, 8);
    
    expect(page1.data.length).toBe(8);
    expect(page2.data.length).toBe(8);
    expect(page1.data[0].id).not.toBe(page2.data[0].id);
  });

  it('should submit service request successfully', async () => {
    const request = {
      artisanId: 'artisan-1',
      clientName: 'John Doe',
      clientEmail: 'john@example.com',
      details: 'Need plumbing work',
      date: '2026-01-20',
    };

    const result = await mockApi.submitRequest(request);
    expect(result.success).toBe(true);
  });
});
