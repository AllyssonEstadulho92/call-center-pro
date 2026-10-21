import type { Project } from '../types';

/**
 * Ligações públicas revistas em 22/10/2026, sem validar a operação.
 * Uma página oficial comprova os factos nela publicados, não os procedimentos da linha.
 * Não atualizar a data sem voltar a consultar o conteúdo original.
 */
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
    id: 'rgpd', project: 'geral',
    title: 'Regulamento Geral sobre a Proteção de Dados — artigo 5.º',
    publisher: 'União Europeia — EUR-Lex',
    url: 'https://eur-lex.europa.eu/eli/reg/2016/679/pt',
    confirmed: '22/10/2026',
    scope: 'O artigo 5.º, n.º 1, alínea c), determina que o tratamento de dados pessoais deve ser adequado, pertinente e limitado ao necessário para a finalidade.',
    limitation: 'A lei não determina os campos de um registo SAP ou pedido Burger King; são necessários procedimento e fundamento de tratamento da organização.',
  },
  {
    id: 'bk-suporte',
    project: 'burger-king',
    title: 'Portal de apoio oficial Burger King Portugal',
    publisher: 'Burger King Portugal',
    url: 'https://www.burgerking.pt/support',
    confirmed: '22/10/2026',
    scope: 'O portal apresenta categorias de apoio a entrega, recolha, experiência no restaurante, pedidos de informação e sugestões.',
    limitation: 'Não comprova acesso do operador a encomendas, competências desta linha, resultados de reclamações, reembolsos ou prazos.',
  },
  {
    id: 'cc-contactos',
    project: 'coca-cola',
    title: 'Contactos públicos Coca-Cola Portugal',
    publisher: 'Coca-Cola Portugal',
    url: 'https://www.coca-cola.com/pt/pt/about-us/contact-us',
    confirmed: '22/10/2026',
    scope: 'Contacto ao consumidor 800 286 286 de segunda a sexta-feira, exceto feriados, das 09h00 às 17h00. A página também disponibiliza contactos Coca-Cola Europacific Partners.',
    limitation: 'O número do consumidor não é prova de contacto para a linha interna de avarias nem das regras de assistência aos equipamentos comerciais.',
  },
  {
    id: 'cc-faq',
    project: 'coca-cola',
    title: 'Perguntas frequentes Coca-Cola Portugal',
    publisher: 'Coca-Cola Portugal',
    url: 'https://www.coca-cola.com/pt/pt/about-us/faq',
    confirmed: '22/10/2026',
    scope: 'Perguntas e informações publicadas pela Coca-Cola sobre assuntos de consumidores e formas de contacto.',
    limitation: 'As perguntas frequentes não validam guiões técnicos, classificação SAP, prazos de intervenção ou encaminhamentos operacionais.',
  },
  {
    id: 'reclamacoes',
    project: 'geral',
    title: 'Livro de Reclamações Eletrónico',
    publisher: 'Portal oficial do Livro de Reclamações',
    url: 'https://www.livroreclamacoes.pt/INICIO/',
    confirmed: '22/10/2026',
    scope: 'Portal formal para reclamações, pedidos de informação, consulta de reclamações, elogios e sugestões.',
    limitation: 'O acesso ao portal não confirma a tramitação interna de reclamações, decisões ou prazos da Coca-Cola ou Burger King.',
  },
  {
    id: 'reclamacoes-asae',
    project: 'geral',
    title: 'Explicação legal sobre o Livro de Reclamações',
    publisher: 'ASAE',
    url: 'https://www.asae.gov.pt/reclamacoes-e-denuncias/livro-de-reclamacoes.aspx',
    confirmed: '22/10/2026',
    scope: 'Explica o enquadramento do livro de reclamações em formatos físico e eletrónico e o respetivo âmbito legal.',
    limitation: 'Não fornece instruções de registo nos sistemas privados das duas marcas.',
  },
];

export function getPublicSources(ids: string[]): PublicSource[] {
  return publicSources.filter(source => ids.includes(source.id));
}

/** Relação informativa; nunca atribui validação operacional aos guiões. */
const procedureReferences: Record<string, string[]> = {
  'bk-app': ['bk-suporte'],
  'bk-reclamacao': ['bk-suporte', 'reclamacoes', 'reclamacoes-asae'],
  'bk-canais': ['bk-suporte'],
  'bk-faturas': ['bk-suporte'],
  'bk-telefone': ['bk-suporte'],
  'cc-consumidor': ['cc-contactos', 'cc-faq'],
  'cc-comercial': ['cc-contactos'],
};

export function getProcedureSources(procedureId: string): PublicSource[] {
  return getPublicSources(procedureReferences[procedureId] ?? []);
}
