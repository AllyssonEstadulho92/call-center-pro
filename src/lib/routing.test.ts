import { describe, expect, it } from 'vitest';
import { getRoutingAdvice } from './routing';
import { getPublicSources, publicSources } from '../data/publicSources';

describe('triagem e fontes oficiais', () => {
  it('encaminha pedidos digitais BK sem prometer prazo ou reembolso', () => {
    const advice = getRoutingAdvice('burger-king', 'aplicacao', 'pagamento');
    expect(advice.sourceIds).toContain('bk-suporte');
    expect(advice.avoid).toContain('Não prometer reembolso');
    expect(advice.status).toBe('por-confirmar');
  });
  it('não mistura contactos de consumidor com avaria da Coca-Cola', () => {
    const advice = getRoutingAdvice('coca-cola', 'linha', 'entrega');
    expect(advice.sourceIds).toEqual(['cc-contactos']);
    expect(advice.avoid).toContain('Não encaminhar automaticamente avarias');
  });
  it('não atribui páginas oficiais a plataformas externas sem confirmação', () => {
    expect(getRoutingAdvice('burger-king', 'plataforma', 'entrega').sourceIds).toEqual([]);
  });
  it('usa apenas endereços HTTPS e IDs distintos', () => {
    expect(new Set(publicSources.map(s => s.id)).size).toBe(publicSources.length);
    expect(publicSources.every(s => s.url.startsWith('https://'))).toBe(true);
  });
  it('devolve somente fontes pedidas', () => {
    expect(getPublicSources(['bk-suporte']).map(s => s.id)).toEqual(['bk-suporte']);
  });
});
