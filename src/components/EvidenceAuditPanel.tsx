import { AlertTriangle, BookOpen, ExternalLink, FileCheck2, ShieldCheck } from 'lucide-react';
import { confirmedPublicClaims, getEvidenceSummary, pendingOperationalGaps, sourceReviewDate } from '../data/evidence';
import { getPublicSources } from '../data/publicSources';

/** Informação apresentada ao operador com estado e limites explícitos. */
export function EvidenceAuditPanel() {
  const summary = getEvidenceSummary();
  return <section className="evidence-audit" aria-labelledby="evidence-title">
    <div className="section-heading secondary-heading"><div>
      <span className="eyebrow"><ShieldCheck size={15}/> RASTREABILIDADE DO CONTEÚDO</span>
      <h2 id="evidence-title">O que está confirmado e o que falta validar?</h2>
      <p>Fontes oficiais revistas em {sourceReviewDate}. A revisão pública não substitui a autorização interna.</p>
    </div></div>
    <div className="evidence-audit-summary">
      <div><strong>{summary.availableProcedures}</strong><span>guiões de treino</span></div>
      <div><strong>{summary.validatedProcedures}</strong><span>guiões aprovados internamente</span></div>
      <div><strong>{summary.publicClaims}</strong><span>factos públicos verificados</span></div>
      <div><strong>{summary.pendingOperationalAreas}</strong><span>áreas internas pendentes</span></div>
    </div>
    <div className="evidence-audit-columns">
      <div className="evidence-audit-card"><h3><FileCheck2 size={19}/> Factos públicos e respetivas fontes</h3>
        {confirmedPublicClaims.map(claim => <article key={claim.id} className="evidence-audit-claim">
          <strong>{claim.statement}</strong>
          <p><AlertTriangle size={14}/> Limite: {claim.limitation}</p>
          <div>{getPublicSources(claim.sourceIds).map(source => <a key={source.id} href={source.url} rel="noopener noreferrer" target="_blank">{source.publisher}<ExternalLink size={14}/></a>)}</div>
        </article>)}
      </div>
      <div className="evidence-audit-card evidence-audit-pending"><h3><BookOpen size={19}/> Procedimentos operacionais pendentes</h3>
        {pendingOperationalGaps.map(gap => <article key={gap.id} className="evidence-audit-claim">
          <strong>{gap.title}</strong><p>{gap.validationNeeded}</p><small>Estado: necessita de validação pela entidade responsável.</small>
        </article>)}
      </div>
    </div>
    <p className="evidence-audit-footer"><AlertTriangle size={17}/> Não utilizar dados, credenciais nem documentos internos restritos nesta aplicação pública. Para validar um procedimento, é necessária autorização, fonte interna identificada e âmbito concreto.</p>
  </section>;
}
