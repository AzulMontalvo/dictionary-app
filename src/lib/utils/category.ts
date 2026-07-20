const CATEGORY_CONFIG: Record<number, { label: string }> = {
  0: { label: '' },
  1: { label: 'Sustantivo' },
  2: { label: 'Verbo' },
  3: { label: 'Adjetivo' },
  4: { label: 'Adverbio' },
  5: { label: 'Conectores' },
  6: { label: 'Otro' },
};

export function categoryLabel(category: number): string {
  return CATEGORY_CONFIG[category]?.label ?? '';
}

// export function categoryColor(category: number): string {
//   return CATEGORY_CONFIG[category]?.backgroundColor ?? '#95a5a6';
// }

// export function categoryTextColor(category: number): string {
//   return CATEGORY_CONFIG[category]?.color ?? '#FFFFFF';
// }