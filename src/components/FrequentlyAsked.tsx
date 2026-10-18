import { useState } from 'react';
import { ChevronDown, ExternalLink, HelpCircle, ShieldAlert } from 'lucide-react';
import { publicSources } from '../data/publicSources';

const questions = [
  {
    question: 'Posso prometer que um técnico irá ao estabelecimento amanhã?',
    answer: 'Não sem confirmação expressa no sistema ou no procedimento autorizado. Primeiro, identifica a ocorrência e confirma o encaminhamento disponível. Os prazos da linha técnica são internos e não estão verificados nesta aplicação.',
  },
  {
    question: 'O equipamento não faz frio. O que pergunto?',
    answer: 'Podes pedir ao cliente que descreva o comportamento e desde quando acontece. Não atribuas imediatamente a avaria ao motor, ao termóstato ou a outros componentes. Consulta o guião de refrigeração como apoio de formação.',
  },
  {
    question: 'O cliente fez o pedido na aplicação Burger King. Posso consultar a encomenda?',
    answer: 'Só poderás afirmar que tens acesso à encomenda se isso estiver confirmado no sistema operacional autorizado. O Burger King Portugal dispõe de um portal público de suporte, mas isso não confirma as permissões ou competências da tua linha.',
  },
  {
    question: 'Posso garantir reembolsos por pedidos incompletos?',
    answer: 'Não. As condições, competências, aprovações e prazos não estão validados nos documentos públicos. Identifica o canal e o problema e segue o procedimento interno confirmado.',
  },
  {
    question: 'Posso guardar nomes, NIF ou números de pedidos nesta aplicação?',
    answer: 'Não. O Call Center Pro é uma ferramenta de consulta e treino. Os dados reais devem ser inseridos exclusivamente nos sistemas aprovados pela entidade responsável e apenas quando forem necessários.',
  },
  {
    question: 'O que significa «Validado»?',
    answer: 'Um procedimento só deve aparecer como validado quando existir uma confirmação operacional documentada, identificando origem, data e âmbito. Um site público da marca não valida, por si só, os procedimentos da tua campanha.',
  },
];

export function FrequentlyAsked() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return <section className="faq-page">
    <div className="page-intro"><span className="eyebrow"><HelpCircle size={16}/> PERGUNTAS FREQUENTES</span><h1>Respostas simples e responsáveis</h1><p>Esclarecimentos de apoio sobre comunicação e limites da ferramenta. Não substituem os procedimentos de operação.</p></div>
    <div className="quick-answer-warning"><ShieldAlert size={20}/><div><strong>Confirmar sempre as regras operacionais</strong><p>Estas respostas não atribuem competências à linha nem garantem decisões da Coca-Cola ou do Burger King.</p></div></div>
    <div className="faq-list">{questions.map((item,i)=><article className="faq-entry" key={item.question}>
      <button type="button" onClick={() => setOpenIndex(openIndex === i ? null : i)} aria-expanded={openIndex === i} aria-controls={`faq-${i}`}><strong>{item.question}</strong><ChevronDown size={19}/></button>
      {openIndex === i && <div id={`faq-${i}`} className="faq-answer">{item.answer}</div>}
    </article>)}</div>
    <h2 className="faq-sources-title">Fontes públicas relacionadas</h2>
    <div className="faq-sources">{publicSources.filter(source => source.project !== 'geral').map(source=><a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<ExternalLink size={15}/></a>)}</div>
  </section>;
}
