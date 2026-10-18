import { describe, expect, it } from 'vitest';
import { procedures } from '../data/knowledge';
import { searchProcedures } from './search';

describe('resultados relevantes da pesquisa', () => {
  it('mantém a ordem original sem consulta', () => {
    expect(searchProcedures(procedures, '').map(p => p.id)).toEqual(procedures.map(p => p.id));
  });
  it('prioriza correspondências no título em relação ao texto do passo', () => {
    const items = procedures.filter(p => p.id === 'cc-nao-refrigera' || p.id === 'cc-sem-funcionar');
    const hits = searchProcedures(items, 'equipamento não refrigera');
    expect(hits[0]?.id).toBe('cc-nao-refrigera');
  });
  it('não mistura o filtro Coca-Cola e Burger King', () => {
    expect(searchProcedures(procedures, 'pedido', 'coca-cola').every(p => p.project === 'coca-cola')).toBe(true);
  });
});
