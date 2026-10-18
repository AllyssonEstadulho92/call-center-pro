import { useMemo, useState } from 'react';
import { ArrowRight, ExternalLink, HelpCircle, Info, LockKeyhole, ShieldCheck } from 'lucide-react';
import type { Project } from '../types';
import { getPublicSources } from '../data/publicSources';
import { getRoutingAdvice, type ContactChannel, type ContactSubject } from '../lib/routing';

const channelOptions: { id: ContactChannel; label: string }[] = [
  { id: 'indefinido', label: 'Ainda não sei' },
  { id: 'linha', label: 'Linha telefónica' },
  { id: 'aplicacao', label: 'Aplicação' },
  { id: 'website', label: 'Website' },
  { id: 'plataforma', label: 'Outra plataforma' },
  { id: 'restaurante', label: 'Restaurante' },
];
const subjectOptions: { id: ContactSubject; label: string }[] = [
  { id: 'encomenda', label: 'Encomenda' }, { id: 'entrega', label: 'Entrega' },
  { id: 'pagamento', label: 'Pagamento / reembolso' }, { id: 'reclamacao', label: 'Reclamação' },
  { id: 'outro', label: 'Outro assunto' },
];

export function RoutingGuide() {
  const [project, setProject] = useState<Project>('burger-king');
  const [channel, setChannel] = useState<ContactChannel>('indefinido');
  const [subject, setSubject] = useState<ContactSubject>('encomenda');
  const advice = useMemo(() => getRoutingAdvice(project, channel, subject), [project, channel, subject]);
  const sources = getPublicSources(advice.sourceIds);
  return <div className="routing-page">
    <div className="page-intro"><div className="eyebrow"><HelpCircle size={15}/> TRIAGEM DURANTE A CHAMADA</div>
      <h1>Qual é o próximo passo?</h1>
      <p>Seleciona o serviço, a origem do contacto e o assunto. A aplicação mostra uma frase pronta e aquilo que deves confirmar, sem recolher dados do cliente.</p>
    </div>
    <div className="routing-grid">
      <section className="routing-controls" aria-label="Identificação da situação">
        <div className="routing-field"><h2>1. Serviço</h2><div className="routing-options">
          <button type="button" className={project === 'coca-cola' ? 'selected' : ''} aria-pressed={project === 'coca-cola'} onClick={() => setProject('coca-cola')}>Coca-Cola</button>
          <button type="button" className={project === 'burger-king' ? 'selected' : ''} aria-pressed={project === 'burger-king'} onClick={() => setProject('burger-king')}>Burger King</button>
        </div></div>
        {project === 'burger-king' && <><div className="routing-field"><h2>2. Onde fez o pedido?</h2><div className="routing-options">
          {channelOptions.map(c => <button type="button" key={c.id} className={channel === c.id ? 'selected' : ''} aria-pressed={channel === c.id} onClick={() => setChannel(c.id)}>{c.label}</button>)}
        </div></div>
        <div className="routing-field"><h2>3. Qual é o assunto?</h2><div className="routing-options">
          {subjectOptions.map(s => <button type="button" key={s.id} className={subject === s.id ? 'selected' : ''} aria-pressed={subject === s.id} onClick={() => setSubject(s.id)}>{s.label}</button>)}
        </div></div></>}
        {project === 'coca-cola' && <p className="routing-tip"><Info size={17}/> A triagem Coca-Cola distingue apenas, nesta fase, a assistência a equipamentos do atendimento público ao consumidor. O encaminhamento concreto depende das instruções da operação.</p>}
      </section>
      <section className="routing-answer" aria-live="polite">
        <span className="routing-state"><ShieldCheck size={16}/> Encaminhamento por confirmar</span>
        <h2>{advice.heading}</h2>
        <div className="routing-say"><span>O QUE DIZER AO CLIENTE</span><p>“{advice.say}”</p></div>
        <div className="routing-info"><strong><ArrowRight size={17}/> O que verificar</strong><p>{advice.verify}</p></div>
        <div className="routing-info routing-caution"><strong><Info size={17}/> O que evitar</strong><p>{advice.avoid}</p></div>
        {sources.length > 0 && <div className="routing-sources"><strong>Consultar fonte pública</strong>{sources.map(s => <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer">{s.title}<ExternalLink size={15}/></a>)}<small>As fontes comprovam apenas os assuntos indicados nas próprias páginas; não validam regras internas da campanha.</small></div>}
        <p className="routing-private"><LockKeyhole size={16}/> Não escrevas aqui NIF, moradas, números de encomenda ou outros dados pessoais.</p>
      </section>
    </div>
  </div>;
}
