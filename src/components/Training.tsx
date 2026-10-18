import { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, CircleAlert } from 'lucide-react';
import { quiz } from '../data/knowledge';

export function Training() {
  const [ids, setIds] = useState<string[]>(() => quiz.map(q => q.id));
  const [position, setPosition] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [summary, setSummary] = useState(false);
  const questions = ids.map(id => quiz.find(q => q.id === id)).filter((q): q is typeof quiz[number] => q !== undefined);
  const item = questions[position];
  const answered = item !== undefined && answers[item.id] !== undefined;
  const selected = item ? answers[item.id] : undefined;
  const correct = questions.filter(q => answers[q.id] === q.correctIndex).length;
  const wrong = questions.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.correctIndex);
  const completed = questions.filter(q => answers[q.id] !== undefined).length;
  function restart(nextIds = quiz.map(q => q.id)) { setIds(nextIds); setPosition(0); setAnswers({}); setSummary(false); }
  if (!item) return <div className="empty-state">Não existem questões disponíveis.</div>;

  return <div className="training-layout">
    <div className="page-intro"><span className="eyebrow"><BookOpen size={15}/> FORMAÇÃO PROFISSIONAL</span><h1>{ids.length === quiz.length ? 'Treina as respostas antes de atender' : 'Rever respostas incorretas'}</h1><p>Exercícios fictícios de comunicação e segurança. Não constituem procedimentos oficiais.</p></div>
    <section className="training-card">
      {summary ? <>
        <div className="eyebrow">RESULTADO DO EXERCÍCIO</div>
        <h2 className="training-result-heading">{correct} de {questions.length} respostas corretas</h2>
        <p className="training-result-desc">{wrong.length ? 'Revê as respostas e pratica novamente os erros.' : 'Todas as questões deste exercício foram respondidas corretamente.'}</p>
        <div className="training-result-list">{wrong.map(q => <article key={q.id} className="training-wrong"><strong>{q.question}</strong><p><b>Resposta correta:</b> {q.choices[q.correctIndex]}</p><p>{q.explanation}</p></article>)}</div>
        <div className="training-actions"><button type="button" className="outline-button" onClick={() => restart()}><RotateCcw size={16}/> Recomeçar tudo</button>{wrong.length > 0 && <button type="button" className="primary-button" onClick={() => restart(wrong.map(q => q.id))}>Treinar erros <ChevronRight size={16}/></button>}</div>
      </> : <>
        <div className="training-summary"><span>Questão {position + 1} de {questions.length}</span><span>{completed} respondidas · {correct} corretas</span></div>
        <div className="training-progress" role="progressbar" aria-label="Progresso da formação" aria-valuenow={completed} aria-valuemin={0} aria-valuemax={questions.length}><span style={{width: `${Math.round(completed / questions.length * 100)}%`}}/></div>
        <h2 className="training-question">{item.question}</h2>
        <div className="answer-list">{item.choices.map((choice, index) => <button type="button" key={index} disabled={answered} aria-pressed={selected === index} onClick={() => setAnswers(a => ({...a,[item.id]:index}))} className={`answer-button ${answered && index === item.correctIndex ? 'correct' : ''} ${answered && index === selected && index !== item.correctIndex ? 'incorrect' : ''}`}><span>{String.fromCharCode(65 + index)}</span>{choice}</button>)}</div>
        {answered && <div role="status" className={`training-feedback ${selected === item.correctIndex ? 'feedback-correct' : 'feedback-error'}`}><strong>{selected === item.correctIndex ? <><CheckCircle2 size={16}/> Resposta correta</> : <><CircleAlert size={16}/> Resposta a rever</>}</strong><p>{item.explanation}</p></div>}
        <div className="training-actions"><button type="button" className="outline-button" disabled={position === 0} onClick={() => setPosition(p => Math.max(0,p-1))}><ChevronLeft size={16}/> Anterior</button><button type="button" className="primary-button" disabled={!answered} onClick={() => position === questions.length - 1 ? setSummary(true) : setPosition(p => p+1)}>{position === questions.length-1 ? 'Ver resultado' : 'Próxima questão'} <ChevronRight size={16}/></button></div>
        <button type="button" className="training-restart-link" onClick={() => restart()}><RotateCcw size={14}/> Reiniciar exercício</button>
      </>}
    </section>
  </div>;
}
