import { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, CircleAlert, ClipboardCheck, Copy, Headphones, RotateCcw, ShieldAlert } from 'lucide-react';
import { procedures } from '../data/knowledge';
import { formatGreeting, getDefaultGreeting } from '../lib/greeting';
import { SpeechPlayer } from './SpeechPlayer';
import type { Procedure, Project } from '../types';

export function LiveCallPanel({ onOpen }: { onOpen: (procedure: Procedure) => void }) {
  const [service, setService] = useState<Project>('coca-cola');
  const [procedureId, setProcedureId] = useState('cc-nao-refrigera');
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [copyStatus, setCopyStatus] = useState('');
  const options = procedures.filter(item => item.project === service);
  const procedure = options.find(item => item.id === procedureId) ?? options[0];
  const current = procedure.steps[stepIndex] ?? procedure.steps[0];
  const say = current.id === 'abertura' ? formatGreeting(current.say, getDefaultGreeting()) : current.say;

  function changeService(next: Project) {
    setService(next);
    setProcedureId(procedures.find(item => item.project === next)?.id ?? '');
    setStepIndex(0);
    setCompleted([]);
    setCopyStatus('');
  }
  function changeProcedure(id: string) {
    setProcedureId(id);
    setStepIndex(0);
    setCompleted([]);
    setCopyStatus('');
  }
  function restart() { setStepIndex(0); setCompleted([]); setCopyStatus(''); }
  function markStep() { setCompleted(old => old.includes(current.id) ? old.filter(id => id !== current.id) : [...old, current.id]); }

  async function copyPhrase() {
    try {
      await navigator.clipboard.writeText(say);
      setCopyStatus('Frase copiada.');
    } catch { setCopyStatus('Não foi possível copiar. Seleciona a frase manualmente.'); }
  }

  return <section className="live-dashboard" aria-label="Pré-visualização do atendimento em direto">
    <div className="live-dashboard-head"><span><Headphones size={20}/> Atendimento em direto</span><span className="live-dashboard-mode">GUIÃO DE APOIO</span></div>
    <div className="live-dashboard-tabs" role="group" aria-label="Escolher serviço">
      <button type="button" className={service === 'coca-cola' ? 'chosen' : ''} aria-pressed={service === 'coca-cola'} onClick={() => changeService('coca-cola')}>Coca-Cola</button>
      <button type="button" className={service === 'burger-king' ? 'chosen' : ''} aria-pressed={service === 'burger-king'} onClick={() => changeService('burger-king')}>Burger King</button>
    </div>
    <label className="live-situation-picker">Assunto da chamada
      <select value={procedure.id} onChange={event => changeProcedure(event.target.value)}>
        {options.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
      </select>
    </label>
    <div className="live-dashboard-steps" aria-label="Progresso do guião">
      {procedure.steps.map((step, i) => <button type="button" key={step.id} className={stepIndex === i ? 'current' : ''} title={step.title} aria-label={`Etapa ${i + 1}: ${step.title}`} aria-current={stepIndex === i ? 'step' : undefined} onClick={() => { setStepIndex(i); setCopyStatus(''); }}><span>{completed.includes(step.id) ? <Check size={14}/> : i + 1}</span></button>)}
    </div>
    <p className="live-dashboard-step-title">Etapa {stepIndex + 1} de {procedure.steps.length}: <strong>{current.title}</strong></p>
    <div className="live-dashboard-say">
      <div className="live-say-title"><strong>O que dizer ao cliente</strong><button type="button" aria-label="Copiar frase do guião" onClick={copyPhrase}><Copy size={15}/> Copiar</button></div>
      <blockquote>“{say}”</blockquote>
      <div className="live-speech-label">Pré-escuta para memorizar</div>
      <SpeechPlayer key={`${procedure.id}-${current.id}`} text={say} compact/>
      {copyStatus && <p className="live-copy-status" role="status">{copyStatus}</p>}
    </div>
    <div className="live-verification">
      <strong><ClipboardCheck size={17}/> O que verificar</strong>
      <p>{current.verify}</p>
      <details><summary><ShieldAlert size={15}/> O que evitar</summary><p>{current.avoid}</p></details>
    </div>
    <label className="live-dashboard-check"><input type="checkbox" checked={completed.includes(current.id)} onChange={markStep}/><span>Já consultei esta etapa</span></label>
    <div className="live-dashboard-controls">
      <button type="button" className="outline-button" onClick={() => { setStepIndex(i => Math.max(0, i - 1)); setCopyStatus(''); }} disabled={stepIndex === 0}><ChevronLeft size={16}/> Voltar</button>
      <button type="button" className="primary-button" onClick={() => { setStepIndex(i => Math.min(procedure.steps.length - 1, i + 1)); setCopyStatus(''); }} disabled={stepIndex === procedure.steps.length - 1}>Avançar <ChevronRight size={16}/></button>
    </div>
    <div className="live-dashboard-footer">
      <button type="button" onClick={() => onOpen(procedure)}>Abrir guião completo <ChevronRight size={15}/></button>
      <button type="button" onClick={restart} aria-label="Recomeçar guião"><RotateCcw size={16}/></button>
    </div>
    <p className="live-dashboard-caution"><CircleAlert size={15}/> Exemplo ou orientação por confirmar. Não guarda chamadas nem dados de clientes.</p>
  </section>;
}
