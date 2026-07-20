import { apiFetch } from '@/lib/api/client';
import { SubmissionSummary, SubmissionDetail } from '@/types';

export const adminSubmissionsApi = {
  getAll(statusId?: number): Promise<SubmissionSummary[]> {
    const query = statusId !== undefined ? `?status=${statusId}` : '';
    return apiFetch<SubmissionSummary[]>(`/admin/submissions${query}`, { auth: true });
  },

  getById(id: number): Promise<SubmissionDetail> {
    return apiFetch<SubmissionDetail>(`/admin/submissions/${id}`, { auth: true });
  },

  approve(id: number): Promise<{ message: string; targetTermId: number }> {
    return apiFetch(`/admin/submissions/${id}/approve`, {
      method: 'PUT',
      auth: true,
    });
  },

  reject(id: number): Promise<{ message: string }> {
    return apiFetch(`/admin/submissions/${id}/reject`, {
      method: 'PUT',
      auth: true,
    });
  },
};