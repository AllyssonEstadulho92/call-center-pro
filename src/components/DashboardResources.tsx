import { BookOpen, ChevronRight, ClipboardList, ExternalLink, GraduationCap, HelpCircle, LockKeyhole, Search, ShieldCheck, Sparkles, Star, Volume2 } from 'lucide-react';
import { procedures } from '../data/knowledge';
import { publicSources } from '../data/publicSources';
import type { Page, Procedure, Project } from '../types';

interface Props {
  onNavigate: (page: Page) => void;
  onOpen: (procedure: Procedure) => void;
  favoriteCount: number;
}
const featured: Record<Project, string[]> = {
  'coca-cola': ['cc-nao-refrigera','cc-sem-funcionar','cc-sem-produto','cc-limpeza'],
  'burger-king': ['bk-incompleto','bk-atraso','bk-app','bk-reclamacao'],
};

function ManualCard({ project, onNavigate, onOpen }: { project: Project; onNavigate: Props['onNavigate']; onOpen: Props['onOpen'] }) {
  const isCocaCola = project === 'coca-cola';
  const id = isCocaCola ? 'manual-coca-cola' : 'manual-burger-king';
  const title = isCocaCola ? 'Manual Coca-Cola' : 'Manual Burger King';
  const topics = featured[project].map(key => procedures.find(p => p.id === key)).filter((p): p is Procedure => Boolean(p));
  return <section className={`home-panel home-manual home-manual-${project}`}>
    <div className="home-panel-head">
      <div className="home-panel-title"><span className="home-panel-icon"><BookOpen size={19}/></span><div><h2>{title}</h2><p>{isCocaCola ? 'Serviços de Avarias' : 'Apoio ao Cliente'}</p></div></div>
      <button type="button" className="home-panel-link" onClick={() => onNavigate(id)}>Ver manual <ChevronRight size={15}/></button>
    </div>
    <div className="home-panel-content">{topics.map(p => <button key={p.id} type="button" className="home-topic" onClick={() => onOpen(p)}>
      <span className="home-topic-icon">{isCocaCola ? <ClipboardList size={17}/> : <HelpCircle size={17}/>}</span>
      <span><strong>{p.title}</strong><small>{p.category} · {p.status === 'exemplo' ? 'Exemplo' : 'Por confirmar'}</small></span><ChevronRight size={17}/>
    </button>)}</div>
  </section>;
}

export function DashboardResources({ onNavigate, onOpen, favoriteCount }: Props) {
  const frequent = ['cc-nao-refrigera','bk-incompleto','bk-atraso','bk-app']
    .map(id => procedures.find(p => p.id === id)).filter((p): p is Procedure => Boolean(p));
  const verified = procedures.filter(p => p.status === 'validado').length;
  return <>
    <div className="home-section-head"><div><span className="eyebrow"><BookOpen size={14}/> CONSULTA ORIENTADA</span><h2>Manuais, estudo e fontes</h2><p>As ferramentas de que precisas, sem percorrer vários ecrãs.</p></div></div>
    <div className="home-resources-grid">
      <ManualCard project="coca-cola" onNavigate={onNavigate} onOpen={onOpen}/>
      <ManualCard project="burger-king" onNavigate={onNavigate} onOpen={onOpen}/>
      <section className="home-panel home-practice">
        <div className="home-panel-head"><div className="home-panel-title"><span className="home-panel-icon"><GraduationCap size={19}/></span><div><h2>Formação e simulações</h2><p>Memorizar sem usar chamadas reais</p></div></div></div>
        <div className="home-practice-highlight"><span><Volume2 size={22}/></span><div><strong>Treino com a tua voz</strong><p>Escuta frases, pratica sozinho e compara a resposta com o guião de estudo.</p></div></div>
        <button type="button" className="home-practice-action" onClick={() => onNavigate('simulacoes')}>Abrir simulações <ChevronRight size={17}/></button>
        <button type="button" className="home-practice-secondary" onClick={() => onNavigate('formacao')}>Responder às perguntas de estudo <ChevronRight size={16}/></button>
        <p className="home-practice-footnote"><LockKeyhole size={14}/> Apenas cenários fictícios. Não gravar clientes.</p>
      </section>
    </div>
    <div className="home-secondary-grid">
      <section className="home-panel home-frequent">
        <div className="home-panel-head"><div className="home-panel-title"><span className="home-panel-icon"><Sparkles size={19}/></span><div><h2>Situações frequentes</h2><p>Um toque para abrir o guião</p></div></div></div>
        <div className="home-frequent-list">{frequent.map(p=><button type="button" key={p.id} onClick={() => onOpen(p)}><span className={`home-frequent-mark ${p.project === 'coca-cola' ? 'cc' : 'bk'}`}>{p.project === 'coca-cola' ? 'CC' : 'BK'}</span><span>{p.title}<small>{p.project === 'coca-cola' ? 'Coca-Cola' : 'Burger King'}</small></span><ChevronRight size={16}/></button>)}</div>
      </section>
      <section className="home-panel home-sources">
        <div className="home-panel-head"><div className="home-panel-title"><span className="home-panel-icon"><ShieldCheck size={19}/></span><div><h2>Fontes públicas</h2><p>Referências com âmbito e limites</p></div></div></div>
        <div className="home-source-links">{publicSources.slice(0,3).map(src=><a key={src.id} href={src.url} target="_blank" rel="noopener noreferrer"><span><strong>{src.title}</strong><small>{src.publisher}</small></span><ExternalLink size={16}/></a>)}</div>
        <p className="home-sources-warning">Estas páginas não validam procedimentos internos.</p>
      </section>
      <section className="home-panel home-library-stats">
        <div className="home-panel-head"><div className="home-panel-title"><span className="home-panel-icon"><ClipboardList size={19}/></span><div><h2>A tua biblioteca</h2><p>Números reais da aplicação</p></div></div></div>
        <div className="home-library-metrics"><div><strong>{procedures.length}</strong><span>guiões disponíveis</span></div><div><strong>{favoriteCount}</strong><span>favoritos guardados</span></div><div><strong>{verified}</strong><span>guiões validados</span></div></div>
        <div className="home-library-links"><button type="button" onClick={() => onNavigate('pesquisa')}><Search size={17}/> Pesquisa avançada <ChevronRight size={16}/></button><button type="button" onClick={() => onNavigate('favoritos')}><Star size={17}/> Meus favoritos <ChevronRight size={16}/></button></div>
      </section>
    </div>
  </>;
}
