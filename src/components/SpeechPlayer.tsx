import { useEffect, useState } from 'react';
import { Play, Square, Volume2 } from 'lucide-react';

interface SpeechPlayerProps {
  text: string;
  compact?: boolean;
}

/** Voz sintetizada no próprio browser. Não transmite o texto para nenhum servidor da aplicação. */
export function SpeechPlayer({ text, compact = false }: SpeechPlayerProps) {
  const [supported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window);
  const [speaking, setSpeaking] = useState(false);
  const [slow, setSlow] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel();
    };
  }, [supported, text]);

  function stop() {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setStatus('Leitura interrompida.');
  }

  function play() {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-PT';
    utterance.rate = slow ? 0.76 : 0.94;
    utterance.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const ptPT = voices.find(v => v.lang.toLowerCase().replace('_', '-') === 'pt-pt');
    const pt = voices.find(v => v.lang.toLowerCase().startsWith('pt'));
    if (ptPT || pt) utterance.voice = ptPT ?? pt ?? null;
    utterance.onstart = () => { setSpeaking(true); setStatus('A reproduzir a frase.'); };
    utterance.onend = () => { setSpeaking(false); setStatus('Leitura concluída.'); };
    utterance.onerror = event => {
      setSpeaking(false);
      if (event.error !== 'canceled' && event.error !== 'interrupted') {
        setStatus('Não foi possível reproduzir. Verifica o som e a voz disponível no dispositivo.');
      }
    };
    setStatus('A preparar a voz...');
    window.speechSynthesis.speak(utterance);
  }

  return <div className={`speech-player ${compact ? 'speech-compact' : ''}`}>
    {supported ? <>
      <button type="button" className="speech-action" onClick={speaking ? stop : play} aria-label={speaking ? 'Parar leitura da frase' : 'Ouvir frase em voz portuguesa'}>
        {speaking ? <Square size={16}/> : <Volume2 size={17}/>} {speaking ? 'Parar' : 'Ouvir frase'}
      </button>
      <button type="button" className={`speech-speed ${slow ? 'selected' : ''}`} aria-pressed={slow} onClick={() => setSlow(value => !value)} title="Alternar leitura mais lenta">
        <Play size={13}/> {slow ? 'Velocidade lenta' : 'Mais devagar'}
      </button>
      <span className="sr-only" role="status">{status}</span>
    </> : <p className="speech-unavailable">Leitura por voz indisponível neste browser. Podes continuar a ler o teleponto.</p>}
  </div>;
}
