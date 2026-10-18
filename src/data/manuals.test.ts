import { describe, expect, it } from 'vitest';
import { procedures } from './knowledge';
import { publicSources } from './publicSources';
import { getManualCategories, getManualGuide, getManualTopics, manualGuides } from './manuals';

describe('manuais separados e rastreáveis', () => {
  it('contém dois manuais independentes', () => {
    expect(Object.keys(manualGuides).sort()).toEqual(['burger-king', 'coca-cola']);
    expect(getManualGuide('coca-cola').title).toContain('Coca-Cola');
    expect(getManualGuide('burger-king').title).toContain('Burger King');
  });
  it('mostra os capítulos disponíveis sem perder nenhum guião', () => {
    for (const project of ['coca-cola', 'burger-king'] as const) {
      const topics = getManualTopics(project);
      expect(topics.length).toBe(procedures.filter(p => p.project === project).length);
      expect(topics.every(p => p.project === project)).toBe(true);
      expect(getManualCategories(project)).toContain('Todas');
    }
  });
  it('pesquisa expressões com acentos ou categorias e mantém os serviços separados', () => {
    expect(getManualTopics('coca-cola', 'não faz frio').some(p => p.id === 'cc-nao-refrigera')).toBe(true);
    expect(getManualTopics('burger-king', 'pedido incompleto').some(p => p.id === 'bk-incompleto')).toBe(true);
    expect(getManualTopics('burger-king', '', 'Refrigeração')).toEqual([]);
  });
  it('aponta apenas para fontes públicas conhecidas e não promove guiões a validados', () => {
    for (const guide of Object.values(manualGuides)) {
      expect(guide.phases.length).toBe(6);
      expect(guide.phases.every(phase => phase.guidance && phase.notice)).toBe(true);
      expect(guide.factIds.every(id => publicSources.some(src => src.id === id))).toBe(true);
      expect(guide.frequentlyAsked.every(faq => faq.status === 'exemplo' || faq.status === 'informacao-publica')).toBe(true);
    }
    expect(procedures.every(p => p.status !== 'validado' && p.lastValidated === null)).toBe(true);
  });
});
