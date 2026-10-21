import { publicSources } from './publicSources';
import { procedures } from './knowledge';

/** Não confundir um facto público com um procedimento aprovado pela operação. */
export interface PublicClaim {
  id: string;
  statement: string;
  sourceIds: string[];
  reviewedOn: string;
  limitation: string;
}
export interface OperationalGap {
  id: string;
  title: string;
  validationNeeded: string;
}

export const sourceReviewDate = '22/10/2026';

export const confirmedPublicClaims: PublicClaim[] = [
  {
    id: 'cc-consumidor',
    statement: 'A Coca-Cola Portugal publica a linha de consumidor 800 286 286, de segunda a sexta-feira, exceto feriados, das 09h00 às 17h00.',
    sourceIds: ['cc-contactos', 'cc-faq'],
    reviewedOn: sourceReviewDate,
    limitation: 'Não é o número confirmado do serviço privado de avarias aos equipamentos.',
  },
  {
    id: 'cc-parceiros',
    statement: 'O website Coca-Cola Portugal disponibiliza contactos da Coca-Cola Europacific Partners.',
    sourceIds: ['cc-contactos'],
    reviewedOn: sourceReviewDate,
    limitation: 'Não demonstra critérios de SAP ou regras internas de encaminhamento.',
  },
  {
    id: 'bk-apoio',
    statement: 'O Burger King Portugal disponibiliza no portal de suporte categorias de entrega, recolha, experiência em restaurante, informação e sugestões.',
    sourceIds: ['bk-suporte'],
    reviewedOn: sourceReviewDate,
    limitation: 'Não demonstra acesso da linha telefónica a pedidos, reembolsos ou tempos de resposta.',
  },
  {
    id: 'livro',
    statement: 'O Livro de Reclamações Eletrónico permite apresentar reclamações e consultar o respetivo estado.',
    sourceIds: ['reclamacoes', 'reclamacoes-asae'],
    reviewedOn: sourceReviewDate,
    limitation: 'Não comprova o resultado da reclamação nem substitui os procedimentos internos.',
  },
];

export const pendingOperationalGaps: OperationalGap[] = [
  { id: 'cc-registo', title: 'Registo de avarias e campos SAP', validationNeeded: 'Manual interno aprovado, versão, campos obrigatórios, códigos e responsável pela validação.' },
  { id: 'cc-encaminhamento', title: 'Encaminhamento regional e clientes bloqueados', validationNeeded: 'Critérios PT32/PT60/PT70, canais, turnos, piquetes e momentos de envio aprovados.' },
  { id: 'cc-prazos', title: 'Prazos de assistência a equipamentos', validationNeeded: 'Documento operacional que associe equipamento, prazo, região e exceções.' },
  { id: 'bk-competencias', title: 'Acesso a encomendas e competências da linha', validationNeeded: 'Procedimento aprovado por canal para consulta, registo, alteração e cancelamento.' },
  { id: 'bk-reembolsos', title: 'Reembolsos e compensações Burger King', validationNeeded: 'Condições oficiais, permissões, canal autorizado e prazos, se aplicáveis.' },
  { id: 'bk-pedidos', title: 'Pedidos por telefone e entregas', validationNeeded: 'Cobertura, validação de morada, preços, pagamento, disponibilidade e fecho aprovados.' },
];

export function getEvidenceSummary() {
  return {
    availableProcedures: procedures.length,
    validatedProcedures: procedures.filter(p => p.status === 'validado' && p.lastValidated !== null).length,
    publicSources: publicSources.length,
    publicClaims: confirmedPublicClaims.length,
    pendingOperationalAreas: pendingOperationalGaps.length,
  };
}

/** Informação revista em 22/10/2026 no âmbito de manuais públicos. */
export const furtherVerifiedManualAreas = [
  'Princípio de minimização dos dados pessoais do artigo 5.º, n.º 1, alínea c), RGPD.',
  'Distinção entre contacto de consumidor e assuntos de distribuição no portal Coca-Cola.',
  'Categorias de ajuda pública Burger King por entrega, recolha, restaurante e informação.',
  'Equivalência geral de validade do Livro de Reclamações físico e eletrónico indicada pela ASAE.',
] as const;
