const RELATION_LABELS: Record<number, string> = {
  0: 'Sinónimo',
  1: 'Antónimo',
  2: 'Similar',
};

export function relationLabel(type: number): string {
  return RELATION_LABELS[type] ?? 'Relacionado';
}