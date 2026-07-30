import { apiFetch } from '@/lib/api/client';
import { TermSummary, TermDetail } from '@/types';

export const termsApi = {
  // getAll(): Promise<TermSummary[]> {
  //   return apiFetch<TermSummary[]>('/terms');
  // },

  getDailyWord(): Promise<TermSummary> {
    return apiFetch<TermSummary>(`/terms/daily-word`);
  },

  getPublicTermById(id: number): Promise<TermDetail> {
    return apiFetch<TermDetail>(`/terms/${id}`);
  },

  getTermsByEtymology(etymology: string): Promise<TermSummary[]> {
    return apiFetch<TermSummary[]>(`/terms/etymology/${etymology}`)
  },

  getTerms(query?: string, category?: number, orderBy?: string): Promise<TermSummary[]> {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (category) params.set('category', String(category));
    if (orderBy) params.set('orderBy', orderBy);
    
    const qs = params.toString();
    return apiFetch<TermSummary[]>(`/terms${qs ? `?${qs}` : ''}`);
  },
};