import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen, Check, CheckCheck, ChevronLeft, ChevronRight, CircleAlert,
  Coffee, Copy, FileCheck2, Headphones, HelpCircle, History, Home, Info, LockKeyhole,
  Menu, MessageCircle, MonitorSmartphone, Moon, Search, ShieldCheck, SlidersHorizontal,
  PhoneCall, RotateCcw, ZoomIn, ZoomOut, ExternalLink, Compass,
  Sparkles, Star, Sun, X, GraduationCap,
} from 'lucide-react';
import { procedures, projectLabels } from './data/knowledge';
import { searchProcedures } from './lib/search';
import { publicSources, getProcedureSources } from './data/publicSources';
import { RoutingGuide } from './components/RoutingGuide';
import { QuickAnswers } from './components/QuickAnswers';
import { Training } from './components/Training';
import { LiveCallPanel } from './components/LiveCallPanel';
import { SpeechPlayer } from './components/SpeechPlayer';
import { Simulations } from './components/Simulations';
import { FrequentlyAsked } from './components/FrequentlyAsked';
import { ManualHub } from './components/ManualHub';
import { EvidenceAuditPanel } from './components/EvidenceAuditPanel';
import { DashboardResources } from './components/DashboardResources';
import { ServiceArtwork } from './components/ServiceArtwork';
import { formatGreeting, getDefaultGreeting } from './lib/greeting';
import { getClosingText, type ClosingStatus } from './lib/callOutcomes';
import { ClosingStatusPicker } from './components/ClosingStatusPicker';
import type { Greeting } from './lib/greeting';
import type { Page, Procedure, Project, Status } from './types';

const VERSION = '1.9.4';
const FAVORITES_KEY = 'call-center-pro-favoritos-v1';
const THEME_KEY = 'call-center-pro-tema-v1';

function getPreferredDarkMode(): boolean {
  try { const stored = window.localStorage.getItem(THEME_KEY); if (stored === 'dark') return true; if (stored === 'light') return false; } catch { /* Armazenamento opcional. */ }
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

type ProjectFilter = Project | 'todos';

// Evita abrir o teclado automaticamente em dispositivos tácteis.
function shouldAutoFocusTextInput(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function CallLauncher({ onClose, onChoose }: { onClose: () => void; onChoose: (procedure: Procedure) => void }) {
  const [project, setProject] = useState<ProjectFilter>('todos');
  const [term, setTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const available = useMemo(() => searchProcedures(procedures, term, project), [project, term]);

  useEffect(() => {
    const priorFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (shouldAutoFocusTextInput()) {
      inputRef.current?.focus({ preventScroll: true });
    } else {
      dialogRef.current?.querySelector<HTMLElement>('.launcher-close')?.focus({ preventScroll: true });
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return; }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const controls = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled)'));
      if (!controls.length) return;
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => { window.removeEventListener('keydown', onKeyDown); priorFocus?.focus(); };
  }, [onClose]);

  return <div className="launcher-layer"><button type="button" className="launcher-backdrop" aria-label="Fechar seleção de atendimento" onClick={onClose}/><div className="launcher-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="launcher-title">
    <div className="launcher-header"><div><span className="eyebrow"><PhoneCall size={15}/> ACESSO RÁPIDO</span><h2 id="launcher-title">Iniciar atendimento</h2><p>Escolhe o serviço e o assunto. Sem registar dados de clientes.</p></div><button type="button" className="icon-button launcher-close" aria-label="Fechar" onClick={onClose}><X size={22}/></button></div>
    <div className="launcher-filters" role="group" aria-label="Filtrar por serviço">{([['todos', 'Ambos os serviços'], ['coca-cola', 'Coca-Cola'], ['burger-king', 'Burger King']] as const).map(([value, label]) => <button type="button" key={value} className={project === value ? 'chosen' : ''} aria-pressed={project === value} onClick={() => setProject(value)}>{label}</button>)}</div>
    <label className="launcher-search"><Search size={19}/><input ref={inputRef} value={term} onChange={e => setTerm(e.target.value)} placeholder="Ex.: não faz frio, aplicação, pedido incompleto" aria-label="Pesquisar situação de atendimento" /></label>
    <div className="launcher-list" aria-live="polite">{available.length > 0 ? available.map((item) => <button className="launcher-option" type="button" key={item.id} onClick={() => onChoose(item)}><ProjectMark project={item.project}/><span className="launcher-option-info"><strong>{item.title}</strong><small>{item.project === 'coca-cola' ? 'Coca-Cola' : 'Burger King'} · {item.category}</small></span><StatusTag status={item.status}/><ChevronRight size={18}/></button>) : <div className="launcher-empty">Não foi encontrado nenhum guião. Experimenta outro termo.</div>}</div>
    <p className="launcher-footnote"><CircleAlert size={16}/> Estes conteúdos são exemplos ou orientações por confirmar. Consulta as instruções oficiais antes de efetuar procedimentos.</p>
  </div></div>;
}


function getStoredFavorites(): string[] {
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    const ids: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(ids) ? ids.filter((id): id is string => typeof id === 'string') : [];
  } catch { return []; }
}

function StatusTag({ status }: { status: Status }) {
  const titles = { validado: 'Validado', 'por-confirmar': 'Por confirmar', exemplo: 'Exemplo de formação' };
  return <span className={`status status-${status}`}><span className="status-dot" />{titles[status]}</span>;
}

function ProjectMark({ project }: { project: Project }) {
  return <span className={`project-mark project-mark-${project}`} aria-hidden="true">{project === 'coca-cola' ? 'CC' : 'BK'}</span>;
}

function ProcedureCard({ data, isFavorite, onOpen, onFavorite }: {
  data: Procedure; isFavorite: boolean; onOpen: () => void; onFavorite: () => void;
}) {
  return <article className="procedure-card">
    <div className="procedure-card-top"><span className="eyebrow">{data.category}</span><button type="button" className={`icon-button fav ${isFavorite ? 'is-favorite' : ''}`} aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'} aria-pressed={isFavorite} onClick={onFavorite}><Star size={18} fill={isFavorite ? 'currentColor' : 'none'}/></button></div>
    <h3>{data.title}</h3><p>{data.summary}</p>
    <div className="procedure-card-bottom"><StatusTag status={data.status}/><button type="button" onClick={onOpen} className="small-link">Abrir guião <ChevronRight size={16}/></button></div>
  </article>;
}

function Workflow({ data, onBack, isFavorite, onFavorite }: {
  data: Procedure; onBack: () => void; isFavorite: boolean; onFavorite: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [reading, setReading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [greeting, setGreeting] = useState<Greeting>(getDefaultGreeting);
  const [fontSize, setFontSize] = useState(28);
  const [closingChoice, setClosingChoice] = useState<{ procedureId: string; status: ClosingStatus }>({ procedureId: data.id, status: 'neutro' });
  const current = data.steps[index];
  const selectedStatus: ClosingStatus = closingChoice.procedureId === data.id ? closingChoice.status : 'neutro';
  const script = getClosingText(data, current, selectedStatus);
  const readableScript = current.id === 'abertura' ? formatGreeting(script, greeting) : script;
  const progress = Math.round((completed.size / data.steps.length) * 100);

  useEffect(() => { setIndex(0); setCompleted(new Set()); setReading(false); setCopied(false); setClosingChoice({ procedureId: data.id, status: 'neutro' }); }, [data.id]);
  function markStep() {
    setCompleted((old) => {
      const updated = new Set(old);
      if (updated.has(current.id)) updated.delete(current.id); else updated.add(current.id);
      return updated;
    });
  }
  async function copyScript() {
    try {
      await navigator.clipboard.writeText(readableScript);
      setCopyError(false);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }
  return <div className={`workflow ${reading ? 'reading-mode' : ''}`}>
    <div className="page-crumb"><button type="button" onClick={onBack}><ChevronLeft size={17}/> Voltar aos procedimentos</button></div>
    <div className="workflow-head">
      <div><div className="eyebrow">MODO ATENDIMENTO EM DIRETO</div><h2>{data.title}</h2><p>{data.summary}</p></div>
      <div className="workflow-head-actions"><button className={`outline-button ${isFavorite ? 'is-favorite' : ''}`} type="button" onClick={onFavorite}><Star size={17} fill={isFavorite ? 'currentColor' : 'none'}/>{isFavorite ? 'Guardado' : 'Favorito'}</button><button type="button" className="outline-button" onClick={() => setReading(!reading)} aria-pressed={reading}><BookOpen size={17}/>{reading ? 'Vista normal' : 'Teleponto'}</button><button type="button" className="outline-button" onClick={() => { setIndex(0); setCompleted(new Set()); setCopied(false); setClosingChoice({ procedureId: data.id, status: 'neutro' }); }}><RotateCcw size={16}/> Recomeçar</button></div>
    </div>
    <div className="validation-banner"><CircleAlert size={19}/><div><strong>Conteúdo não validado institucionalmente</strong><p>Este guião serve de apoio e treino. Confirma sempre os procedimentos reais nos canais autorizados.</p></div></div>
    <div className="workflow-columns">
      <div className="workflow-main">
        <section className="stage-card">
          <div className="stage-progress-heading"><span>ETAPA {index + 1} DE {data.steps.length}</span><span>{progress}% consultado</span></div>
          <div className="progress-track"><div style={{ width: `${progress}%` }}/></div>
          <div className="stage-index"><span>{String(index + 1).padStart(2, '0')}</span><h3>{current.title}</h3></div>
          <ClosingStatusPicker procedure={data} step={current} status={selectedStatus} onChange={status => { setClosingChoice({ procedureId: data.id, status }); setCopied(false); }}/>
            <div className="script-tools"><div className="script-label"><MessageCircle size={18}/> O QUE DIZER AO CLIENTE</div><div className="script-controls">{current.id === 'abertura' && <div className="greeting-switch" role="group" aria-label="Selecionar saudação"><button type="button" className={greeting === 'bom dia' ? 'active' : ''} aria-pressed={greeting === 'bom dia'} onClick={() => setGreeting('bom dia')}>Bom dia</button><button type="button" className={greeting === 'boa tarde' ? 'active' : ''} aria-pressed={greeting === 'boa tarde'} onClick={() => setGreeting('boa tarde')}>Boa tarde</button></div>}{reading && <div className="font-switch" role="group" aria-label="Tamanho de letra"><button type="button" aria-label="Diminuir tamanho da letra" disabled={fontSize <= 20} onClick={() => setFontSize(n => Math.max(20,n-2))}><ZoomOut size={17}/></button><span>{fontSize}px</span><button type="button" aria-label="Aumentar tamanho da letra" disabled={fontSize >= 40} onClick={() => setFontSize(n => Math.min(40,n+2))}><ZoomIn size={17}/></button></div>}</div></div>
          <blockquote className="script-text" style={reading ? {fontSize: `${fontSize}px`} : undefined}>“{readableScript}”</blockquote><SpeechPlayer text={readableScript}/>
          <div className="stage-footer"><button className="outline-button" type="button" onClick={copyScript}><Copy size={16}/>{copied ? 'Frase copiada' : 'Copiar frase'}</button><label className="check-line"><input type="checkbox" checked={completed.has(current.id)} onChange={markStep}/><span>Etapa consultada</span></label></div>{copyError && <p className="copy-error" role="alert">Não foi possível copiar. Seleciona a frase manualmente.</p>}
        </section>
        <div className="step-navigation"><button type="button" className="outline-button" disabled={index === 0} onClick={() => setIndex(index - 1)}><ChevronLeft size={18}/> Anterior</button><span>Etapa {index + 1} / {data.steps.length}</span><button type="button" className="primary-button" disabled={index === data.steps.length - 1} onClick={() => setIndex(index + 1)}>Próxima etapa <ChevronRight size={18}/></button></div>
        <section className="step-list"><h3>Etapas da chamada</h3><div className="step-pills">{data.steps.map((s, i) => <button type="button" key={s.id} className={`step-pill ${index === i ? 'active' : ''} ${completed.has(s.id) ? 'done' : ''}`} onClick={() => setIndex(i)} aria-current={index === i ? 'step' : undefined}><span>{completed.has(s.id) ? <Check size={15}/> : i + 1}</span>{s.title}</button>)}</div></section>
      </div>
      <aside className="notes-panel">
        <section className="side-note"><h3><CheckCheck size={18}/> O que verificar</h3><p>{current.verify}</p></section>
        <section className="side-note note-caution"><h3><CircleAlert size={18}/> O que evitar</h3><p>{current.avoid}</p></section>
        {current.note && <section className="side-note"><h3><Info size={18}/> Nota interna</h3><p>{current.note}</p></section>}
        <section className="side-note source-note"><h3><ShieldCheck size={18}/> Fiabilidade</h3><StatusTag status={data.status}/><p><strong>Origem do guião:</strong> {data.source}</p><p><strong>Validação operacional:</strong> {data.lastValidated ?? 'Não efetuada'}</p>{getProcedureSources(data.id).length > 0 && <><h4>Fontes públicas relacionadas</h4>{getProcedureSources(data.id).map(source => <a className="source-link" key={source.id} href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<ExternalLink size={14}/></a>)}<p>As fontes documentam os canais públicos, não os procedimentos da linha.</p></>}</section>
        <div className="privacy-reminder"><LockKeyhole size={17}/> Não introduzas dados pessoais dos clientes nesta aplicação.</div>
      </aside>
    </div>
  </div>;
}


function App() {
  const [page, setPage] = useState<Page>('inicio');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [searchProject, setSearchProject] = useState<ProjectFilter>('todos');
  const [favorites, setFavorites] = useState<string[]>(getStoredFavorites);
  const [menuOpen, setMenuOpen] = useState(false);
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(getPreferredDarkMode);
  const selected = procedures.find((p) => p.id === selectedId) ?? null;
  const filtered = useMemo(() => searchProcedures(procedures, query, searchProject), [query, searchProject]);
  const favoriteProcedures = procedures.filter((p) => favorites.includes(p.id));

  useEffect(() => { try { window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); } catch { /* Funcionamento sem armazenamento quando bloqueado. */ } }, [favorites]);
  useEffect(() => { document.documentElement.classList.toggle('dark', darkMode); try { window.localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light'); } catch { /* Preferência opcional. */ } return () => document.documentElement.classList.remove('dark'); }, [darkMode]);

  useEffect(() => {
    if (page === 'pesquisa' && shouldAutoFocusTextInput()) {
      document.getElementById('procedure-search')?.focus({ preventScroll: true });
    }
  }, [page]);

  function navigate(target: Page) { setPage(target); setSelectedId(null); setMenuOpen(false); }
  function openProcedure(p: Procedure) { setSelectedId(p.id); setPage(p.project); setMenuOpen(false); window.scrollTo(0, 0); }
  function toggleFavorite(id: string) { setFavorites((old) => old.includes(id) ? old.filter((x) => x !== id) : [...old, id]); }
  function openSearch() { navigate('pesquisa'); }
  function closeLauncher() { setLauncherOpen(false); }

  useEffect(() => {
    function onShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setLauncherOpen(false); setPage('pesquisa'); setSelectedId(null); setMenuOpen(false);
        window.setTimeout(() => document.getElementById('procedure-search')?.focus(), 0);
      }
    }
    window.addEventListener('keydown', onShortcut);
    return () => window.removeEventListener('keydown', onShortcut);
  }, []);

  const navigation: { id: Page; label: string; icon: typeof Home; secondary?: string }[] = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'coca-cola', label: 'Coca-Cola', icon: Coffee, secondary: 'Serviços de Avarias' },
    { id: 'burger-king', label: 'Burger King', icon: Headphones, secondary: 'Apoio ao Cliente' },
    { id: 'manual-coca-cola', label: 'Manual Coca-Cola', icon: BookOpen, secondary: 'Passo a passo · Avarias' },
    { id: 'manual-burger-king', label: 'Manual Burger King', icon: BookOpen, secondary: 'Passo a passo · Pedidos' },
    { id: 'triagem', label: 'Decidir encaminhamento', icon: Compass },
    { id: 'faq', label: 'Perguntas frequentes', icon: HelpCircle },
    { id: 'simulacoes', label: 'Simulações de chamada', icon: GraduationCap },
    { id: 'respostas', label: 'Respostas rápidas', icon: MessageCircle },
    { id: 'pesquisa', label: 'Pesquisa', icon: Search },
    { id: 'favoritos', label: 'Favoritos', icon: Star },
    { id: 'formacao', label: 'Área de estudo', icon: BookOpen },
    { id: 'versoes', label: 'Histórico de versões', icon: History },
    { id: 'seguranca', label: 'Segurança e fontes', icon: ShieldCheck },
  ];
  const pageName: Record<Page, string> = { inicio: 'Visão geral', 'coca-cola': 'Coca-Cola', 'burger-king': 'Burger King', 'manual-coca-cola': 'Manual Coca-Cola', 'manual-burger-king': 'Manual Burger King', triagem: 'Triagem', faq: 'Perguntas frequentes', simulacoes: 'Simulações', respostas: 'Respostas rápidas', pesquisa: 'Pesquisa', favoritos: 'Favoritos', formacao: 'Área de estudo', versoes: 'Versões', seguranca: 'Segurança e fontes' };

  function renderCards(items: Procedure[]) {
    return items.length ? <div className="procedures-grid">{items.map((p) => <ProcedureCard key={p.id} data={p} isFavorite={favorites.includes(p.id)} onOpen={() => openProcedure(p)} onFavorite={() => toggleFavorite(p.id)} />)}</div> : <div className="empty-state"><Search size={28}/><h3>Nenhum procedimento encontrado</h3><p>Experimenta outras palavras ou muda o filtro de pesquisa.</p></div>;
  }
  return <div className="app-shell">
    <a className="skip-link" href="#conteudo-principal">Saltar para o conteúdo principal</a>
    {launcherOpen && <CallLauncher onClose={closeLauncher} onChoose={(procedure) => { setLauncherOpen(false); openProcedure(procedure); }}/>}
    <button className="mobile-menu-button" type="button" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={23}/></button>
    {menuOpen && <button className="mobile-scrim" aria-label="Fechar menu" type="button" onClick={() => setMenuOpen(false)} />}
    <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
      <div className="brand"><span className="brand-icon"><Headphones size={27}/></span><span><strong>Call Center Pro</strong><small>O teu apoio no atendimento</small></span><button className="mobile-close" type="button" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}><X size={20}/></button></div>
      <div className="sidebar-label">ESPAÇO DE TRABALHO</div><nav aria-label="Navegação principal">{navigation.map(({ id, label, secondary, icon: Icon }) => <button key={id} type="button" className={`nav-item ${page === id ? 'active' : ''}`} onClick={() => navigate(id)} aria-current={page === id ? 'page' : undefined}><Icon size={19}/><span>{label}{secondary && <small>{secondary}</small>}</span>{id === 'favoritos' && favorites.length > 0 && <span className="nav-counter">{favorites.length}</span>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-tip"><ShieldCheck size={18}/><span>Consulta e formação.<br/>Não é uma ferramenta oficial.</span></div><small>Versão {VERSION} · Sem dados de clientes</small></div>
    </aside>
    <div className="main-area">
      <header className="topbar"><div className="topbar-breadcrumb"><span>Call Center Pro</span><ChevronRight size={14}/><strong>{pageName[page]}</strong></div><div className="top-actions"><button type="button" className="start-call-top" onClick={() => setLauncherOpen(true)}><PhoneCall size={17}/> Iniciar atendimento</button><button type="button" className="quick-search" onClick={openSearch} title="Pesquisar procedimentos (Ctrl+K ou Cmd+K)"><Search size={17}/> Pesquisar <span>⌘K</span></button><button type="button" className="icon-button theme-switch" title={darkMode ? 'Modo claro' : 'Modo escuro'} aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'} onClick={() => setDarkMode(!darkMode)}>{darkMode ? <Sun size={19}/> : <Moon size={19}/>}</button><span className="account-avatar">A</span></div></header>
      <main id="conteudo-principal" className="main-content" tabIndex={-1}>
        {page === 'inicio' && <>
          <section className="home-welcome" aria-labelledby="home-title">
            <div><span className="eyebrow"><Sparkles size={14}/> VISÃO GERAL · CALL CENTER PRO</span>
              <h1 id="home-title">Bem-vindo ao teu espaço de atendimento.</h1>
              <p>Encontra o guião certo, acompanha cada etapa e treina a comunicação com clareza.</p>
              <div className="home-welcome-actions"><button type="button" className="primary-button" onClick={() => setLauncherOpen(true)}><PhoneCall size={18}/> Iniciar atendimento <ChevronRight size={17}/></button>
              <button type="button" className="outline-button" onClick={() => navigate('manual-coca-cola')}><BookOpen size={17}/> Consultar manuais</button></div>
            </div>
            <div className="home-welcome-aside" role="note"><span><ShieldCheck size={19}/> CONFIANÇA NA INFORMAÇÃO</span><strong>Uma pergunta de cada vez.</strong><p>O objetivo é orientar a chamada, não substituir os sistemas e procedimentos autorizados.</p></div>
          </section>
          <div className="dashboard-hero-layout">
            <section className="home-service-area" aria-label="Escolher serviço">
              <div className="home-section-head"><div><span className="eyebrow">OS TEUS SERVIÇOS</span><h2>Onde precisas de apoio?</h2><p>Guiões e manuais separados para cada projeto.</p></div></div>
              <div className="project-grid">
                <button type="button" className="project-hero cc-hero" onClick={() => navigate('coca-cola')}>
                  <div className="project-hero-top"><ProjectMark project="coca-cola"/><span>01 / SERVIÇO</span></div>
                  <div className="project-hero-copy"><span className="project-hero-label">COCA-COLA</span><h3>Serviços de Avarias</h3><p>Equipamentos, refrigeração, falta de produto e outras ocorrências.</p></div>
                  <span className="project-hero-link">Abrir área Coca-Cola <ChevronRight size={18}/></span>
                  <ServiceArtwork project="coca-cola"/>
                </button>
                <button type="button" className="project-hero bk-hero" onClick={() => navigate('burger-king')}>
                  <div className="project-hero-top"><ProjectMark project="burger-king"/><span>02 / SERVIÇO</span></div>
                  <div className="project-hero-copy"><span className="project-hero-label">BURGER KING</span><h3>Apoio ao Cliente</h3><p>Pedidos, entregas, apoio digital e reclamações.</p></div>
                  <span className="project-hero-link">Abrir área Burger King <ChevronRight size={18}/></span>
                  <ServiceArtwork project="burger-king"/>
                </button>
              </div>
              <div className="home-service-guidance"><Info size={17}/><span>As orientações são materiais de apoio e treino. Confirma no sistema oficial antes de comunicar decisões ao cliente.</span></div>
            </section>
            <LiveCallPanel onOpen={openProcedure}/>
          </div>
          <DashboardResources onNavigate={navigate} onOpen={openProcedure} favoriteCount={favorites.length}/>
        </>}
        {(page === 'coca-cola' || page === 'burger-king') && (selected ? <Workflow key={selected.id} data={selected} onBack={() => setSelectedId(null)} isFavorite={favorites.includes(selected.id)} onFavorite={() => toggleFavorite(selected.id)} /> : <><div className={`service-header service-${page}`}><ProjectMark project={page}/><div><div className="eyebrow">BIBLIOTECA DE ATENDIMENTO</div><h1>{projectLabels[page]}</h1><p>Seleciona a situação relatada para abrir o atendimento orientado.</p></div></div><button className="manual-service-cta" type="button" onClick={() => navigate(page === "coca-cola" ? "manual-coca-cola" : "manual-burger-king")}><BookOpen size={17}/> Consultar manual deste serviço <ChevronRight size={17}/></button><div className="alert-lite"><Info size={17}/> Guiões de apoio e treino. Nenhum procedimento desta versão está validado institucionalmente.</div><div className="section-heading"><div><h2>Situações e procedimentos</h2><p>{procedures.filter((p) => p.project === page).length} guiões disponíveis</p></div></div>{renderCards(procedures.filter((p) => p.project === page))}</>)}
        {(page === 'manual-coca-cola' || page === 'manual-burger-king') && <ManualHub key={page} project={page === 'manual-coca-cola' ? 'coca-cola' : 'burger-king'} onOpenProcedure={openProcedure} onSwitch={project => navigate(project === 'coca-cola' ? 'manual-coca-cola' : 'manual-burger-king')}/>}
        {page === 'triagem' && <RoutingGuide/>}
        {page === 'faq' && <FrequentlyAsked/>}
        {page === 'simulacoes' && <Simulations/>}
        {page === 'respostas' && <QuickAnswers onOpen={openProcedure} />}
        {page === 'pesquisa' && <><div className="page-intro"><div className="eyebrow"><SlidersHorizontal size={14}/> PESQUISA DE PROCEDIMENTOS</div><h1>De que precisas para esta chamada?</h1><p>Pesquisa pela expressão utilizada pelo cliente, por exemplo «não faz frio», «pedido incompleto» ou «aplicação».</p></div><div className="search-panel"><label className="search-input"><Search size={21}/><input id="procedure-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Escreve o problema ou assunto..." aria-label="Pesquisar por problema ou assunto"/>{query && <button type="button" aria-label="Limpar pesquisa" onClick={() => setQuery('')}><X size={17}/></button>}</label><div className="filter-line"><span><SlidersHorizontal size={16}/> Filtrar por área:</span><div className="filter-buttons">{([['todos', 'Todas'], ['coca-cola', 'Coca-Cola'], ['burger-king', 'Burger King']] as const).map(([value, label]) => <button type="button" key={value} className={searchProject === value ? 'selected' : ''} onClick={() => setSearchProject(value)}>{label}</button>)}</div></div></div><div className="section-heading"><div><h2>Resultados <span className="result-count">{filtered.length}</span></h2><p>Resultados incluem sinónimos e descrições das situações.</p></div></div>{renderCards(filtered)}</>}
        {page === 'favoritos' && <><div className="page-intro"><div className="eyebrow"><Star size={15}/> ACESSOS GUARDADOS</div><h1>Os teus procedimentos favoritos</h1><p>Guarda os guiões mais frequentes. Apenas os identificadores dos favoritos são armazenados neste dispositivo.</p></div>{favoriteProcedures.length ? renderCards(favoriteProcedures) : <div className="empty-state"><Star size={35}/><h3>Ainda não guardaste favoritos</h3><p>Abre uma área de atendimento e seleciona a estrela de um guião.</p><button className="primary-button" onClick={() => navigate('inicio')}>Ver áreas <ChevronRight size={16}/></button></div>}</>}
        {page === 'formacao' && <Training/>}
        {page === 'versoes' && <><div className="page-intro"><div className="eyebrow"><History size={14}/> REGISTO DE EVOLUÇÃO</div><h1>Histórico de versões</h1><p>As alterações ao projeto devem ser registadas e testadas antes da publicação.</p></div><div className="timeline-card"><span className="version-pill">v1.8.0</span><h3>Dashboard Cristal e consulta rápida</h3><p>Hierarquia visual mais simples, cartões ilustrados originais, manuais em destaque, fontes públicas visíveis, números reais da biblioteca e controlos de voz mais completos.</p><small>19 de outubro de 2026</small></div><div className="timeline-card"><span className="version-pill">v1.7.0</span><h3>Manuais separados com consulta orientada</h3><p>Manuais Coca-Cola e Burger King, índice pesquisável, etapas, fontes e leitura por voz com distinção entre informação pública e procedimentos por confirmar.</p><small>18 de outubro de 2026</small></div><div className="timeline-card"><span className="version-pill">v1.6.0</span><h3>Voz, simulações e painel em direto</h3><p>Leitura por voz em português, treino com gravação local da própria voz, perguntas frequentes e navegação móvel.</p><small>18 de outubro de 2026</small></div><div className="timeline-card"><span className="version-pill">v1.5.0</span><h3>Treino e correção dos erros</h3><p>Mais cenários, pontuação e repetição das perguntas incorretas.</p><small>18 de outubro de 2026</small></div><div className="timeline-card"><span className="version-pill">v1.4.0</span><h3>Respostas rápidas e melhorias de utilização</h3><p>Consulta rápida por assunto, leitura e cópia de frases, acesso ao guião completo, preferência de tema persistente, acessibilidade e tratamento de erros.</p><small>18 de outubro de 2026</small></div><div className="timeline-card"><span className="version-pill">v1.3.0</span><h3>Triagem e referências públicas verificadas</h3><p>Seleção orientada por canal, links oficiais com âmbito e limites claros e novos guiões de consulta, sem expor documentação interna.</p><small>18 de outubro de 2026</small></div><div className="timeline-card"><span className="version-pill">v1.2.0</span><h3>Início de chamada e teleponto melhorados</h3><p>Seleção rápida do serviço e situação, pesquisa num único ecrã, saudação ajustável, aumento da letra no teleponto e atalho Ctrl/Cmd + K.</p><small>18 de outubro de 2026</small></div><div className="timeline-card"><span className="version-pill">v1.1.0</span><h3>Primeira implementação entregue</h3><p>Interface responsiva, separação por serviços, guiões passo a passo, teleponto, pesquisa sem acentos, favoritos locais, treino e indicadores de validação.</p><small>18 de outubro de 2026</small></div><div className="timeline-card muted"><span className="version-pill">Próximas versões</span><h3>Melhorias condicionadas a documentação</h3><p>Validação institucional de procedimentos, revisão do conteúdo, avaliação de acessibilidade e melhorias funcionais após testes com utilizadores.</p></div></>}
        {page === 'seguranca' && <><div className="page-intro"><div className="eyebrow"><LockKeyhole size={15}/> BOAS PRÁTICAS</div><h1>Segurança, fontes e limites</h1><p>O Call Center Pro é uma ferramenta independente de apoio pessoal ao atendimento, sem ligação aos sistemas oficiais das marcas.</p></div><div className="info-grid"><section className="info-card"><ShieldCheck size={24}/><h3>Estado da informação</h3><p><strong>Validado:</strong> exige confirmação da regra operacional concreta. As páginas públicas agora referenciadas não confirmam automaticamente os procedimentos internos.</p><p><strong>Por confirmar:</strong> precisa de confirmação do responsável competente.</p><p><strong>Exemplo:</strong> texto útil para treino, não vinculativo.</p></section><section className="info-card"><LockKeyhole size={24}/><h3>Dados pessoais</h3><p>Não introduzas dados de clientes, NIF, moradas, telefones, números de encomenda, credenciais ou informação de chamadas nesta aplicação.</p><p>Os favoritos guardam apenas identificadores de guiões no navegador.</p></section><section className="info-card"><MonitorSmartphone size={24}/><h3>Publicação no GitHub</h3><p>O GitHub Pages serve páginas estáticas e não proporciona autenticação do conteúdo. Só publica informação que esteja autorizada para divulgação pública.</p><p>Procedimentos internos devem ficar num sistema com acesso controlado.</p></section><section className="info-card"><FileCheck2 size={24}/><h3>Fontes e revisão</h3><p>Os guiões foram preparados para treino e consulta com base em relatos do operador e versões de estudo dos seus manuais. Os procedimentos internos permanecem por validar.</p><p>As fontes públicas abaixo comprovam apenas as informações explicitamente descritas em cada página. Confirma sempre ações operacionais na ferramenta autorizada.</p></section></div><div className="section-heading secondary-heading"><div><h2>Fontes oficiais consultáveis</h2><p>Abre as páginas originais e verifica se a informação continua atual.</p></div></div><div className="public-source-grid">{publicSources.map(source => <article className="public-source-card" key={source.id}><span className="eyebrow">{source.publisher} · Consultado em {source.confirmed}</span><h3>{source.title}</h3><p>{source.scope}</p><p className="source-limitation"><Info size={15}/>{source.limitation}</p><a href={source.url} target="_blank" rel="noopener noreferrer">Abrir fonte oficial <ExternalLink size={16}/></a></article>)}</div><EvidenceAuditPanel/></>}
      </main>
      <footer className="app-footer"><span><HelpCircle size={15}/> Ferramenta de apoio independente. Confirma as instruções operacionais antes de as aplicares.</span><span>Call Center Pro · v{VERSION}</span></footer>
      <nav className="mobile-bottom-nav" aria-label="Acesso rápido no telemóvel"><button type="button" aria-current={page === "inicio" ? "page" : undefined} onClick={() => navigate("inicio")}><Home size={19}/>Início</button><button type="button" aria-current={page === "coca-cola" ? "page" : undefined} onClick={() => navigate("coca-cola")}><Coffee size={19}/>Coca-Cola</button><button type="button" aria-current={page === "burger-king" ? "page" : undefined} onClick={() => navigate("burger-king")}><Headphones size={19}/>Burger King</button><button type="button" aria-current={page === "pesquisa" ? "page" : undefined} onClick={openSearch}><Search size={19}/>Pesquisa</button></nav>
    </div>
  </div>;
}

export default App;
