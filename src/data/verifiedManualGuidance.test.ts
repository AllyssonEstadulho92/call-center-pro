import { describe, expect, it } from 'vitest';
import { procedures } from './knowledge';
import { publicSources } from './publicSources';
import { factsForProject, procedureDeepDives, verifiedManualFacts } from './verifiedManualGuidance';

describe('aprofundamento dos manuais com rastreabilidade', () => {
  it('cobre os 17 assuntos existentes, sem alterar a validação dos guiões', () => {
    expect(procedures).toHaveLength(17);
    expect(Object.keys(procedureDeepDives).sort()).toEqual(procedures.map(p=>p.id).sort());
    for (const p of procedures) {
      const detail = procedureDeepDives[p.id];
      expect(detail.questions.length).toBeGreaterThanOrEqual(3);
      expect(detail.meaning.length).toBeGreaterThan(55);
      expect(detail.howToProceed.length).toBeGreaterThan(60);
      expect(p.status).not.toBe('validado');
      expect(p.lastValidated).toBeNull();
    }
  });
  it('vincula cada facto verificado a uma fonte pública existente', () => {
    const ids = new Set(publicSources.map(s => s.id));
    for (const fact of verifiedManualFacts) {
      expect(ids.has(fact.sourceId)).toBe(true);
      expect(fact.limitation.length).toBeGreaterThan(60);
    }
    expect(factsForProject('coca-cola')).toContainEqual(expect.objectContaining({id:'data-minimization'}));
    expect(factsForProject('burger-king')).not.toContainEqual(expect.objectContaining({id:'cc-consumer-contact'}));
  });
});
