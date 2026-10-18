import { describe, expect, it } from 'vitest';
import { getManualTopics } from './manuals';
import { getProcedureSources, publicSources } from './publicSources';

describe('fontes e limites dos manuais', () => {
  it('identifica todos os procedimentos dos dois serviços como não validados', () => {
    for (const project of ['coca-cola','burger-king'] as const) {
      expect(getManualTopics(project).every(p => p.status !== 'validado')).toBe(true);
      expect(getManualTopics(project).every(p => p.steps.every(s => s.say && s.verify && s.avoid))).toBe(true);
    }
  });
  it('associa fontes a capítulos sem validar as regras internas', () => {
    expect(getProcedureSources('cc-nao-refrigera')).toEqual([]);
    expect(getProcedureSources('bk-app').some(src => src.id === 'bk-suporte')).toBe(true);
    expect(publicSources.every(src => src.url.startsWith('https://') && src.limitation.length > 15)).toBe(true);
  });
});
