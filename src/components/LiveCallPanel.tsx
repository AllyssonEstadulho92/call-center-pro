import { useState } from 'react';
import { ChevronLeft, ChevronRight, CircleAlert, Headphones, RotateCcw } from 'lucide-react';
import { procedures } from '../data/knowledge';
import { formatGreeting, getDefaultGreeting } from '../lib/greeting';
import { SpeechPlayer } from './SpeechPlayer';
import type { Procedure, Project } from '../types';

export function LiveCallPanel({ onOpen }: { onOpen: (procedure: Procedure) => void }) {
  const [service, setService] = useState<Project>('coca-cola');
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const procedure = procedures.find(item => item.id === (service === 'coca-cola' ? 'cc-nao-refrigera' : 'bk-incompleto'))!;
  const current = procedure.steps[stepIndex];
  const say = current.id === 'abertura' ? formatGreeting(current.say, getDefaultGreeting()) : current.say;
  function changeService(next: Project) { setService(next); setStepIndex(0); setCompleted([]); }
  function restart() { setStepIndex(0); setCompleted([]); }
  function markStep() { setCompleted(old => old.includes(current.id) ? old.filter(id => id !== current.id) : [...old, current.id]); }

  return <section className="live-dashboard" aria-label="Pré-visualização do atendimento em direto">
    <div className="live-dashboard-head"><span><Headphones size={19}/> Atendimento em direto</span><span className="live-dashboard-mode">MODO DE TREINO</span></div>
    <div className="live-dashboard-tabs" role="group" aria-label="Serviço da demonstração">
      <button type="button" className={service === 'coca-cola' ? 'chosen' : ''} aria-pressed={service === 'coca-cola'} onClick={() => changeService('coca-cola')}>Coca-Cola</button>
      <button type="button" className={service === 'burger-king' ? 'chosen' : ''} aria-pressed={service === 'burger-king'} onClick={() => changeService('burger-king')}>Burger King</button>
    </div>
    <p className="live-dashboard-subtitle">{procedure.title}</p>
    <div className="live-dashboard-steps" aria-label="Progresso do guião">
      {procedure.steps.map((step, i) => <button type="button" key={step.id} className={stepIndex === i ? 'current' : ''} title={step.title} aria-label={`Etapa ${i+1}: ${step.title}`} aria-current={stepIndex === i ? 'step' : undefined} onClick={() => setStepIndex(i)}><span>{i+1}</span></button>)}
    </div>
    <p className="live-dashboard-step-title">Etapa {stepIndex+1} de {procedure.steps.length}: {current.title}</p>
    <div className="live-dashboard-say"><strong>O que dizer ao cliente</strong><blockquote>“{say}”</blockquote><SpeechPlayer text={say} compact/></div>
    <label className="live-dashboard-check"><input type="checkbox" checked={completed.includes(current.id)} onChange={markStep}/><span>Verifiquei esta etapa</span></label>
    <div className="live-dashboard-controls">
      <button type="button" className="outline-button" onClick={() => setStepIndex(i => Math.max(0, i-1))} disabled={stepIndex === 0}><ChevronLeft size={16}/> Voltar</button>
      <button type="button" className="primary-button" onClick={() => setStepIndex(i => Math.min(procedure.steps.length-1, i+1))} disabled={stepIndex === procedure.steps.length-1}>Avançar <ChevronRight size={16}/></button>
    </div>
    <div className="live-dashboard-footer">
      <button type="button" onClick={() => onOpen(procedure)}>Abrir guião completo <ChevronRight size={15}/></button>
      <button type="button" onClick={restart} aria-label="Recomeçar treino"><RotateCcw size={16}/></button>
    </div>
    <p className="live-dashboard-caution"><CircleAlert size={15}/> Guião de apoio por confirmar. Não regista chamadas nem dados de clientes.</p>
  </section>;
}
