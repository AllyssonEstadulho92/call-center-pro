import { describe, expect, it } from 'vitest';
import { procedures } from '../data/knowledge';
import { findQuickStep } from './quickAnswers';

describe('respostas rápidas com origem rastreável', () => {
  it('usa sempre frases que existem nos guiões originais', () => {
    for (const procedure of procedures) {
      const picked = findQuickStep(procedure);
      expect(procedure.steps).toContain(picked);
      expect(picked.say.length).toBeGreaterThan(10);
    }
  });
  it('apresenta perguntas de diagnóstico em vez de repetir a abertura', () => {
    const cooling = procedures.find(item => item.id === 'cc-nao-refrigera');
    expect(cooling).toBeDefined();
    expect(findQuickStep(cooling!).id).toBe('problema');
  });
  it('não promove para validado qualquer guião de treino', () => {
    expect(procedures.every(procedure => procedure.status !== 'validado')).toBe(true);
  });
});
