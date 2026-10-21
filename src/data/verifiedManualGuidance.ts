import type { Project } from '../types';

/** Factos externos só têm o âmbito exato suportado pela fonte oficial. */
export interface VerifiedManualFact {
  id: string;
  project: Project | 'geral';
  title: string;
  statement: string;
  explanation: string;
  sourceId: string;
  limitation: string;
}

export const verifiedManualFacts: readonly VerifiedManualFact[] = [
  {
    id: 'cc-consumer-contact', project: 'coca-cola', title: 'Contacto público do consumidor',
    statement: 'A Coca-Cola Portugal publica o contacto gratuito 800 286 286, de segunda a sexta-feira, exceto feriados, das 09h00 às 17h00.',
    explanation: 'Este contacto destina-se às questões dos consumidores abrangidas pelos canais indicados no website. Uma dúvida sobre uma bebida ou promoção não deve ser confundida automaticamente com a assistência a um equipamento comercial.',
    sourceId: 'cc-contactos',
    limitation: 'Este número não foi confirmado como contacto do serviço interno de avarias. Não orientar clientes profissionais para aqui sem verificar o circuito aplicável.',
  },
  {
    id: 'cc-partners', project: 'coca-cola', title: 'Distribuição e questões comerciais',
    statement: 'O website da Coca-Cola Portugal distingue o contacto ao consumidor de assuntos de distribuição, produtos, faturas e contacto comercial, remetendo estes últimos para a Coca-Cola Europacific Partners.',
    explanation: 'Antes de escolher um procedimento, pergunta se se trata de uma avaria de equipamento ou de um assunto de fornecimento, fatura ou relação comercial. A distinção entre estes temas consta da informação pública.',
    sourceId: 'cc-contactos',
    limitation: 'A fonte não identifica as transações SAP, classificações, equipas, regiões, prazos ou contactos internos aplicáveis ao operador.',
  },
  {
    id: 'cc-consumer-faq', project: 'coca-cola', title: 'Perguntas frequentes ao consumidor',
    statement: 'A Coca-Cola disponibiliza uma página pública de perguntas frequentes, incluindo questões de consumidores, contacto e aplicação Coca-Cola.',
    explanation: 'Essa página pode fundamentar esclarecimentos gerais de âmbito público, mas assuntos técnicos de máquinas comerciais exigem procedimento operacional próprio.',
    sourceId: 'cc-faq',
    limitation: 'Uma FAQ pública não demonstra como registar ou encaminhar uma avaria técnica.',
  },
  {
    id: 'bk-support', project: 'burger-king', title: 'Categorias oficiais de suporte',
    statement: 'O portal oficial de suporte Burger King Portugal disponibiliza categorias para ajuda com entrega, recolha, experiência em restaurante, informações e sugestões.',
    explanation: 'A origem do pedido é importante para localizar a categoria de ajuda adequada. Deves distinguir um pedido da aplicação/site, uma recolha e uma questão de restaurante.',
    sourceId: 'bk-suporte',
    limitation: 'A existência destas categorias não prova que a linha telefónica tenha acesso ao pedido, possa modificá-lo ou deva usar obrigatoriamente um canal específico.',
  },
  {
    id: 'complaints', project: 'geral', title: 'Livro de Reclamações físico e eletrónico',
    statement: 'A ASAE esclarece que o Livro de Reclamações Eletrónico tem a mesma validade que o livro físico nos casos abrangidos pela legislação.',
    explanation: 'Um cliente insatisfeito pode procurar os mecanismos formais de reclamação. A informação ao cliente deve ser factual e não deve impedir ou desencorajar o exercício desses direitos.',
    sourceId: 'reclamacoes-asae',
    limitation: 'A fonte não define quem, na tua operação, recebe reclamações, realiza reembolsos ou atualiza tickets.',
  },
  {
    id: 'data-minimization', project: 'geral', title: 'Proteção de dados pessoais',
    statement: 'O artigo 5.º, n.º 1, alínea c), do RGPD estabelece que os dados pessoais tratados devem ser adequados, pertinentes e limitados ao necessário para a finalidade.',
    explanation: 'Para um atendimento, só se solicita o dado exigido pelo procedimento válido e apenas se necessário. Os dados reais pertencem ao sistema de trabalho autorizado, não a este site público nem aos PDFs.',
    sourceId: 'rgpd',
    limitation: 'O RGPD não identifica quais são os campos obrigatórios de cada operação. A empresa tem de definir a finalidade, fundamento e permissões de tratamento.',
  },
];

/** Explicações editoriais de treino, não diagnósticos nem fluxos oficiais. */
export interface ProcedureDeepDive {
  meaning: string;
  questions: readonly string[];
  howToProceed: string;
  evidenceToCheck: string;
  neverAssume: string;
}

export const procedureDeepDives: Record<string, ProcedureDeepDive> = {
  'cc-sem-funcionar': {
    meaning: 'O estabelecimento relata que a máquina não responde. «Não funciona» descreve um sintoma, não a causa da avaria.',
    questions: ['O equipamento não liga ou liga, mas não permite a utilização?', 'Existe alguma mensagem ou sinal visível que possa descrever, sem abrir o equipamento?', 'Desde quando acontece e é sempre igual?'],
    howToProceed: 'Regista o relato factual apenas no sistema autorizado, identifica o equipamento se o procedimento o exigir e consulta as regras de encaminhamento. Se houver risco elétrico ou outro perigo, não orientes reparações improvisadas.',
    evidenceToCheck: 'Tipo de equipamento, localização, referência identificadora e contacto, apenas quando necessários; estado efetivo do registo no sistema.',
    neverAssume: 'Não diagnosticar falha elétrica, confirmar envio de técnico ou indicar um prazo sem evidência operacional.',
  },
  'cc-nao-refrigera': {
    meaning: 'O cliente considera que as bebidas não atingem a temperatura habitual; isso não prova que o compressor ou o termóstato estejam avariados.',
    questions: ['Deixou de fazer frio completamente ou refrigera menos?', 'O equipamento mantém as outras funções?', 'A situação começou quando e afeta todos os produtos?'],
    howToProceed: 'Classifica a descrição sem indicar ajustes técnicos. Confirma a identificação do equipamento e o procedimento aplicável no sistema da operação.',
    evidenceToCheck: 'Sintoma, data de início, equipamento e registo efetivamente concluído quando o sistema o demonstrar.',
    neverAssume: 'Não prometer manutenção em 48 horas nem aconselhar abertura, desmontagem ou intervenção técnica pelo cliente.',
  },
  'cc-sem-produto': {
    meaning: 'A bebida não sai ou sai de forma irregular; o sintoma é diferente de uma mera falta de stock.',
    questions: ['Não sai nenhum produto ou apenas um sabor?', 'Sai alguma água, gás ou outra bebida?', 'É uma situação permanente ou intermitente?'],
    howToProceed: 'Distingue anomalia de dispensação de necessidade de abastecimento sem atribuir uma causa mecânica. Consulta a classificação autorizada.',
    evidenceToCheck: 'Produto afetado, tipo de equipamento, localização e estado real do pedido no sistema oficial.',
    neverAssume: 'Não prescrever troca de componentes, afirmar códigos de sintoma internos ou dar prazos sem documentação aprovada.',
  },
  'cc-falta-produto': {
    meaning: 'O pedido pode dizer respeito ao abastecimento comercial e não a uma avaria no equipamento.',
    questions: ['Que produto está em falta?', 'O equipamento está funcional e apenas falta produto?', 'Pretende uma reposição ou comunicar uma avaria simultânea?'],
    howToProceed: 'Separa o assunto comercial da anomalia técnica e consulta o canal operacional autorizado antes de encaminhar.',
    evidenceToCheck: 'Canal responsável pela reposição, competências da linha e eventual pedido de avaria distinto.',
    neverAssume: 'Não prometer entrega ou reposição, nem abrir avaria fictícia para justificar o pedido.',
  },
  'cc-limpeza': {
    meaning: 'Uma necessidade de limpeza ou manutenção preventiva não deve ser confundida automaticamente com falha do equipamento.',
    questions: ['É um pedido de limpeza periódica ou existe uma anomalia concreta?', 'Que parte do serviço pretende solicitar?', 'Há algum sintoma que impeça a utilização?'],
    howToProceed: 'Descreve o pedido tal como foi comunicado e confirma se o procedimento aprovado contempla essa intervenção.',
    evidenceToCheck: 'Âmbito e condições do serviço, equipa competente e registo se aplicável.',
    neverAssume: 'Não garantir gratuitidade, agendamento ou cobertura contratual.',
  },
  'cc-outras': {
    meaning: 'É um caso de triagem quando o motivo da chamada ainda não se enquadra numa categoria conhecida.',
    questions: ['Pode explicar o que aconteceu com as suas palavras?', 'Diz respeito a equipamento, produto, distribuição ou outro assunto?', 'Qual é a consequência prática para o estabelecimento?'],
    howToProceed: 'Identifica o tema antes de criar qualquer registo e consulta o supervisor se não existir categoria autorizada.',
    evidenceToCheck: 'Classificação realmente aplicável e canal interno responsável.',
    neverAssume: 'Não escolher uma categoria ao acaso, nem indicar que o pedido foi encaminhado sem confirmação.',
  },
  'cc-consumidor': {
    meaning: 'Uma pergunta sobre produtos, embalagens, promoções ou experiência do consumidor pode pertencer a um canal público distinto da assistência a máquinas comerciais.',
    questions: ['O assunto está relacionado com uma bebida, promoção ou equipamento de um estabelecimento?', 'Pretende uma informação ou apresentar uma ocorrência?', 'Qual é o produto ou tema, sem transmitir dados pessoais desnecessários?'],
    howToProceed: 'Consulta a informação pública oficial para temas de consumidor, mas confirma internamente o circuito correto para transferências e encaminhamentos.',
    evidenceToCheck: 'Se o contacto público informado corresponde realmente ao motivo e ao público-alvo.',
    neverAssume: 'Não apresentar a linha de consumidor como serviço de assistência técnica a equipamentos.',
  },
  'cc-comercial': {
    meaning: 'Pedidos de distribuição, produtos, fornecimentos ou faturas devem ser diferenciados de problemas técnicos.',
    questions: ['É um pedido de produtos, de fatura ou um equipamento com defeito?', 'Trata-se de esclarecimento ou de um pedido que necessita de registo?', 'Qual é o assunto exato a encaminhar?'],
    howToProceed: 'O website público distingue assuntos comerciais e do consumidor. Consulta o canal autorizado pela operação para a situação concreta.',
    evidenceToCheck: 'Competência da equipa, disponibilidade do canal e confirmação de encaminhamento, se executado.',
    neverAssume: 'Não dizer que o comercial foi avisado sem o ter feito nem inventar contacto ou prazo de resposta.',
  },
  'bk-app': {
    meaning: 'Pedidos efetuados na aplicação ou website podem seguir percursos de ajuda diferentes dos atendidos por telefone.',
    questions: ['A compra foi feita na aplicação ou no website?', 'É uma entrega, recolha ou problema de acesso?', 'Qual é o problema específico que pretende resolver?'],
    howToProceed: 'Confirma a categoria adequada no suporte público e consulta se a linha telefónica tem competências para tratar o caso.',
    evidenceToCheck: 'Canal de origem, assunto e permissões reais do operador no sistema autorizado.',
    neverAssume: 'Não afirmar impossibilidade de consulta, pagamento pendente ou reembolso automático sem verificação.',
  },
  'bk-atraso': {
    meaning: 'Um pedido ainda não recebido pode estar atrasado, não atribuído ou noutro estado; a chamada por si só não permite conhecer a causa.',
    questions: ['O pedido é de entrega ou recolha?', 'Já recebeu alguma indicação de conclusão ou alteração?', 'O atraso é o único problema comunicado?'],
    howToProceed: 'Consulta o estado na ferramenta acessível à operação e comunica apenas o que estiver confirmado. Se não houver acesso, consulta o apoio autorizado.',
    evidenceToCheck: 'Canal de pedido, estado consultável e previsão efetivamente disponibilizada, se existir.',
    neverAssume: 'Não indicar localização do estafeta, hora de entrega ou compensação sem confirmação.',
  },
  'bk-incompleto': {
    meaning: 'O cliente recebeu uma encomenda, mas diz que faltam um ou mais artigos.',
    questions: ['Recebeu a encomenda e faltou um artigo concreto?', 'Quais os produtos em falta?', 'O pedido foi realizado por que canal?'],
    howToProceed: 'Escuta a descrição e consulta as regras de reclamação ou correção aplicáveis ao canal do pedido.',
    evidenceToCheck: 'Conteúdo real do pedido no sistema autorizado, canal e opções disponíveis para a situação.',
    neverAssume: 'Não garantir reposição, crédito ou devolução do dinheiro.',
  },
  'bk-incorreto': {
    meaning: 'O cliente relata produtos diferentes dos que esperava receber; pode ser um artigo trocado, uma opção diferente ou uma divergência na encomenda.',
    questions: ['Que artigo pediu e o que recebeu?', 'O problema afeta um artigo ou a encomenda completa?', 'O pedido foi por aplicação, website, telefone ou outro canal?'],
    howToProceed: 'Regista os factos no canal autorizado e confirma a ação permitida para a origem da compra.',
    evidenceToCheck: 'Composição da encomenda quando acessível e regras de resolução realmente aplicáveis.',
    neverAssume: 'Não dizer que a loja errou sem confirmação nem prometer nova entrega.',
  },
  'bk-reclamacao': {
    meaning: 'O cliente manifesta desagrado ou quer reclamar; isto não significa automaticamente que exista uma decisão de compensação.',
    questions: ['Pode explicar concretamente o que aconteceu?', 'O problema está associado a encomenda ou experiência no restaurante?', 'Pretende apenas esclarecimento ou apresentar reclamação formal?'],
    howToProceed: 'Ouvir, evitar confronto, consultar as formas de reclamação aplicáveis e não impedir o acesso ao Livro de Reclamações.',
    evidenceToCheck: 'Canal de reclamação correto para o estabelecimento e permissões de tratamento do caso.',
    neverAssume: 'Não prometer reembolso, apagar a queixa, recusar a reclamação ou atribuir culpa sem averiguação.',
  },
  'bk-duvidas': {
    meaning: 'Pedidos gerais de informação devem ser respondidos de acordo com o canal e a informação pública atual disponível.',
    questions: ['Qual é a informação exata que pretende?', 'O tema refere-se a produto, restaurante, conta ou promoção?', 'Pretende informação geral ou uma ação sobre um pedido existente?'],
    howToProceed: 'Verifica a informação no website de apoio adequado ou na ferramenta interna autorizada antes de responder.',
    evidenceToCheck: 'Fonte concreta, data e aplicabilidade ao restaurante, oferta ou canal.',
    neverAssume: 'Não inventar promoções, horários, preços ou condições de ofertas.',
  },
  'bk-telefone': {
    meaning: 'Receção de encomenda telefónica envolve confirmar os passos realmente permitidos pela operação.',
    questions: ['Pretende encomendar ou esclarecer algo sobre uma encomenda anterior?', 'Qual é a modalidade de entrega e a área de cobertura, se aplicável?', 'Há alguma preferência ou informação que deva ser confirmada no sistema?'],
    howToProceed: 'Utiliza exclusivamente o sistema autorizado para verificar cobertura, disponibilidade, artigos, valores e fecho. Só confirma a encomenda após validação efetiva.',
    evidenceToCheck: 'Montante final, condições autorizadas, dados necessários e estado efetivo da encomenda.',
    neverAssume: 'Não prometer entrega, aceitar pagamento ou afirmar que a compra foi concluída sem confirmação.',
  },
  'bk-canais': {
    meaning: 'As várias formas de pedido e assistência não implicam que o mesmo operador possa consultar ou alterar todas.',
    questions: ['Foi um pedido de entrega, recolha ou restaurante?', 'Qual foi o canal da compra?', 'Pretende informação, alteração, reclamação ou seguimento?'],
    howToProceed: 'Identifica a categoria de suporte público indicada pelo Burger King, mas verifica o procedimento que a operação efetivamente autoriza.',
    evidenceToCheck: 'Canal de origem e percurso autorizado correspondente.',
    neverAssume: 'Não obrigar a instalar outra aplicação nem concluir que uma compra não existe porque não aparece num determinado ecrã.',
  },
  'bk-faturas': {
    meaning: 'Um pedido de fatura ou de contribuinte exige verificar se o documento já foi emitido e qual é o canal autorizado.',
    questions: ['Pretende informação sobre fatura ou comunicar um erro?', 'O pedido foi realizado por que canal?', 'A fatura foi emitida e o que necessita de esclarecer?'],
    howToProceed: 'Consultar as instruções do canal de faturação e transmitir apenas opções confirmadas, sem tratar dados fiscais neste site público.',
    evidenceToCheck: 'Regra aplicável, acesso autorizado, estado do documento e mecanismo de correção, se disponível.',
    neverAssume: 'Não garantir alteração fiscal ou reemissão, nem pedir dados fiscais adicionais sem necessidade.',
  },
};

export function factsForProject(project: Project): readonly VerifiedManualFact[] {
  return verifiedManualFacts.filter(item => item.project === project || item.project === 'geral');
}
