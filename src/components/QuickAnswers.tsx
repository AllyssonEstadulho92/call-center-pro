import { useMemo, useState } from 'react';
import { BookOpen, Check, ChevronRight, CircleAlert, Copy, MessageCircle, Search, ShieldAlert, X } from 'lucide-react';
import { procedures } from '../data/knowledge';
import { CallSafetyReplies } from './CallSafetyReplies';
import { findQuickStep } from '../lib/quickAnswers';
import { searchProcedures } from '../lib/search';
import type { Procedure, Project } from '../types';

type Service = Project | 'todos';

export function QuickAnswers({ onOpen }: { onOpen: (procedure: Procedure) => void }) {
  const [service, setService] = useState<Service>('todos');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<{ id: string; ok: boolean } | null>(null);
  const results = useMemo(() => searchProcedures(procedures, query, service), [query, service]);

  async function copyPhrase(id: string, phrase: string) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard indisponível');
      await navigator.clipboard.writeText(phrase);
      setCopyState({ id, ok: true });
    } catch {
      setCopyState({ id, ok: false });
    }
  }

  return <section className="quick-answer-page">
    <div className="page-intro">
      <span className="eyebrow"><MessageCircle size={15}/> RESPOSTA DURANTE A CHAMADA</span>
      <h1>O que digo ao cliente?</h1>
      <p>Pesquisa o assunto e consulta uma frase sugerida, o que deves confirmar e o que evitar. Abre o guião completo sempre que precisares de contexto.</p>
    </div>
    <div className="quick-answer-warning" role="note"><ShieldAlert size={19}/>
      <div><strong>Guiões de treino, não instruções oficiais</strong><p>As frases provêm da base de apoio e estão por confirmar operacionalmente. Não garantas ações, prazos ou resoluções sem consultar os sistemas autorizados.</p></div>
    </div>
    <div className="quick-answer-controls">
      <label className="quick-answer-search"><Search size={20}/><span className="sr-only">Pesquisar respostas rápidas</span>
        <input type="search" value={query} onChange={event => { setQuery(event.target.value); setExpanded(null); }} placeholder="Ex.: não faz frio, aplicação, atraso..." />
        {query && <button type="button" aria-label="Limpar pesquisa" onClick={() => setQuery('')}><X size={16}/></button>}
      </label>
      <div className="quick-answer-filters" role="group" aria-label="Serviço">
        {([['todos', 'Todos'], ['coca-cola', 'Coca-Cola'], ['burger-king', 'Burger King']] as const).map(([value, label]) =>
          <button type="button" key={value} aria-pressed={service === value} className={service === value ? 'selected' : ''} onClick={() => { setService(value); setExpanded(null); }}>{label}</button>
        )}
      </div>
    </div>
    {service !== 'todos' && <CallSafetyReplies key={service} project={service}/>}
    <p className="quick-answer-count" role="status">{results.length} {results.length === 1 ? 'situação encontrada' : 'situações encontradas'}</p>
    {results.length === 0 && <div className="quick-answer-empty"><Search size={27}/><strong>Nenhuma resposta encontrada.</strong><p>Experimenta uma palavra mais simples ou muda o serviço selecionado.</p></div>}
    <div className="quick-answer-list">{results.map(procedure => {
      const step = findQuickStep(procedure);
      const isExpanded = expanded === procedure.id;
      return <article className="quick-answer-item" key={procedure.id}>
        <button type="button" className="quick-answer-toggle" aria-expanded={isExpanded} aria-controls={`qa-${procedure.id}`} onClick={() => { setExpanded(isExpanded ? null : procedure.id); setCopyState(null); }}>
          <span className="quick-answer-item-heading"><span className={`quick-answer-project ${procedure.project === 'coca-cola' ? 'cc' : 'bk'}`}>{procedure.project === 'coca-cola' ? 'CC' : 'BK'}</span><span><strong>{procedure.title}</strong><small>{procedure.project === 'coca-cola' ? 'Coca-Cola' : 'Burger King'} · {procedure.category}</small></span></span>
          <ChevronRight className={isExpanded ? 'quick-answer-chevron open' : 'quick-answer-chevron'} size={20}/>
        </button>
        {isExpanded && <div id={`qa-${procedure.id}`} className="quick-answer-detail">
          <span className="quick-answer-status"><CircleAlert size={15}/> {procedure.status === 'exemplo' ? 'Exemplo de formação' : 'Procedimento por confirmar'}</span>
          <div className="quick-answer-speech"><span>FRASE SUGERIDA</span><p>“{step.say}”</p></div>
          <div className="quick-answer-info"><strong><Check size={17}/> O que verificar</strong><p>{step.verify}</p></div>
          <div className="quick-answer-info"><strong><CircleAlert size={17}/> O que evitar</strong><p>{step.avoid}</p></div>
          <div className="quick-answer-actions">
            <button type="button" className="outline-button" onClick={() => copyPhrase(procedure.id, step.say)}><Copy size={16}/> Copiar frase</button>
            <button type="button" className="primary-button" onClick={() => onOpen(procedure)}><BookOpen size={16}/> Guião completo <ChevronRight size={16}/></button>
          </div>
          {copyState?.id === procedure.id && <p className={copyState.ok ? 'quick-answer-copy-success' : 'quick-answer-copy-error'} role="status">{copyState.ok ? 'Frase copiada.' : 'Não foi possível copiar. Seleciona a frase manualmente.'}</p>}
          <p className="quick-answer-disclaimer">Não introduzas dados pessoais dos clientes nesta aplicação.</p>
        </div>}
      </article>;
    })}</div>
  </section>;
}
