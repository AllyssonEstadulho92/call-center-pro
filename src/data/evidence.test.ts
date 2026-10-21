import { describe, expect, it } from 'vitest';
import { confirmedPublicClaims, getEvidenceSummary, pendingOperationalGaps, sourceReviewDate } from './evidence';
import { publicSources } from './publicSources';
import { procedures } from './knowledge';

describe('revisão de fontes e conteúdo operacional', () => {
  it('guarda identificadores e datas de revisão únicas, sem fontes fictícias', () => {
    expect(sourceReviewDate).toBe('22/10/2026');
    expect(new Set(publicSources.map(source => source.id)).size).toBe(publicSources.length);
    expect(publicSources.every(source => source.confirmed === sourceReviewDate)).toBe(true);
    expect(publicSources.every(source => source.url.startsWith('https://') && source.limitation.length > 30)).toBe(true);
  });
  it('cada facto público possui uma fonte existente e um limite explícito', () => {
    expect(confirmedPublicClaims.length).toBeGreaterThanOrEqual(4);
    for (const claim of confirmedPublicClaims) {
      expect(claim.reviewedOn).toBe(sourceReviewDate);
      expect(claim.limitation.length).toBeGreaterThan(25);
      expect(claim.sourceIds.length).toBeGreaterThan(0);
      expect(claim.sourceIds.every(id => publicSources.some(source => source.id === id))).toBe(true);
    }
  });
  it('não trata guiões de formação como procedimentos aprovados', () => {
    const result = getEvidenceSummary();
    expect(result.availableProcedures).toBe(procedures.length);
    expect(result.validatedProcedures).toBe(0);
    expect(result.publicClaims).toBe(confirmedPublicClaims.length);
    expect(result.pendingOperationalAreas).toBe(pendingOperationalGaps.length);
    expect(pendingOperationalGaps.every(gap => gap.validationNeeded.length > 40)).toBe(true);
  });
  it('não afirma impossibilidade de acesso a pedidos digitais sem validação', () => {
    const digital = procedures.find(p => p.id === 'bk-app');
    expect(digital).toBeDefined();
    expect(digital!.steps.some(step => step.say.includes('não tenho acesso'))).toBe(false);
    expect(digital!.steps.some(step => step.verify.includes('procedimento'))).toBe(true);
  });
});
