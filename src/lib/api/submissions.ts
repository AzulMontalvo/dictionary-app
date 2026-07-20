import { apiFetch } from '@/lib/api/client';
import { SubmissionSummary, SubmissionDetail } from '@/types';

export interface NewSubmissionRequest {
  word: string;
  definition: string;
  extraInformation?: string;
  example?: string;
  etymology?: string;
  category: number;
}

export const submissionsApi = {
  getMine(): Promise<SubmissionSummary[]> {
    return apiFetch<SubmissionSummary[]>('/submissions/my', { auth: true });
  },

  getById(id: number): Promise<SubmissionDetail> {
    return apiFetch<SubmissionDetail>(`/submissions/${id}`, { auth: true });
  },

  create(data: NewSubmissionRequest): Promise<SubmissionDetail> {
    return apiFetch<SubmissionDetail>('/submissions', {
      method: 'POST',
      auth: true,
      body: JSON.stringify(data),
    });
  },
};