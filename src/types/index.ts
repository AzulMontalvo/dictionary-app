export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiration: string;
  roles: string[];
}

export interface TermSummary {
  id: number;
  word: string;
  definition: string;
  category: number;
}

export interface TermDetail {
  id: number;
  word: string;
  definition: string;
  extraInformation?: string;
  example?: string;
  etymology?: string;
  category: number;
  tags: string[];
  relations: TermRelation[];
}

export interface TermSummaryPrivate {
  id: number;
  word: string;
  definition: string;
  category: number;
  isVisible: boolean;
  creationDate: string;
}

export interface TermDetailPrivate extends TermDetail {
  creationDate: string;
  updatedAt?: string;
  isVisible: boolean;
  videoUrl?: string;
}

export interface TermRelation {
  relatedTermId: number;
  relatedTermWord: string;
  relationType: number;
}

export interface ListSummary {
  id: number;
  name: string;
  termCount: number;
  description: string;
  creationDate: string;
}

export interface ListDetail {
  id: number;
  name: string;
  termCount: number;
  description: string;
  creationDate: string;
  terms: TermSummary[];
}

export interface FeaturedListCategories {
  starter: ListSummary | null;
  weeklyHistory: ListSummary | null;
  selection: ListSummary | null;
  special: ListSummary | null;
}

export interface SubmissionSummary {
  id: number;
  userName: string;
  word: string;
  creationDate: string;
  statusId: number;
}

export interface SubmissionDetail extends SubmissionSummary {
  definition: string;
  extraInformation?: string;
  example?: string;
  etymology?: string;
  category: number;
}