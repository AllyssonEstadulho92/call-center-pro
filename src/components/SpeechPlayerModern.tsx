import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, Square, Volume2 } from 'lucide-react';

interface SpeechPlayerProps {
  text: string;
  compact?: boolean;
}

const VOICE_KEY = 'call-center-pro-voz-preferida-v1';
const SPEED_KEY = 'call-center-pro-velocidade-voz-v1';
const SPEEDS = [{ value: 0.78, label: 'Lenta' }, { value: 0.9, label: 'Normal' }, { value: 1, label: 'Rápida' }] as const;

function readPreference(key: string): string {
  try { return localStorage.getItem(key) ?? ''; } catch { return ''; }
}

function preferredVoice(voices: SpeechSynthesisVoice[], uri: string): SpeechSynthesisVoice | null {
  const portuguese = voices.filter(v => v.lang.toLowerCase().replace('_', '-').startsWith('pt'));
  return portuguese.find(v => v.voiceURI === uri)
    ?? portuguese.find(v => v.lang.toLowerCase().replace('_', '-') === 'pt-pt'
      && /premium|enhanced|natural|joana|inês|ines|catarina/i.test(v.name))
    ?? portuguese.find(v => v.lang.toLowerCase().replace('_', '-') === 'pt-pt')
    ?? portuguese[0] ?? null;
}

/** Voz disponibilizada pelo dispositivo/browser. Não é uma gravação, nem uma voz humana garantida. */
export function SpeechPlayer({ text, compact = false }: SpeechPlayerProps) {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState(() => readPreference(VOICE_KEY));
  const [speed, setSpeed] = useState<number>(() => {
    const stored = Number(readPreference(SPEED_KEY));
    return SPEEDS.some(s => s.value === stored) ? stored : 0.9;
  });
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState('');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!supported) return;
    const speech = window.speechSynthesis;
    function refresh() {
      setVoices(speech.getVoices().filter(v => v.lang.toLowerCase().replace('_', '-').startsWith('pt')));
    }
    refresh();
    speech.addEventListener('voiceschanged', refresh);
    return () => speech.removeEventListener('voiceschanged', refresh);
  }, [supported]);

  useEffect(() => {
    return () => {
      if (supported) {
        utteranceRef.current = null;
        window.speechSynthesis.cancel();
      }
    };
  }, [supported, text]);

  function stop() {
    if (!supported) return;
    utteranceRef.current = null;
    window.speechSynthesis.cancel();
    setPlaying(false);
    setPaused(false);
    setStatus('Leitura interrompida.');
  }

  function play() {
    if (!supported) return;
    const speech = window.speechSynthesis;
    speech.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-PT';
    utterance.rate = speed;
    utterance.pitch = 1;
    const voice = preferredVoice(speech.getVoices(), selectedVoice);
    if (voice) utterance.voice = voice;
    utteranceRef.current = utterance;
    utterance.onstart = () => {
      if (utteranceRef.current !== utterance) return;
      setPlaying(true); setPaused(false);
      setStatus('A ouvir o guião.');
    };
    utterance.onend = () => {
      if (utteranceRef.current !== utterance) return;
      utteranceRef.current = null;
      setPlaying(false); setPaused(false);
      setStatus('Leitura concluída.');
    };
    utterance.onerror = event => {
      if (utteranceRef.current !== utterance) return;
      utteranceRef.current = null;
      setPlaying(false); setPaused(false);
      if (event.error !== 'canceled' && event.error !== 'interrupted') {
        setStatus('Não foi possível reproduzir. Confirma o volume e as vozes disponíveis.');
      }
    };
    setStatus('A preparar a leitura...');
    speech.speak(utterance);
  }

  function togglePause() {
    if (!supported || !playing) return;
    if (paused) { window.speechSynthesis.resume(); setPaused(false); setStatus('Leitura retomada.'); }
    else { window.speechSynthesis.pause(); setPaused(true); setStatus('Leitura em pausa.'); }
  }

  function changeVoice(value: string) {
    setSelectedVoice(value);
    try { window.localStorage.setItem(VOICE_KEY, value); } catch { /* Preferência opcional. */ }
    if (playing) stop();
  }

  function changeSpeed(value: number) {
    setSpeed(value);
    try { window.localStorage.setItem(SPEED_KEY, String(value)); } catch { /* Preferência opcional. */ }
    if (playing) stop();
  }

  return <div className={`speech-player ${compact ? 'speech-compact' : ''}`}>
    {supported ? <>
      <div className="speech-primary-controls">
        <button type="button" className="speech-action" onClick={play} aria-label="Ouvir frase em voz portuguesa">
          <Volume2 size={17}/> Ouvir frase
        </button>
        <button type="button" className="speech-speed" onClick={togglePause} disabled={!playing} aria-label={paused ? 'Retomar leitura da frase' : 'Pausar leitura da frase'}>
          {paused ? <Play size={15}/> : <Pause size={15}/>} {paused ? 'Retomar' : 'Pausar'}
        </button>
        <button type="button" className="speech-speed" onClick={play} aria-label="Repetir a frase"><RotateCcw size={15}/> Repetir</button>
        <button type="button" className="speech-stop" onClick={stop} disabled={!playing} aria-label="Parar leitura da frase"><Square size={15}/><span className="sr-only">Parar</span></button>
      </div>
      <div className="speech-options">
        <label>Velocidade
          <select value={speed} onChange={event => changeSpeed(Number(event.target.value))}>
            {SPEEDS.map(item => <option value={item.value} key={item.label}>{item.label}</option>)}
          </select>
        </label>
        <label>Voz portuguesa
          <select value={voices.some(v => v.voiceURI === selectedVoice) ? selectedVoice : ''} onChange={event => changeVoice(event.target.value)}>
            <option value="">Automática (dispositivo)</option>
            {voices.map(voice => <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name} ({voice.lang})</option>)}
          </select>
        </label>
      </div>
      <p className="speech-device-note">{voices.length === 0
        ? 'A voz depende do dispositivo. Se soar robótica, verifica as vozes portuguesas instaladas nas definições de acessibilidade.'
        : 'Experimenta as vozes disponíveis para encontrares a pronúncia mais clara. A qualidade depende do sistema.'}</p>
      <span className="sr-only" role="status">{status}</span>
    </> : <p className="speech-unavailable">O browser não suporta a leitura por voz. Podes continuar a consultar o teleponto.</p>}
  </div>;
}
