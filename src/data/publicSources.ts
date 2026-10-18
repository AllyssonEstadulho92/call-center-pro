import type { Project } from '../types';

/** Só ligações publicamente verificadas. A existência de uma página de apoio não valida regras de campanha. */
export interface PublicSource {
  id: string;
  project: Project | 'geral';
  title: string;
  publisher: string;
  url: string;
  confirmed: string;
  scope: string;
  limitation: string;
}

export const publicSources: PublicSource[] = [
  {
    id: 'bk-suporte', project: 'burger-king', title: 'Apoio oficial Burger King Portugal',
    publisher: 'Burger King Portugal', url: 'https://www.burgerking.pt/support', confirmed: '18/10/2026',
    scope: 'Portal de apoio com categorias para pedidos de entrega e recolha, experiências em restaurante, informações e sugestões.',
    limitation: 'A existência deste portal não prova que a linha telefónica tenha acesso aos pedidos, nem confirma prazos de reembolso ou resposta.',
  },
  {
    id: 'cc-contactos', project: 'coca-cola', title: 'Contactos oficiais Coca-Cola Portugal',
    publisher: 'Coca-Cola Portugal', url: 'https://www.coca-cola.com/pt/pt/about-us/contact-us', confirmed: '18/10/2026',
    scope: 'Formulário de apoio ao consumidor. A página distingue o apoio ao consumidor de questões comerciais e de distribuição, encaminhadas para a Coca-Cola Europacific Partners.',
    limitation: 'Este contacto geral não substitui a linha de avarias nem comprova como é registado um pedido técnico.',
  },
  {
    id: 'cc-faq', project: 'coca-cola', title: 'Perguntas frequentes Coca-Cola Portugal',
    publisher: 'Coca-Cola Portugal', url: 'https://www.coca-cola.com/pt/pt/about-us/faq', confirmed: '18/10/2026',
    scope: 'Informação pública sobre assuntos de consumo e aplicação Coca-Cola.',
    limitation: 'As orientações da aplicação de consumidor não devem ser confundidas com assistência a equipamentos comerciais.',
  },
  {
    id: 'reclamacoes', project: 'geral', title: 'Livro de Reclamações Eletrónico',
    publisher: 'Portal do Livro de Reclamações', url: 'https://www.livroreclamacoes.pt/INICIO/', confirmed: '18/10/2026',
    scope: 'Portal de reclamações, consulta do estado de reclamações, pedidos de informação e sugestões.',
    limitation: 'Não substitui a gestão interna das reclamações nem confirma o resultado de um processo.',
  },
];

export function getPublicSources(ids: string[]): PublicSource[] {
  return publicSources.filter((source) => ids.includes(source.id));
}

/** Ligação meramente informativa: fontes públicas não validam procedimentos privados. */
const procedureReferences: Record<string, string[]> = {
  'bk-app': ['bk-suporte'], 'bk-reclamacao': ['bk-suporte', 'reclamacoes'],
  'bk-canais': ['bk-suporte'], 'bk-faturas': ['bk-suporte'], 'bk-telefone': ['bk-suporte'],
  'cc-consumidor': ['cc-contactos'], 'cc-comercial': ['cc-contactos'],
};

export function getProcedureSources(procedureId: string): PublicSource[] {
  return getPublicSources(procedureReferences[procedureId] ?? []);
}
