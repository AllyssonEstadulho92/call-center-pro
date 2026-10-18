import type { Procedure, Project } from '../types';

export function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

/** Pesquisa sem acentos, mantendo a ordem inicial quando não existe filtro. */
export function searchProcedures(items: Procedure[], query: string, filter: Project | 'todos' = 'todos'): Procedure[] {
  const phrase = normalize(query);
  const terms = phrase.split(/\s+/).filter(Boolean);
  const scored = items.map((item, index) => {
    if (filter !== 'todos' && item.project !== filter) return null;
    if (!terms.length) return { item, index, rank: 0 };
    const title = normalize(item.title);
    const category = normalize(item.category);
    const aliases = normalize(item.aliases.join(' '));
    const summary = normalize(item.summary);
    const steps = normalize(item.steps.map(s => `${s.title} ${s.say}`).join(' '));
    const complete = [title, category, aliases, summary, steps].join(' ');
    if (!terms.every(term => complete.includes(term))) return null;
    const rank = (title.includes(phrase) ? 10 : 0)
      + (aliases.includes(phrase) ? 8 : 0)
      + terms.reduce((score, term) => score + (title.includes(term) ? 4 : 0)
        + (aliases.includes(term) ? 3 : 0) + (category.includes(term) ? 2 : 0)
        + (summary.includes(term) ? 1 : 0), 0);
    return { item, index, rank };
  }).filter((result): result is {item: Procedure; index: number; rank: number} => result !== null);
  scored.sort((a, b) => b.rank - a.rank || a.index - b.index);
  return scored.map(result => result.item);
}
