import { useState } from 'react';
import { ClipboardCheck, Copy, LifeBuoy } from 'lucide-react';
import { callSafetyPhrases } from '../data/callSafetyPhrases';
import type { Project } from '../types';

/** Consulta de frases fictícias: sem captura nem armazenamento de chamadas. */
export function CallSafetyReplies({ project }: { project: Project }) {
  const phrases = callSafetyPhrases[project];
  const [selectedId, setSelectedId] = useState(phrases[0].id);
  const [copyStatus, setCopyStatus] = useState('');
  const selected = phrases.find(item => item.id === selectedId) ?? phrases[0];

  async function copyPhrase() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Cópia indisponível');
      await navigator.clipboard.writeText(selected.say);
      setCopyStatus('Frase copiada.');
    } catch {
      setCopyStatus('Não foi possível copiar. Seleciona a frase manualmente.');
    }
  }

  return <details className="call-safety-replies">
    <summary><LifeBuoy size={18}/> Se o cliente fizer outra pergunta <span>Respostas rápidas</span></summary>
    <div className="call-safety-inner">
      <p className="call-safety-guidance">Escolhe a dúvida. A frase é para o cliente; a verificação é apenas para tua orientação.</p>
      <div className="call-safety-topics" role="group" aria-label="Dúvidas frequentes do cliente">
        {phrases.map(item => <button type="button" key={item.id} aria-pressed={selected.id === item.id}
          className={selected.id === item.id ? 'selected' : ''}
          onClick={() => { setSelectedId(item.id); setCopyStatus(''); }}>{item.question}</button>)}
      </div>
      <div className="call-safety-response">
        <strong>O QUE DIZER AO CLIENTE</strong>
        <blockquote>“{selected.say}”</blockquote>
        <div className="call-safety-verify"><ClipboardCheck size={16}/><p><strong>Antes de responder:</strong> {selected.verify}</p></div>
        <button type="button" className="outline-button" onClick={copyPhrase}><Copy size={16}/> Copiar esta frase</button>
        {copyStatus && <p role="status" className="call-safety-copy-status">{copyStatus}</p>}
      </div>
      <p className="call-safety-disclaimer">Material de treino, não procedimento oficial. Confirma ações e prazos nos sistemas autorizados. Não introduzas dados de clientes aqui.</p>
    </div>
  </details>;
}
