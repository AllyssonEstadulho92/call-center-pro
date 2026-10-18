import { useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, RotateCcw } from 'lucide-react';
import { procedures } from '../data/knowledge';
import { SpeechPlayer } from './SpeechPlayer';
import { PracticeRecorder } from './PracticeRecorder';
import { findQuickStep } from '../lib/quickAnswers';

const scenarios = [
  { id: 'cc-nao-refrigera', client: 'Boa tarde. O equipamento deixou de fazer frio e as bebidas estão quentes.', objective: 'Recolher uma descrição objetiva, sem diagnosticar componentes.' },
  { id: 'cc-sem-produto', client: 'O equipamento está ligado, mas uma bebida não sai.', objective: 'Esclarecer se a situação afeta todos os produtos ou apenas alguns.' },
  { id: 'bk-incompleto', client: 'Recebi a encomenda, mas faltam dois artigos.', objective: 'Identificar o canal do pedido e os artigos indicados, sem prometer reembolso.' },
  { id: 'bk-atraso', client: 'Estou à espera da encomenda e já passou bastante tempo.', objective: 'Ouvir a ocorrência e confirmar a informação possível no sistema autorizado.' },
];

export function Simulations() {
  const [selected, setSelected] = useState(0);
  const [reveal, setReveal] = useState(false);
  const scenario = scenarios[selected];
  const procedure = procedures.find(item => item.id === scenario.id);
  const step = procedure ? findQuickStep(procedure) : null;
  return <section className="simulations-page">
    <div className="page-intro"><span className="eyebrow"><GraduationCap size={16}/> SIMULAÇÕES SEM CLIENTES REAIS</span><h1>Treina uma chamada, com calma</h1><p>Ouve uma situação fictícia, responde em voz alta e compara com uma formulação de referência do guião. Não há gravação automática nem avaliação por inteligência artificial.</p></div>
    <div className="scenario-tabs" role="group" aria-label="Escolher situação">
      {scenarios.map((item, i) => <button key={item.id} type="button" aria-pressed={i === selected} className={selected === i ? 'active' : ''} onClick={() => { setSelected(i); setReveal(false); }}>Situação {i+1}</button>)}
    </div>
    <div className="simulation-grid">
      <section className="simulation-primary">
        <div className="eyebrow">CLIENTE FICTÍCIO · SITUAÇÃO {selected + 1} DE {scenarios.length}</div>
        <blockquote>“{scenario.client}”</blockquote>
        <SpeechPlayer text={scenario.client}/>
        <h2>O teu objetivo</h2><p>{scenario.objective}</p>
        <PracticeRecorder key={scenario.id}/>
        <div className="simulation-actions"><button className="primary-button" type="button" onClick={() => setReveal(true)}><BookOpen size={17}/> Ver resposta de referência</button><button className="outline-button" type="button" onClick={() => { setSelected((selected+1)%scenarios.length); setReveal(false); }}><ArrowRight size={17}/> Próxima situação</button></div>
      </section>
      <aside className="simulation-reference">
        <h2><CheckCircle2 size={19}/> Referência para comparação</h2>
        {reveal && step && procedure ? <>
          <p className="source-scope-label">Exemplo por confirmar · {procedure.title}</p>
          <div className="simulation-reference-quote">“{step.say}”</div>
          <SpeechPlayer text={step.say} compact/>
          <h3>O que confirmar</h3><p>{step.verify}</p>
          <h3>O que evitar</h3><p>{step.avoid}</p>
          <button type="button" className="outline-button" onClick={() => setReveal(false)}><RotateCcw size={16}/> Treinar novamente</button>
        </> : <p>Formula a tua própria resposta primeiro. Depois, utiliza «Ver resposta de referência» para comparares com o material de estudo.</p>}
        <p className="simulation-warning">Material de treino, não procedimento aprovado. Nunca gravar chamadas ou informações de clientes.</p>
      </aside>
    </div>
  </section>;
}
