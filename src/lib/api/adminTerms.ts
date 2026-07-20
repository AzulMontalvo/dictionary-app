import { apiFetch } from '@/lib/api/client';
import { TermSummaryPrivate, TermDetailPrivate } from '@/types';

export interface NewTermRequest {
  word: string;
  definition: string;
  extraInformation?: string;
  example?: string;
  etymology?: string;
  category: number;
  tags?: string[];
  relations?: { relatedTermId: number; relationType: number }[];
  videoUrl?: string;
}

export const adminTermsApi = {
  getAll(): Promise<TermSummaryPrivate[]> {
    return apiFetch<TermSummaryPrivate[]>('/admin/terms', { auth: true });
  },

  getById(id: number): Promise<TermDetailPrivate> {
    return apiFetch<TermDetailPrivate>(`/admin/terms/${id}`, { auth: true });
  },

  create(data: NewTermRequest): Promise<TermDetailPrivate> {
    return apiFetch<TermDetailPrivate>('/admin/terms', {
      method: 'POST',
      auth: true,
      body: JSON.stringify(data),
    });
  },

  update(id: number, data: NewTermRequest): Promise<TermDetailPrivate> {
    return apiFetch<TermDetailPrivate>(`/admin/terms/${id}`, {
      method: 'PUT',
      auth: true,
      body: JSON.stringify(data),
    });
  },

  toggleVisibility(id: number): Promise<void> {
    return apiFetch<void>(`/admin/terms/${id}/toggle-visibility`, {
      method: 'PUT',
      auth: true,
    });
  },

  delete(id: number): Promise<void> {
    return apiFetch<void>(`/admin/terms/${id}`, {
      method: 'DELETE',
      auth: true,
    });
  },

  search(query: string): Promise<TermSummaryPrivate[]> {
    return apiFetch<TermSummaryPrivate[]>(
      `/admin/terms/search?q=${encodeURIComponent(query)}`,
      { auth: true }
    );
  },
};