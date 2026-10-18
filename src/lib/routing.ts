import type { Project } from '../types';

export type ContactChannel = 'linha' | 'aplicacao' | 'website' | 'plataforma' | 'restaurante' | 'indefinido';
export type ContactSubject = 'encomenda' | 'pagamento' | 'entrega' | 'reclamacao' | 'outro';

export interface RoutingAdvice {
  heading: string;
  say: string;
  verify: string;
  avoid: string;
  sourceIds: string[];
  status: 'por-confirmar';
}

/** Recomendações de triagem, sem fingir acesso aos sistemas internos. */
export function getRoutingAdvice(project: Project, channel: ContactChannel, subject: ContactSubject): RoutingAdvice {
  if (project === 'coca-cola') {
    return {
      heading: 'Confirmar o âmbito do contacto',
      say: 'Obrigado por explicar a situação. Vou confirmar se o assunto pode ser acompanhado por esta linha e indicar-lhe o passo seguinte.',
      verify: 'Distinguir avaria de equipamento, pedido comercial e assunto de consumidor. Consultar apenas as instruções internas autorizadas.',
      avoid: 'Não encaminhar automaticamente avarias para contactos de consumidor nem prometer assistência técnica.',
      sourceIds: ['cc-contactos'], status: 'por-confirmar',
    };
  }
  if (channel === 'aplicacao' || channel === 'website') {
    return {
      heading: 'Pedido efetuado em canal digital',
      say: 'Obrigado pela confirmação. Nesta linha não consigo consultar diretamente o pedido efetuado por esse canal. Para apresentar a situação, pode recorrer ao apoio oficial Burger King Portugal. Vou indicar-lhe a página de suporte.',
      verify: `Confirmar o motivo (${subject}) e se a limitação de acesso descrita pelo operador continua válida. O portal oficial contém categorias de apoio.`,
      avoid: 'Não prometer reembolso, cancelamento, intervenção imediata ou prazo de resposta. Não pedir credenciais nem dados bancários.',
      sourceIds: ['bk-suporte'], status: 'por-confirmar',
    };
  }
  if (channel === 'plataforma') {
    return {
      heading: 'Pedido noutra plataforma',
      say: 'Para o orientar corretamente, pode dizer-me através de que plataforma fez o pedido? Vou confirmar o encaminhamento adequado.',
      verify: 'Verificar na documentação autorizada se o contacto deve ser feito pelo apoio da plataforma e se existe outra via aplicável.',
      avoid: 'Não presumir acesso a plataformas externas nem indicar contactos que não estejam confirmados.',
      sourceIds: [], status: 'por-confirmar',
    };
  }
  if (channel === 'linha') {
    return {
      heading: 'Pedido efetuado por telefone',
      say: 'Obrigado. Vou consultar a informação que estiver disponível nesta linha para perceber o que posso fazer relativamente ao seu pedido.',
      verify: `Confirmar os identificadores exigidos no sistema autorizado e o motivo (${subject}), sem os introduzir nesta ferramenta.`,
      avoid: 'Não afirmar que o pedido foi encontrado, alterado ou registado antes de confirmar no sistema.',
      sourceIds: [], status: 'por-confirmar',
    };
  }
  if (channel === 'restaurante') {
    return {
      heading: 'Situação ocorrida no restaurante',
      say: 'Compreendo. Para encaminhar esta situação corretamente, vou confirmar o local e o assunto. Existe também uma página oficial de apoio onde pode apresentar a sua questão.',
      verify: 'Confirmar os canais de reclamação aplicáveis. O portal oficial inclui experiências em restaurante.',
      avoid: 'Não afirmar que a loja já recebeu uma reclamação. Não impedir o acesso ao Livro de Reclamações.',
      sourceIds: ['bk-suporte', 'reclamacoes'], status: 'por-confirmar',
    };
  }
  return {
    heading: 'Primeiro identificar o canal',
    say: 'Só para confirmar: efetuou o pedido através desta linha, da aplicação, do website, de outra plataforma ou diretamente num restaurante?',
    verify: 'A origem do pedido determina quais os sistemas e canais de apoio potencialmente disponíveis.',
    avoid: 'Não tentar identificar uma encomenda num sistema incompatível nem pedir dados antes de conhecer a finalidade.',
    sourceIds: ['bk-suporte'], status: 'por-confirmar',
  };
}
