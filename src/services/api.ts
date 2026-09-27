import type { ApiResponse } from '../types';

export const apiClient = {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message || 'Unknown error' };
    }
  },

  async post<T>(url: string, body: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message || 'Unknown error' };
    }
  },
};
