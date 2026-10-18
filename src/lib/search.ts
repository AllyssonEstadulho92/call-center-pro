import type { Procedure, Project } from '../types';

export function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

export function searchProcedures(items: Procedure[], query: string, filter: Project | 'todos' = 'todos'): Procedure[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return items.filter((item) => {
    if (filter !== 'todos' && item.project !== filter) return false;
    const searchText = normalize([item.title, item.category, item.summary, ...item.aliases, ...item.steps.map((s) => `${s.title} ${s.say}`)].join(' '));
    return terms.every((term) => searchText.includes(term));
  });
}
