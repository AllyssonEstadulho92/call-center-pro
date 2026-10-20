import type { Project, Procedure } from '../types';
import { procedures } from './knowledge';
import { searchProcedures } from '../lib/search';

export interface ManualPhase {
  title: string;
  guidance: string;
  notice: string;
}
export interface ManualProjectGuide {
  project: Project;
  title: string;
  subtitle: string;
  audience: string;
  opening: string;
  introduction: string;
  phases: ManualPhase[];
  principles: string[];
  factIds: string[];
  frequentlyAsked: { question: string; response: string; status: 'exemplo' | 'informacao-publica' }[];
}

/**
 * A base editorial não é um procedimento oficial.
 * A execução dos guiões deve ser confirmada na documentação autorizada da operação.
 * A informação pública identificada pelos factIds encontra-se em publicSources.ts.
 */
export const manualGuides: Record<Project, ManualProjectGuide> = {
  'coca-cola': {
    project: 'coca-cola',
    title: 'Manual Coca-Cola',
    subtitle: 'Serviços de Avarias · Consulta orientada',
    audience: 'Apoio à descrição, classificação e encaminhamento de ocorrências em equipamentos.',
    opening: 'Serviços de Avarias Coca-Cola, bom dia, fala o Allysson. Em que posso ajudar?',
    introduction: 'Este manual reúne os guiões existentes por situação. A sequência de perguntas sobre contribuinte, estabelecimento, localidade, equipamento, referência RF/CC, contacto e horário foi comunicada ou proposta para treino e precisa de confirmação na operação. Pergunta apenas o que for necessário. Introduz os dados reais apenas no sistema autorizado.',
    phases: [
      { title: 'Abertura', guidance: 'Cumprimenta, identifica a linha e deixa o cliente explicar a ocorrência.', notice: 'Não antecipar a causa do problema.' },
      { title: 'Identificação', guidance: 'Confirma no sistema autorizado o estabelecimento, o equipamento e os contactos necessários ao pedido.', notice: 'NIF, RF/CC, morada, telefone e horário só são pedidos quando aplicáveis segundo o procedimento aprovado.' },
      { title: 'Descrição objetiva', guidance: 'Pergunta o que acontece, desde quando e que produto ou equipamento foi afetado.', notice: 'Regista factos, não diagnósticos técnicos.' },
      { title: 'Classificação', guidance: 'Distingue avaria de equipamentos, falta de produto, limpeza, pedido comercial ou assunto de consumidor.', notice: 'São assuntos potencialmente distintos; não os encaminhar automaticamente para o mesmo canal.' },
      { title: 'Encaminhamento', guidance: 'Segue a informação aprovada na ferramenta operacional e confirma se o registo ficou concluído.', notice: 'Não prometer técnico, reparação, substituição ou prazo sem confirmação.' },
      { title: 'Fecho', guidance: 'Distingue um registo confirmado de um pedido pendente, informa apenas o resultado real e pergunta se é necessário mais algum esclarecimento.', notice: 'Não dizer que o registo ficou concluído, que existe visita marcada ou que há prazo confirmado se não estiver no sistema.' },
    ],
    principles: [
      'Se o cliente não souber explicar a avaria, faz uma pergunta de cada vez.',
      'Confirma o alcance do problema sem sugerir manipulação de componentes elétricos ou reparações.',
      'Mantém separado o contacto público ao consumidor do serviço técnico a equipamentos comerciais.',
      'Em situações fora do guião, consulta a supervisão e evita inventar procedimentos.',
    ],
    factIds: ['cc-contactos', 'cc-faq'],
    frequentlyAsked: [
      { question: 'O equipamento não faz frio. Qual a primeira pergunta?', response: '«Deixou de refrigerar por completo ou as bebidas estão menos frias do que habitualmente? Desde quando verifica a situação?» Esta é uma sugestão baseada no guião de treino, não um diagnóstico.', status: 'exemplo' },
      { question: 'Posso dizer que o técnico vem amanhã?', response: 'Não sem confirmação do procedimento ou sistema autorizado. Primeiro confirma a ocorrência e o encaminhamento efetivamente efetuado.', status: 'exemplo' },
      { question: 'O contacto público da Coca-Cola é a linha de avarias?', response: 'Não é possível concluir isso. A página de contactos distingue informação ao consumidor e questões de distribuição; não documenta as regras da linha interna de avarias.', status: 'informacao-publica' },
    ],
  },
  'burger-king': {
    project: 'burger-king',
    title: 'Manual Burger King',
    subtitle: 'Apoio ao Cliente · Consulta orientada',
    audience: 'Apoio à receção, esclarecimento e encaminhamento de contactos sobre encomendas e atendimento.',
    opening: 'Burger King em Casa, bom dia, fala o Allysson. Em que posso ajudar?',
    introduction: 'Os passos ilustram uma abordagem clara e respeitosa, com atenção ao canal utilizado pelo cliente. A aplicação não consulta encomendas, não faz alterações, não confirma entregas nem decide reembolsos.',
    phases: [
      { title: 'Abertura', guidance: 'Cumprimenta o cliente, identifica a linha e pergunta em que podes ajudar.', notice: 'Evita pressupor que se trata de uma encomenda.' },
      { title: 'Origem do pedido', guidance: 'Confirma se a situação diz respeito à linha telefónica, aplicação, website, plataforma externa ou restaurante.', notice: 'A origem determina que informações e sistemas podem estar disponíveis.' },
      { title: 'Motivo', guidance: 'Identifica de forma simples: pedido novo, atraso, artigo em falta, artigo incorreto, faturação ou reclamação.', notice: 'Uma pergunta curta de cada vez, sem pedir credenciais ou dados bancários.' },
      { title: 'Verificação', guidance: 'Consulta apenas o sistema e as orientações autorizadas para esse canal.', notice: 'Nunca afirmar que consultaste o pedido sem o fazer.' },
      { title: 'Resposta e encaminhamento', guidance: 'Explica o que consegues confirmar e apresenta o canal de apoio adequado quando aplicável.', notice: 'Não garantir cancelamentos, compensações, reembolsos ou prazos.' },
      { title: 'Fecho', guidance: 'Confirma se a orientação foi compreendida e encerra com cortesia.', notice: 'Não apresentar o assunto como resolvido se estiver pendente.' },
    ],
    principles: [
      'Começa por confirmar onde o pedido foi realizado, antes de indicar passos específicos.',
      'Se o cliente estiver insatisfeito, ouve sem interromper e responde aos factos identificados.',
      'A existência do portal público de suporte não comprova permissões da linha ou prazos de resposta.',
      'A encomenda só está registada, alterada ou cancelada quando isso for confirmado no sistema autorizado.',
    ],
    factIds: ['bk-suporte', 'reclamacoes'],
    frequentlyAsked: [
      { question: 'O cliente recebeu menos produtos. O que pergunto?', response: '«Pode indicar-me quais os artigos em falta e através de que canal fez o pedido?» A análise e o encaminhamento concretos dependem das regras da operação.', status: 'exemplo' },
      { question: 'Posso garantir devolução do valor?', response: 'Não. Deve ser confirmada a política aplicável e a competência da linha, antes de indicar qualquer decisão ou prazo.', status: 'exemplo' },
      { question: 'Onde existe suporte público Burger King Portugal?', response: 'No portal oficial burgerking.pt/support, que apresenta temas relacionados com entrega, recolha, experiência no restaurante, informações e sugestões. A página não comprova o tratamento interno de um caso.', status: 'informacao-publica' },
    ],
  },
};

export function getManualGuide(project: Project): ManualProjectGuide {
  return manualGuides[project];
}

export function getManualTopics(project: Project, query = '', category = 'Todas'): Procedure[] {
  return searchProcedures(procedures, query, project).filter(p => category === 'Todas' || p.category === category);
}

export function getManualCategories(project: Project): string[] {
  return ['Todas', ...new Set(procedures.filter(p => p.project === project).map(p => p.category))];
}
