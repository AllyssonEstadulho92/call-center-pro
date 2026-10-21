import { useMemo, useRef, useState } from 'react';
import {
  ArrowLeft, BookOpen, Check, ChevronLeft, ChevronRight, CircleAlert,
  ClipboardCheck, ExternalLink, FileText, List, LockKeyhole,
  Search, ShieldAlert, ShieldCheck, Volume2, X,
} from 'lucide-react';
import { procedures } from '../data/knowledge';
import { getManualCategories, getManualGuide, getManualTopics } from '../data/manuals';
import { getProcedureSources, getPublicSources } from '../data/publicSources';
import { SpeechPlayer } from './SpeechPlayer';
import { formatGreeting, getDefaultGreeting } from '../lib/greeting';
import { getClosingText, type ClosingStatus } from '../lib/callOutcomes';
import { ClosingStatusPicker } from './ClosingStatusPicker';
import type { Procedure, Project } from '../types';

export interface ManualHubProps {
  project: Project;
  onOpenProcedure: (procedure: Procedure) => void;
  onSwitch: (project: Project) => void;
}

export function ManualHub({ project, onOpenProcedure, onSwitch }: ManualHubProps) {
  const guide = getManualGuide(project);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [stage, setStage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [doneSteps, setDoneSteps] = useState<string[]>([]);
  const [closingChoice, setClosingChoice] = useState<{ procedureId: string; status: ClosingStatus }>({ procedureId: '', status: 'neutro' });
  const articleRef = useRef<HTMLElement | null>(null);
  const chapters = useMemo(() => getManualTopics(project, query, category), [project, query, category]);
  const categories = getManualCategories(project);
  const selected = procedures.find(item => item.project === project && item.id === selectedId) ?? null;
  const current = selected?.steps[stage] ?? null;
  const chapterSources = selected ? getProcedureSources(selected.id) : [];
  const generalSources = getPublicSources(guide.factIds);

  function selectChapter(id: string) {
    setSelectedId(id);
    setStage(0);
    setShowAll(false);
    setDoneSteps([]);
    setClosingChoice({ procedureId: id, status: 'neutro' });
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 980px)').matches) {
      window.setTimeout(() => articleRef.current?.scrollIntoView({ block: 'start' }), 0);
    }
  }

  function returnToIndex() {
    setSelectedId(null);
    setClosingChoice({ procedureId: '', status: 'neutro' });
    setStage(0);
    setShowAll(false);
    setDoneSteps([]);
  }

  function changeStage(index: number) {
    if (!selected) return;
    setStage(Math.min(selected.steps.length - 1, Math.max(0, index)));
  }

  function toggleDone(id: string) {
    setDoneSteps(old => old.includes(id) ? old.filter(value => value !== id) : [...old, id]);
  }

  function renderStage(step: Procedure['steps'][number], index: number, topic: Procedure) {
    const selectedStatus: ClosingStatus = closingChoice.procedureId === topic.id ? closingChoice.status : 'neutro';
    const phrase = getClosingText(topic, step, selectedStatus);
    const spoken = step.id === 'abertura' ? formatGreeting(phrase, getDefaultGreeting()) : phrase;
    const following = topic.steps[index + 1];
    return <section className="manual-step" key={step.id} aria-label={`Etapa ${index + 1}: ${step.title}`}>
      <div className="manual-step-heading"><span className="manual-step-number">{index + 1}</span><div><span className="manual-overline">ETAPA {index + 1} DE {topic.steps.length}</span><h3>{step.title}</h3></div></div>
      <ClosingStatusPicker procedure={topic} step={step} status={selectedStatus} onChange={status => setClosingChoice({ procedureId: topic.id, status })}/>
      <div className="manual-speech-box">
        <span><Volume2 size={16}/> O QUE DIZER AO CLIENTE</span>
        <blockquote>“{spoken}”</blockquote>
        <SpeechPlayer text={spoken} compact/>
      </div>
      <div className="manual-step-detail verify"><strong><ClipboardCheck size={18}/> O que confirmar</strong><p>{step.verify}</p></div>
      <div className="manual-step-detail avoid"><strong><ShieldAlert size={18}/> O que evitar</strong><p>{step.avoid}</p></div>
      {step.note && <div className="manual-step-note"><FileText size={15}/> {step.note}</div>}
      <div className="manual-step-next"><strong>Depois desta etapa</strong><p>{following ? `Continua para: ${following.title}.` : 'Confirma as ações realmente efetuadas no sistema autorizado e encerra sem prometer resultados não confirmados.'}</p></div>
      <label className="manual-step-checkbox"><input type="checkbox" checked={doneSteps.includes(step.id)} onChange={() => toggleDone(step.id)}/> <span>Já consultei esta etapa</span></label>
    </section>;
  }

  return <section className={`manual-page manual-${project}`}>
    <div className="manual-head">
      <span className="eyebrow"><BookOpen size={16}/> BIBLIOTECA DE MANUAIS</span>
      <h1>{guide.title}</h1>
      <p>{guide.subtitle}. {guide.audience}</p>
      <div className="manual-project-switch" role="group" aria-label="Escolher manual">
        <button type="button" className={project === 'coca-cola' ? 'selected' : ''} aria-pressed={project === 'coca-cola'} onClick={() => onSwitch('coca-cola')}>Manual Coca-Cola</button>
        <button type="button" className={project === 'burger-king' ? 'selected' : ''} aria-pressed={project === 'burger-king'} onClick={() => onSwitch('burger-king')}>Manual Burger King</button>
      </div>
    </div>

    <div className="manual-not-validated" role="note"><ShieldAlert size={21}/><div><strong>Manual de apoio e treino. Procedimentos operacionais por confirmar.</strong>
      <p>O conteúdo utiliza os guiões de estudo já preparados e páginas públicas das marcas. As fontes públicas comprovam apenas o que está nelas publicado, não regras internas, permissões de sistemas, prazos ou decisões sobre pedidos.</p>
    </div></div>

    <div className="manual-layout">
      <aside className="manual-index" aria-label={`Índice do ${guide.title}`}>
        <div className="manual-index-top"><span><List size={18}/> Índice de assuntos</span><span>{chapters.length}</span></div>
        <label className="manual-index-search"><Search size={18}/><span className="sr-only">Pesquisar neste manual</span>
          <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Ex.: não faz frio, encomenda..." />
          {query && <button type="button" aria-label="Limpar pesquisa no manual" onClick={() => setQuery('')}><X size={15}/></button>}
        </label>
        <label className="manual-category-label">Filtrar por tema
          <select value={category} onChange={event => setCategory(event.target.value)}>
            {categories.map(item => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>
        <button className={selectedId === null ? 'manual-index-item selected' : 'manual-index-item'} type="button" aria-current={selectedId === null ? 'page' : undefined} onClick={returnToIndex}><BookOpen size={17}/><span>Começar pelo princípio<small>Visão geral e método de atendimento</small></span><ChevronRight size={16}/></button>
        <div className="manual-index-results" role="status">{chapters.length} {chapters.length === 1 ? 'capítulo' : 'capítulos'}</div>
        <nav aria-label="Capítulos do manual">
          {chapters.length === 0 ? <p className="manual-index-empty">Não foi encontrado nenhum tema. Experimenta outras palavras.</p> :
            chapters.map((chapter, idx) => <button type="button" key={chapter.id}
              aria-current={selectedId === chapter.id ? 'page' : undefined}
              className={selectedId === chapter.id ? 'manual-index-item selected' : 'manual-index-item'}
              onClick={() => selectChapter(chapter.id)}>
              <span className="manual-topic-num">{String(idx + 1).padStart(2, '0')}</span><span>{chapter.title}<small>{chapter.category} · {chapter.status === 'exemplo' ? 'Exemplo' : 'Por confirmar'}</small></span><ChevronRight size={16}/>
            </button>)}
        </nav>
        <p className="manual-index-foot"><LockKeyhole size={15}/> Não introduzir nomes, NIF, moradas ou números de encomenda nesta ferramenta.</p>
      </aside>

      <article className="manual-reading" id="manual-reading" ref={articleRef}>
        {!selected ? <>
          <div className="manual-opening"><span className="manual-overline">COMEÇA AQUI</span><h2>Um atendimento de cada vez, sem te perderes</h2><p>{guide.introduction}</p></div>
          <div className="manual-opening-phrase"><strong>Exemplo de abertura</strong><blockquote>“{formatGreeting(guide.opening, getDefaultGreeting())}”</blockquote><SpeechPlayer text={formatGreeting(guide.opening, getDefaultGreeting())} compact/></div>
          <h3 className="manual-section-title">Roteiro do princípio ao fim</h3>
          <div className="manual-phase-list">{guide.phases.map((phase,i) => <section key={phase.title} className="manual-phase">
            <span className="manual-phase-number">{String(i + 1).padStart(2, '0')}</span><div><h4>{phase.title}</h4><p>{phase.guidance}</p><small><ShieldAlert size={14}/> {phase.notice}</small></div>
          </section>)}</div>
          <h3 className="manual-section-title">Como responder com clareza</h3>
          <div className="manual-principles">{guide.principles.map(item => <p key={item}><Check size={18}/> {item}</p>)}</div>
          <h3 className="manual-section-title">Dúvidas que podes encontrar</h3>
          <div className="manual-faqs">{guide.frequentlyAsked.map(faq => <section key={faq.question}><span>{faq.status === 'informacao-publica' ? 'Informação de fonte pública' : 'Resposta de treino'}</span><h4>{faq.question}</h4><p>{faq.response}</p></section>)}</div>
          <div className="manual-index-hint"><BookOpen size={18}/> Escolhe um assunto no índice para veres todas as etapas do respetivo guião, com leitura em voz alta e opções para avançar ou retroceder.</div>
        </> : <>
          <button type="button" className="manual-back" onClick={returnToIndex}><ArrowLeft size={17}/> Voltar ao início do manual</button>
          <span className="manual-overline">CAPÍTULO · {selected.category}</span>
          <h2>{selected.title}</h2>
          <p className="manual-chapter-summary">{selected.summary}</p>
          <div className="manual-verification"><CircleAlert size={17}/><strong>{selected.status === 'exemplo' ? 'Exemplo de formação' : 'Por confirmar na operação'}</strong><span>Nunca tratado como validado apenas por constar neste manual.</span></div>
          <div className="manual-chapter-progress"><span>{showAll ? 'Consulta integral do guião' : `Etapa ${stage + 1} de ${selected.steps.length}`}</span><span>{doneSteps.length}/{selected.steps.length} consultadas</span></div>
          <div className="manual-step-picker" role="group" aria-label="Escolher etapa do guião">
            {selected.steps.map((step, i) => <button type="button" key={step.id} title={step.title}
              aria-current={i === stage && !showAll ? 'step' : undefined} aria-label={`Etapa ${i+1}: ${step.title}`}
              className={stage === i && !showAll ? 'active' : ''}
              onClick={() => { setStage(i); setShowAll(false); }}>{i + 1}</button>)}
          </div>
          <div className="manual-view-toggle" role="group" aria-label="Modo de consulta do guião">
            <button type="button" className={!showAll ? 'active' : ''} aria-pressed={!showAll} onClick={() => setShowAll(false)}>Passo a passo</button>
            <button type="button" className={showAll ? 'active' : ''} aria-pressed={showAll} onClick={() => setShowAll(true)}>Ler guião completo</button>
          </div>
          <div className="manual-steps-region">
            {showAll ? selected.steps.map((step, index) => renderStage(step, index, selected)) : current && renderStage(current, stage, selected)}
          </div>
          {!showAll && <div className="manual-stage-nav"><button type="button" className="outline-button" disabled={stage === 0} onClick={() => changeStage(stage - 1)}><ChevronLeft size={17}/> Anterior</button><button type="button" className="primary-button" disabled={stage === selected.steps.length - 1} onClick={() => changeStage(stage + 1)}>Seguinte <ChevronRight size={17}/></button></div>}
          <button type="button" className="manual-open-live" onClick={() => onOpenProcedure(selected)}><BookOpen size={18}/> Abrir este assunto no Atendimento em Direto <ChevronRight size={16}/></button>
          <div className="manual-origin"><strong><FileText size={18}/> Origem deste guião</strong><p>{selected.source}</p><p>Data de validação operacional: <strong>{selected.lastValidated ?? 'Não existe validação institucional registada'}</strong>.</p></div>
          <div className="manual-source-limits"><strong>Fontes públicas relacionadas com este capítulo</strong>{chapterSources.length > 0 ? chapterSources.map(source => <div key={source.id} className="manual-source-mini"><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<ExternalLink size={14}/></a><p>{source.limitation}</p></div>) : <p>Não existe fonte pública associada diretamente a este procedimento. A sequência depende de confirmação interna.</p>}</div>
        </>}

        <div className="manual-public-sources"><h3><ShieldCheck size={19}/> Fontes públicas de referência</h3><p>Confirma as informações nos portais originais. A existência de uma fonte oficial não valida os guiões de atendimento.</p>
          {generalSources.map(source => <div className="manual-reference" key={source.id}><div><strong>{source.title}</strong><span>{source.publisher} · Consulta registada em {source.confirmed}</span><p>{source.scope}</p><small>{source.limitation}</small></div><a href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir fonte: ${source.title}`}><ExternalLink size={18}/></a></div>)}
        </div>
        <p className="manual-privacy"><LockKeyhole size={16}/> Este manual serve para leitura, estudo e consulta. Usa os sistemas operacionais autorizados para qualquer dado real de clientes.</p>
      </article>
    </div>
  </section>;
}
