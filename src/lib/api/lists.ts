import { apiFetch } from '@/lib/api/client';
import { ListSummary, ListDetail, FeaturedListCategories } from '@/types';

export const listsApi = {

  getFeaturedLists():  Promise<FeaturedListCategories>{
    return apiFetch<FeaturedListCategories>('/lists/featured');
  },

  getAll(): Promise<ListSummary[]> {
    return apiFetch<ListSummary[]>('/lists/public');
  },

  getListById(id: number): Promise<ListDetail> {
    return apiFetch<ListDetail>(`/lists/${id}`);
  },

  create(name: string): Promise<ListSummary> {
    return apiFetch<ListSummary>('/lists', {
      method: 'POST',
      auth: true,
      body: JSON.stringify({ name }),
    });
  },

  rename(id: number, newName: string): Promise<ListSummary> {
    return apiFetch<ListSummary>(`/lists/${id}/rename`, {
      method: 'PATCH',
      auth: true,
      body: JSON.stringify(newName),
    });
  },

  delete(id: number): Promise<void> {
    return apiFetch<void>(`/lists/${id}`, {
      method: 'DELETE',
      auth: true,
    });
  },

  addTerm(listId: number, termId: number): Promise<void> {
    return apiFetch<void>(`/lists/${listId}/terms`, {
      method: 'POST',
      auth: true,
      body: JSON.stringify({ termId }),
    });
  },

  removeTerm(listId: number, termId: number): Promise<void> {
    return apiFetch<void>(`/lists/${listId}/terms/${termId}`, {
      method: 'DELETE',
      auth: true,
    });
  },
};